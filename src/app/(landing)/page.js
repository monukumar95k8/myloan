
import Image from "next/image";
import styles from "./page.module.css";
import MultiStepForm from "../_components/loanform/page";


export default function Home() {
  return <>
    <>



      {/* Main Banner */}
      <section className="main-banner">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img
                src="assets/Images/main-banner.png"
                alt=""
                className="main-banner-img banner-content"
                style={{ width: "100%" }}
              />
            </div>
            <div className="col-md-6">
              <div className="banner-content">
                <span>Welcome To Dhani Finance</span>
                <h1>Get Personal Loan of up to ₹25 Lakhs</h1>
                <div
                  className="modal-body"
                  style={{
                    boxShadow: "0 5px 15px rgba(0, 0, 0, .5)",
                    background: "#fff",
                    borderRadius: 10
                  }}
                >
                  <MultiStepForm />

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 help-you text-white" style={{ padding: "20px 0" }}>
        <div className="container">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-4">
            <div className="w-full text-center col-md-3 col-xs-6">
              <h1 className=" font-bold">120K</h1>
              <h4 className="text-lg font-light" style={{ fontSize: 16 }}>
                Loans Taken
              </h4>
            </div>
            <div className="w-full text-center col-md-3 col-xs-6">
              <h1 className=" font-bold">7+</h1>
              <h4 className="text-lg font-light" style={{ fontSize: 16 }}>
                Experience
              </h4>
            </div>
            <div className="w-full text-center col-md-3 col-xs-6">
              <h1 className=" font-bold">75+</h1>
              <h4 className="text-lg font-light" style={{ fontSize: 16 }}>
                Business Partner
              </h4>
            </div>
            <div className="w-full text-center col-md-3 col-xs-6">
              <h1 className=" font-bold">100%</h1>
              <h4 className="text-lg font-light" style={{ fontSize: 16 }}>
                Happy Clients
              </h4>
            </div>
          </div>
        </div>
      </section>
      <section className="about-umrah">
        <div className="container">
          <div className="about">
            <div className="row">
              <div className="col-md-6" style={{ position: "relative" }}>
                <img
                  src="/assets/Images/umrah-package/about.jpg"
                  alt=""
                  width="100%"
                  className="about-img"
                />
                <img
                  src="/assets/Images/umrah-package/bg.png"
                  alt=""
                  className="bg-img"
                />
              </div>
              <div className="col-md-6">
                <h3 className="heading">You can apply</h3>
                <ul className="list-unstyled">
                  <li>
                    <i
                      className="fa fa-check"
                      aria-hidden="true"
                      style={{ marginRight: 5 }}
                    />
                    If you are an Indian citizen above 18 years of age
                  </li>
                  <li>
                    <i
                      className="fa fa-check"
                      aria-hidden="true"
                      style={{ marginRight: 5 }}
                    />
                    If you have a valid current address proof
                  </li>
                  <li>
                    <i
                      className="fa fa-check"
                      aria-hidden="true"
                      style={{ marginRight: 5 }}
                    />
                    If you have a bank account with internet banking facility
                  </li>
                  <li>
                    <i
                      className="fa fa-check"
                      aria-hidden="true"
                      style={{ marginRight: 5 }}
                    />
                    Annual Percentage Rate offered to the customer during the period
                    of 02nd Oct 2022 To 31st Mar 2023
                  </li>
                  <li>
                    <i
                      className="fa fa-check"
                      aria-hidden="true"
                      style={{ marginRight: 5 }}
                    />
                    Min APR - 4.99%. Max APR - 11%. Repayment schedule: Min - 12
                    months &amp; Max - 240 Months.^T&amp;C apply
                  </li>
                  <li>
                    <i
                      className="fa fa-check"
                      aria-hidden="true"
                      style={{ marginRight: 5 }}
                    />
                    Example: On a personal loan of Rs. 1 lakh at rate of 8% per
                    annum, for a tenure of 24 months, the EMI amount will be Rs.4,
                    523
                  </li>
                  <li>
                    <i
                      className="fa fa-check"
                      aria-hidden="true"
                      style={{ marginRight: 5 }}
                    />
                    List of documents required for loan approval{" "}
                    <a href="documentation.html">
                      <b>Check List</b>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="help-you" style={{ position: "relative" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="content-box">
                <h3 className="heading">Here’s What you get from us</h3>
                <p>
                  Our seasoned professionals and up-to-date working practices ensure
                  fast-processed services that effectively help you achieve your
                  goals. We assist you through.
                </p>
                <div className="row">
                  <div className="col-md-6 col-xs-6">
                    <h4 style={{ fontSize: 16 }}>Profile Analysis</h4>
                    <h6 style={{ fontSize: 16 }}>
                      Thorough inspection of Financial profile to understand client
                      needs
                    </h6>
                  </div>
                  <div className="col-md-6 col-xs-6">
                    <h4 style={{ fontSize: 16 }}>Loan Approval</h4>
                    <h6 style={{ fontSize: 16 }}>
                      Our partnership with reputed banks offers a greater chance of
                      approval.
                    </h6>
                  </div>
                  <div className="col-md-6 col-xs-6">
                    <h4 style={{ fontSize: 16 }}>Hassle-Free Processing</h4>
                    <h6 style={{ fontSize: 16 }}>
                      Rest assured with our Streamlined and reliable processing
                      methods
                    </h6>
                  </div>
                  <div className="col-md-6 col-xs-6">
                    <h4 style={{ fontSize: 16 }}>Expert Guidance</h4>
                    <h6 style={{ fontSize: 16 }}>
                      Transparent and Best financial advice to match your needs
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <img
                src="/assets/Images/umrah-package/loan-approved.png"
                alt=""
                className="help-img"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="why-choose-us">
        <div className="container">
          <h3 className="heading">Your Gateway To Strategic Business Loans</h3>
          <div className="row">
            <div className="col-md-4 col-xs-6 no-padding-xs">
              <div className="card" style={{ border: "1px solid #fe9f1b" }}>
                <div className="icon">
                  <img
                    src="/assets/512/1102/1102686.png"
                    alt=""
                  />
                </div>
                <h4>Personal Loan</h4>
                <p>
                  A personal loan is an amount of money you can borrow to use for a
                  variety of purposes.{" "}
                </p>
              </div>
            </div>
            <div className="col-md-4 col-xs-6 no-padding-xs">
              <div className="card">
                <div className="icon">
                  <img
                    src="/assets/512/2417/2417668.png"
                    alt=""
                  />
                </div>
                <h4>Home Loan</h4>
                <p>
                  Loan advanced to a person to assist in buying a house or flat.{" "}
                </p>
              </div>
            </div>
            <div className="col-md-4 col-xs-6 no-padding-xs">
              <div className="card" style={{ border: "1px solid #fe9f1b" }}>
                <div className="icon">
                  <img
                    src="/assets/512/639/639394.png"
                    alt=""
                  />
                </div>
                <h4>Business loan</h4>
                <p>
                  A business loan is a financial arrangement that provides
                  businesses with funds to meet their financial needs.{" "}
                </p>
              </div>
            </div>
            <div className="col-md-4 col-xs-6 no-padding-xs">
              <div className="card">
                <div className="icon">
                  <img
                    src="/assets/512/10799/10799112.png"
                    alt=""
                  />
                </div>
                <h4>Education Loan</h4>
                <p>
                  An education loan is a sum of money borrowed to pay for higher
                  education{" "}
                </p>
              </div>
            </div>
            <div className="col-md-4 col-xs-6 no-padding-xs">
              <div className="card" style={{ border: "1px solid #fe9f1b" }}>
                <div className="icon">
                  <img
                    src="/assets/512/12885/12885326.png"
                    alt=""
                  />
                </div>
                <h4>Secured loans</h4>
                <p>
                  Secured loans are business or personal loans that require some
                  type of collateral as a condition of borrowing.{" "}
                </p>
              </div>
            </div>
            <div className="col-md-4 col-xs-6 no-padding-xs">
              <div className="card">
                <div className="icon">
                  <img
                    src="/assets/512/9699/9699813.png"
                    alt=""
                  />
                </div>
                <h4>Loan Against Property</h4>
                <p>
                  Home renovations, Business expansions, Investments, Debt
                  consolidation, Education expenses, and Medical emergencies.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      &lt; !-- Why choose us Section End--&gt;&lt; !-- apply for Loan Section --&gt;
      <section className="why-choose-us">
        <div className="container">
          <h3 className="heading">How to apply for Loan</h3>
          <div className="row">
            <div className="col-md-3 col-xs-6 no-padding-xs">
              <div className="card">
                <div className="icon">
                  <img src="assets/Images/loan1.svg" alt="" />
                </div>
                <h4>Step : 1</h4>
                <p>Select Loan Type </p>
              </div>
            </div>
            <div className="col-md-3 col-xs-6 no-padding-xs">
              <div className="card">
                <div className="icon">
                  <img src="assets/Images/loan2.svg" alt="" />
                </div>
                <h4>Step : 2</h4>
                <p>Fill Basic Details </p>
              </div>
            </div>
            <div className="col-md-3 col-xs-6 no-padding-xs">
              <div className="card">
                <div className="icon">
                  <img src="assets/Images/loan3.svg" alt="" />
                </div>
                <h4>Step : 3</h4>
                <p>We'll get to you within 1 hour</p>
              </div>
            </div>
            <div className="col-md-3 col-xs-6 no-padding-xs">
              <div className="card">
                <div className="icon">
                  <img src="assets/Images/loan4.svg" alt="" />
                </div>
                <h4>Step : 4</h4>
                <p>Loan Approval </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="why-choose-us">
        <div className="container">
          <h3 className="heading">Features of Dhani Finance</h3>
          <div className="row">
            <div className="col-md-3 col-xs-6 no-padding-xs">
              <div className="card" style={{ border: "1px solid #fe9f1b" }}>
                <div className="icon">
                  <img src="assets/Images/features1.svg" alt="" />
                </div>
                <h4>Minimum Documentation</h4>
              </div>
            </div>
            <div className="col-md-3 col-xs-6 no-padding-xs">
              <div className="card" style={{ border: "1px solid #fe9f1b" }}>
                <div className="icon">
                  <img src="assets/Images/features2.svg" alt="" />
                </div>
                <h4>Faster Approval</h4>
              </div>
            </div>
            <div className="col-md-3 col-xs-6 no-padding-xs">
              <div className="card" style={{ border: "1px solid #fe9f1b" }}>
                <div className="icon">
                  <img src="assets/Images/features3.svg" alt="" />
                </div>
                <h4>100% Online Process</h4>
              </div>
            </div>
            <div className="col-md-3 col-xs-6 no-padding-xs">
              <div className="card" style={{ border: "1px solid #fe9f1b" }}>
                <div className="icon">
                  <img src="/assets/Images/features4.svg" alt="" />
                </div>
                <h4>Loan up to Rs 25 Lacs</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
      &lt; !-- End Features Section --&gt;&lt; !-- Review Section --&gt;
      <section className="review">
        <div className="container">
          <h3 className="heading">What our Customers are saying</h3>
          <div className="owl-carousel owl-theme review-carousel">
            <div className="item">
              <div className="card">
                <div className="rating">
                  <i className="bx bxs-star" />
                  <i className="bx bxs-star" />
                  <i className="bx bxs-star" />
                  <i className="bx bxs-star" />
                  <i className="bx bxs-star" />
                </div>
                <p>
                  <i className="bx bxs-quote-alt-left" />I applied for this loan
                  yesterday afternoon. Today morning at 10:00 AM received my loan
                  amount. So Fast process and Good quality.
                  <i className="bx bxs-quote-alt-right" />
                </p>
                <h4 className="reviewer-name">Jyoti Rastogi</h4>
              </div>
            </div>
            <div className="item">
              <div className="card">
                <div className="rating">
                  <i className="bx bxs-star" />
                  <i className="bx bxs-star" />
                  <i className="bx bxs-star" />
                  <i className="bx bxs-star" />
                  <i className="bx bxs-star" />
                </div>
                <p>
                  <i className="bx bxs-quote-alt-left" />I am extremely happy with
                  the service and quick money transfer.
                  <i className="bx bxs-quote-alt-right" />
                </p>
                <h4 className="reviewer-name">Mohit Jain</h4>
              </div>
            </div>
            <div className="item">
              <div className="card">
                <div className="rating">
                  <i className="bx bxs-star" />
                  <i className="bx bxs-star" />
                  <i className="bx bxs-star" />
                  <i className="bx bxs-star" />
                  <i className="bx bxs-star" />
                </div>
                <p>
                  <i className="bx bxs-quote-alt-left" />
                  Thanks to Dhani Finance loan, I achieved financial freedom to
                  kickstart my business venture. Their unparalleled professionalism
                  and unwavering support were instrumental in realizing my
                  entrepreneurial dreams. Highly recommended !
                  <i className="bx bxs-quote-alt-right" />
                </p>
                <h4 className="reviewer-name">Shariq Ibrahim</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* &lt; !-- Review Section End --&gt; */}


      <footer style={{ marginTop: 35 }}>
        <div
          className="col-xs-12 text-center inner-footer"
          style={{
            background: "#fe9f1b",
            marginTop: "-35px",
            marginBottom: 34,
            padding: "34px 8px"
          }}
        >
          <p style={{ fontSize: "12px !important", padding: 5 }}>
            Starting interest rate varies on factors like credit history,
            obligation, or lender. Subject to the necessary KYC and Income
            Verification. T&amp;C apply.
          </p>
          <p style={{ fontSize: "12px !important", padding: 5 }}>
            Annual Percentage Rate offered to the customer during the period of 02nd
            Oct 2022 To 31st Mar 2023.
          </p>
          <p style={{ fontSize: "12px !important", padding: 5 }}>
            Min APR - 4.99%. Max APR - 11%. Repayment schedule: Min - 12 months
            &amp; Max - 240 Months.^T&amp;C apply
          </p>
          <p style={{ fontSize: "12px !important", padding: 5 }}>
            Example: On a personal loan of Rs. 1 lakh at rate of 8% per annum, for a
            tenure of 24 months, the EMI amount will be Rs.4,523
          </p>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-4 col-lg-4 col-xs-6">
              <h3>Quick Link</h3>
              <ul className="list-unstyled footerlist">
                <li>
                  <a href="index.html">
                    <i className="fa fa-angle-double-right" />
                    Home
                  </a>
                </li>
                <li>
                  <a href="apply.html">
                    <i className="fa fa-angle-double-right" />
                    Apply Now
                  </a>
                </li>
                <li>
                  <a href="about-us.html">
                    <i className="fa fa-angle-double-right" />
                    About Us
                  </a>
                </li>
                <li>
                  <a href="contact-us.html">
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
            <div className="col-md-4 col-sm-4 col-lg-4 col-xs-6">
              <h3>Other Links</h3>
              <div className="footerFlex">
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
            <div className="col-md-4 col-sm-4 col-lg-4 col-xs-12">
              <h3>Support</h3>
              <ul className="list-unstyled footerlist">
                <li>
                  <a href="mailto: support@dhanifinancesonline.com">
                    support@dhanifinancesonline.com
                  </a>
                </li>
                <li>
                  <a href="tel:+918695754521"> +91-8695754521</a>
                </li>
                <li>
                  <a>
                    {" "}
                    D 114, 1st Floor, Eastern Business District, off Lal Bahadur
                    Shastri Marg, Ganesh Nagar, Bhandup West, Mumbai, Maharashtra
                    (400078)
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
        >
          <p style={{ fontSize: "12px !important", lineHeight: 15 }} className="">
            <strong>Disclaimer : </strong>Dhani Finance is a loan aggregator and is
            authorized to provide services on behalf of its partners.
          </p>
        </div>
      </footer>
      {/*-------fixed Contect----------*/}
      {/* Rquest a call modal */}
    </>

  </>
}
