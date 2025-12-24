import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { services, brand, payment } from "../data/content.js";

const money = (n) => {
  if (n === null || n === undefined) return "";
  return `₦${Number(n).toLocaleString("en-NG")}`;
};

const waLink = (text) =>
  `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(text)}`;

function ReviewsGallery({ images = [] }) {
  if (!images.length) return null;

  return (
    <section className="glass rounded-3xl border border-white/10 p-5 md:p-7">
      <div className="text-xs uppercase tracking-[0.18em] text-white/55">Reviews</div>
      <h3 className="mt-2 text-2xl md:text-3xl font-extrabold tracking-tight">
        Proof from real clients.
      </h3>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {images.slice(0, 3).map((src, i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden border border-white/10 bg-white/5"
          >
            <img
              src={src}
              alt={`Review ${i + 1}`}
              className="h-56 w-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <div className="mt-3 text-sm text-white/60">
        (You can replace these screenshots anytime in <code className="text-white/80">/public/reviews</code>)
      </div>
    </section>
  );
}

export default function ServicePage() {
  const { slug } = useParams();

  const service = useMemo(
    () => services.find((s) => s.slug === slug),
    [slug]
  );

  const [selectedId, setSelectedId] = useState(service?.packages?.[0]?.id ?? "");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [summary, setSummary] = useState("");

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

  const selectedPkg = service.packages?.find((p) => p.id === selectedId);

  const buildSummary = () => {
    const lines = [];

    lines.push(`BIGFARRYS — ORDER SUMMARY`);
    lines.push(`Service: ${service.title}`);

    if (selectedPkg) {
      lines.push(
        `Package: ${selectedPkg.name}${selectedPkg.price ? ` (${money(selectedPkg.price)})` : ""}`
      );
      if (selectedPkg.eta) lines.push(`ETA: ${selectedPkg.eta}`);
    }

    lines.push(`Name: ${fullName || "-"}`);
    lines.push(`Phone: ${phone || "-"}`);
    if (email) lines.push(`Email: ${email}`);
    if (details) lines.push(`Details: ${details}`);

    lines.push(``);
    lines.push(`Payment: Transfer`);
    lines.push(`${payment.bankName}`);
    lines.push(`${payment.accountNumber} — ${payment.accountName}`);

    lines.push(``);
    lines.push(`I have paid / I am paying now. Please confirm. ✅`);

    setSummary(lines.join("\n"));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10">
      {/* Top Sample Image */}
      <section className="glass rounded-3xl border border-white/10 overflow-hidden">
        <div className="relative h-[280px] md:h-[420px]">
          <img
            src={service.sampleImage || "/services/advert-sample.jpg"}
            alt={`${service.title} sample`}
            className="absolute inset-0 h-full w-full object-cover object-center"
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
            Your order summary will include your selected package.
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
                    <div className="font-extrabold">
                      {p.price ? money(p.price) : "DM"}
                    </div>
                    <div className="text-xs text-white/50 mt-1">
                      {selectedId === p.id ? "Selected" : "Select"}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        <div className="glass rounded-3xl border border-white/10 p-5 md:p-7">
          <div className="text-xs uppercase tracking-[0.18em] text-white/55">
            Book on the website
          </div>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold tracking-tight">
            Submit your details.
          </h2>
          <p className="mt-2 text-white/60">
            Fill this form, upload files safely (we’ll add upload next), then send one clean WhatsApp order summary.
          </p>

          <div className="mt-4 grid gap-3">
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
              placeholder="Tell us what you need (details)..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={buildSummary}
              className="h-12 px-5 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/15 transition font-semibold"
            >
              Generate order summary →
            </button>

            {summary && (
              <a
                href={waLink(summary)}
                target="_blank"
                rel="noreferrer"
                className="h-12 px-5 rounded-2xl bg-pink-500/90 hover:bg-pink-500 transition font-extrabold grid place-items-center"
              >
                Send WhatsApp summary →
              </a>
            )}
          </div>

          {summary && (
            <div className="mt-4 rounded-2xl bg-black/30 border border-white/10 p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-white/55">
                Preview
              </div>
              <pre className="mt-2 text-sm whitespace-pre-wrap text-white/80 font-sans">
                {summary}
              </pre>
            </div>
          )}
        </div>
      </section>

      {/* Reviews */}
      <div className="mt-6">
        <ReviewsGallery images={service.reviewsImages} />
      </div>

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
