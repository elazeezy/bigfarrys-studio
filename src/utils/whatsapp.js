// src/utils/whatsapp.js
export function formatNaira(amount) {
  const n = Number(amount || 0);
  return `₦${n.toLocaleString("en-NG")}`;
}

export function buildOrderSummaryMessage({
  brandName,
  orderId,
  serviceTitle,
  packageName,
  price,
  customerName,
  customerPhone,
  customerEmail,
  notes,
  proofUrl,
  fileUrls = [],
}) {
  const priceLine = typeof price === "number" ? `Price: ${formatNaira(price)}` : null;

  const filesBlock =
    fileUrls.length > 0
      ? ["Service files:", ...fileUrls.map((u, idx) => `${idx + 1}) ${u}`)].join("\n")
      : "Service files: NONE";

  return [
    `Hi ${brandName},`,
    `✅ NEW ORDER SUMMARY`,
    `Order ID: ${orderId}`,
    `Service: ${serviceTitle}`,
    packageName ? `Package: ${packageName}` : null,
    priceLine,
    customerName ? `Name: ${customerName}` : null,
    customerPhone ? `Phone: ${customerPhone}` : null,
    customerEmail ? `Email: ${customerEmail}` : null,
    notes ? `Notes: ${notes}` : null,
    `Proof: ${proofUrl || "NOT UPLOADED"}`,
    filesBlock,
  ]
    .filter(Boolean)
    .join("\n");
}

export function openWhatsApp({ phoneIntl, message }) {
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${phoneIntl}?text=${encoded}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
