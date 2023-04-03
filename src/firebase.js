// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase} from "firebase/database";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4y_Ku1jlpEEme00JgLBQ_z8OlJ7_sPrU",
  authDomain: "pocket-71bd9.firebaseapp.com",
  databaseURL: "https://pocket-71bd9-default-rtdb.firebaseio.com",
  projectId: "pocket-71bd9",
  storageBucket: "pocket-71bd9.appspot.com",
  messagingSenderId: "507295040718",
  appId: "1:507295040718:web:65e5d498db6d4e869a3c9f",
  measurementId: "G-JGXSB0QF3R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const database = getDatabase(app);
export default app;