
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
import { getFirestore, serverTimestamp } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtZ2LlNdBR7ESD1mBievoChokrVVw968U",
  authDomain: "react-chat-ef8f8.firebaseapp.com",
  projectId: "react-chat-ef8f8",
  storageBucket: "react-chat-ef8f8.appspot.com",
  messagingSenderId: "833094630995",
  appId: "1:833094630995:web:f8e1ed13de9183017b10a6",
  measurementId: "G-X6NYV01TB7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export { serverTimestamp };