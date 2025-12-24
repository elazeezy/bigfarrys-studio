import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { brand, services } from "../data/content.js";

const naira = (n) =>
  typeof n === "number"
    ? `₦${n.toLocaleString("en-NG")}`
    : "Price: DM";

const WHATSAPP_SUMMARY = (text) =>
  `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(text)}`;

function groupBy(list, key) {
  return list.reduce((acc, item) => {
    const k = item[key] || "Packages";
    acc[k] = acc[k] || [];
    acc[k].push(item);
    return acc;
  }, {});
}

export default function ServicePage() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  const [selectedId, setSelectedId] = useState(service?.packages?.[0]?.id || "");
  const selected = useMemo(
    () => service?.packages?.find((p) => p.id === selectedId),
    [service, selectedId]
  );

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    details: ""
  });

  if (!service) return null;

  const grouped = groupBy(service.packages || [], "group");

  const summaryText = useMemo(() => {
    const pkgLine = selected
      ? `${selected.group} — ${selected.name} (${naira(selected.price)})`
      : "No package selected";

    return `BIGFARRYS ORDER SUMMARY ✅
Service: ${service.title}
Package: ${pkgLine}

Customer:
Name: ${form.name || "-"}
Phone: ${form.phone || "-"}
Email: ${form.email || "-"}

Details:
${form.details || "-"}

Sent from: BigFarrys Website`;
  }, [service.title, selected, form]);

  return (
    <section className="mx-auto max-w-6xl px-4 md:px-6 pt-6 md:pt-10 pb-24">
      {/* Top banner */}
      <div className="glass rounded-3xl overflow-hidden border border-white/10">
        <div className="relative h-[280px] md:h-[360px]">
          {/* Sample image */}
          <img
            src={service.sampleImage}
            alt={`${service.title} sample`}
            className="absolute inset-0 h-full w-full object-cover object-center"
            onError={(e) => {
              // fallback if you haven't added image yet
              e.currentTarget.style.display = "none";
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0b1020]/85 via-[#0b1020]/55 to-transparent" />
          <div className="relative p-6 md:p-10">
            <div className="text-white/70 text-sm">{service.badge}</div>
            <h1 className="mt-2 text-4xl md:text-6xl font-extrabold tracking-tight">
              {service.title}
            </h1>
            <p className="mt-3 text-white/75 max-w-2xl">{service.desc}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {/* Packages */}
        <div className="glass rounded-3xl p-5 md:p-7 border border-white/10">
          <div className="text-xl font-extrabold">Choose a package</div>
          <div className="text-white/70 text-sm mt-1">
            Select what you want — your order summary will include this.
          </div>

          <div className="mt-5 grid gap-4">
            {Object.entries(grouped).map(([group, items]) => (
              <div key={group}>
                <div className="text-xs uppercase tracking-[0.18em] text-white/60 mb-2">
                  {group}
                </div>

                <div className="grid gap-2">
                  {items.map((p) => {
                    const active = selectedId === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedId(p.id)}
                        className={`text-left rounded-2xl px-4 py-4 border transition ${
                          active
                            ? "bg-white/10 border-white/20"
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="font-extrabold">{p.name}</div>
                            <div className="text-xs text-white/60 mt-1">
                              {p.eta ? `ETA: ${p.eta}` : ""}
                            </div>
                            {p.includes?.length ? (
                              <ul className="mt-2 text-xs text-white/70 list-disc pl-4 space-y-1">
                                {p.includes.map((x) => (
                                  <li key={x}>{x}</li>
                                ))}
                              </ul>
                            ) : null}
                          </div>

                          <div className="font-extrabold">
                            {naira(p.price)}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking */}
        <div className="glass rounded-3xl p-5 md:p-7 border border-white/10">
          <div className="text-xl font-extrabold">Book on the website</div>
          <div className="text-white/70 text-sm mt-1">
            Fill your details here. WhatsApp is only for sending the order summary once.
          </div>

          <div className="mt-5 grid gap-3">
            <input
              value={form.name}
              onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))}
              placeholder="Full name"
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/25"
            />
            <input
              value={form.phone}
              onChange={(e) => setForm((v) => ({ ...v, phone: e.target.value }))}
              placeholder="Phone number"
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/25"
            />
            <input
              value={form.email}
              onChange={(e) => setForm((v) => ({ ...v, email: e.target.value }))}
              placeholder="Email (optional)"
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/25"
            />
            <textarea
              value={form.details}
              onChange={(e) => setForm((v) => ({ ...v, details: e.target.value }))}
              placeholder="Tell us what you need (details)..."
              rows={6}
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/25 resize-none"
            />

            {/* ✅ Upload placeholder (backend later) */}
            <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-4">
              <div className="text-sm font-semibold">Upload files (coming next)</div>
              <div className="text-xs text-white/60 mt-1">
                We’ll connect this to a backend / storage. For now, keep it as UI.
              </div>
            </div>

            <a
              href={WHATSAPP_SUMMARY(summaryText)}
              target="_blank"
              rel="noreferrer"
              className="mt-2 rounded-2xl px-5 py-4 font-extrabold text-center bg-pink-500/90 hover:bg-pink-500 transition"
            >
              Send order summary on WhatsApp →
            </a>

            <div className="text-xs text-white/55">
              By tapping, you’re only sending a summary — not doing the full order inside WhatsApp.
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-6 glass rounded-3xl p-5 md:p-7 border border-white/10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xl font-extrabold">Customer reviews</div>
            <div className="text-white/70 text-sm mt-1">
              Add 2–3 screenshot reviews here for trust.
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {(service.reviewImages || []).slice(0, 3).map((src) => (
            <div
              key={src}
              className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 min-h-[180px]"
            >
              <img
                src={src}
                alt="Review screenshot"
                className="h-full w-full object-cover"
                onError={(e) => {
                  // placeholder block if missing
                  e.currentTarget.style.display = "none";
                }}
              />
              <div className="p-4 text-sm text-white/60">
                Drop a review screenshot here: <span className="text-white/80">{src}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
