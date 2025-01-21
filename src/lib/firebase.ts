/* eslint-disable @typescript-eslint/no-explicit-any */
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage'; // Add this import

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET, // Ensure this is set in your .env file
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase only once
let app;
let db;
let auth;
let storage; // Add this variable

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  storage = getStorage(app); // Initialize Firebase Storage
} catch (error) {
  console.error('Error initializing Firebase:', error);
}

// Helper functions for Firestore operations
export const createDocument = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error;
  }
};

export const getDocuments = async <T = any>(
  collectionName: string
): Promise<(T & { id: string })[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as (T & { id: string })[]; // Cast to the expected type
  } catch (error) {
    console.error('Error getting documents: ', error);
    throw error;
  }
};

export const updateDocument = async (
  collectionName: string,
  docId: string,
  data: any
) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
    return true;
  } catch (error) {
    console.error('Error updating document: ', error);
    throw error;
  }
};

export const deleteDocument = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting document: ', error);
    throw error;
  }
};

// Export Firebase services
export { db, auth, storage }; // Add storage to the exports