// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: "loginlearnexa.firebaseapp.com",
    projectId: "loginlearnexa",
    storageBucket: "loginlearnexa.firebasestorage.app",
    messagingSenderId: "6081755623",
    appId: "1:6081755623:web:1c2d3aba9c82f54e732542"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); //This line connects your project to Firebase.  Initialize app return an instance 

const auth = getAuth(app) //This line creates a Firebase Authentication object.  It connects your app to Firebase Auth service.

const provider = new GoogleAuthProvider() //This creates a Google login provider.It tell's firebase. We want to allow users to login using Google

export { auth, provider }