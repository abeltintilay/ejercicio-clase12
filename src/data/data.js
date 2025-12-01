/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsQdnE-qwnGvpD6VYWyZPzmyNlAKIPo40",
  authDomain: "backent-abel2.firebaseapp.com",
  projectId: "backent-abel2",
  storageBucket: "backent-abel2.firebasestorage.app",
  messagingSenderId: "586969821468",
  appId: "1:586969821468:web:0f652df2f11af511af4ad9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
*/


import 'dotenv/config';
  
import { initializeApp } from "firebase/app";
  import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: "backent-abel2",
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: "586969821468",
        appId: process.env.FIREBASE_APP_ID
 };



  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Firestore
  const db = getFirestore(app);

  export { db };