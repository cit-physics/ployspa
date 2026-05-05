// Common helper functions

import {
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
} from "./firebase-config.js";
import { t, getLang } from "./i18n.js";

// --- Therapist CRUD ---

export async function listTherapists() {
  const snap = await getDocs(query(collection(db, "therapists"), orderBy("code")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export function watchTherapists(callback) {
  const q = query(collection(db, "therapists"), orderBy("code"));
  return onSnapshot(q, (snap) => {
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(list);
  });
}

export async function getTherapist(id) {
  const snap = await getDoc(doc(db, "therapists", id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function saveTherapist(id, data) {
  data.updatedAt = serverTimestamp();
  if (id) {
    await updateDoc(doc(db, "therapists", id), data);
    return id;
  }
  data.createdAt = serverTimestamp();
  const ref = await addDoc(collection(db, "therapists"), data);
  return ref.id;
}

export async function removeTherapist(id) {
  await deleteDoc(doc(db, "therapists", id));
}

// --- Status ---

export async function setStatus(therapistId, status, readyAt = null) {
  await setDoc(doc(db, "statuses", therapistId), {
    status,
    readyAt,
    updatedAt: serverTimestamp(),
  });
}

export async function clearStatus(therapistId) {
  await deleteDoc(doc(db, "statuses", therapistId));
}

export function watchStatuses(callback) {
  return onSnapshot(collection(db, "statuses"), (snap) => {
    const map = {};
    snap.docs.forEach((d) => {
      map[d.id] = d.data();
    });
    callback(map);
  });
}

// --- Code generator ---

export function generateNextCode(therapists) {
  const numbers = therapists
    .map((t) => {
      const m = (t.code || "").match(/^P(\d+)$/i);
      return m ? parseInt(m[1], 10) : null;
    })
    .filter((n) => n != null && !isNaN(n));
  const max = numbers.length ? Math.max(...numbers) : 0;
  return `P${String(max + 1).padStart(2, "0")}`;
}

// --- Measurements formatter ---

export function formatMeasurements(measurements) {
  if (!measurements) return "";
  const { bust, waist, hip } = measurements;
  if (!bust || !waist || !hip) return "";
  return `${bust}-${waist}-${hip}`;
}

// --- Photo upload ---

export async function uploadPhoto(file, pathPrefix) {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const fileName = `${Date.now()}_${safeName}`;
  const path = `${pathPrefix}/${fileName}`;
  const ref = storageRef(storage, path);
  await uploadBytes(ref, file);
  const url = await getDownloadURL(ref);
  return { url, path };
}

export async function removePhoto(path) {
  if (!path) return;
  try {
    await deleteObject(storageRef(storage, path));
  } catch (e) {
    console.warn("Failed to delete photo", path, e);
  }
}

// --- Status helpers for display ---

export function statusLabel(statusObj) {
  if (!statusObj) return { text: t("statusUnknown"), color: "gray" };
  const { status, readyAt } = statusObj;
  if (status === "ready") return { text: t("statusReady"), color: "green" };
  if (status === "ready_at" && readyAt)
    return { text: `${t("statusReadyAt")} ${readyAt}`, color: "yellow" };
  if (status === "busy")
    return { text: readyAt ? `${t("statusBusy")} ~${readyAt}` : t("statusBusy"), color: "orange" };
  if (status === "not_ready") return { text: t("statusNotReady"), color: "red" };
  if (status === "break")  return { text: "☕ พักสักครู่", color: "blue" };
  if (status === "leave")  return { text: "🏖 ลาหยุดวันนี้", color: "purple" };
  return { text: t("statusUnknown"), color: "gray" };
}

export function statusBadgeClasses(color) {
  const map = {
    green:  "bg-green-100 text-green-800 border-green-300",
    yellow: "bg-yellow-100 text-yellow-800 border-yellow-300",
    orange: "bg-orange-100 text-orange-800 border-orange-300",
    red:    "bg-red-100 text-red-800 border-red-300",
    gray:   "bg-gray-100 text-gray-600 border-gray-300",
    blue:   "bg-blue-100 text-blue-800 border-blue-300",
    purple: "bg-purple-100 text-purple-800 border-purple-300",
  };
  return map[color] || map.gray;
}

export function badgeStyle(badge) {
  const map = {
    top: "bg-yellow-400 text-yellow-900",
    new: "bg-blue-400 text-white",
    rising: "bg-purple-400 text-white",
  };
  return map[badge] || "bg-gray-200 text-gray-700";
}

export function badgeLabel(badge) {
  const map = { top: "badgeTop", new: "badgeNew", rising: "badgeRising" };
  return t(map[badge] || badge);
}

export function formatTimeAgo(ts) {
  if (!ts) return "";
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return t("justNow");
  if (diffMin < 60) return `${diffMin} ${t("minutesAgo")}`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} ${t("hoursAgo")}`;
  return date.toLocaleDateString(getLang() === "th" ? "th-TH" : "en-US");
}

export function escapeHtml(s) {
  if (s == null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function qs(name) {
  return new URLSearchParams(window.location.search).get(name);
}
