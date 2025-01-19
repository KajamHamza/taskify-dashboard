import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
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
  // Create mock objects for Firebase services with better stream handling
  db = {
    collection: () => ({
      getDocs: async () => ({
        docs: [],
        forEach: () => {},
        // Implement a proper iterator that doesn't lock the stream
        [Symbol.asyncIterator]: async function* () {
          yield* [];
        },
        stream: () => new ReadableStream({
          start(controller) {
            controller.close();
          }
        })
      })
    })
  };
  auth = {
    currentUser: null,
    onAuthStateChanged: (callback) => {
      callback(null);
      return () => {};
    }
  };
}

export { db, auth };