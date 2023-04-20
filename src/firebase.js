// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArAoa0otKk1AvP6UFi-nIOrhvVz20p_oI",
  authDomain: "pocket-pt2.firebaseapp.com",
  projectId: "pocket-pt2",
  storageBucket: "pocket-pt2.appspot.com",
  messagingSenderId: "1069225398984",
  appId: "1:1069225398984:web:33f88f20fd34b11f1e0bfd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);

export default app;
