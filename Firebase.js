import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8ACa8sUKFHys8KEperGduBiCEhA1gb2U",
  authDomain: "ramosrank-uc.firebaseapp.com",
  projectId: "ramosrank-uc",
  storageBucket: "ramosrank-uc.firebasestorage.app",
  messagingSenderId: "230088740203",
  appId: "1:230088740203:web:7e95b50465e35a8900102e",
  measurementId: "G-CG2XGRJ7W8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };