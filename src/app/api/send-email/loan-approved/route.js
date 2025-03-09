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

        let monthlyEmi = calculateEMI(parseInt(document.loanamount), 6.9, parseInt(document.tenure))

        let emailContent = `Dear ${document.name},

        We are pleased to inform you that your loan application has been successfully approved. Below are the details of your loan:

        Loan Details:

        Loan Amount: ₹${document.loanamount}
        Interest Rate: 6.99% per annum
        Tenure: ${document.tenure} Months (${document.tenure / 12} Years)
        EMI: ₹${monthlyEmi}
        Loan Reference ID: ${refId}
        To proceed with the disbursement of your loan, we kindly request you to pay the following charges:

        Processing Fee: ₹${document.processingFee}
        Insurance Fee: ₹${document.insuranceFee}
        Steps to Complete the Process:
        Log in to your account on our [portal/app link].
        Navigate to the "Pending Actions" section.
        Pay the required fees using any of the available payment options.
        Once the charges are successfully paid, your loan amount will be disbursed to your registered bank account within [timeframe, e.g., 2-3 working days].

        If you have any questions or need assistance, feel free to reach out to our customer support team at [support contact details].

        Thank you for choosing Dhani Finance Pvt Ltd as your trusted financial partner.

        Warm regards,
        Naveen Mahto
        Relation Manager (Loan Department)
        Dhani Finance Pvt Ltd
        support@dhaniloanservice.co.in
`

        // Define email options
        const mailOptions = {
            from: "support@dhaniloanservice.co.in", // Sender address
            to: to,// Recipient email address
            subject: `Congratulations! Your Loan Has Been Approved at Dhani finance ltd.`, // Email subject
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
