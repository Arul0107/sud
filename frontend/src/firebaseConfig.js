import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCxZq7sbE2t3SXzFaZDbqyf8SepKo7IMPI",
  authDomain: "notify-find.firebaseapp.com",
  projectId: "notify-find",
  storageBucket: "notify-find.firebasestorage.app",
  messagingSenderId: "432356976816",
  appId: "1:432356976816:web:060b6c184f1f359cbfb375",
  measurementId: "G-C6FP7MWR5Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Export Firebase objects
export { app, auth, provider };
