// Authentication helper for admin pages

import {
  auth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "./firebase-config.js";

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

export function onAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

export function currentUser() {
  return auth.currentUser;
}

// Guard: redirect to login.html if not authenticated.
// Returns a Promise that resolves with the user (or never resolves if redirected).
export function requireAuth() {
  return new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, (user) => {
      unsub();
      if (!user) {
        const next = encodeURIComponent(location.pathname + location.search);
        location.replace(`login.html?next=${next}`);
      } else {
        resolve(user);
      }
    });
  });
}
