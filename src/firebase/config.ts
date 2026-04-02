// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// You can get these values from Firebase Console
const firebaseConfig = {
   apiKey: "AIzaSyBD7Z8QZijP4s3MLfgiqSPm_BwM7cBARMA",
  authDomain: "sirajfoods-476a5.firebaseapp.com",
  projectId: "sirajfoods-476a5",
  storageBucket: "sirajfoods-476a5.firebasestorage.app",
  messagingSenderId: "713655663024",
  appId: "1:713655663024:web:2c30bd96f5acc35eb63e75",
  measurementId: "G-DGBRTXJT8B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;