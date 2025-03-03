import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../_components/Navbar/page";
import Sidebar from "../_components/Sidebar/page";
import Footer from "../_components/Footer/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dhani Finance PVT LTD",
  description: "Dhani Personal Loan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/assets/animate.css" />
        <link rel="stylesheet" href="/assets/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/newstyle.css" />
        <link rel="stylesheet" href="/assets/responsive.css" />
        <link rel="stylesheet" href="/assets/style.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" crossOrigin="anonymous" referrerPolicy="no-referrer" />

      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* Modal */}
        <Navbar />
        {/*----------mobile menu--------------*/}
        {/*-end*/}
        {children}
        <Footer />
      </body>
    </html>
  );
}
