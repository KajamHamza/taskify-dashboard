import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "demo-mode",
  authDomain: "demo-mode",
  projectId: "demo-mode",
  storageBucket: "demo-mode",
  messagingSenderId: "demo-mode",
  appId: "demo-mode"
};

let app;
let db;
let auth;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
} catch (error) {
  console.log('Using mock mode due to Firebase initialization error:', error);
  // Create mock objects for Firebase services
  db = {
    collection: () => ({
      getDocs: async () => ({ docs: [] })
    })
  };
  auth = {
    currentUser: null,
    onAuthStateChanged: () => {}
  };
}

export { db, auth };