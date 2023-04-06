import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "movielab-ab733.firebaseapp.com",
  projectId: "movielab-ab733",
  storageBucket: "movielab-ab733.appspot.com",
  messagingSenderId: "452010723118",
  appId: "1:452010723118:web:7faf87d3c52db9a371dcbf",
};

console.log(process.env);

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
