// Import the functions you need from the SDKs you need
import { initializeApp, cert } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


const firebaseConfig = {
    apiKey: "AIzaSyAd8-8ioY9e4d4ALS9Xz1wj6cfYpPiytfI",
    authDomain: "loanapp-7dd0d.firebaseapp.com",
    projectId: "loanapp-7dd0d",
    storageBucket: "loanapp-7dd0d.firebasestorage.app",
    messagingSenderId: "469537897851",
    appId: "1:469537897851:web:45310ec7402c3d913791de",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


