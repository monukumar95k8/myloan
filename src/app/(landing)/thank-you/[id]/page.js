"use client"

import { db } from "@/lib/firebase/config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ThankYou = () => {
    const [profile, setProfile] = useState(null);
    const params = useParams();
    console.log("Customer ID", params.id)
    const fetchProfile = async () => {
        let profileRef = await getDocs(collection(db, "profile"));
        let profiles = profileRef.docs.map(doc => {
            return { id: doc.id, ...doc.data() }
        });
        let docRef = await getDoc(doc(db, "queries", params.id));
        let docSnap = docRef.data();
        console.log(docRef, "Document Ref");
        setProfile(profiles[0]);

        setTimeout(function () {
            let phoneNumber = profiles[0].mobile;
            let message = `Hi Team,
        I am applying for a Personal Loan
        Please find attached detailes
        Name: ${docSnap.name},
        Mobile: ${docSnap.mobile},
        Email: ${docSnap.email},
        Aadhar: ${docSnap.adhaar}
        Pancard: ${docSnap.PAN},
        Address: ${docSnap.address}, ${docSnap.city}, ${docSnap.state},
        Bank Name: ${docSnap.bankname},
        Account Number: ${docSnap.bankaccount},
        IFSC : ${docSnap.bankifsc},
        Loan Amount: ${docSnap.loanamount},
        Tenure : ${docSnap.tenure} Months
        Regards`;
            var whatsappUrl = "https://wa.me/+91" + phoneNumber + "?text=" + encodeURIComponent(message);
            window.location.href = whatsappUrl;
            // Open the WhatsApp URL in a new tab
            // window.open(whatsappUrl, '_blank');
        }, 1000)
    }

    useEffect(() => {
        fetchProfile();

    })

    return <>
        <div className="customModal" style={{}} bis_skin_checked={1}>
            <img src="Images/tick-mark.png" className="img-responsive" />
            <h3 style={{}}>Thank You!</h3>
            <h6 style={{}}>
                <i>Your form was successfully submitted!</i>
            </h6>
            <p>
                Our representative will get in touch with you within 24
                hours.Visit our website https://indiabullsdhanifinance.org.in/ to get
                detailed information.
            </p>
            {profile !== null && <p>
                For further inquiries,{" "}
                {profile !== null && <a href={`tel:+91-${profile.mobile}`}>
                    <i className="fa fa-phone" aria-hidden="true" />
                </a>}{" "}
                or
                <a
                    className="callWhatsapp"
                    href={`https://api.whatsapp.com/send/?phone=91${profile.mobile}&text&type=phone_number&app_absent=0`}
                >
                    <i className="fa fa-whatsapp" aria-hidden="true" />
                </a>
                on {profile.mobile}
            </p>}
            <a className="btnBacktohome" href="/">
                Back To Home
            </a>
        </div>


    </>
}


export default ThankYou;