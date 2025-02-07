// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLRZ1EmAiguCwgsbSdoU_J0LUK4nMhkoc",
  authDomain: "bookulus-2f6d4.firebaseapp.com",
  projectId: "bookulus-2f6d4",
  storageBucket: "bookulus-2f6d4.firebasestorage.app",
  messagingSenderId: "282114089842",
  appId: "1:282114089842:web:8d96dbac9ddc0429da33eb",
  measurementId: "G-Z5SY6W5B33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});