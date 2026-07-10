// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCbiYIQqsi60MxBf4bf-aGgJ_qgDI1_r3w",
    authDomain: "pgmt-shop.firebaseapp.com",
    projectId: "pgmt-shop",
    storageBucket: "pgmt-shop.firebasestorage.app",
    messagingSenderId: "772088828282",
    appId: "1:772088828282:web:9305b7fc4e1277988d46c3",
    measurementId: "G-9KF92KFGEF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
