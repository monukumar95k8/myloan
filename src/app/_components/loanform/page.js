'use client';

import { useEffect, useState } from 'react';
import { collection, doc, getDocs, setDoc, Timestamp } from "firebase/firestore";
import { db } from '../../../lib/firebase/config';
import { useRouter } from 'next/navigation';

const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const router = useRouter();
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        adhaar: '',
        PAN: '',
        whatsapp: '',
        pincode: '',
        district: '',
        state: '',
        address: '',
        loanamount: '',
        loantype: '',
        tenure: '',
        loanemi: '',
        loaninterest: '',
        bankholder: '',
        bankifsc: '',
        bankname: '',
        bankaddress: '',
        bankaccount: '',
        status: "Loan Approved",
        createdAt: Timestamp.now(),
        proposalNum: `Dhani Finance/${Math.floor(10000000 + Math.random() * 90000000)}`,
        documentNum: `Dhani Finance/${Math.floor(10000000 + Math.random() * 90000000)}`
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const nextStep = () => {
        console.log(formData, "Form Data");
        if (validateStep()) setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const validateStep = () => {
        const requiredFields = {
            1: ['name', 'email', 'mobile'],
            2: ['adhaar', 'PAN', 'whatsapp', 'pincode', 'address'],
            3: ['loanamount', 'loantype', 'tenure'],
            4: ['bankholder', 'bankifsc', 'bankaccount']
        };
        requiredFields[step].every((field) => {
            console.log(field, "Field");
            console.log(formData[field], "Form Field");
            formData[field].trim() !== ''
        })
        return requiredFields[step].every(field => formData[field].trim() !== '');
    };

    function generateUniqueId() {
        const prefix = "DFL-";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let uniqueId = "";

        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            uniqueId += characters[randomIndex];
        }

        return prefix + uniqueId;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let id = generateUniqueId();
            let docRef = await setDoc(doc(db, "queries", id), formData);
            console.log('Form submitted',);
            await fetch("/api/send-email/loan-received", { method: "POST", body: JSON.stringify({ refId: id, name: formData.name, to: formData.email, amount: formData.loanamount, tenure: formData.tenure }), headers: { 'Content-Type': "application/json" } })
            router.push(`/thank-you/${id}`)
        } catch (err) {
            console.log(err, "Error creating queries")
        }
    };

    function calculateEMI() {
        if (!profile || !profile.interestrate) {
            console.error("Interest rate not available");
            return;
        }

        const interestRate = profile.interestrate; // Use directly in percentage
        const loanAmount = parseFloat(formData.loanamount);
        const loanTenure = parseInt(formData.tenure);

        if (loanAmount && loanTenure) {
            const rateOfInterest = (interestRate / 100) / 12; // Monthly interest rate
            const tenureInMonths = loanTenure;

            let emi;
            if (rateOfInterest === 0) {
                // If interest rate is 0%, simple division
                emi = loanAmount / tenureInMonths;
            } else {
                emi = (loanAmount * rateOfInterest * Math.pow(1 + rateOfInterest, tenureInMonths)) /
                    (Math.pow(1 + rateOfInterest, tenureInMonths) - 1);
            }

            const totalInterest = (emi * tenureInMonths) - loanAmount;  // Total interest

            // Update form data
            setFormData(prev => ({
                ...prev,
                loanemi: emi.toFixed(2),
                loaninterest: totalInterest.toFixed(2)
            }));
        }
    };

    const fetchPofile = async () => {
        try {
            let profileRef = getDocs(collection(db, "profile"));
            let profiles = (await profileRef).docs.map(doc => {
                return { id: doc.id, ...doc.data() }
            });
            setProfile(profiles[0]);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchPofile();

    }, []);

    useEffect(() => {
        console.log("Tenure changed");
        calculateEMI();
    }, [formData.tenure])


    useEffect(() => {
        console.log("Triggering use effect");
        if (formData.pincode.length === 6) {
            console.log("Fetch location triggered: ", formData.pincode);
            fetch(`https://api.postalpincode.in/pincode/${formData.pincode}`)
                .then(response => response.json()) // Parse the JSON response
                .then(data => {
                    console.log(data, "Success")
                    if (data[0].Status === "Success") {

                        // Successfully found data, extract and display district and state
                        const district = data[0].PostOffice[0].District;
                        const state = data[0].PostOffice[0].State;
                        console.log({ district, state }, "Data fetched successfuly")
                        setFormData(prev => ({
                            ...prev,
                            district: district,
                            state: state,
                        }));
                    } else {
                        // Handle the case where the pincode is not found or invalid
                        console.log("Error Not Found")
                        setFormData(prev => ({
                            ...prev,
                            district: "Not Found",
                            state: "Not Found",
                        }));
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        };




        if (formData.bankifsc.length == 11) {
            fetch(`https://ifsc.razorpay.com/${formData.bankifsc}`)
                .then(response => response.json())
                .then(data => {
                    if (data && data.BANK) {
                        setFormData(prev => ({ ...prev, bankname: data.BANK, bankaddress: data.ADDRESS || 'Address not available' }))
                    } else {
                        setFormData(prev => ({ ...prev, bankname: '', bankaddress: '' }))
                        alert('Bank details not found for this IFSC Code.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching bank details:', error);
                    alert('Failed to fetch bank details.');
                });
        }


    }, [formData.pincode, formData.bankifsc]); // Make sure to add formData.pincode to the dependency array

    return (
        <form className="space-y-6 p-4 bg-white shadow-lg rounded-lg" onSubmit={handleSubmit}>
            {step === 1 && (
                <div className="form-step active" id="step-1" bis_skin_checked={1}>
                    {/*<h4>Step 1: Personal Information</h4>*/}
                    <div className="form-group" bis_skin_checked={1}>
                        <label className="control-label" htmlFor="txtname">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            id="txtname"
                            placeholder="Enter your Full Name"
                            required=""
                            onChange={handleChange}
                            defaultValue={formData.name}
                        />
                    </div>
                    <div className="form-group" bis_skin_checked={1}>
                        <label className="control-label" htmlFor="txtemail">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            id="txtemail"
                            placeholder="Enter Your Email"
                            required=""
                            defaultValue={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group" bis_skin_checked={1}>
                        <label className="control-label" htmlFor="txtphone">
                            Mobile Number
                        </label>
                        <input
                            type="number"
                            name="mobile"
                            className="form-control"
                            id="txtphone"
                            placeholder="Enter Your 10-Digit Mobile Number"
                            required=""
                            defaultValue={formData.mobile}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-success text-center"
                        onClick={nextStep}
                    >
                        Apply Now
                    </button>
                </div>

            )}

            {step === 2 && (
                <div className="form-step" id="step-2" bis_skin_checked={1}>
                    <h4>Step 2: Address and Identification</h4>
                    <div className="form-group" bis_skin_checked={1}>
                        <label className="control-label" htmlFor="txtaadhar">
                            Aadhar Number
                        </label>
                        <input
                            type="number"
                            name="adhaar"
                            className="form-control"
                            id="txtaadhar"
                            placeholder="Enter Your 12-Digit Aadhaar Number"
                            required=""
                            defaultValue={formData.adhaar}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group" bis_skin_checked={1}>
                        <label className="control-label" htmlFor="txtpancard">
                            PAN Card Number
                        </label>
                        <input
                            type="text"
                            name="PAN"
                            className="form-control"
                            id="txtpancard"
                            placeholder="Enter Your PAN Card Number"
                            required=""
                            onChange={handleChange}
                            defaultValue={formData.PAN}
                            minLength={10}
                            maxLength={10}
                            pattern="[A-Z]{5}[0-9]{4}[A-Z]"

                        />
                    </div>
                    <div className="form-group" bis_skin_checked={1}>
                        <label className="control-label" htmlFor="txtphone">
                            WhatsApp Number
                        </label>
                        <input
                            type="number"
                            name="whatsapp"
                            className="form-control"
                            id="txtphone"
                            placeholder="Enter Your 10-Digit WhatsApp Number"
                            required=""
                            onChange={handleChange}
                            defaultValue={formData.whatsapp}
                        />
                    </div>
                    <div className="form-group" bis_skin_checked={1}>
                        <label className="control-label" htmlFor="txtpincode">
                            Pincode
                        </label>
                        <input
                            type="number"
                            name="pincode"
                            className="form-control"
                            id="txtpincode"
                            placeholder="Enter 6-Digit Pincode"
                            required=""
                            onChange={handleChange}
                            defaultValue={formData.pincode}
                        />
                    </div>
                    <div className="form-group" bis_skin_checked={1}>
                        <label className="control-label" htmlFor="txtdistrict">
                            District
                        </label>
                        <input
                            type="text"
                            name="district"
                            className="form-control"
                            id="txtdistrict"
                            placeholder="District"
                            readOnly=""
                            onChange={handleChange}
                            defaultValue={formData.district}
                            value={formData.district}
                        />
                    </div>
                    <div className="form-group" bis_skin_checked={1}>
                        <label className="control-label" htmlFor="txtstate">
                            State
                        </label>
                        <input
                            type="text"
                            name="state"
                            className="form-control"
                            id="txtstate"
                            placeholder="State"
                            readOnly=""
                            onChange={handleChange}
                            defaultValue={formData.state}
                            value={formData.state}
                        />
                    </div>
                    <div className="form-group" bis_skin_checked={1}>
                        <label className="control-label" htmlFor="txtaddress">
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            className="form-control"
                            id="txtaddress"
                            placeholder="Address"
                            required=""
                            onChange={handleChange}
                            defaultValue={formData.address}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={prevStep}
                        style={{ borderRadius: 8, marginTop: 5 }}
                    >
                        Previous
                    </button>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={nextStep}
                        style={{ width: "auto", padding: "6px 40px" }}
                    >
                        Next
                    </button>
                </div>

            )}

            {step === 3 && (
                <div className="form-step" id="step-3" bis_skin_checked={1}>
                    <h4>Step 3: Loan Details</h4>
                    <div className="form-group" bis_skin_checked={1}>
                        <label className="control-label" htmlFor="txtloan_amount">
                            Loan Amount
                        </label>
                        <input
                            type="number"
                            name="loanamount"
                            className="form-control"
                            id="txtloan_amount"
                            placeholder="Enter loan amount (min. ₹50,000)"
                            required=""
                            min={50000}
                            onChange={handleChange}
                            defaultValue={formData.loanamount}
                        />
                    </div>
                    <div className="form-group" bis_skin_checked={1}>
                        <label className="control-label" htmlFor="txtloan_type">
                            Loan Type
                        </label>
                        <select
                            name="loantype"
                            className="form-control"
                            id="txtloan_type"
                            required=""
                            onChange={handleChange}
                            defaultValue={formData.loantype}
                        >
                            <option value="" disabled="" selected="">
                                Select Loan Type
                            </option>
                            <option value="Personal Loan">Personal Loan</option>
                            <option value="Emergency Loan">Emergency Loan</option>
                            <option value="Business Loan">Business Loan</option>
                            <option value="Home Loan">Home Loan</option>
                            <option value="Education Loan">Education Loan</option>
                            <option value="Gold Loan">Gold Loan</option>
                            <option value="Medical Loan">Medical Loan</option>
                            <option value="Travel Loan">Travel Loan</option>
                            <option value="Wedding Loan">Wedding Loan</option>
                        </select>
                    </div>
                    <div className="form-group" bis_skin_checked={1}>
                        <label className="control-label" htmlFor="txtloan_tanure">
                            Loan Tenure
                        </label>
                        <select
                            name="tenure"
                            className="form-control"
                            id="txtloan_tanure"
                            required=""
                            onChange={handleChange}
                            defaultValue={formData.tenure}
                        >
                            <option value="" disabled="" selected="">
                                Select Loan Tenure
                            </option>
                            <option value={12}>12 Months</option>
                            <option value={24}>24 Months</option>
                            <option value={36}>36 Months</option>
                            <option value={48}>48 Months</option>
                            <option value={60}>60 Months</option>
                            <option value={72}>72 Months</option>
                            <option value={84}>84 Months</option>
                            <option value={96}>96 Months</option>
                            <option value={108}>108 Months</option>
                            <option value={120}>120 Months</option>
                        </select>
                    </div>
                    <div className="form-group" bis_skin_checked={1}>
                        <label className="control-label" htmlFor="inputPassword3">
                            EMI
                        </label>
                        <input
                            type="number"
                            name="loanemi"
                            className="form-control"
                            id="txtloan_emi"
                            placeholder="EMI"
                            readOnly=""
                            onChange={handleChange}
                            defaultValue={formData.loanemi}
                            value={formData.loanemi}
                        />
                    </div>
                    <div className="form-group" bis_skin_checked={1}>
                        {profile !== null && <label className="control-label" htmlFor="inputPassword3">
                            Intrest Rate {profile.interestrate}%
                        </label>}
                        <input
                            type="number"
                            name="loaninterest"
                            className="form-control"
                            id="txtloan_intrest"
                            placeholder="Loan Intrest"
                            readOnly=""
                            value={formData.loaninterest}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        style={{ borderRadius: 8, marginTop: 5 }}
                        onClick={prevStep}
                    >
                        Previous
                    </button>
                    <button
                        type="button"
                        className="btn btn-success"
                        style={{ width: "auto", padding: "6px 40px" }}
                        onClick={nextStep}
                    >
                        Next
                    </button>
                </div>

            )}

            {step === 4 && (
                <div className="form-step" id="step-4" bis_skin_checked={1}>
                    <h4>Step 4: Bank Details</h4>
                    <div className="form-group" bis_skin_checked={1}>
                        <label className="control-label" htmlFor="txtbank_holder">
                            Bank Holder Name
                        </label>
                        <input
                            type="text"
                            name="bankholder"
                            className="form-control"
                            id="txtbank_holder"
                            placeholder="Bank Holder Name"
                            required=""
                            onChange={handleChange}
                            defaultValue={formData.bankholder}
                        />
                    </div>
                    <div className="form-group" bis_skin_checked={1}>
                        <label className="control-label" htmlFor="inputPassword3">
                            IFSC Code
                        </label>
                        <input
                            type="text"
                            name="bankifsc"
                            className="form-control"
                            id="txtbank_ifsc"
                            placeholder="IFSC Code"
                            oninput="this.value = this.value.toUpperCase();"
                            required=""
                            onChange={handleChange}
                            defaultValue={formData.bankifsc}
                        />
                    </div>
                    <div className="form-group" bis_skin_checked={1}>
                        <label className="control-label" htmlFor="inputPassword3">
                            Bank Name
                        </label>
                        <input
                            type="text"
                            name="bankname"
                            className="form-control"
                            id="txtbank_name"
                            placeholder="Bank Name"
                            readOnly=""
                            onChange={handleChange}
                            defaultValue={formData.bankname}
                        />
                    </div>
                    <div className="form-group" bis_skin_checked={1}>
                        <label className="control-label" htmlFor="inputPassword3">
                            Bank Address
                        </label>
                        <input
                            type="text"
                            name="bankaddress"
                            className="form-control"
                            id="txtbank_address"
                            placeholder="Bank Address"
                            readOnly=""
                            onChange={handleChange}
                            defaultValue={formData.bankaddress}
                        />
                    </div>
                    <div className="form-group" bis_skin_checked={1}>
                        <label className="control-label" htmlFor="inputPassword3">
                            Bank Account Number
                        </label>
                        <input
                            type="number"
                            name="bankaccount"
                            className="form-control"
                            id="txtbank_number"
                            placeholder="Bank Account Number"
                            required=""
                            onChange={handleChange}
                            defaultValue={formData.bankaccount}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        style={{ borderRadius: 8, marginTop: 5 }}
                        onClick={prevStep}
                    >
                        Previous
                    </button>
                    <button type="submit" className="btn btn-success">
                        Submit Now
                    </button>
                </div>

            )}
        </form>
    );
};

export default MultiStepForm;
