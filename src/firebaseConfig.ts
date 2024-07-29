import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwTcsDvTactruHhVqxeH_iNsNIGg75Og8",
  authDomain: "clone-4eb33.firebaseapp.com",
  projectId: "clone-4eb33",
  storageBucket: "clone-4eb33.appspot.com",
  messagingSenderId: "115713276972",
  appId: "1:115713276972:web:49877295a5833b4ac52589",
  measurementId: "G-WBDGGQZ2MF",
};

const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
