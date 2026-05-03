// Bilingual translation system (Thai / English)

const translations = {
  th: {
    // Common
    appName: "Ploy Spa",
    loading: "กำลังโหลด...",
    save: "บันทึก",
    cancel: "ยกเลิก",
    edit: "แก้ไข",
    delete: "ลบ",
    add: "เพิ่ม",
    confirm: "ยืนยัน",
    close: "ปิด",
    back: "ย้อนกลับ",
    yes: "ใช่",
    no: "ไม่",
    optional: "(ไม่บังคับ)",
    required: "จำเป็น",
    deleteConfirm: "ยืนยันการลบ? ข้อมูลจะหายถาวร",
    saved: "บันทึกแล้ว",
    error: "เกิดข้อผิดพลาด",

    // Status
    statusReady: "พร้อมบริการ",
    statusBusy: "กำลังให้บริการ",
    statusNotReady: "ไม่พร้อม",
    statusReadyAt: "พร้อมเวลา",
    statusUnknown: "ไม่ระบุสถานะ",
    selectStatus: "เลือกสถานะ",
    setReadyAt: "ระบุเวลาที่พร้อม",
    updateStatus: "อัปเดตสถานะ",
    statusUpdated: "อัปเดตสถานะเรียบร้อย",
    lastUpdated: "อัปเดตเมื่อ",

    // Badges
    badgeTop: "Top ของร้าน",
    badgeNew: "มาใหม่",
    badgeRising: "ดาวรุ่ง",

    // Therapist fields
    therapists: "หมอนวด",
    therapist: "หมอนวด",
    code: "รหัส",
    name: "ชื่อ",
    nameTh: "ชื่อ (ไทย)",
    nameEn: "ชื่อ (English)",
    branch: "สาขา",
    branch1: "สาขา 1",
    branch2: "สาขา 2",
    allBranches: "ทุกสาขา",
    age: "อายุ",
    height: "ส่วนสูง (ซม.)",
    weight: "น้ำหนัก (กก.)",
    bust: "อก (นิ้ว)",
    waist: "เอว (นิ้ว)",
    hip: "สะโพก (นิ้ว)",
    measurements: "สัดส่วน",
    specialties: "ความถนัด",
    specialtiesPlaceholder: "เช่น นวดไทย, นวดน้ำมัน",
    note: "ข้อมูลเพิ่มเติม",
    profilePhoto: "รูปโปรไฟล์",
    galleryPhotos: "รูปเพิ่มเติม",
    reviewPhotos: "รูปรีวิวจากลูกค้า",
    badges: "ป้าย",
    active: "เปิดใช้งาน",
    inactive: "ปิดใช้งาน",
    uploadPhoto: "อัปโหลดรูป",
    addPhoto: "+ เพิ่มรูป",
    viewDetails: "ดูรายละเอียด",
    noTherapists: "ยังไม่มีหมอในระบบ",
    noTherapistsAvailable: "ขณะนี้ยังไม่มีหมอที่พร้อมให้บริการ",

    // Pages
    homeTitle: "น้องหมอของร้าน Ploy Spa",
    homeSubtitle: "ดูสถานะหมอแบบเรียลไทม์",
    bookNow: "จองคิวออนไลน์",
    adminTitle: "จัดการข้อมูลหมอ",
    adminSubtitle: "เพิ่ม / แก้ไข / ลบ ข้อมูลหมอ",
    checkinTitle: "เช็กอินพนักงาน",
    checkinSubtitle: "เลือกชื่อของคุณเพื่อเปลี่ยนสถานะ",
    checkinPickName: "เลือกชื่อของคุณ",
    checkinChooseStatus: "เลือกสถานะ",
    qrTitle: "QR Code สำหรับพนักงาน",
    qrSubtitle: "ให้พนักงานสแกนเพื่อเปลี่ยนสถานะ",
    qrPrint: "พิมพ์ QR Code",
    statusManagerTitle: "จัดการสถานะหมอ",
    statusManagerSubtitle: "ดูและแก้ไขสถานะหมอทุกคน แยกตามสาขา",
    statusManagerLink: "จัดการสถานะ",

    // Bulk actions
    selectAll: "เลือกทั้งหมด",
    deselectAll: "ยกเลิกการเลือก",
    selected: "เลือกแล้ว",
    bulkSetReady: "ตั้งเป็น พร้อมทำงาน",
    bulkSetNotReady: "ตั้งเป็น ไม่พร้อม",
    apply: "ใช้กับที่เลือก",
    clearStatus: "ล้างสถานะ",
    bulkConfirm: "ยืนยันการเปลี่ยนสถานะ",
    branchSection: "สาขา",
    therapistsCount: "หมอ",
    measurementsLabel: "สัดส่วน",

    // Detail page
    aboutTherapist: "เกี่ยวกับหมอ",
    customerReviews: "รูปรีวิวจากลูกค้า",
    photoGallery: "แกลเลอรี",
    backToList: "← กลับไปหน้ารวมหมอ",

    // Admin
    addNewTherapist: "+ เพิ่มหมอใหม่",
    editTherapist: "แก้ไขข้อมูลหมอ",
    saveTherapist: "บันทึกข้อมูล",
    photoHint: "คลิกเพื่อเลือกรูป (รองรับ JPG, PNG)",
    uploadingPhoto: "กำลังอัปโหลด...",

    // Footer/Navigation
    adminLink: "Admin",
    backToHome: "หน้าหลัก",

    // Time
    today: "วันนี้",
    yesterday: "เมื่อวาน",
    minutesAgo: "นาทีที่แล้ว",
    hoursAgo: "ชั่วโมงที่แล้ว",
    justNow: "เมื่อสักครู่",
  },
  en: {
    // Common
    appName: "Ploy Spa",
    loading: "Loading...",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    add: "Add",
    confirm: "Confirm",
    close: "Close",
    back: "Back",
    yes: "Yes",
    no: "No",
    optional: "(optional)",
    required: "Required",
    deleteConfirm: "Confirm delete? This cannot be undone.",
    saved: "Saved",
    error: "An error occurred",

    // Status
    statusReady: "Available",
    statusBusy: "In service",
    statusNotReady: "Unavailable",
    statusReadyAt: "Available at",
    statusUnknown: "Status unknown",
    selectStatus: "Select status",
    setReadyAt: "Set available time",
    updateStatus: "Update status",
    statusUpdated: "Status updated",
    lastUpdated: "Last updated",

    // Badges
    badgeTop: "Top",
    badgeNew: "New",
    badgeRising: "Rising Star",

    // Therapist fields
    therapists: "Therapists",
    therapist: "Therapist",
    code: "Code",
    name: "Name",
    nameTh: "Name (Thai)",
    nameEn: "Name (English)",
    branch: "Branch",
    branch1: "Branch 1",
    branch2: "Branch 2",
    allBranches: "All branches",
    age: "Age",
    height: "Height (cm)",
    weight: "Weight (kg)",
    bust: "Bust (in)",
    waist: "Waist (in)",
    hip: "Hip (in)",
    measurements: "Measurements",
    specialties: "Specialties",
    specialtiesPlaceholder: "e.g. Thai massage, Oil massage",
    note: "Additional info",
    profilePhoto: "Profile photo",
    galleryPhotos: "Gallery photos",
    reviewPhotos: "Customer review photos",
    badges: "Badges",
    active: "Active",
    inactive: "Inactive",
    uploadPhoto: "Upload photo",
    addPhoto: "+ Add photo",
    viewDetails: "View details",
    noTherapists: "No therapists yet",
    noTherapistsAvailable: "No therapists available right now",

    // Pages
    homeTitle: "Our Girls at Ploy Spa",
    homeSubtitle: "Real-time availability",
    bookNow: "Book Online",
    adminTitle: "Manage Therapists",
    adminSubtitle: "Add / Edit / Delete therapist information",
    checkinTitle: "Staff Check-in",
    checkinSubtitle: "Pick your name to change your status",
    checkinPickName: "Pick your name",
    checkinChooseStatus: "Choose your status",
    qrTitle: "QR Code for Staff",
    qrSubtitle: "Staff scan this to update their status",
    qrPrint: "Print QR Code",
    statusManagerTitle: "Manage Staff Status",
    statusManagerSubtitle: "View and update therapist status, grouped by branch",
    statusManagerLink: "Manage Status",

    // Bulk actions
    selectAll: "Select all",
    deselectAll: "Deselect all",
    selected: "selected",
    bulkSetReady: "Set as Available",
    bulkSetNotReady: "Set as Unavailable",
    apply: "Apply to selected",
    clearStatus: "Clear status",
    bulkConfirm: "Confirm status change",
    branchSection: "Branch",
    therapistsCount: "therapists",
    measurementsLabel: "Measurements",

    // Detail page
    aboutTherapist: "About",
    customerReviews: "Customer Reviews",
    photoGallery: "Gallery",
    backToList: "← Back to all therapists",

    // Admin
    addNewTherapist: "+ Add new therapist",
    editTherapist: "Edit therapist",
    saveTherapist: "Save",
    photoHint: "Click to choose a photo (JPG, PNG)",
    uploadingPhoto: "Uploading...",

    // Footer/Navigation
    adminLink: "Admin",
    backToHome: "Home",

    // Time
    today: "Today",
    yesterday: "Yesterday",
    minutesAgo: "min ago",
    hoursAgo: "hr ago",
    justNow: "Just now",
  },
};

