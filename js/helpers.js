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

export async function setStatus(therapistId, status, readyAt = null, bookingEndAt = null) {
  const data = {
    status,
    readyAt,
    updatedAt: serverTimestamp(),
  };
  // Only include bookingEndAt when present (used for "booked" range display)
  if (bookingEndAt) data.bookingEndAt = bookingEndAt;
  await setDoc(doc(db, "statuses", therapistId), data);
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

/**
 * Subscribe checkins collection — real-time map ของหมอที่ check-in
 * filter ฝั่ง client ด้วย isInBizWindow เพื่อรองรับ check-in ข้ามคืน
 * callback รับ map: therapistId → checkin doc
 */
export function watchCheckins(callback) {
  return onSnapshot(collection(db, "checkins"), (snap) => {
    const bizDate = getBusinessDate();
    const map = {};
    snap.docs.forEach((d) => {
      const c = d.data();
      if (isInBizWindow(c.date, c.checkInTime, bizDate)) {
        map[d.id] = c;
      }
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
// รูปแบบ: "32-26-37 / 165cm" (Format B)
//   - มีครบทั้งสัดส่วน + ส่วนสูง → "32-26-37 / 165cm"
//   - มีแค่สัดส่วน → "32-26-37"
//   - มีแค่ส่วนสูง → "165cm"
//   - ไม่มีอะไรเลย → ""
export function formatMeasurements(measurements) {
  if (!measurements) return "";
  const { bust, waist, hip, height } = measurements;
  const bwh = (bust && waist && hip) ? `${bust}-${waist}-${hip}` : "";
  const h = height ? `${height}cm` : "";
  if (bwh && h) return `${bwh} / ${h}`;
  return bwh || h;
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
  const { status, readyAt, bookingEndAt } = statusObj;
  if (status === "ready") return { text: t("statusReady"), color: "green" };
  if (status === "ready_at" && readyAt)
    return { text: `${t("statusReadyAt")} ${readyAt}`, color: "yellow" };
  if (status === "busy") {
    if (readyAt) {
      const suffix = getLang() === "th" ? " น." : "";
      return { text: `🔴 ${t("statusBusyUntil")} ${readyAt}${suffix}`, color: "orange" };
    }
    return { text: `🔴 ${t("statusBusy")}`, color: "orange" };
  }
  if (status === "booked") {
    // Show range "17:00-18:00" if bookingEndAt is set, otherwise just start time
    const timeText = readyAt && bookingEndAt
      ? `${readyAt}-${bookingEndAt}`
      : (readyAt || "");
    return {
      text: timeText ? `📅 ${t("statusBooked")} ${timeText}` : `📅 ${t("statusBooked")}`,
      color: "indigo",
    };
  }
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
    indigo: "bg-indigo-100 text-indigo-800 border-indigo-300",
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

// =========================================================
// BUSINESS DAY HELPERS
// =========================================================
// ร้านเปิด 08:00 ถึง 06:00 ของวันถัดไป — 1 รอบทำงาน = biz-day X
// boundary ที่ตกลง: 06:00 — ก่อนหน้านั้น "วันนี้" = เมื่อวาน, ตั้งแต่ 06:00 = วันนี้
// (ครอบช่วง 06:00–08:00 ก่อนเปิดร้านให้ตรงกับ mental model ของผู้ใช้)

/** business-day "วันนี้" รูปแบบ "YYYY-MM-DD" (Thai TZ + boundary 06:00) */
export function getBusinessDate() {
  const now = new Date();
  // Thai +7h, then -6h for boundary 06:00 → net +1h
  const shifted = new Date(now.getTime() + 7 * 60 * 60 * 1000 - 6 * 60 * 60 * 1000);
  return shifted.toISOString().split("T")[0];
}

/** เลื่อนวันที่ (YYYY-MM-DD) ทีละวัน */
export function shiftDate(dateStr, deltaDays) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + deltaDays);
  return dt.toISOString().split("T")[0];
}

/**
 * เช็คว่า item (date+time) อยู่ใน business-day window หรือไม่
 * biz-day X = (calendar X, ทุกเวลา) ∪ (calendar X+1, time < 06:00)
 * ครอบคลุม session ที่เริ่มข้ามคืนและจบในเช้ามืดวันถัดไป
 *
 * itemTime = null/empty → ถือว่าไม่อยู่ใน window ของ X+1 (ต้องมีเวลาถึงจะรวมเข้ามาได้)
 */
export function isInBizWindow(itemDate, itemTime, bizDate) {
  if (itemDate === bizDate) return true;
  const next = shiftDate(bizDate, 1);
  if (itemDate === next) {
    if (!itemTime) return false;
    return itemTime < "06:00";
  }
  return false;
}

// =========================================================
// READY_AT AUTO-PROMOTE
// =========================================================
// When a therapist's status is "ready_at HH:MM" and the wall-clock
// time passes HH:MM, promote them to "ready" automatically.
// Pages that subscribe to statuses should call startReadyAtMonitor
// once, passing a getter that returns the current statuses map.
// The monitor only writes when it finds an actually-expired ready_at,
// so even with multiple browsers open the cost stays close to one
// write per expiry.

function currentThaiHHMM() {
  const now = new Date();
  const offset = 7 * 60; // UTC+7
  const thai = new Date(now.getTime() + offset * 60000);
  const h = String(thai.getUTCHours()).padStart(2, "0");
  const m = String(thai.getUTCMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}

let _readyAtMonitorTimer = null;
export function startReadyAtMonitor(getStatusesMap) {
  if (_readyAtMonitorTimer) clearInterval(_readyAtMonitorTimer);
  const tick = async () => {
    const map = (typeof getStatusesMap === "function" ? getStatusesMap() : null) || {};
    const nowHHMM = currentThaiHHMM();
    for (const [id, s] of Object.entries(map)) {
      if (s?.status === "ready_at" && s?.readyAt && s.readyAt <= nowHHMM) {
        try {
          await setStatus(id, "ready");
        } catch (e) {
          console.warn("[ReadyAtMonitor] auto-promote failed", id, e.message);
        }
      }
    }
  };
  tick();
  _readyAtMonitorTimer = setInterval(tick, 30000);
}
