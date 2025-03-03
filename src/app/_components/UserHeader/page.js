"use client"
import { db } from "@/lib/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import useAuthenticate from "../Authenticate/page";
import { useRouter } from "next/navigation";

const UserHeader = () => {
    useAuthenticate();
    const router = useRouter();
    const [profile, setProfile] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [userId, setUserId] = useState("");

    const logOut = () => {
        localStorage.removeItem("userid");
        router.push("/user");
    }

    const fetchProfile = async () => {
        try {
            let profileRef = await getDocs(collection(db, "profile"));
            let profiles = profileRef.docs.map(doc => {
                return { id: doc.id, ...doc.data() }
            });
            setProfile(profiles[0])
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            setUserId(localStorage.getItem("userid"));
        }
        fetchProfile();
    }, []);

    return <>
        <header className="headerWrap">
            <div className="head navbar-fixed customHeader" bis_skin_checked={1}>
                <div
                    className="container-fluid customHeader-container hidden-xs"
                    bis_skin_checked={1}
                >
                    <div className="contactDetail" bis_skin_checked={1}>
                        <ul className="list-inline">
                            <li className="number">
                                {profile !== null && <a href={profile.mobile}>
                                    <img
                                        src="https://dhanifinancesonline.com/website/Images/phone-call.png"
                                        className="img-fluid"
                                    />
                                    +91-{profile.mobile}
                                </a>}
                            </li>
                            <li>
                                {profile !== null && <a href={`mailto:${profile.email}`}>
                                    <i className="fa fa-envelope" />
                                    {profile.email}
                                </a>}
                            </li>
                        </ul>
                        <div className="d-flex" bis_skin_checked={1}>
                            <div
                                className="gtranslate_wrapper languageCovertSticky"
                                style={{ display: "none", marginRight: 25 }}
                                bis_skin_checked={1}
                            ></div>
                            <ul
                                data-type="group"
                                data-dynamic-mod="true"
                                className="top-bar-social-icons list-unstyled"
                            >
                                <li>
                                    <a
                                        target="_blank"
                                        className="social-icon"
                                        href="https://www.facebook.com/"
                                    >
                                        <i className="fa-brands fa-square-facebook"></i>
                                    </a>
                                </li>
                                <li>
                                    <a target="_blank" className="social-icon" href="https://x.com/">
                                        <i className="fa-brands fa-square-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        className="social-icon"
                                        href="https://www.instagram.com//"
                                    >
                                        <i className="fa-brands fa-square-instagram"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="top-header hidden-lg" bis_skin_checked={1}>
                <div className="container" bis_skin_checked={1}>
                    <a href="https://wa.me/+91" style={{ textDecoration: "none" }}>
                        <img
                            src="https://dhanifinancesonline.com/website/Images/whatsapp-icon.webp"
                            style={{ width: 29 }}
                        />
                    </a>
                    {profile !== null && <a
                        href={`tel:+91-${profile.mobile}`}
                        style={{ color: "#fff !important", fontSize: 16 }}
                    >
                        <i className="fa fa-phone" aria-hidden="true" /> &nbsp;+91-{profile.mobile}
                    </a>}
                    <div
                        className="hidden-lg hidden-md visible-sm visible-xs"
                        bis_skin_checked={1}
                    >
                        <div
                            className="gtranslate_wrapper languageCovertSticky"
                            style={{ display: "none" }}
                            bis_skin_checked={1}
                        />
                    </div>
                </div>
            </div>
            <div className="lower-head" bis_skin_checked={1}>
                <div className="container custom-container" bis_skin_checked={1}>
                    <nav
                        className="navbar navbar-default"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%"
                        }}
                    >
                        <div className="navbar-header" bis_skin_checked={1}>
                            {/*<button type="button" class="openbtn pull-right">☰</button>*/}
                            <a
                                className="navbar-brand"
                                href={`/user/dashboard/${userId}`}
                            >
                                <img
                                    src="https://dhanifinancesonline.com/website/Images/logo.webp"
                                    className="img-responsive"
                                    alt="logo"
                                    style={{ transition: "width 2s" }}
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
                        <div
                            id="navbar"
                            className="navbar-collapse collapse"
                            bis_skin_checked={1}
                        >
                            <ul className="nav navbar-nav  navbar-right">
                                <li className="nav-item active">
                                    <a
                                        href={`/user/dashboard/${userId}`}
                                        className="nav-link"
                                    >
                                        Dashboard
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/user/transactions" className="nav-link">
                                        Transactions
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/user/re-payment" className="nav-link">
                                        Re-Payment
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        onClick={logOut}
                                        className="nav-link text-danger"
                                    >
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
            {/*----------mobile menu--------------*/}
            <div
                id="mySidebar"
                className="sidebar hidden-md hidden-lg hidden-sm show-xs"
                bis_skin_checked={1}
                style={{ width: isOpen ? 300 : 0 }}
            >
                <a onClick={() => setIsOpen(false)} className="closebtn" >
                    ×
                </a>
                <ul className="nav navbar-nav navbar-right">
                    <li className="nav-item">
                        <a
                            href={`/user/dashboard/${userId}`}
                            className="nav-link"
                        >
                            <span className="fa fa-home" /> &nbsp;Dashboard
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/user/transactions" className="nav-link">
                            <span className="fa fa-info-circle" /> &nbsp;Transactions
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/user/re-payment" className="nav-link">
                            <span className="fa fa-info-circle" /> &nbsp;Re-Payment
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            onClick={logOut}
                            className="nav-link text-danger"
                        >
                            <span className="fa fa-info-circle" /> &nbsp;Logout
                        </a>
                    </li>
                </ul>
            </div>
            {/*-end*/}
        </header>

    </>
}


export default UserHeader;