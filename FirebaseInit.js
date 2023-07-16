// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCHLTL8E-LSuYuyuu9g1cjOtb4HMBSDXWw",
    authDomain: "visualization-of-algorithm.firebaseapp.com",
    projectId: "visualization-of-algorithm",
    storageBucket: "visualization-of-algorithm.appspot.com",
    messagingSenderId: "994292716320",
    appId: "1:994292716320:web:6329867fe7d3ab6b657d45",
    measurementId: "G-JYWNJNJH69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);