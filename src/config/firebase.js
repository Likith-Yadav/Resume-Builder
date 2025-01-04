import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZ_VQlIZvWU5Bpz6l-9ZqQjD9EA5wHF-8",
  authDomain: "resume-builder-f5072.firebaseapp.com",
  projectId: "resume-builder-f5072",
  storageBucket: "resume-builder-f5072.firebasestorage.app",
  messagingSenderId: "18655696930",
  appId: "1:18655696930:web:81a9daf8134e44d1efd27b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
