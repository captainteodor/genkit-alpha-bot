// src/config/firebase.ts

import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || 'your-fallback-api-key',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'your-fallback-auth-domain',
  projectId: process.env.FIREBASE_PROJECT_ID || 'your-fallback-project-id',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'your-fallback-storage-bucket',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || 'your-fallback-messaging-sender-id',
  appId: process.env.FIREBASE_APP_ID || 'your-fallback-app-id',
};

let firebaseApp: FirebaseApp;

try {
  firebaseApp = initializeApp(firebaseConfig);
} catch (error) {
  console.error('Firebase initialization error:', error);
  throw new Error('Firebase initialization failed');
}

// Initialize Firebase services
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { firebaseApp, auth, database, firestore, storage };
