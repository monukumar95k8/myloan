import { db } from "@/lib/firebase/config";
import { collection, getDocs } from "firebase/firestore";
export async function GET(req) {
    try {
        let profileRef = await getDocs(collection(db, "profile"));
        let profiles = profileRef.docs.map(doc => {
            return { id: doc.id, ...doc.data() }
        });
        console.log(profiles, "profiles")
        let profile = profiles[0];
        return new Response(JSON.stringify({ profile: profile }), { status: 200 })

    } catch (err) {
        console.log(err);
        return new Response({ message: "Internal Server Error!" }, { status: 500 })
    }
}