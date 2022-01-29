import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBO_-Km8lNLs-nTS0NRpwEFAfccHLjjpMo",
  authDomain: "essaywriter-aeb40.firebaseapp.com",
  projectId: "essaywriter-aeb40",
  storageBucket: "essaywriter-aeb40.appspot.com",
  messagingSenderId: "813865549867",
  appId: "1:813865549867:web:4be59c1b75041602f5aa6e",
  measurementId: "G-1S0EBYSHS9"
};

export var uid;

// Initialize Firebase
export function initFirebase() {
    const app = initializeApp(firebaseConfig);
    console.log('Firebase initialized');

    // Sign In
    const auth = getAuth(app);
    signInAnonymously(auth)
    .then(() => {
        console.log('User signed in anonymously');
        logEvent(analytics, 'login');
    });
    onAuthStateChanged(auth, (user) => {
      if (user) {
        uid = user.uid;
      }
    });

    // Initialize Analytics
    const analytics = getAnalytics(app);
    console.log('Firebase analytics initialized');
}