// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth/cordova";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkz7GAMm4sk-tei0BaJv5iYM3ShajneYs",
  authDomain: "quickcarrent-2f4f0.firebaseapp.com",
  projectId: "quickcarrent-2f4f0",
  storageBucket: "quickcarrent-2f4f0.appspot.com",
  messagingSenderId: "523691953664",
  appId: "1:523691953664:web:b65f654a849c320d89d2e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();