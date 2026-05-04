import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA2P7fs-kRtvcoiRa2crSZkuHdZGdL9pX0",
  authDomain: "site-e-blog-pilates.firebaseapp.com",
  projectId: "site-e-blog-pilates",
  storageBucket: "site-e-blog-pilates.firebasestorage.app",
  messagingSenderId: "955707689258",
  appId: "1:955707689258:web:76012e7ecf2a835ce0b653",
  measurementId: "G-900K173F3B"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
