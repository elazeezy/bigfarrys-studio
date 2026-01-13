// src/pages/Services.jsx
import { Link } from "react-router-dom";
import { services } from "../data/content.js";

export default function Services() {
  return (
    <section className="mx-auto max-w-6xl px-4 md:px-6 pt-6 md:pt-10 pb-24">
      <div className="glass rounded-3xl p-6 md:p-10 border border-white/10">
        <div className="text-xs uppercase tracking-[0.18em] text-white/60">
          Services
        </div>
        <h1 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight">
          Choose what you want.
        </h1>
        <p className="mt-2 text-white/70 max-w-2xl">
          Pick a service to view packages, fill your details, and send one clean WhatsApp summary.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <Link
            key={s.slug}
            to={`/services/${s.slug}`}
            className="glass rounded-3xl border border-white/10 p-5 hover:bg-white/5 transition"
          >
            <div className="text-xs uppercase tracking-[0.18em] text-white/55">
              {s.badge}
            </div>
            <div className="mt-2 text-xl font-extrabold">{s.title}</div>
            <div className="mt-2 text-sm text-white/70">{s.desc}</div>
            <div className="mt-4 text-sm font-extrabold text-white/80">
              View packages →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
