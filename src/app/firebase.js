// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOEn9FrdYKqKWS7lW5Ge400TJ4rUMJEUg",
  authDomain: "piket-margaasih.firebaseapp.com",
  projectId: "piket-margaasih",
  storageBucket: "piket-margaasih.appspot.com",
  messagingSenderId: "116471111976",
  appId: "1:116471111976:web:744291c3925737778ff01d",
  measurementId: "G-5LFVT54Z1M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
