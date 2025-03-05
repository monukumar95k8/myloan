import nodemailer from "nodemailer";
import { db } from "@/lib/firebase/config";
import { getDoc, doc } from "firebase/firestore";

export async function POST(req) {
    let body = await req.json();
    let { to, name, amount, refId, tenure } = body;
    console.log(body, "BODY");

    try {

        let docRef = doc(db, "queries", refId);
        let document = await getDoc(docRef);
        document = document.data();
        console.log(document, "Document")
        const transporter = nodemailer.createTransport({
            host: 'smtpout.secureserver.net', // Correct host for Gmail
            port: 465,             // SMTP port
            secure: true,  // Use TLS
            auth: {
                user: "support@dhaniloanservice.co.in", // Your email address
                pass: "260198@Deboto"
                , // Your email password or app-specific password
            },
        });

        function calculateEMI(loanAmount, annualInterestRate, tenureInYears) {
            // Convert annual interest rate to monthly interest rate
            const monthlyInterestRate = annualInterestRate / (12 * 100);

            // Convert tenure in years to number of months
            const tenureInMonths = tenureInYears * 12;

            // Calculate EMI using the formula
            const emi = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenureInMonths) /
                (Math.pow(1 + monthlyInterestRate, tenureInMonths) - 1);

            // Return the EMI rounded to 2 decimal places
            return emi.toFixed(2);
        }

        function calculateTotalLoanAmount(loanAmount, tenure, annualInterestRate) {
            // Convert annual interest rate to monthly interest rate (in decimal)
            const monthlyInterestRate = annualInterestRate / 100 / 12;

            // Calculate the total loan amount due using the formula for compound interest
            const totalAmountDue = loanAmount * Math.pow(1 + monthlyInterestRate, tenure);

            // Round the result to two decimal places for currency format
            return totalAmountDue.toFixed(2);
        }



        let monthlyEmi = calculateEMI(parseInt(document.loanamount), 6.9, parseInt(document.tenure))

        let emailContent = `Dear ${document.name},

We have successfully received your loan request, and our team is currently reviewing your application. Below are the preliminary details of your loan request:

Loan Details:
1. Loan Amount: ₹${document.loanamount}
2. Interest Rate: 6.99% per annum
3. Tenure: ${document.tenure} Months (${document.tenure / 12} Years)
4. Total Repayment Amount: ₹${calculateTotalLoanAmount(document.loanamount), document.tenure * 12, 6.99} (including principal and interest)

Next Steps:

1. Our team will verify your submitted details and documents.
2. You will receive an update regarding your loan approval status within 2 days.
3. If approved, you will be required to complete additional formalities, including payment of processing fees (if applicable).

If you have any queries or require further assistance, feel free to contact our support team at support@dhanifl.in.

Thank you for choosing Dhani Finance Pvt Ltd. We look forward to serving you.

Warm regards,
Naveen Mahto
Relation Manager (Loan Department)
Dhani Finance Pvt Ltd
support@dhaniloanservice.co.in`

        // Define email options
        const mailOptions = {
            from: "support@dhaniloanservice.co.in", // Sender address
            to: to,// Recipient email address
            subject: `Loan Request Received – Next Steps | Dhani`, // Email subject
            text: emailContent, // Plain text body
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return new Response(JSON.stringify({ message: "Email Sent!" }), { status: 200 });
    } catch (error) {
        console.error("Error sending email:", error);
        return new Response(JSON.stringify({ message: "Error in senfing email" }), { status: 500 });
    }
}
