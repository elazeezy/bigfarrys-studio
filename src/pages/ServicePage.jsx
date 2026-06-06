import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Copy, Check, ArrowRight, Megaphone, Camera, Layers, FileText, Clock } from "lucide-react";
import { services, brand, payment } from "../data/content.js";
import { supabase } from "../lib/supabaseClient.js";
import ProofGallery from "../components/ProofGallery.jsx";

const PROOF_IMAGES = {
  advert:  Array.from({ length: 10 }, (_, i) => `/services/advert/ads${i + 1}.jpeg`),
  editing: Array.from({ length: 9  }, (_, i) => `/services/editing/edit${i + 1}.jpeg`),
  signage: Array.from({ length: 8  }, (_, i) => `/services/signage/signage${i + 1}.jpeg`),
  cac:     Array.from({ length: 2  }, (_, i) => `/services/cac/cac${i + 1}.jpeg`),
};

const PROOF_CONFIG = {
  advert:  { label: "Client reviews",  heading: "Real results, real clients." },
  editing: { label: "Our work",        heading: "Photos and edits we have delivered." },
  signage: { label: "Our products",    heading: "Browse what we make." },
  cac:     { label: "Client reviews",  heading: "Businesses we have registered." },
};

// Maps signage package ID → product thumbnail image
const SIGNAGE_THUMBS = {
  "sign-1":  "/services/signage/signage1.jpeg",
  "sign-2":  "/services/signage/signage2.jpeg",
  "sign-3":  "/services/signage/signage3.jpeg",
  "sign-4":  "/services/signage/signage4.jpeg",
  "sign-4b": "/services/signage/signage4.jpeg",
  "sign-5":  "/services/signage/signage5.jpeg",
  "sign-6a": "/services/signage/signage6.jpeg",
  "sign-6b": "/services/signage/signage6.jpeg",
  "sign-7":  "/services/signage/signage7.jpeg",
  "sign-7b": "/services/signage/signage7.jpeg",
  "sign-8":  "/services/signage/signage8.jpeg",
};

const ICON_MAP = { advert: Megaphone, editing: Camera, signage: Layers, cac: FileText };
const money = (n) => (n ? `N${Number(n).toLocaleString("en-NG")}` : "DM");
const safeFileName = (name = "proof") => name.replace(/[^\w.\-]+/g, "_");

function groupPackages(packages = []) {
  const map = {};
  for (const p of packages) {
    const g = p.group || "Packages";
    if (!map[g]) map[g] = [];
    map[g].push(p);
  }
  return Object.entries(map);
}

const inputCls =
  "w-full h-12 rounded-2xl bg-cream-50 border border-espresso/12 px-5 text-espresso " +
  "placeholder-espresso/30 outline-none focus:border-espresso/35 focus:bg-white " +
  "transition-all duration-200 text-sm font-medium";

