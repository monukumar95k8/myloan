import { db } from "@/lib/firebase/config";
import { collection, getDocs } from "firebase/firestore";

const Footer = async () => {
    let profile;
    try {
        let profileRef = await getDocs(collection(db, "profile"));
        let profiles = profileRef.docs.map(doc => {
            return { id: doc.id, ...doc.data() }
        });
        profile = profiles[0];
    } catch (err) {
        console.log("Error in loading profile: ", err);
    }
    return <>
        <footer style={{ marginTop: 35 }}>
            <div
                className="col-xs-12 text-center inner-footer"
                style={{
                    background: "#fe9f1b",
                    marginTop: "-35px",
                    marginBottom: 34,
                    padding: "34px 8px"
                }}
                bis_skin_checked={1}
            >
                <p style={{ fontSize: "12px !important", padding: 5 }}>
                    Starting interest rate varies on factors like credit history, obligation,
                    or lender. Subject to the necessary KYC and Income Verification. T&amp;C
                    apply.
                </p>
                <p style={{ fontSize: "12px !important", padding: 5 }}>
                    Annual Percentage Rate offered to the customer during the period of 02nd
                    Oct 2022 To 31st Mar 2023.
                </p>
                <p style={{ fontSize: "12px !important", padding: 5 }}>
                    Min APR - 4.99%. Max APR - 11%. Repayment schedule: Min - 12 months &amp;
                    Max - 240 Months.^T&amp;C apply
                </p>
                <p style={{ fontSize: "12px !important", padding: 5 }}>
                    Example: On a personal loan of Rs. 1 lakh at rate of 8% per annum, for a
                    tenure of 24 months, the EMI amount will be Rs.4,523
                </p>
            </div>
            <div className="container" bis_skin_checked={1}>
                <div className="row" bis_skin_checked={1}>
                    <div className="col-md-4 col-sm-4 col-lg-4 col-xs-6" bis_skin_checked={1}>
                        <h3>Quick Link</h3>
                        <ul className="list-unstyled footerlist">
                            <li>
                                <a href="/">
                                    <i className="fa fa-angle-double-right" />
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/apply">
                                    <i className="fa fa-angle-double-right" />
                                    Apply Now
                                </a>
                            </li>
                            <li>
                                <a href="/about-us">
                                    <i className="fa fa-angle-double-right" />
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="/contact-us">
                                    <i className="fa fa-angle-double-right" />
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="emi-calculator.html">
                                    <i className="fa fa-angle-double-right" />
                                    Loan Emi Calculator
                                </a>
                            </li>
                            <li>
                                <a href="fees-and-charges.html">
                                    <i className="fa fa-angle-double-right" />
                                    Fees And Charges
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4 col-sm-4 col-lg-4 col-xs-6" bis_skin_checked={1}>
                        <h3>Other Links</h3>
                        <div className="footerFlex" bis_skin_checked={1}>
                            <ul className="list-unstyled footerlist">
                                <li>
                                    <a href="faq.html">
                                        <i className="fa fa-angle-double-right" />
                                        FAQ
                                    </a>
                                </li>
                                <li>
                                    <a href="documentation.html">
                                        <i className="fa fa-angle-double-right" />
                                        Documents Required
                                    </a>
                                </li>
                                <li>
                                    <a href="privacy-policy.html">
                                        <i className="fa fa-angle-double-right" />
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="terms-and-conditions.html">
                                        <i className="fa fa-angle-double-right" />
                                        Terms &amp; Conditions
                                    </a>
                                </li>
                                <li>
                                    <a href="terms-and-use.html">
                                        <i className="fa fa-angle-double-right" />
                                        Terms of Use
                                    </a>
                                </li>
                                <li>
                                    <a href="refund-policy.html">
                                        <i className="fa fa-angle-double-right" />
                                        Refund Policy
                                    </a>
                                </li>
                                {/* <li><a href="/"><i class="fa fa-angle-double-right"></i>Perform</a></li>*/}
                            </ul>
                        </div>
                    </div>
                    <div
                        className="col-md-4 col-sm-4 col-lg-4 col-xs-12"
                        bis_skin_checked={1}
                    >
                        <h3>Support</h3>
                        <ul className="list-unstyled footerlist">
                            <li>
                                <a href="mailto: support@dhanifinancesonline.com">
                                    {" "}
                                    {profile.email}
                                </a>
                            </li>
                            <li>
                                <a href={`tel:+91${profile.mobile}`}> +91-{profile.mobile}</a>
                            </li>
                            <li>
                                <a>
                                    {" "}
                                    {profile.address}
                                </a>
                            </li>
                        </ul>
                        <ul className="list-inline social">
                            <li>
                                <a href="https://www.facebook.com/" target="_blank">
                                    <i className="fa fa-facebook" aria-hidden="true" />
                                </a>
                            </li>
                            <li>
                                <a href="https://x.com/" target="_blank">
                                    <i className="fa fa-twitter" aria-hidden="true" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div
                className="col-xs-12 text-center inner-footer"
                style={{ background: "#000000" }}
                bis_skin_checked={1}
            >
                <p style={{ fontSize: "12px !important" }} className="">
                    <strong>Disclaimer : </strong>Dhani Finance is a loan aggregator and is
                    authorized to provide services on behalf of its partners.
                </p>
            </div>
        </footer>

    </>
}

export default Footer;