// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNg6UCfnJUsbQgzBQ7SpsIbdHFxw1fWBQ",
  authDomain: "expense-tracker-cc057.firebaseapp.com",
  projectId: "expense-tracker-cc057",
  storageBucket: "expense-tracker-cc057.appspot.com",
  messagingSenderId: "885842511766",
  appId: "1:885842511766:web:f5608cdf570960085affb7",
  measurementId: "G-CFZ2VG71L1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);