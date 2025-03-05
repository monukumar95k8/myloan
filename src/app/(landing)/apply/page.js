"use client"
import { useState, useEffect } from "react";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
const ApplyPage = () => {
    const router = useRouter();
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
        status: "Loan Approved"
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    function calculateEMI() {
        let interestRate = 4.99 / 100;

        const loanAmount = parseFloat(formData.loanamount);
        const loanTenure = parseInt(formData.tenure);

        if (loanAmount && loanTenure) {
            const rateOfInterest = interestRate / 12;  // Monthly interest rate
            const tenureInMonths = loanTenure;  // Loan tenure in months

            // EMI formula: EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
            // Where:
            // P = loan amount
            // r = monthly interest rate
            // n = number of months

            const emi = (loanAmount * rateOfInterest * Math.pow(1 + rateOfInterest, tenureInMonths)) / (Math.pow(1 + rateOfInterest, tenureInMonths) - 1);
            const totalInterest = (emi * tenureInMonths) - loanAmount;  // Total interest

            // Update the EMI input field
            setFormData((prev => ({ ...prev, loanemi: emi.toFixed(2), loaninterest: totalInterest.toFixed(2) })))
            // emiInput.value = emi.toFixed(2);  // Round to 2 decimal places

            // Update the Total Interest field with the total interest calculated
            // interestRateInput.value = totalInterest.toFixed(2);  // Total interest
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let id = generateUniqueId();
            let docRef = await setDoc(doc(db, "queries", id), formData);
            console.log('Form submitted',);
            router.push(`/thank-you/${id}`)
        } catch (err) {
            console.log(err, "Error creating queries")
        }
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


    return <>
        <div className="container-fluid" bis_skin_checked={1}>
            <div className="row" bis_skin_checked={1}>
                <section className="box2 animated flipInX">
                    <div className="container" bis_skin_checked={1}>
                        <div className="" bis_skin_checked={1}>
                            <div
                                className="col-md-12 col-lg-12 col-sm-12  col-xs-12"
                                bis_skin_checked={1}
                            >
                                <ul className="list-inline">
                                    <li>
                                        <a href="index.html">Home</a> &nbsp;| &nbsp; Loan Apply Form
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <h1 className="lineHead pageHead text-center">
                    Apply now to get a Personal Loan!
                </h1>
                <section className="">
                    <div className="container" bis_skin_checked={1}>
                        <div
                            className="modal-body"
                            style={{
                                boxShadow: "0 5px 15px rgba(0, 0, 0, .5)",
                                background: "#fff",
                                borderRadius: 10
                            }}
                            bis_skin_checked={1}
                        >
                            <form
                                className="form-horizontal"
                                role="form"
                                onSubmit={handleSubmit}
                            >
                                <input
                                    type="hidden"
                                    name="_token"
                                    defaultValue="z6NRz97ildFeRlit5pkd5jxAXbgcrPncRbJZqnEf"
                                    autoComplete="off"
                                />{" "}
                                <div className="form-group" bis_skin_checked={1}>
                                    <div className="row" bis_skin_checked={1}>
                                        <div className="col-md-6 col-xs-12" bis_skin_checked={1}>
                                            <label className="control-label" htmlFor="inputEmail3">
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
                                                value={formData.name}
                                            />
                                        </div>
                                        <div className="col-md-6 col-xs-12" bis_skin_checked={1}>
                                            <label className="control-label" htmlFor="inputEmail3">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                id="txtemail"
                                                placeholder="Enter Your Email"
                                                required=""
                                                onChange={handleChange}
                                                value={formData.email}
                                            />
                                            <span id="EmailValidate" style={{ color: "red" }} />
                                        </div>
                                        <div className="col-md-6 col-xs-12" bis_skin_checked={1}>
                                            <label className="control-label" htmlFor="inputPassword3">
                                                Mobile Number
                                            </label>
                                            <input
                                                type="number"
                                                name="mobile"
                                                className="form-control"
                                                id="txtphone"
                                                placeholder="Enter Your 10-Digit Mobile Number"
                                                required=""
                                                onChange={handleChange}
                                                value={formData.mobile}
                                            />
                                        </div>
                                        <div className="col-md-6 col-xs-12" bis_skin_checked={1}>
                                            <label className="control-label" htmlFor="inputPassword3">
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
                                                value={formData.whatsapp}
                                            />
                                        </div>
                                        <div className="col-md-6 col-xs-12" bis_skin_checked={1}>
                                            <label className="control-label" htmlFor="inputPassword3">
                                                Aadhar Number
                                            </label>
                                            <input
                                                type="number"
                                                name="adhaar"
                                                className="form-control"
                                                id="txtaadhar"
                                                placeholder="Enter Your 12-Digit Aadhaar Number"
                                                required=""
                                                onChange={handleChange}
                                                title="Please enter a valid 12-digit Aadhaar number."
                                                value={formData.adhaar}
                                            />
                                        </div>
                                        <div className="col-md-6 col-xs-12" bis_skin_checked={1}>
                                            <label className="control-label" htmlFor="inputPassword3">
                                                Pan Card Number
                                            </label>
                                            <input
                                                type="text"
                                                name="PAN"
                                                className="form-control"
                                                id="txtpancard"
                                                placeholder="Enter Your PAN Card Number"
                                                required=""
                                                onChange={handleChange}
                                                minLength={10}
                                                maxLength={10}
                                                pattern="[A-Z]{5}[0-9]{4}[A-Z]"
                                                title="Please enter a valid PAN card number."
                                                value={formData.PAN}
                                            />
                                        </div>
                                        <div className="col-md-12 col-xs-12" bis_skin_checked={1}>
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
                                                title="Please enter a valid 6-digit pincode."
                                                value={formData.pincode}
                                            />
                                        </div>
                                        <div className="col-md-6 col-xs-6" bis_skin_checked={1}>
                                            <label className="control-label" htmlFor="inputPassword3">
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
                                                value={formData.district}
                                            />
                                        </div>
                                        <div className="col-md-6 col-xs-6" bis_skin_checked={1}>
                                            <label className="control-label" htmlFor="inputPassword3">
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
                                                value={formData.state}
                                            />
                                        </div>
                                        <div className="col-md-12 col-xs-12" bis_skin_checked={1}>
                                            <label className="control-label" htmlFor="inputPassword3">
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
                                                value={formData.address}
                                            />
                                        </div>
                                        <div className="col-md-12 col-xs-12" bis_skin_checked={1}>
                                            <label className="control-label" htmlFor="inputPassword3">
                                                Loan Amount
                                            </label>
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
                                                step={1}
                                                title="Please enter a loan amount of at least ₹50,000."
                                                onChange={handleChange}
                                                value={formData.loanamount}
                                            />
                                        </div>
                                        <div className="col-md-6 col-xs-6" bis_skin_checked={1}>
                                            <label className="control-label" htmlFor="txtloan_type">
                                                Loan Type
                                            </label>
                                            <select
                                                name="loantype"
                                                className="form-control"
                                                id="txtloan_type"
                                                required=""
                                                onChange={handleChange}
                                                value={formData.loantype}
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
                                        <div className="col-md-6 col-xs-6" bis_skin_checked={1}>
                                            <label className="control-label" htmlFor="txtloan_tanure">
                                                Loan Tenure
                                            </label>
                                            <select
                                                name="tenure"
                                                className="form-control"
                                                id="txtloan_tanure"
                                                required=""
                                                onChange={handleChange}
                                                value={formData.tenure}
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
                                        <div className="col-md-6 col-xs-6" bis_skin_checked={1}>
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
                                                value={formData.loanemi}
                                            />
                                        </div>
                                        <div className="col-md-6 col-xs-6" bis_skin_checked={1}>
                                            <label className="control-label" htmlFor="inputPassword3">
                                                Intrest Rate
                                            </label>
                                            <input
                                                type="number"
                                                name="loanintrest"
                                                className="form-control"
                                                id="txtloan_intrest"
                                                placeholder="Loan Intrest"
                                                readOnly=""
                                                onChange={handleChange}
                                                value={formData.loaninterest}
                                            />
                                        </div>
                                        <div className="col-md-6 col-xs-12" bis_skin_checked={1}>
                                            <label className="control-label" htmlFor="inputPassword3">
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
                                                value={formData.bankholder}
                                            />
                                        </div>
                                        <div className="col-md-6 col-xs-12" bis_skin_checked={1}>
                                            <label className="control-label" htmlFor="inputPassword3">
                                                IFSC Code
                                            </label>
                                            <input
                                                type="text"
                                                name="bankifsc"
                                                className="form-control"
                                                id="txtbank_ifsc"
                                                placeholder="IFSC Code"
                                                required=""
                                                onChange={handleChange}
                                                value={formData.bankifsc}
                                            />
                                        </div>
                                        <div className="col-md-6 col-xs-6" bis_skin_checked={1}>
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
                                                value={formData.bankname}
                                            />
                                        </div>
                                        <div className="col-md-6 col-xs-6" bis_skin_checked={1}>
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
                                                value={formData.bankaddress}
                                            />
                                        </div>
                                        <div className="col-md-12 col-xs-12" bis_skin_checked={1}>
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
                                                value={formData.bankaccount}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group" bis_skin_checked={1}>
                                    <button type="submit" className="btn btn-success text-center">
                                        Apply Now
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>

    </>
}


export default ApplyPage;