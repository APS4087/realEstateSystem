import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

// firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD10o1c7a1aZoqOl0fZRGMQvm1OkzMzajY",
  authDomain: "realestatesystem4087.firebaseapp.com",
  projectId: "realestatesystem4087",
  storageBucket: "realestatesystem4087.appspot.com",
  messagingSenderId: "707369772470",
  appId: "1:707369772470:web:4c96ff3a33cd25294b0d17",
  measurementId: "G-M7HQSBT1WM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
// Create a root reference
const storage = getStorage();

export { app, auth, db, storage };
