import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {initializeAuth } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDO3MocxWbzj54KBMJlqBxAYro5PVImNIM",
  authDomain: "trackmate-d3f71.firebaseapp.com",
  projectId: "trackmate-d3f71",
  storageBucket: "trackmate-d3f71.appspot.com",
  messagingSenderId: "587487657681",
  appId: "1:587487657681:web:b2c604076667acf50a4ff0",
  measurementId: "G-EQ07WJBH4T"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const firebaseStorage = getStorage(app);
const auth = initializeAuth(app);

export { firestore, firebaseStorage, auth };