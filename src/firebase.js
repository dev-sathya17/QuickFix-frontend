import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "urbanroots-e9b98.firebaseapp.com",
  projectId: "urbanroots-e9b98",
  storageBucket: "urbanroots-e9b98.appspot.com",
  messagingSenderId: "211462859560",
  appId: "1:211462859560:web:bd5916c7dbe4cb3bb7fe1d",
  measurementId: "G-1DJP8M4HVN",
};

export const app = initializeApp(firebaseConfig);
