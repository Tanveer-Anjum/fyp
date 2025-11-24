// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCRA-7BA_TvQOWej-_Gm7X4mvVxClG_nk",
  authDomain: "bazzario-9a368.firebaseapp.com",
  projectId: "bazzario-9a368",
  storageBucket: "bazzario-9a368.appspot.com",
  messagingSenderId: "889487485412",
  appId: "1:889487485412:web:bd82126437994cc976bff1",
  measurementId: "G-L3K497JNJQ"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
