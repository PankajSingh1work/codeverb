// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG || '{}');

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const firebaseConfigExport = firebaseConfig; // Export firebaseConfig with a different name to avoid naming conflicts