import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyDWdGGkMfSjapDyOqo0nw-LFRs-q-aAYjI",

  authDomain: "movieapp-d6fde.firebaseapp.com",

  projectId: "movieapp-d6fde",

  storageBucket: "movieapp-d6fde.firebasestorage.app",

  messagingSenderId: "331176480050",

  appId: "1:331176480050:web:2abe5213bddc23af705b2b",

  measurementId: "G-C4LXK97M8K"

};


export const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);


export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
