// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCN-1JrAtDp3dMdRhPmbnTtUlP75GLrXTk",
    authDomain: "driveaid-38361.firebaseapp.com",
    projectId: "driveaid-38361",
    storageBucket: "driveaid-38361.appspot.com",
    messagingSenderId: "359538064303",
    appId: "1:359538064303:web:5c55823b68a6d661f48d5a",
    measurementId: "G-C2H6D3S797"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)