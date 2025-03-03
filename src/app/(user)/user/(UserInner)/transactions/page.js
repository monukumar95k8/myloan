import Authenticate from "@/app/_components/Authenticate/page";

const TransactionsPage = () => {
    return <>
        {/* <Authenticate /> */}
        <div className="container1" bis_skin_checked={1}>
            <section className="umrah-package">
                <div className="container" bis_skin_checked={1}>
                    <h3 className="heading">Transactions</h3>
                    <div className="row" bis_skin_checked={1}>
                        <hr />
                        <div className="col-md-12" bis_skin_checked={1}>
                            <div
                                className="card"
                                style={{ boxShadow: "none", border: "none" }}
                                bis_skin_checked={1}
                            >
                                <div
                                    className="card-bottom"
                                    style={{
                                        justifyContent: "center",
                                        borderTop: "none",
                                        alignItems: "center",
                                        margin: "58px 0"
                                    }}
                                    bis_skin_checked={1}
                                >
                                    <div className="price-area" bis_skin_checked={1}>
                                        <h4 style={{ marginTop: 0, color: "#999" }}>
                                            no transaction found
                                        </h4>
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

export default TransactionsPage;