import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBPPBteZXu7uFjJ1NiSu4Au-xJkOM7xGNI",
  authDomain: "aspl-fc898.firebaseapp.com",
  projectId: "aspl-fc898",
  storageBucket: "aspl-fc898.firebasestorage.app",
  messagingSenderId: "903301961772",
  appId: "1:903301961772:web:542052da7f532667849989",
  measurementId: "G-91K1DPM9HY"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
