// Firebase configuration for Ploy Spa
// Note: Web API keys are public-safe. Security is enforced via Firestore rules.

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDurdts9-ClzDA_Jatm5UgiGMudUtVeK6s",
  authDomain: "ployspa-a0329.firebaseapp.com",
  projectId: "ployspa-a0329",
  storageBucket: "ployspa-a0329.firebasestorage.app",
  messagingSenderId: "49791158639",
  appId: "1:49791158639:web:b3a22b7edb96a6bb9c009a",
  measurementId: "G-2MZ9MBXM2B",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  db,
  storage,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
};
