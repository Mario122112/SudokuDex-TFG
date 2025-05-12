// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApmjwkc-mejsr0_OJoPpLUPQ2wsbWPdfg",
  authDomain: "sudokudex.firebaseapp.com",
  projectId: "sudokudex",
  storageBucket: "sudokudex.firebasestorage.app",
  messagingSenderId: "600743906975",
  appId: "1:600743906975:web:90fe737fcee848f8401caa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


export const db = getFirestore(app);