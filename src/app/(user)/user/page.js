"use client"
import { useRef, useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
import useAuthenticate from "@/app/_components/Authenticate/page";
import PreLoader from "@/app/_components/Loader/PreLoader";

const UserPage = () => {
    useAuthenticate();
    const userInfoRef = useRef(null);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const handleCheckStatus = async (event) => {
        event.preventDefault();
        setLoading(true);
        const inputValue = userInfoRef.current.value.trim(); // Trim whitespace
        const parsedValue = parseInt(inputValue, 10);

        if (!isNaN(parsedValue) && /^\d+$/.test(inputValue)) {
            try {
                let userQuery = query(collection(db, "queries"), where("mobile", "==", inputValue));
                let user = await getDocs(userQuery);
                user = user.docs.map(doc => {
                    return { id: doc.id, ...doc.data() }
                });
                let currentUser = user[0];
                console.log(user, "users");
                console.log(currentUser, "current user");
                if (!user.length) {
                    throw new Error("No user found")
                }
                // localStorage.setItem("userid", currentUser.id);
                console.log(currentUser.id, "Current User ID")
                router.push(`/user/dashboard/${currentUser.id}`);
                console.log("Is Phone");
            } catch (err) {
                console.log("Error in getting user!", err);
            }
        } else {
            try {
                let userQuery = query(collection(db, "queries"), where("email", "==", inputValue));
                let user = await getDocs(userQuery);
                user = user.docs.map(doc => {
                    return { id: doc.id, ...doc.data() }
                });
                let currentUser = user[0];
                console.log(user, "users");
                console.log(currentUser, "current user");
                if (!user.length) {
                    throw new Error("No user found")
                }
                localStorage.setItem("userid", currentUser.id);
                router.push(`/user/dashboard/${currentUser.id}`)
                console.log("Is Email");
            } catch (err) {
                console.log("Error in getting the user!", err);
            }
        }
    };

    useEffect(() => {
        // Create link element for CSS
        if (typeof window !== "undefined") {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "/assets/adminlte.css";
            link.id = "adminlte-css"; // Add an ID for easy reference
            document.head.appendChild(link);

            return () => {
                // Cleanup: Remove stylesheet on unmount
                document.getElementById("adminlte-css")?.remove();
            };
        }
    }, []);

    return <>
        {loading && <PreLoader />}
        <div className="login-box" bis_skin_checked={1}>
            <div className="card card-outline card-primary" bis_skin_checked={1}>
                <div className="card-header text-center" bis_skin_checked={1}>
                    <a href="index.html" className="h1">
                        <img
                            src="assets/Images/logo.webp"
                            style={{ maxWidth: 173, width: "-webkit-fill-available" }}
                            alt="logo"
                        />
                    </a>
                </div>
                <div className="card-body" bis_skin_checked={1}>
                    <p className="login-box-msg h5">User Login</p>
                    <div id="email-form-div" bis_skin_checked={1}>
                        <form
                            id="emailLoginForm"
                            noValidate="novalidate"
                            onSubmit={handleCheckStatus}
                        >
                            <input
                                type="hidden"
                                name="_token"
                                defaultValue="z6NRz97ildFeRlit5pkd5jxAXbgcrPncRbJZqnEf"
                                autoComplete="off"
                            />
                            <div className="input-group mb-3" bis_skin_checked={1}>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    placeholder="Email or Mobile"
                                    ref={userInfoRef}
                                />
                                <div className="input-group-append" bis_skin_checked={1}>
                                    <div className="input-group-text" bis_skin_checked={1}>
                                        <span className="fas fa-user" />
                                    </div>
                                </div>
                            </div>
                            <div
                                className="input-group mb-3"
                                style={{ display: "none" }}
                                bis_skin_checked={1}
                            >
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    defaultValue={1111}
                                    placeholder="Password"
                                />
                                <div className="input-group-append" bis_skin_checked={1}>
                                    <div className="input-group-text" bis_skin_checked={1}>
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="row" bis_skin_checked={1}>
                                <div className="col-12" bis_skin_checked={1}>
                                    <button type="submit" className="btn btn-primary btn-block">
                                        Chack Status
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <p className="mb-0" style={{ color: "#28a745", fontSize: 14 }}>
                        Please enter a registered email / mobile number.
                    </p>
                </div>
            </div>
        </div>

    </>
}


export default UserPage;