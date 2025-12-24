// src/utils/reference.js
export function generateReferenceId(prefix = "BF") {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");

  const stamp =
    `${now.getFullYear()}` +
    `${pad(now.getMonth() + 1)}` +
    `${pad(now.getDate())}-` +
    `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${stamp}-${rand}`;
}
