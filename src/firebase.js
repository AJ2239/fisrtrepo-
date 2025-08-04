import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDeqZtCYyhm54GYcoP8RfcmNocNWjyU8no",
  authDomain: "student-record-759bd.firebaseapp.com",
  projectId: "student-record-759bd",
  // storageBucket: "student-record-759bd.firebasestorage.app",
  storageBucket: "student-record-759bd.appspot.com",
  messagingSenderId: "451682750839",
  appId: "1:451682750839:web:62b7abb71cfd0d59931172"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export { db };