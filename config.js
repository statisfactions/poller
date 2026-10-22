// Firebase web app config. These values are public by design (they identify the project;
// database.rules.json controls what anyone can do). Paste the object from
// Firebase console → Project settings → Your apps → SDK setup and configuration.
window.POLLER_FIREBASE_CONFIG = {
    apiKey: "PASTE",
    authDomain: "PASTE.firebaseapp.com",
    databaseURL: "https://PASTE-default-rtdb.firebaseio.com",
    projectId: "PASTE",
    appId: "PASTE"
};

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAE_UtRQEgX0FnQ0IIerU5Dk9SyTtOje4o",
    authDomain: "poller-e4b28.firebaseapp.com",
    databaseURL: "https://poller-e4b28-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "poller-e4b28",
    storageBucket: "poller-e4b28.firebasestorage.app",
    messagingSenderId: "393038713692",
    appId: "1:393038713692:web:f5defcab2453f76344a799"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
