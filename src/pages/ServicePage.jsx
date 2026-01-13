// src/pages/ServicePage.jsx
import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { services, brand, payment } from "../data/content.js";
import { supabase } from "../lib/supabaseClient.js";

const money = (n) => (n ? `₦${Number(n).toLocaleString("en-NG")}` : "DM");

function safeFileName(name = "proof") {
  return name.replace(/[^\w.\-]+/g, "_");
}

export default function ServicePage() {
  const { slug } = useParams();

  const service = useMemo(() => services.find((s) => s.slug === slug), [slug]);

  const [selectedId, setSelectedId] = useState(service?.packages?.[0]?.id ?? "");
  const selectedPkg = useMemo(
    () => service?.packages?.find((p) => p.id === selectedId),
    [service, selectedId]
  );

  // Customer form
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");

  // Proof upload
  const [proofFile, setProofFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // UI feedback
  const [copiedKey, setCopiedKey] = useState(null); // "bank" | "acc" | "name"
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // After submit
  const [createdOrder, setCreatedOrder] = useState(null); // row from orders
  const [waSummary, setWaSummary] = useState("");

  const bucket = import.meta.env.VITE_SUPABASE_BUCKET || "payment-proofs";

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="glass rounded-2xl p-6 border border-white/10">
          <div className="text-white/70">Service not found.</div>
          <Link to="/services" className="inline-block mt-3 underline">
            Back to services
          </Link>
        </div>
      </div>
    );
  }

  const copyText = async (key, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 900);
    } catch {
      // ignore (some browsers block clipboard without https)
    }
  };

  const buildWhatsAppSummary = (orderRow) => {
    const lines = [];
    lines.push(`BIGFARRYS — ORDER SUMMARY ✅`);
    lines.push(`Order ID: ${orderRow?.id || "-"}`);
    lines.push(`Service: ${service.title}`);

    if (selectedPkg) {
      lines.push(
        `Package: ${selectedPkg.name}${selectedPkg.price ? ` (${money(selectedPkg.price)})` : ""}`
      );
      if (selectedPkg.eta) lines.push(`ETA: ${selectedPkg.eta}`);
    }

    lines.push(``);
    lines.push(`Customer:`);
    lines.push(`Name: ${fullName || "-"}`);
    lines.push(`Phone: ${phone || "-"}`);
    if (email) lines.push(`Email: ${email}`);
    if (details) {
      lines.push(``);
      lines.push(`Details:`);
      lines.push(details);
    }

    lines.push(``);
    lines.push(`Payment: Transfer`);
    lines.push(`${payment.bankName}`);
    lines.push(`${payment.accountNumber} — ${payment.accountName}`);
    lines.push(``);
    lines.push(`I have paid / I am paying now. Please confirm. ✅`);

    return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  const submitOrder = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    if (!selectedPkg) {
      setErrorMsg("Please select a package.");
      return;
    }
    if (!fullName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!phone.trim()) {
      setErrorMsg("Please enter your phone number.");
      return;
    }
    if (!proofFile) {
      setErrorMsg("Please upload your payment proof screenshot.");
      return;
    }

    setUploading(true);

    try {
      // 1) Upload proof to storage
      const orderId = crypto.randomUUID();
      const ext = proofFile.name?.split(".").pop() || "jpg";
      const fileName = safeFileName(`proof_${Date.now()}.${ext}`);

      // Keep paths organized per service + order id
      const proofPath = `${service.slug}/${orderId}/${fileName}`;

      const { error: uploadErr } = await supabase.storage
        .from(bucket)
        .upload(proofPath, proofFile, {
          cacheControl: "3600",
          upsert: false,
          contentType: proofFile.type || undefined,
        });

      if (uploadErr) throw uploadErr;

      // 2) Insert row into orders table
      const payload = {
        id: orderId, // only works if your table allows custom id; if not, remove this line
        service_slug: service.slug,
        service_title: service.title,

        package_id: selectedPkg.id,
        package_name: selectedPkg.name,
        amount: selectedPkg.price ?? null,

        customer_name: fullName.trim(),
        customer_phone: phone.trim(),
        customer_email: email.trim() || null,
        customer_details: details.trim() || null,

        proof_bucket: bucket,
        proof_path: proofPath,

        status: "pending",
      };
const { error: insertErr } = await supabase
  .from("orders")
  .insert([payload]); // ✅ keep as array, safer

if (insertErr) throw insertErr;

// ✅ since we already generated orderId, we can build a local "created order"
const localRow = { id: orderId, status: "pending" };
setCreatedOrder(localRow);

const wa = buildWhatsAppSummary(localRow);
setWaSummary(wa);


      setSuccessMsg("Order submitted successfully. You can now send the WhatsApp summary.");
    } catch (e) {
      setErrorMsg(e?.message || "Something went wrong. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10">
      {/* Top Banner */}
      <section className="glass rounded-3xl border border-white/10 overflow-hidden">
        <div className="relative h-[260px] md:h-[380px]">
          <img
            src={service.sampleImage || "/services/advert-sample.jpg"}
            alt={`${service.title} sample`}
            className="absolute inset-0 h-full w-full object-cover object-center"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,42,166,0.22),transparent_55%)]" />

          <div className="relative p-6 md:p-10 max-w-3xl">
            <div className="text-xs uppercase tracking-[0.18em] text-white/70">
              {service.badge}
            </div>
            <h1 className="mt-3 text-3xl md:text-6xl font-extrabold tracking-tight leading-[1.03]">
              {service.title}
            </h1>
            <p className="mt-3 text-white/75 md:text-lg">{service.desc}</p>
          </div>
        </div>
      </section>

      {/* Packages + Booking */}
      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Packages */}
        <div className="glass rounded-3xl border border-white/10 p-5 md:p-7">
          <div className="text-xs uppercase tracking-[0.18em] text-white/55">
            Choose a package
          </div>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold tracking-tight">
            Pick what you want.
          </h2>
          <p className="mt-2 text-white/60">
            Your order will be saved as <span className="text-white/80">Pending</span> until admin confirms.
          </p>

          <div className="mt-4 grid gap-3">
            {(service.packages || []).map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedId(p.id)}
                className={`text-left rounded-2xl border p-4 transition ${
                  selectedId === p.id
                    ? "border-pink-400/40 bg-white/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-extrabold tracking-tight">{p.name}</div>
                    <div className="text-sm text-white/60 mt-1">
                      {p.eta ? `ETA: ${p.eta}` : "ETA: —"}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-extrabold">{p.price ? money(p.price) : "DM"}</div>
                    <div className="text-xs text-white/50 mt-1">
                      {selectedId === p.id ? "Selected" : "Select"}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Booking */}
        <div className="glass rounded-3xl border border-white/10 p-5 md:p-7">
          <div className="text-xs uppercase tracking-[0.18em] text-white/55">
            Book on the website
          </div>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold tracking-tight">
            Make payment & upload proof.
          </h2>
          <p className="mt-2 text-white/60">
            Transfer to the account below, upload your receipt screenshot, then submit your order.
          </p>

          {/* Payment Card */}
          <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-4 md:p-5">
            <div className="font-extrabold text-lg">Make payment</div>
            <div className="text-sm text-white/60 mt-1">
              Use your name as narration if possible.
            </div>

            <div className="mt-4 grid gap-3">
              {/* Bank name */}
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-white/55">
                    Bank name
                  </div>
                  <div className="font-extrabold">{payment.bankName}</div>
                </div>
                <button
                  type="button"
                  onClick={() => copyText("bank", payment.bankName)}
                  className="h-10 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 font-semibold"
                >
                  {copiedKey === "bank" ? "Copied" : "Copy"}
                </button>
              </div>

              {/* Account number */}
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-white/55">
                    Account number
                  </div>
                  <div className="font-extrabold">{payment.accountNumber}</div>
                </div>
                <button
                  type="button"
                  onClick={() => copyText("acc", payment.accountNumber)}
                  className="h-10 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 font-semibold"
                >
                  {copiedKey === "acc" ? "Copied" : "Copy"}
                </button>
              </div>

              {/* Account name */}
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-white/55">
                    Account name
                  </div>
                  <div className="font-extrabold">{payment.accountName}</div>
                </div>
                <button
                  type="button"
                  onClick={() => copyText("name", payment.accountName)}
                  className="h-10 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 font-semibold"
                >
                  {copiedKey === "name" ? "Copied" : "Copy"}
                </button>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70">
                After payment, upload proof and submit your order for confirmation.
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="mt-5 grid gap-3">
            <input
              className="h-12 rounded-2xl bg-white/5 border border-white/10 px-4 outline-none focus:border-pink-400/40"
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              className="h-12 rounded-2xl bg-white/5 border border-white/10 px-4 outline-none focus:border-pink-400/40"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              className="h-12 rounded-2xl bg-white/5 border border-white/10 px-4 outline-none focus:border-pink-400/40"
              placeholder="Email (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              className="min-h-[140px] rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-pink-400/40"
              placeholder="Extra note (optional)"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />

            {/* Upload proof */}
            <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-4">
              <div className="font-extrabold">Upload payment proof</div>
              <div className="text-sm text-white/60 mt-1">
                Upload a screenshot/receipt. Admin will confirm or reject.
              </div>

              <input
                type="file"
                accept="image/*"
                className="mt-3 block w-full text-sm"
                onChange={(e) => setProofFile(e.target.files?.[0] || null)}
              />

              {proofFile ? (
                <div className="mt-2 text-xs text-white/70">
                  Selected: <span className="text-white/90">{proofFile.name}</span>
                </div>
              ) : null}
            </div>

            {/* Messages */}
            {errorMsg ? (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-white/85">
                {errorMsg}
              </div>
            ) : null}

            {successMsg ? (
              <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-white/85">
                {successMsg}
              </div>
            ) : null}

            {/* Submit */}
            <button
              type="button"
              onClick={submitOrder}
              disabled={uploading}
              className="mt-1 h-12 rounded-2xl bg-pink-500/90 hover:bg-pink-500 transition font-extrabold disabled:opacity-50"
            >
              {uploading ? "Submitting..." : "Submit order"}
            </button>

            {/* WhatsApp only appears after successful insert */}
            {waSummary ? (
              <a
                href={waSummary}
                target="_blank"
                rel="noreferrer"
                className="h-12 rounded-2xl bg-white/10 hover:bg-white/15 transition font-extrabold grid place-items-center border border-white/10"
              >
                Send WhatsApp summary →
              </a>
            ) : null}

            {createdOrder ? (
              <div className="text-xs text-white/60">
                Saved as: <span className="text-white/85">{createdOrder.status}</span> • Order ID:{" "}
                <span className="text-white/85">{createdOrder.id}</span>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Back */}
      <div className="mt-6">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-4 py-3 hover:bg-white/10 transition"
        >
          ← Back to services
        </Link>
      </div>
    </div>
  );
}

console.log("SUPABASE URL:", import.meta.env.VITE_SUPABASE_URL);

