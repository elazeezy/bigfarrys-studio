import { motion } from "framer-motion";
import GlassCard from "./GlassCard.jsx";
import { services } from "../data/content.js";

const toneGradients = {
  pink: "from-pink-500/25 via-transparent to-transparent",
  navy: "from-sky-400/18 via-transparent to-transparent",
  violet: "from-violet-500/20 via-transparent to-transparent"
};

export default function BentoServices() {
  return (
    <section className="px-3 md:px-6 mt-6">
      <div className="mx-auto max-w-6xl">
        {/* Title row */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold">
              Services that get you <span className="gradient-text">seen</span>
            </h2>
            <p className="text-white/65 mt-2 max-w-2xl">
              Tap any service to message BIGFARRYS instantly — built for mobile users.
            </p>
          </div>

          <a
            href="/services"
            className="hidden md:inline-flex h-11 px-4 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/15 transition font-semibold"
          >
            View all
          </a>
        </div>

        {/* Bento grid */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-4">
          {services.map((s, idx) => {
            // Bento sizing
            const span =
              idx === 0 ? "md:col-span-7" :
              idx === 1 ? "md:col-span-5" :
              idx === 2 ? "md:col-span-6" :
              idx === 3 ? "md:col-span-6" :
              idx === 4 ? "md:col-span-5" :
              "md:col-span-7";

            const gradient = toneGradients[s.tone] || toneGradients.navy;

            return (
              <motion.a
                key={s.title}
                href={s.ctaHref}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
                className={`${span} block`}
              >
                <GlassCard className="p-5 md:p-6 relative overflow-hidden">
                  {/* Soft gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-70`} />
                  <div className="relative">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm text-white/70">{s.badge}</div>
                        <div className="mt-2 text-xl md:text-2xl font-extrabold leading-tight">
                          {s.title}
                        </div>
                      </div>

                      <div className="shrink-0 px-3 py-1 rounded-xl bg-white/10 border border-white/10 text-sm font-semibold">
                        {s.price}
                      </div>
                    </div>

                    <p className="text-white/65 mt-3">{s.desc}</p>

                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/80">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      Tap to enquire on WhatsApp
                    </div>
                  </div>
                </GlassCard>
              </motion.a>
            );
          })}
        </div>

        <a
          href="/services"
          className="md:hidden mt-4 h-12 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/15 transition font-semibold grid place-items-center"
        >
          View all services
        </a>
      </div>
    </section>
  );
}
