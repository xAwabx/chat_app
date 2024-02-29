// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB3QGQ47u2fRhkqVq9hrnNQGf1ZrlHk4N4",
  authDomain: "chatapp-nextjs-413506.firebaseapp.com",
  projectId: "chatapp-nextjs-413506",
  storageBucket: "chatapp-nextjs-413506.appspot.com",
  messagingSenderId: "620025066506",
  appId: "1:620025066506:web:29c3e325d78b9ce3c5dbf3",
  measurementId: "G-KQC8899FRE",
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export { provider, auth };
