// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpO04PhyVfrXle38Y2Pw9sh-0qIKfrJik",
  authDomain: "fir-cd21f.firebaseapp.com",
  projectId: "fir-cd21f",
  storageBucket: "fir-cd21f.firebasestorage.app",
  messagingSenderId: "1005541435993",
  appId: "1:1005541435993:web:ed025daac2b72761a15f48",
  measurementId: "G-XQLSNJZ5EL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export default db