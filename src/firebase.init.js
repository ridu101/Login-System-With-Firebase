// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrO96_Omq6IPOA31abfAaq99oXzOkf0tM",
  authDomain: "email-password-auth-b5c0d.firebaseapp.com",
  projectId: "email-password-auth-b5c0d",
  storageBucket: "email-password-auth-b5c0d.firebasestorage.app",
  messagingSenderId: "577205712944",
  appId: "1:577205712944:web:f3c2d52c99da54735c95f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);