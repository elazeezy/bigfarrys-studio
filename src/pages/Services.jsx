// src/pages/Services.jsx
import { Link } from "react-router-dom";
import { services } from "../data/content.js";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Services() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 pt-12 pb-32">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-[3rem] bg-slate-900/40 border border-white/10 p-10 md:p-16 mb-12">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Sparkles size={120} className="text-indigo-500" />
        </div>
        <div className="relative z-10">
          <span className="text-indigo-400 text-xs font-black tracking-[0.4em] uppercase">Premium Studio</span>
          <h1 className="mt-4 text-5xl md:text-7xl font-black tracking-tighter text-white">
            CHOOSE YOUR <br /><span className="italic font-serif text-indigo-400">IMPACT.</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-xl text-lg leading-relaxed">
            Select a specialized creative vertical to begin your brand transformation.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {services.map((s) => (
          <Link
            key={s.slug}
            to={`/services/${s.slug}`}
            className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-slate-900/20 p-8 transition-all hover:border-indigo-500/50 hover:bg-slate-900/40"
          >
            <div className="relative z-10">
              <div className="mb-4 inline-block rounded-full bg-indigo-500/10 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-indigo-400">
                {s.badge}
              </div>
              <h2 className="text-3xl font-black text-white group-hover:text-indigo-400 transition-colors">{s.title}</h2>
              <p className="mt-4 text-slate-400 line-clamp-2 text-sm leading-relaxed">{s.desc}</p>
              
              <div className="mt-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-all">
                View Packages <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </div>

            {/* Subtle Gradient Glow on Hover */}
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-indigo-600/5 blur-[80px] group-hover:bg-indigo-600/20 transition-all" />
          </Link>
        ))}
      </div>
    </section>
  );
}