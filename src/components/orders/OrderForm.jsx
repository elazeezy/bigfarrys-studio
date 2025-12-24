// src/components/orders/OrderForm.jsx
import { useMemo, useState } from "react";
import { brand, payment } from "../../data/content.js";
import { generateReferenceId } from "../../utils/reference.js";
import { buildOrderSummaryMessage, openWhatsApp, formatNaira } from "../../utils/whatsapp.js";
import { uploadSingleFile, uploadMultipleFiles } from "../../utils/upload.js";

function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={[
        "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none",
        "placeholder:text-white/40 focus:border-white/25",
        className,
      ].join(" ")}
    />
  );
}

function Textarea({ className = "", ...props }) {
  return (
    <textarea
      {...props}
      className={[
        "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none",
        "placeholder:text-white/40 focus:border-white/25",
        className,
      ].join(" ")}
    />
  );
}

function CopyButton({ value, label = "Copy" }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold hover:bg-white/10 active:scale-[0.98]"
    >
      {copied ? "Copied" : label}
    </button>
  );
}

export default function OrderForm({ service, selectedPackage }) {
  const [orderId] = useState(() => generateReferenceId("BF"));

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    notes: "",
  });

  const [proofFile, setProofFile] = useState(null);
  const [otherFiles, setOtherFiles] = useState([]);

  // Upload results (URLs)
  const [proofUpload, setProofUpload] = useState(null);
  const [filesUpload, setFilesUpload] = useState([]);

  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");

  const canProceed = useMemo(() => {
    return (
      form.fullName.trim().length >= 2 &&
      form.phone.trim().length >= 7 &&
      !!service?.slug &&
      !!selectedPackage?.id
    );
  }, [form.fullName, form.phone, service?.slug, selectedPackage?.id]);

  const summaryText = useMemo(() => {
    return buildOrderSummaryMessage({
      brandName: brand.name,
      orderId,
      serviceTitle: service?.title,
      packageName: selectedPackage?.name,
      price: selectedPackage?.price,
      customerName: form.fullName,
      customerPhone: form.phone,
      customerEmail: form.email,
      notes: form.notes,
      proofUrl: proofUpload?.url || "",
      fileUrls: filesUpload.map((f) => f.url),
    });
  }, [
    orderId,
    service?.title,
    selectedPackage?.name,
    selectedPackage?.price,
    form,
    proofUpload,
    filesUpload,
  ]);

  async function uploadAll() {
    setErr("");
    if (!canProceed) {
      setErr("Please fill your name + phone, and select a package.");
      return;
    }

    setUploading(true);
    try {
      // Upload proof (required recommended)
      if (proofFile && !proofUpload) {
        const up = await uploadSingleFile({ orderId, file: proofFile, kind: "proof" });
        setProofUpload(up);
      }

      // Upload other files (optional)
      if (otherFiles?.length && filesUpload.length === 0) {
        const ups = await uploadMultipleFiles({ orderId, files: otherFiles, kind: "file" });
        setFilesUpload(ups);
      }
    } catch (e) {
      setErr(e?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function sendSummaryToWhatsApp() {
    openWhatsApp({ phoneIntl: brand.whatsappNumber, message: summaryText });
  }

  const uploadsReady = !!proofUpload || filesUpload.length > 0;

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5">
      <h3 className="text-base font-extrabold text-white">Book on the website</h3>
      <p className="mt-1 text-sm text-white/70">
        Fill your details, upload proof/files here, then send one order summary on WhatsApp.
      </p>

      {/* Customer details */}
      <div className="mt-4 grid gap-3">
        <Input
          value={form.fullName}
          onChange={(e) => setForm((v) => ({ ...v, fullName: e.target.value }))}
          placeholder="Full name"
        />
        <Input
          value={form.phone}
          onChange={(e) => setForm((v) => ({ ...v, phone: e.target.value }))}
          placeholder="Phone number"
        />
        <Input
          value={form.email}
          onChange={(e) => setForm((v) => ({ ...v, email: e.target.value }))}
          placeholder="Email (optional)"
        />
        <Textarea
          value={form.notes}
          onChange={(e) => setForm((v) => ({ ...v, notes: e.target.value }))}
          placeholder="Tell us what you need (details)…"
          rows={4}
        />
      </div>

      {/* Payment */}
      <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="text-sm font-extrabold text-white">Payment (Bank Transfer)</div>

        <div className="mt-3 grid gap-2">
          <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
            <div>
              <div className="text-xs text-white/60">Bank</div>
              <div className="text-sm font-semibold">{payment.bankName}</div>
            </div>
            <CopyButton value={payment.bankName} />
          </div>

          <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
            <div>
              <div className="text-xs text-white/60">Account Name</div>
              <div className="text-sm font-semibold">{payment.accountName}</div>
            </div>
            <CopyButton value={payment.accountName} />
          </div>

          <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
            <div>
              <div className="text-xs text-white/60">Account Number</div>
              <div className="text-sm font-semibold">{payment.accountNumber}</div>
            </div>
            <CopyButton value={payment.accountNumber} />
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="text-xs text-white/60">Order ID</div>
          <div className="mt-1 flex items-center justify-between gap-3">
            <div className="truncate text-sm font-extrabold">{orderId}</div>
            <CopyButton value={orderId} label="Copy ID" />
          </div>
        </div>

        <div className="mt-3 text-sm text-white/70">
          Selected package:{" "}
          <span className="font-bold text-white">
            {selectedPackage?.name || "—"}
          </span>{" "}
          {typeof selectedPackage?.price === "number" ? (
            <span className="text-white/70">({formatNaira(selectedPackage.price)})</span>
          ) : null}
        </div>
      </div>

      {/* Uploads */}
      <div className="mt-5 grid gap-3">
        <label className="block rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10">
          <div className="text-sm font-extrabold">Upload payment proof</div>
          <div className="mt-1 text-xs text-white/60">
            This gets uploaded to the website and included as a link in your order summary.
          </div>
          <input
            type="file"
            accept="image/*,application/pdf"
            className="mt-3 block w-full text-sm text-white/70"
            onChange={(e) => setProofFile(e.target.files?.[0] || null)}
          />
          {proofFile ? <div className="mt-2 text-xs text-white/70">Selected: {proofFile.name}</div> : null}
          {proofUpload?.url ? (
            <div className="mt-2 text-xs text-white/70">
              Uploaded: <span className="text-white/90">{proofUpload.url}</span>
            </div>
          ) : null}
        </label>

        <label className="block rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10">
          <div className="text-sm font-extrabold">Upload service files (optional)</div>
          <div className="mt-1 text-xs text-white/60">
            Images/videos/docs needed for this service.
          </div>
          <input
            type="file"
            multiple
            className="mt-3 block w-full text-sm text-white/70"
            onChange={(e) => setOtherFiles(Array.from(e.target.files || []))}
          />
          {otherFiles?.length ? (
            <div className="mt-2 text-xs text-white/70">Selected: {otherFiles.length} file(s)</div>
          ) : null}
          {filesUpload?.length ? (
            <div className="mt-2 text-xs text-white/70">
              Uploaded: {filesUpload.length} file(s)
            </div>
          ) : null}
        </label>

        {err ? (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm">
            {err}
          </div>
        ) : null}

        <button
          type="button"
          disabled={uploading || !canProceed}
          onClick={uploadAll}
          className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-sm font-extrabold hover:bg-white/15 disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload files to website"}
        </button>
      </div>

      {/* Summary */}
      <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="text-sm font-extrabold">Order summary (auto-generated)</div>
        <p className="mt-1 text-xs text-white/60">
          This summary includes file links after upload.
        </p>

        <pre className="mt-3 whitespace-pre-wrap rounded-xl border border-white/10 bg-black/20 p-3 text-xs text-white/80">
{summaryText}
        </pre>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            disabled={!uploadsReady || !canProceed}
            onClick={sendSummaryToWhatsApp}
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-sm font-extrabold hover:bg-white/15 disabled:opacity-50"
          >
            Send Order Summary on WhatsApp →
          </button>

          <CopyButton value={summaryText} label="Copy Summary" />
        </div>

        <p className="mt-2 text-xs text-white/55">
          Tip: Upload first, then send summary so the admin receives the links.
        </p>
      </div>
    </section>
  );
}