export default function ServicePage() {
  const { slug } = useParams();
  const service = useMemo(() => services.find((s) => s.slug === slug), [slug]);
  const Icon = ICON_MAP[slug] || Layers;

  const [selectedId, setSelectedId] = useState(service?.packages?.[0]?.id ?? "");
  const selectedPkg = useMemo(
    () => service?.packages?.find((p) => p.id === selectedId),
    [service, selectedId]
  );

  const [fullName, setFullName]   = useState("");
  const [phone, setPhone]         = useState("");
  const [email, setEmail]         = useState("");
  const [details, setDetails]     = useState("");
  const [proofFile, setProofFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);
  const [errorMsg, setErrorMsg]   = useState("");
  const [orderId, setOrderId]     = useState(null);
  const [waSummary, setWaSummary] = useState("");
  const [done, setDone]           = useState(false);

  const bucket  = import.meta.env.VITE_SUPABASE_BUCKET || "payment-proofs";
  const grouped = useMemo(() => groupPackages(service?.packages), [service]);

  if (!service) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-4xl p-10 text-center max-w-sm">
          <p className="text-espresso/55 text-sm mb-6">Service not found.</p>
          <Link to="/services" className="btn-primary text-sm">Back to Services</Link>
        </div>
      </div>
    );
  }

  const copyText = async (key, value) => {
    try { await navigator.clipboard.writeText(value); setCopiedKey(key); setTimeout(() => setCopiedKey(null), 1200); }
    catch { /* ignore */ }
  };

  const buildWA = (id) => {
    const lines = [
      "BIGFARRYS ORDER SUMMARY",
      `Order ID: ${id}`,
      `Service: ${service.title}`,
      ...(selectedPkg
        ? [`Package: ${selectedPkg.name}${selectedPkg.price ? ` (${money(selectedPkg.price)})` : ""}`,
           ...(selectedPkg.eta ? [`ETA: ${selectedPkg.eta}`] : [])]
        : []),
      "", "Customer Details:",
      `Name: ${fullName}`, `Phone: ${phone}`,
      ...(email   ? [`Email: ${email}`]      : []),
      ...(details ? ["", `Note: ${details}`] : []),
      "", "Payment: Bank Transfer",
      `${payment.bankName}`,
      `Account: ${payment.accountNumber}`,
      `Name: ${payment.accountName}`,
      "", "I have paid. Please confirm my order.",
    ];
    return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  const submitOrder = async () => {
    setErrorMsg("");
    if (!selectedPkg)     return setErrorMsg("Please select a package first.");
    if (!fullName.trim()) return setErrorMsg("Please enter your full name.");
    if (!phone.trim())    return setErrorMsg("Please enter your phone number.");
    if (!proofFile)       return setErrorMsg("Please upload your payment proof screenshot.");

    setUploading(true);
    try {
      const id        = crypto.randomUUID();
      const ext       = proofFile.name?.split(".").pop() || "jpg";
      const proofPath = `${service.slug}/${id}/${safeFileName(`proof_${Date.now()}.${ext}`)}`;

      const { error: uploadErr } = await supabase.storage
        .from(bucket).upload(proofPath, proofFile, { cacheControl: "3600", upsert: false });
      if (uploadErr) throw uploadErr;

      const { error: insertErr } = await supabase.from("orders").insert([{
        id, service_slug: service.slug, service_title: service.title,
        package_id: selectedPkg.id, package_name: selectedPkg.name, amount: selectedPkg.price ?? null,
        customer_name: fullName.trim(), customer_phone: phone.trim(),
        customer_email: email.trim() || null, customer_details: details.trim() || null,
        proof_bucket: bucket, proof_path: proofPath, status: "pending",
      }]);
      if (insertErr) throw insertErr;

      setOrderId(id);
      setWaSummary(buildWA(id));
      setDone(true);
    } catch (e) {
      setErrorMsg(e?.message || "Something went wrong. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  /* SUCCESS */
  if (done) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-4xl p-12 max-w-sm w-full text-center shadow-sm"
          style={{ border: "1px solid rgba(92,45,26,0.08)" }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            className="w-14 h-14 rounded-full bg-espresso flex items-center justify-center mx-auto mb-6"
          >
            <Check size={24} className="text-cream-50" strokeWidth={2.5} />
          </motion.div>
          <h2 className="font-black text-2xl text-espresso tracking-tight mb-2">Order submitted.</h2>
          <p className="text-espresso/50 text-sm leading-relaxed mb-2">
            Your order is saved. Send us the WhatsApp summary to confirm and get started.
          </p>
          <p className="text-espresso/25 text-xs mb-8 font-mono">ID: {orderId}</p>
          <a
            href={waSummary}
            target="_blank"
            rel="noreferrer"
            className="btn-primary justify-center w-full mb-4"
          >
            Send WhatsApp Summary <ArrowRight size={14} />
          </a>
          <Link to="/services" className="text-xs text-espresso/35 hover:text-espresso transition-colors">
            Back to all services
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">

      {/* Hero */}
      <div className="bg-espresso pt-28 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-cream-50/40 hover:text-cream-50
                       text-xs font-bold tracking-widest uppercase mb-8 transition-colors duration-200"
          >
            <ArrowLeft size={12} /> All Services
          </Link>

          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-2xl bg-cream-50/10 flex items-center justify-center flex-shrink-0 mt-1">
              <Icon size={22} className="text-sand" strokeWidth={1.75} />
            </div>
            <div>
              <p className="eyebrow text-sand mb-3">{service.badge}</p>
              <h1
                className="font-black tracking-tighter leading-tight text-cream-50 mb-3"
                style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
              >
                {service.title}
              </h1>
              <p className="text-cream-200/55 text-sm leading-relaxed max-w-lg">{service.desc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SOCIAL PROOF / PRODUCT GALLERY ── */}
      {PROOF_IMAGES[slug] && (
        <ProofGallery
          images={PROOF_IMAGES[slug]}
          label={PROOF_CONFIG[slug]?.label}
          heading={PROOF_CONFIG[slug]?.heading}
        />
      )}

      <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col gap-5">

        {/* ── STEP 1: PACKAGES ── */}
        <div className="bg-white rounded-4xl overflow-hidden" style={{ border: "1px solid rgba(92,45,26,0.08)" }}>
          <div className="flex items-center gap-3 px-8 py-5 border-b border-espresso/6">
            <span className="w-7 h-7 rounded-full bg-espresso text-cream-50 text-[11px] font-black
                             flex items-center justify-center flex-shrink-0">1</span>
            <div>
              <h2 className="font-black text-espresso text-base tracking-tight">Choose a package</h2>
              <p className="text-espresso/40 text-xs">Scroll sideways within each group to see all options.</p>
            </div>
          </div>

          <div className="p-6 flex flex-col gap-8">
            {grouped.map(([groupName, pkgs], gi) => (
              <motion.div
                key={groupName}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: gi * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Group label */}
                <p className="text-[9px] font-black tracking-[0.35em] uppercase text-bark mb-3 px-1">
                  {groupName}
                </p>

                {/* Horizontal scroll row of cards */}
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory"
                     style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                  {pkgs.map((p, pi) => {
                    const active = selectedId === p.id;
                    const thumb  = SIGNAGE_THUMBS[p.id] ?? null;
                    return (
                      <motion.button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedId(p.id)}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: gi * 0.07 + pi * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        whileTap={{ scale: 0.96 }}
                        className={`snap-start flex-shrink-0 flex flex-col rounded-3xl
                                    text-left transition-all duration-300
                                    ${thumb ? "min-w-[190px] max-w-[210px]" : "min-w-[160px] max-w-[180px] gap-3 p-5"}
                                    ${active
                                      ? "bg-espresso shadow-lg shadow-espresso/20"
                                      : "bg-cream-50 hover:bg-cream-100 border border-espresso/8 hover:border-espresso/20"
                                    }`}
                      >
                        {/* Product thumbnail for signage */}
                        {thumb && (
                          <div className="w-full overflow-hidden rounded-t-3xl"
                               style={{ height: 140 }}>
                            <img
                              src={thumb}
                              alt={p.name}
                              className="w-full h-full object-cover"
                              draggable={false}
                            />
                          </div>
                        )}

                        <div className={`flex flex-col gap-2 ${thumb ? "p-4" : "flex-1"}`}>
                          {/* Price */}
                          <span className={`font-black text-xl leading-none ${active ? "text-sand" : "text-espresso"}`}>
                            {p.price ? money(p.price) : "DM"}
                          </span>

                          {/* Name */}
                          <span className={`font-bold text-xs leading-snug ${active ? "text-cream-50" : "text-espresso"}`}>
                            {p.name}
                          </span>

                          {/* Note */}
                          {p.note && (
                            <span className={`text-[10px] leading-snug ${active ? "text-cream-50/55" : "text-espresso/40"}`}>
                              {p.note}
                            </span>
                          )}

                          {/* ETA chip */}
                          {p.eta && (
                            <div className={`flex items-center gap-1 mt-auto pt-2 border-t ${
                              active ? "border-cream-50/15" : "border-espresso/8"
                            }`}>
                              <Clock size={10} className={active ? "text-cream-50/50" : "text-espresso/35"} />
                              <span className={`text-[10px] font-semibold ${active ? "text-cream-50/50" : "text-espresso/40"}`}>
                                {p.eta}
                              </span>
                            </div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── STEP 2: PAY + FORM ── */}
        <div className="bg-white rounded-4xl overflow-hidden" style={{ border: "1px solid rgba(92,45,26,0.08)" }}>
          <div className="flex items-center gap-3 px-8 py-5 border-b border-espresso/6">
            <span className="w-7 h-7 rounded-full bg-espresso text-cream-50 text-[11px] font-black
                             flex items-center justify-center flex-shrink-0">2</span>
            <div>
              <h2 className="font-black text-espresso text-base tracking-tight">Pay and submit your order</h2>
              <p className="text-espresso/40 text-xs">Transfer to our account, then fill in your details.</p>
            </div>
          </div>

          {/* Selected package summary */}
          <AnimatePresence mode="wait">
            {selectedPkg && (
              <motion.div
                key={selectedPkg.id}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="mx-6 mt-6 bg-espresso rounded-2xl px-6 py-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-cream-50/45 text-[9px] font-black uppercase tracking-widest mb-0.5">
                    Selected package
                  </p>
                  <p className="text-cream-50 font-black text-sm">{selectedPkg.name}</p>
                </div>
                <p className="text-sand font-black text-2xl">
                  {selectedPkg.price ? money(selectedPkg.price) : "DM"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bank details */}
          <div className="px-8 pt-7 pb-0">
            <p className="eyebrow mb-4">Bank transfer details</p>
            <div className="flex flex-col gap-2">
              {[
                { label: "Bank",           key: "bank", value: payment.bankName },
                { label: "Account Number", key: "acc",  value: payment.accountNumber },
                { label: "Account Name",   key: "name", value: payment.accountName },
              ].map(({ label, key, value }) => (
                <div key={key} className="flex items-center justify-between gap-4 bg-cream-50 rounded-2xl px-5 py-3.5">
                  <div className="min-w-0">
                    <p className="text-[9px] font-black tracking-widest uppercase text-espresso/35 mb-0.5">{label}</p>
                    <p className="font-bold text-espresso text-sm truncate">{value}</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => copyText(key, value)}
                    className="flex items-center gap-1.5 text-[10px] font-black tracking-wide uppercase
                               text-espresso/40 hover:text-espresso bg-white hover:bg-cream-100
                               px-3.5 py-2 rounded-full transition-all duration-200 flex-shrink-0"
                    style={{ border: "1px solid rgba(92,45,26,0.08)" }}
                  >
                    {copiedKey === key ? <><Check size={10} /> Copied</> : <><Copy size={10} /> Copy</>}
                  </motion.button>
                </div>
              ))}
            </div>
            <p className="text-espresso/35 text-xs leading-relaxed mt-4">
              Use your name as the narration when making the transfer.
            </p>
          </div>

          <div className="h-px bg-espresso/6 mx-8 my-7" />

          {/* Form */}
          <div className="px-8 pb-8">
            <p className="eyebrow mb-5">Your details</p>
            <div className="flex flex-col gap-3">
              <input className={inputCls} placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              <input className={inputCls} placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <input className={inputCls} placeholder="Email address (optional)" value={email} onChange={(e) => setEmail(e.target.value)} />
              <textarea
                className={`${inputCls} h-auto min-h-[88px] py-3.5 resize-none`}
                placeholder="Any extra instructions (optional)"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />

              <div className="rounded-2xl bg-cream-50 p-5" style={{ border: "1px solid rgba(92,45,26,0.08)" }}>
                <p className="font-black text-espresso text-sm mb-1">Payment proof</p>
                <p className="text-xs text-espresso/40 mb-4 leading-relaxed">
                  Upload a screenshot of your bank transfer receipt so we can confirm faster.
                </p>
                <input
                  type="file"
                  accept="image/*"
                  className="block w-full text-xs text-espresso/50
                             file:mr-4 file:py-2.5 file:px-5 file:rounded-full file:border-0
                             file:bg-espresso file:text-cream-50 file:text-xs file:font-black
                             file:cursor-pointer hover:file:bg-espresso-dark file:transition-colors"
                  onChange={(e) => setProofFile(e.target.files?.[0] || null)}
                />
                {proofFile && (
                  <p className="mt-3 flex items-center gap-1.5 text-xs text-bark font-semibold">
                    <Check size={11} /> {proofFile.name}
                  </p>
                )}
              </div>

              <AnimatePresence>
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-2xl bg-red-50 border border-red-200 px-5 py-3.5 text-sm text-red-700 font-medium"
                  >
                    {errorMsg}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={submitOrder}
                disabled={uploading}
                className="btn-primary justify-center mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? "Submitting your order..." : "Submit Order"}
              </motion.button>

              <p className="text-center text-xs text-espresso/30 leading-relaxed">
                After submitting you will get a pre-filled WhatsApp message to send us for final confirmation.
              </p>
            </div>
          </div>
        </div>

        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 text-espresso/30 hover:text-espresso
                     text-xs font-bold tracking-wide transition-colors self-start pb-8"
        >
          <ArrowLeft size={12} /> Back to all services
        </Link>
      </div>
    </div>
  );
}
