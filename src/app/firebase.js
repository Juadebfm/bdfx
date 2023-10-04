// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3UzaeOf50gRfmrR4G1Qju50WKxhMIxDo",
  authDomain: "bdfx-auth-prj.firebaseapp.com",
  projectId: "bdfx-auth-prj",
  storageBucket: "bdfx-auth-prj.appspot.com",
  messagingSenderId: "28254630358",
  appId: "1:28254630358:web:cecec31b71b2c993b2f477",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
