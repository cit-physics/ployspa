// Time input helper — แทนที่ <input type="time"> ของ HTML5 ที่แสดงตาม
// OS locale (en-US → "10:15 PM" / th-TH → "22:15") ด้วย <input type="text">
// บังคับรูปแบบ 24-hour "HH:MM" สม่ำเสมอทุก OS/browser
//
// วิธีใช้:
//   <input type="text" id="f-start" />
//   import { attachTimeFormatter } from "./js/time-input.js";
//   attachTimeFormatter(document.getElementById("f-start"));
//
// พฤติกรรม:
//   - พิมพ์ตัวเลข 4 ตัว → auto-insert ":" หลังตัวที่ 2 (2215 → 22:15)
//   - Backspace ลบทีละตัว ใช้งานปกติ
//   - blur → ถ้ารูปแบบผิด ใส่ class "time-input-error" (กรอบแดง)
//   - inputmode="numeric" → mobile ขึ้น keypad ตัวเลข

const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

function formatPartial(raw) {
  const digits = String(raw || "").replace(/\D/g, "").slice(0, 4);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return digits;
  return digits.slice(0, 2) + ":" + digits.slice(2);
}

export function attachTimeFormatter(input) {
  if (!input) return;
  input.setAttribute("inputmode", "numeric");
  input.setAttribute("maxlength", "5");
  input.setAttribute("autocomplete", "off");
  if (!input.getAttribute("pattern")) {
    input.setAttribute("pattern", "^([01]\\d|2[0-3]):[0-5]\\d$");
  }
  if (!input.placeholder) input.placeholder = "22:15";

  input.addEventListener("input", e => {
    const before = e.target.value;
    const after = formatPartial(before);
    if (before !== after) {
      e.target.value = after;
    }
    if (after === "" || TIME_PATTERN.test(after)) {
      e.target.classList.remove("time-input-error");
    }
  });

  input.addEventListener("blur", e => {
    const v = e.target.value;
    if (v && !TIME_PATTERN.test(v)) {
      e.target.classList.add("time-input-error");
    } else {
      e.target.classList.remove("time-input-error");
    }
  });
}

export function isValidTime(v) {
  return !v || TIME_PATTERN.test(v);
}

// แปลงทุก <input type="time"> ในเอกสารให้ใช้ formatter นี้
// (ไม่ได้ใช้ในระบบนี้เพราะเราเปลี่ยน type="text" ใน HTML แล้ว — เก็บไว้เผื่ออนาคต)
export function attachAllTimeInputs(root = document) {
  root.querySelectorAll('input[data-time-input]').forEach(attachTimeFormatter);
}
