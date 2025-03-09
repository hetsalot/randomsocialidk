// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9rrMPA-io_Olgbe5XVvVTODaO6cSpn64",
  authDomain: "plswork-56953.firebaseapp.com",
  projectId: "plswork-56953",
  storageBucket: "plswork-56953.firebasestorage.app",
  messagingSenderId: "719156608824",
  appId: "1:719156608824:web:de2fcd6df8c2b36c41cbcd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const provider = new GoogleAuthProvider();
export const db=getFirestore(app);
