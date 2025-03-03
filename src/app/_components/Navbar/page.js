"use client"

import { useState } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);


    return <>
        <header className="headerWrap">
            <div className="lower-head">
                <div className="container custom-container">
                    <nav
                        className="navbar navbar-default"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%"
                        }}
                    >
                        <div className="navbar-header">
                            {/*<button type="button" class="openbtn pull-right">☰</button>*/}
                            <a className="navbar-brand" href="index.html">
                                <img
                                    src="/assets/Images/logo.webp"
                                    className="img-responsive"
                                    alt="logo"
                                />
                            </a>
                            <a
                                data-target="#mySidebar"
                                className="hidden-lg"
                                onClick={() => setIsOpen(true)}
                            >
                                <i style={{ fontSize: 24 }} className="fa-solid fa-bars"></i>
                            </a>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse">
                            <ul className="nav navbar-nav  navbar-right">
                                <li>
                                    <a href="/">Home</a>
                                </li>
                                <li>
                                    <a href="/apply">Apply Now</a>
                                </li>
                                <li>
                                    <a href="/about-us">About Us</a>
                                </li>
                                <li>
                                    <a href="/contact-us">Contact</a>
                                </li>
                                <li>
                                    <a href="/user">Login</a>
                                </li>
                                {/*-----------Mega Menu-------------*/}
                            </ul>
                        </div>
                        {/*/.container-fluid */}
                    </nav>
                </div>
            </div>
        </header>
        <div id="mySidebar" style={{ width: isOpen ? 300 : 0 }} className="sidebar hidden-md hidden-lg hidden-sm show-xs">
            <a onClick={() => setIsOpen(false)} className="closebtn" >
                ×
            </a>
            <ul className="nav navbar-nav navbar-right">
                <li>
                    <a href="/">
                        <span className="fa fa-home" /> &nbsp;Home
                    </a>
                </li>
                <li>
                    <a href="/apply">
                        <span className="fa fa-file-text-o" /> &nbsp;Apply Now
                    </a>
                </li>
                <li>
                    <a href="/about-us">
                        <span className="fa fa-info-circle" /> &nbsp;About Us
                    </a>
                </li>
                <li>
                    <a href="/contact-us">
                        {" "}
                        <span className="fa fa-phone" /> &nbsp;Contact
                    </a>
                </li>
                <li>
                    <a href="/user">
                        {" "}
                        <span className="fa fa-user" /> &nbsp;Login
                    </a>
                </li>
                {/*-----------Mega Menu-------------*/}
            </ul>
        </div>
    </>
}


export default Navbar;