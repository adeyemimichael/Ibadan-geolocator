import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyAwYhHS5Bgy6kSJqWOgdUJuMulu821Xn84",
  authDomain: "ibadanmetrolocator.firebaseapp.com",
  projectId: "ibadanmetrolocator",
  storageBucket: "ibadanmetrolocator.firebasestorage.app",
  messagingSenderId: "878285573471",
  appId: "1:878285573471:web:3cdfa3b95e472a030a7aea",
  measurementId: "G-H7TW8GBGW8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app); // Initialize Firestore

export { auth, provider, db }; // Export db
