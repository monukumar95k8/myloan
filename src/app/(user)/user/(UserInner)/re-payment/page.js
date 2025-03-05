import { db } from "@/lib/firebase/config";
import { collection, getDocs } from "firebase/firestore";

const RepaymentPage = async () => {
    let profile;
    let dataAvailable = false;

    try {
        let response = await fetch("http://localhost:3001/api/profile/get-profile", { next: { revalidate: 60 } });
        console.log(response, "Response");
        let jsonData = await response.json();
        console.log(jsonData.profile)
        profile = jsonData.profile;
        dataAvailable = true;
    } catch (err) {
        console.log(err);
        dataAvailable = false;
    }

    return <>
        <div className="container1" bis_skin_checked={1}>
            <section className="umrah-package">
                <div className="container" bis_skin_checked={1}>
                    <h3 className="heading">Re-Payment</h3>
                    <div className="row" bis_skin_checked={1}>
                        <div className="col-md-9" bis_skin_checked={1}>
                            <div className="card" bis_skin_checked={1}>
                                <div className="card-bottom" bis_skin_checked={1}>
                                    <div className="price-area " bis_skin_checked={1}>
                                        <h4 style={{ marginTop: 0, color: "#000", fontSize: 16 }}>
                                            Pay using NEFT/RTGS/IMPS/UPI
                                        </h4>
                                        <h4 style={{ color: "#000", fontSize: 16 }}>
                                            To complete the transactions, make NEFT/RTGS/IMPS/UPI transfer
                                            to :
                                        </h4>
                                        <h4
                                            style={{
                                                fontFamily: "Roboto !important",
                                                color: "#000000",
                                                fontSize: 14
                                            }}
                                        >
                                            <span style={{}}>Beneficiary Name : </span>{profile.accountholder}
                                        </h4>
                                        <h4
                                            style={{
                                                fontFamily: "Roboto !important",
                                                marginTop: 5,
                                                color: "#000000",
                                                fontSize: 14
                                            }}
                                        >
                                            <span style={{}}>Bank Name : </span>{profile.bankname}
                                        </h4>
                                        <h4
                                            style={{
                                                fontFamily: "Roboto !important",
                                                marginTop: 5,
                                                color: "#000000",
                                                fontSize: 14
                                            }}
                                        >
                                            <span style={{}}>IFSC : </span>{profile.bankifsc}
                                        </h4>
                                        <h4
                                            style={{
                                                fontFamily: "Roboto !important",
                                                marginTop: 5,
                                                color: "#000000",
                                                fontSize: 14
                                            }}
                                        >
                                            <span style={{}}>Account : </span>{profile.accountnumber}
                                        </h4>
                                        <h4
                                            style={{
                                                fontFamily: "Roboto !important",
                                                marginTop: 5,
                                                textTransform: "unset",
                                                color: "#000000",
                                                fontSize: 14
                                            }}
                                        >
                                            <span style={{}}>UPI Id : </span>7873697536@naviaxis
                                        </h4>
                                        <br />
                                        <a href={`https://wa.me/+91${profile.mobile}`} className="explore two">
                                            Screenshot Upload
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3" bis_skin_checked={1}>
                            <div className="card" bis_skin_checked={1}>
                                <div
                                    className="card-bottom"
                                    style={{ justifyContent: "center" }}
                                    bis_skin_checked={1}
                                >
                                    <div className="price-area " bis_skin_checked={1}>
                                        <div bis_skin_checked={1}>
                                            {/*?xml version="1.0" encoding="UTF-8"?*/}
                                            <img src={profile.qrcode} />
                                            <p
                                                style={{
                                                    textAlign: "center",
                                                    borderRadius: 3,
                                                    backgroundColor: "#3c763d"
                                                }}
                                            >
                                                <a
                                                    href="upi://pay?pa=7873697536@naviaxis"
                                                    target="_blank"
                                                    className="explore two"
                                                    style={{ backgroundColor: "transparent" }}
                                                >
                                                    Pay via UPI
                                                </a>
                                            </p>
                                        </div>
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
                    </div>
                </div>
            </section>
        </div>

    </>
}

export default RepaymentPage;