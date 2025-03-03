import { db } from "@/lib/firebase/config";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

const UserDashboard = async ({ params }) => {

    let { id } = await params;
    let docSnap;
    let profile;
    let dataAvailable = false;
    let statusObj = [
        { title: "Under Process", message: "Your Personal Loan is under process!" },
        { title: "Loan Approved", message: "Your Personal Loan is approved!" },
        { title: "Pay Processing", message: "Your Personal Loan is approved, pay your processing fee!" }
    ]



    try {
        let docRef = doc(db, "queries", id);
        docSnap = await getDoc(docRef);
        docSnap = docSnap.data();
        if (typeof docSnap == "undefined") {
            dataAvailable = false
        } else {
            dataAvailable = true;
        }
        console.log(docSnap, "Doc Snap")
    } catch (err) {
        console.log(err, "Error");
        dataAvailable = false;
    }


    try {
        let profileRef = await getDocs(collection(db, "profile"));
        let profiles = profileRef.docs.map(doc => {
            return { id: doc.id, ...doc.data() }
        });
        if (!profiles.length) {
            dataAvailable = false;
        } else {
            dataAvailable = true;
        }
        profile = profiles[0];
    } catch (err) {
        console.log(err, "Fetching profile error!");
        dataAvailable = false;
    }

    const formatAmount = (amount) => {
        return amount.toLocaleString("en-IN"); // Change locale as needed
    };


    return <>
        {dataAvailable && <div className="container1" bis_skin_checked={1}>
            <style
                dangerouslySetInnerHTML={{
                    __html:
                        "\n    .umrah-package .card .card-bottom .price-area h4 {\n    color: #06323a;\n    }\n   .blink-text {\n    animation: blink-animation 2.5s infinite;\n}\n\n@keyframes blink-animation {\n    0% {\n        opacity: 1;\n    }\n    80% {\n        opacity: 1;\n    }\n    100% {\n        opacity: 0;\n    }\n}\n#exampleModalLong2 {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    display: none;\n}\n"
                }}
            />
            {/* Modal 1 */}
            <div
                className="modal fade bd-example-modal-sm offer-popup"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                id="exampleModalLong"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalLongTitle"
                bis_skin_checked={1}
            >
                <div className="modal-dialog modal-sm" role="document" bis_skin_checked={1}>
                    <div bis_skin_checked={1}>
                        <div className="modal-content" bis_skin_checked={1}>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span>X</span>
                            </button>
                            <div
                                className="modal-body"
                                style={{ padding: 0 }}
                                bis_skin_checked={1}
                            >
                                <div
                                    style={{
                                        width: 320,
                                        height: 380,
                                        background: "linear-gradient(45deg, #fe9f1b, #ffffff, #003d42)"
                                    }}
                                    bis_skin_checked={1}
                                />
                                <div
                                    className="contact"
                                    style={{ display: "flow", bottom: 150, right: 18, top: 20 }}
                                    bis_skin_checked={1}
                                >
                                    <h2
                                        style={{
                                            textAlign: "center",
                                            fontWeight: "bold",
                                            marginBottom: 40
                                        }}
                                    >
                                        Please Confirm Your Account Details
                                    </h2>
                                    <p>
                                        <span style={{ fontWeight: 700, color: "#000" }}>
                                            Bank Name :{" "}
                                        </span>
                                        {docSnap?.bankname}
                                    </p>
                                    <p>
                                        <span style={{ fontWeight: 700, color: "#000" }}>
                                            Account No. :{" "}
                                        </span>
                                        {docSnap?.bankaccount}
                                    </p>
                                    <p>
                                        <span style={{ fontWeight: 700, color: "#000" }}>
                                            IFSC Code :{" "}
                                        </span>
                                        SBIN0013350
                                    </p>
                                    <p>
                                        <span style={{ fontWeight: 700, color: "#000" }}>
                                            Bank Address :{" "}
                                        </span>
                                        DILLA COMPLEX,MAIN ROAD HEBRI,DIST UDUPI 576112
                                    </p>
                                </div>
                                {/* Button to Open Modal 2 */}
                                <a
                                    className="book-btn"
                                    id="banner-btn"
                                    data-toggle="modal"
                                    data-target="#exampleModalLong2"
                                    style={{
                                        bottom: 20,
                                        fontSize: 16,
                                        left: 0,
                                        width: "90%",
                                        background: "#fe9f1b",
                                        border: "1px solid #fff"
                                    }}
                                >
                                    Withdraw Your Loan Amount
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal 2 */}
            <div
                className="modal fade bd-example-modal-sm offer-popup"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                id="exampleModalLong2"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalLongTitle"
                bis_skin_checked={1}
            >
                <div className="modal-dialog modal-sm" role="document" bis_skin_checked={1}>
                    <div bis_skin_checked={1}>
                        <div className="modal-content" bis_skin_checked={1}>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span>X</span>
                            </button>
                            <div
                                className="modal-body"
                                style={{ padding: 0 }}
                                bis_skin_checked={1}
                            >
                                <div
                                    style={{
                                        height: 970,
                                        background: "linear-gradient(45deg, #fe9f1b, #ffffff, #003d42)"
                                    }}
                                    bis_skin_checked={1}
                                />
                                <div
                                    className="contact"
                                    style={{ display: "flow", bottom: 150, right: 18, top: 20 }}
                                    bis_skin_checked={1}
                                >
                                    <h2
                                        style={{
                                            textAlign: "center",
                                            fontWeight: "bold",
                                            marginBottom: 20
                                        }}
                                    >
                                        Kindly pay processing fee 1999/-
                                    </h2>
                                    <p
                                        style={{
                                            lineHeight: 20,
                                            fontSize: "14px !important",
                                            color: "#000"
                                        }}
                                    >
                                        Dear Test TEst,
                                        <br />
                                        Your application for Personal Loan and loan amount Rs. 50,000.00
                                        be approved by Dhani Finance Pvt Ltd. your Intrerest Rate 4.99%
                                        annually for tenure 36 Months.
                                    </p>
                                    <p
                                        style={{
                                            lineHeight: 20,
                                            fontSize: "14px !important",
                                            color: "#000"
                                        }}
                                    >
                                        Kindly pay processing fee 1999/-, after 30 Minutes Your Loan
                                        Amount Will be Transferred to your account.
                                    </p>
                                    <h3>Account Details :</h3>
                                    <p style={{ margin: 0 }}>
                                        <b>Account Holder Name : </b>Dhani finance private limited
                                    </p>
                                    <p style={{ margin: 0 }}>
                                        <b>Account Number : </b>1834200100022010
                                    </p>
                                    <p style={{ margin: 0 }}>
                                        <b>Account Type : </b>Current Account
                                    </p>
                                    <p style={{ margin: 0 }}>
                                        <b>IFSC : </b>PUNB0183420
                                    </p>
                                    <p style={{ margin: 0 }}>
                                        <b>Bank Name : </b>Punjab National Bank
                                    </p>
                                    <p
                                        style={{
                                            textAlign: "center",
                                            borderRadius: 3,
                                            backgroundColor: "#3c763d",
                                            width: "50%"
                                        }}
                                    >
                                        <a
                                            href="upi://pay?pa=7873697536@naviaxis"
                                            target="_blank"
                                            className="explore two"
                                            style={{ backgroundColor: "transparent", color: "#fff" }}
                                        >
                                            Pay via UPI
                                        </a>
                                    </p>
                                    <p
                                        style={{
                                            color: "#000",
                                            lineHeight: 18,
                                            fontSize: "14px !important"
                                        }}
                                    >
                                        <b>
                                            Payment Mode: You can make payment through IMPS/UPI/Net
                                            Banking.
                                        </b>
                                    </p>
                                    <p
                                        style={{
                                            textAlign: "center",
                                            borderRadius: 3,
                                            backgroundColor: "#3c763d"
                                        }}
                                    >
                                        <a
                                            href="https://wa.me/+918695754521"
                                            className="explore two"
                                            style={{ backgroundColor: "transparent", color: "#fff" }}
                                        >
                                            Screenshot Upload
                                        </a>
                                    </p>
                                    <ul
                                        style={{
                                            paddingLeft: 10,
                                            lineHeight: 20,
                                            fontSize: 14,
                                            fontWeight: 400
                                        }}
                                    >
                                        <b style={{ color: "#000" }}>Note:</b>
                                        <li>
                                            Loan Amount will be deposited to your account within 30
                                            Minutes after submission of processing fee
                                        </li>
                                        <li>
                                            Cash Deposit are not allowed as per company rule and
                                            regulations.
                                        </li>
                                        <li>Processing Fee is Refundable</li>
                                        <li>
                                            This approval is only valid for 24 Hours For More Information
                                            Visit https://dhanifinancesonline.com/ Mail Us at
                                            support@dhanifinancesonline.com
                                        </li>
                                    </ul>
                                </div>
                                <a
                                    className="book-btn"
                                    type="button"
                                    data-dismiss="modal"
                                    style={{
                                        bottom: 20,
                                        fontSize: 16,
                                        left: 0,
                                        width: "90%",
                                        background: "#fe9f1b",
                                        border: "1px solid #fff"
                                    }}
                                >
                                    Close
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="umrah-package">
                <div className="container" bis_skin_checked={1}>
                    <h3 className="heading">Dashboard</h3>
                    <div className="row" bis_skin_checked={1}>
                        <div className="col-md-12" bis_skin_checked={1}>
                            <div
                                className="card"
                                style={{
                                    background: "linear-gradient(45deg, #fe9f1b, #ffffff, #003d42)"
                                }}
                                bis_skin_checked={1}
                            >
                                <div className="card-bottom" bis_skin_checked={1}>
                                    <div
                                        className="price-area"
                                        style={{ width: "100%" }}
                                        bis_skin_checked={1}
                                    >
                                        <h4 style={{ marginTop: 0, color: "#000", fontSize: 25 }}>
                                            Customer Details
                                        </h4>
                                        <h4 style={{ marginTop: 0 }}>
                                            {" "}
                                            <span style={{ color: "#000" }}>Name : {docSnap?.name}</span>
                                        </h4>
                                        <h4 style={{ marginTop: 0 }}>
                                            {" "}
                                            <span style={{ color: "#000" }}>Mobile No. : {docSnap?.mobile}</span>
                                        </h4>
                                        <h4 style={{ marginTop: 0 }}>
                                            {" "}
                                            <span style={{ color: "#000" }}>Email : {docSnap?.email}</span>
                                        </h4>
                                        <h4 style={{ marginTop: 0 }}>
                                            {" "}
                                            <span style={{ color: "#000" }}>
                                                Aadhar No. : {docSnap?.adhaar}
                                            </span>
                                        </h4>
                                        <h4 style={{ marginTop: 0 }}>
                                            {" "}
                                            <span style={{ color: "#000" }}>Pancard : {docSnap?.PAN}</span>
                                        </h4>
                                    </div>
                                </div>
                                <div
                                    className="card-bottom"
                                    style={{ borderTop: "2px solid rgb(255 255 255)" }}
                                    bis_skin_checked={1}
                                >
                                    <div
                                        className="price-area"
                                        style={{ width: "100%", textAlign: "center" }}
                                        bis_skin_checked={1}
                                    >
                                        <h4 style={{ color: "#000", fontSize: 30 }}>
                                            APPROVED LOAN AMOUNT
                                        </h4>
                                        <h4 style={{ marginTop: 0 }}>
                                            {" "}
                                            <span style={{ color: "#000" }}>
                                                This is Aadhaar Based Loan Approval
                                            </span>
                                        </h4>
                                        <h4 style={{ marginTop: 0 }}>
                                            {" "}
                                            <span style={{ color: "#000" }}>₹ : {formatAmount(parseInt(docSnap?.loanamount))}</span>
                                        </h4>
                                        <h4 style={{ marginTop: 0 }}>
                                            {" "}
                                            <span style={{ color: "#000" }}>Tenure : {docSnap?.tenure} Months</span>
                                        </h4>
                                        <h4 style={{ marginTop: 0 }}>
                                            {" "}
                                            <span style={{ color: "#000" }}>ROI Per Annum {profile.interestrate}%</span>
                                        </h4>
                                        <h4 style={{ marginTop: 0 }}>
                                            {" "}
                                            <span style={{ color: "#000" }}>EMI : ₹ {formatAmount(parseInt(docSnap.loanemi))}</span>
                                        </h4>
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*<h1>Welcome, Test TEst!</h1>

      <h3>Your Enquiry Details:</h3>
              <ul>
          <li><strong>Mobile:</strong> 1234562563</li>
          <li><strong>Email:</strong> test@gmail.com</li>
          <li><strong>Aadhar:</strong> 123456985236</li>
          <li><strong>Pancard:</strong> DRJPA7740E</li>
          <li><strong>Loan Amount:</strong> ₹50,000.00</li>
          <li><strong>Loan Type:</strong> Personal Loan</li>
          <li><strong>Loan Tenure:</strong> 36 months</li>
          <li><strong>Loan EMI:</strong> ₹1,498.32</li>

      </ul>
      */}
                        <div className="col-md-4" style={{ marginTop: 15 }} bis_skin_checked={1}>
                            <div
                                className="card"
                                style={{ background: "#eaeeff" }}
                                bis_skin_checked={1}
                            >
                                <div className="card-bottom" bis_skin_checked={1}>
                                    <div className="price-area" bis_skin_checked={1}>
                                        <h4 style={{ marginTop: 0 }}>
                                            {" "}
                                            <span>Loan Status</span>
                                        </h4>
                                    </div>
                                </div>
                                <div className="card-bottom" bis_skin_checked={1}>
                                    <div
                                        className="price-area"
                                        style={{ width: "100%" }}
                                        bis_skin_checked={1}
                                    >
                                        <h4 style={{ fontSize: 16, margin: 0 }}>
                                            Your Personal Loan in under process!
                                        </h4>
                                        <br />
                                        <h4
                                            className="blink-text"
                                            style={{ fontSize: 18, margin: 0, color: "red" }}
                                        >
                                            Our support team will contact you soon.
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4" style={{ marginTop: 15 }} bis_skin_checked={1}>
                            <div
                                className="card"
                                style={{ background: "#46aba64a" }}
                                bis_skin_checked={1}
                            >
                                <div className="card-bottom" bis_skin_checked={1}>
                                    <div className="price-area" bis_skin_checked={1}>
                                        <h4 style={{ marginTop: 0 }}>
                                            {" "}
                                            <span>Loan Details</span>
                                        </h4>
                                    </div>
                                </div>
                                <div className="card-bottom" bis_skin_checked={1}>
                                    <div className="price-area" bis_skin_checked={1}>
                                        <h4 style={{ fontSize: 16, margin: 0 }}>
                                            <span>Amount : </span> ₹ {formatAmount(parseInt(docSnap.loanamount))}/-
                                        </h4>
                                        <h4 style={{ fontSize: 16, margin: 0 }}>
                                            <span>Monthly EMI : </span> ₹ {formatAmount(parseInt(docSnap.loanemi))}/-
                                        </h4>
                                        <h4 style={{ fontSize: 16, margin: 0 }}>
                                            <span>Tenure : </span> {docSnap.tenure} Months
                                        </h4>
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4" style={{ marginTop: 15 }} bis_skin_checked={1}>
                            <div
                                className="card"
                                style={{ background: "#d3f5cf" }}
                                bis_skin_checked={1}
                            >
                                <div className="card-bottom" bis_skin_checked={1}>
                                    <div className="price-area" bis_skin_checked={1}>
                                        <h4 style={{ marginTop: 0 }}>
                                            {" "}
                                            <span>Re-Payment</span>
                                        </h4>
                                    </div>
                                </div>
                                <div className="card-bottom" bis_skin_checked={1}>
                                    <div className="price-area" bis_skin_checked={1}>
                                        <a href="/user/re-payment" className="explore two">
                                            Re-Payment
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>}

        {!dataAvailable && <h2>Data Not Available</h2>}
    </>
}




export default UserDashboard;