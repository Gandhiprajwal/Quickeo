// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_FX8_fegJ2wWPOG91cuE_rZ8cb0blSqs",
  authDomain: "voom-dd50b.firebaseapp.com",
  projectId: "voom-dd50b",
  storageBucket: "voom-dd50b.appspot.com",
  messagingSenderId: "86314075926",
  appId: "1:86314075926:web:922f8ae42e2588d4da3237",
  measurementId: "G-RQQ6MKM8MR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
// const analytics = getAnalytics(app);