const LANG_KEY = "ployspa_lang";

function getLang() {
  return localStorage.getItem(LANG_KEY) || "th";
}

function setLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
  applyTranslations();
  document.documentElement.lang = lang;
  document.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
}

function t(key) {
  const lang = getLang();
  return translations[lang][key] ?? translations.en[key] ?? key;
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    el.title = t(el.dataset.i18nTitle);
  });
}

function renderLangToggle(containerId = "lang-toggle") {
  const el = document.getElementById(containerId);
  if (!el) return;
  const lang = getLang();
  el.innerHTML = `
    <button type="button" class="text-sm font-medium px-2 py-1 rounded ${
      lang === "th" ? "bg-pink-500 text-white" : "text-gray-600 hover:bg-gray-100"
    }" data-lang="th">ไทย</button>
    <button type="button" class="text-sm font-medium px-2 py-1 rounded ${
      lang === "en" ? "bg-pink-500 text-white" : "text-gray-600 hover:bg-gray-100"
    }" data-lang="en">EN</button>
  `;
  el.querySelectorAll("button[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setLang(btn.dataset.lang);
      renderLangToggle(containerId);
    });
  });
}

function pickName(therapist) {
  const lang = getLang();
  if (lang === "en" && therapist.nameEn) return therapist.nameEn;
  return therapist.nameTh || therapist.nameEn || "—";
}

function pickBranch(branchKey) {
  if (!branchKey) return "—";
  return t(branchKey);
}

document.addEventListener("DOMContentLoaded", () => {
  applyTranslations();
  renderLangToggle();
});

export { t, getLang, setLang, applyTranslations, renderLangToggle, pickName, pickBranch };
