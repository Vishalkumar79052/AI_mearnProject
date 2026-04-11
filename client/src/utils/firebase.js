
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewiq-72a2f.firebaseapp.com",
  projectId: "interviewiq-72a2f",
  storageBucket: "interviewiq-72a2f.firebasestorage.app",
  messagingSenderId: "382871409111",
  appId: "1:382871409111:web:b5c44d0f6f5ab112ba7b92"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export { auth , provider }