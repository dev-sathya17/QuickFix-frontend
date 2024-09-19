import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "quickfix-4b0d6.firebaseapp.com",
  projectId: "quickfix-4b0d6",
  storageBucket: "quickfix-4b0d6.appspot.com",
  messagingSenderId: "710343314870",
  appId: "1:710343314870:web:c7e6419624ffa67d48c517",
};

export const app = initializeApp(firebaseConfig);
