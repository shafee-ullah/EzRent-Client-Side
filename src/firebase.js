
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClrEUBKzp2TUQuxxMma6AmZ-5u7asB6nc",
  authDomain: "rzrent.firebaseapp.com",
  projectId: "rzrent",
  storageBucket: "rzrent.firebasestorage.app",
  messagingSenderId: "570672079314",
  appId: "1:570672079314:web:e4abd10b3cb52f4eff280b",
  measurementId: "G-K76H7HF9E3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
