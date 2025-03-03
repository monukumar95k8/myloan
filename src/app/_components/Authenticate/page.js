"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";


const useAuthenticate = () => {
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            if (typeof window !== "undefined") {
                const userId = localStorage.getItem("userid");
                if (!userId) {
                    router.push("/user"); // Redirect if no user ID
                    return;
                }

                if (window.location.pathname == "/user" && userId) {
                    router.push(`/user/dashboard/${userId}`);
                    return
                }



                // try {
                //     const userDoc = await getDoc(doc(db, "queries", userId));
                //     if (!userDoc.exists()) {
                //         router.push("/user"); // Redirect if user is invalid
                //     }
                // } catch (error) {
                //     console.error("Error checking user:", error);
                //     router.push("/user");
                // }
            }
        };

        checkAuth();
    }, [router]);
};

export default useAuthenticate;
