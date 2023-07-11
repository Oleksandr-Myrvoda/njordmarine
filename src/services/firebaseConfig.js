// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import { getStorage } from 'firebase/storage'; // npm install firebase

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'API_KEY',
  authDomain: 'AUTH_DAMAIN',
  databaseURL: 'DATABASE_URL',
  projectId: 'PROJECT_ID',
  storageBucket: 'STORAGE_BUCKET',
  messagingSenderId: 'MESSAGING_SENDER_ID',
  appId: 'APP_ID',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase storage reference
const storage = getStorage(app);
export default storage;
