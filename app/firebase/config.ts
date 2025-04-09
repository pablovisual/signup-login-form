// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2MTxF7hSk8OzlRztms1tI6kMaYUXF0h0",
  authDomain: "fir-auth-76d54.firebaseapp.com",
  projectId: "fir-auth-76d54",
  storageBucket: "fir-auth-76d54.firebasestorage.app",
  messagingSenderId: "811532863304",
  appId: "1:811532863304:web:755a6fafcb6754faf8557d"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

export { app, auth }; 