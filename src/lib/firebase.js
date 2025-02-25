// src/lib/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD0rEqhq80Pb1J5qavu0yygNxIpr5smUmQ",
  authDomain: "codeverb-90c94.firebaseapp.com",
  databaseURL: "https://codeverb-90c94-default-rtdb.firebaseio.com",
  projectId: "codeverb-90c94",
  storageBucket: "codeverb-90c94.firebasestorage.app",
  messagingSenderId: "988165901196",
  appId: "1:988165901196:web:5a04c9bf06776ec8f9e4a9",
  measurementId: "G-BMSH2VV89E",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const database = getDatabase(app);