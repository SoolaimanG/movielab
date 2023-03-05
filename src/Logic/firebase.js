import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_7ZVW79BOv53g-a7fUdKp9qE0tReaelE",
  authDomain: "movielab-ab733.firebaseapp.com",
  projectId: "movielab-ab733",
  storageBucket: "movielab-ab733.appspot.com",
  messagingSenderId: "452010723118",
  appId: "1:452010723118:web:7faf87d3c52db9a371dcbf",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
