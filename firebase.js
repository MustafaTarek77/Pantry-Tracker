// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGqOi9_DNuPexJAVbtvFtCvi8D6K-bpWs",
  authDomain: "inventory-management-8d4cd.firebaseapp.com",
  projectId: "inventory-management-8d4cd",
  storageBucket: "inventory-management-8d4cd.appspot.com",
  messagingSenderId: "890342616333",
  appId: "1:890342616333:web:bfb9c4a0951ce3d2319444",
  measurementId: "G-0LVBEF8ZWW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export { firestore };
