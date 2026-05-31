import { motion } from "framer-motion";
import { Instagram, MessageCircle, Music2, MapPin, Phone } from "lucide-react";
import { brand } from "../data/content.js";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
});

export default function Contact() {
  return (
    <div className="min-h-screen bg-cream-50">

      {/* Hero */}
      <div className="bg-espresso pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.p {...fadeUp(0.1)} className="eyebrow text-sand mb-5">Get in touch</motion.p>
          <motion.h1
            {...fadeUp(0.2)}
            className="font-black tracking-tighter leading-[0.95] text-cream-50"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            Talk to
            <br />
            <span className="font-serif italic font-bold text-sand">us.</span>
          </motion.h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-5">

        {/* Info column */}
        <div className="flex flex-col gap-4">

          {/* Phone */}
          <motion.div {...fadeUp(0.1)} className="card-warm p-8">
            <p className="eyebrow mb-5">Call or WhatsApp</p>
            <div className="flex flex-col gap-3">
              {[brand.phone, "08144549849"].map((n) => (
                <a
                  key={n}
                  href={`tel:+234${n.slice(1)}`}
                  className="group flex items-center gap-3 hover:text-mocha transition-colors duration-300"
                >
                  <div className="w-9 h-9 rounded-xl bg-espresso/8 flex items-center justify-center
                                  group-hover:bg-espresso group-hover:text-cream-50 transition-all duration-300">
                    <Phone size={15} className="text-espresso group-hover:text-cream-50 transition-colors duration-300" strokeWidth={1.75} />
                  </div>
                  <span className="font-black text-xl text-espresso tracking-tight group-hover:text-mocha transition-colors duration-300">
                    {n}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Location */}
          <motion.div {...fadeUp(0.18)} className="card-warm p-8">
            <p className="eyebrow mb-5">Location</p>
            <div className="flex flex-col gap-3">
              {["Lagos (Ikorodu)", "Ilaro, Ogun State"].map((loc) => (
                <div key={loc} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-espresso/8 flex items-center justify-center flex-shrink-0">
                    <MapPin size={15} className="text-espresso" strokeWidth={1.75} />
                  </div>
                  <span className="font-semibold text-espresso text-base">{loc}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Socials */}
          <motion.div {...fadeUp(0.26)} className="card-warm p-8">
            <p className="eyebrow mb-5">Follow us</p>
            <div className="flex flex-col gap-2.5">
              <a
                href="https://www.instagram.com/bigfarrys?igsh=MTUxYTJwZmJhcGp2bg=="
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-xl bg-espresso/8 flex items-center justify-center
                                group-hover:bg-espresso transition-all duration-300">
                  <Instagram size={15} className="text-espresso group-hover:text-cream-50 transition-colors duration-300" />
                </div>
                <span className="text-espresso/60 text-sm font-semibold group-hover:text-espresso transition-colors duration-300">
                  @bigfarrys
                </span>
              </a>
              <a
                href="https://www.tiktok.com/@bigfarrys_xx?_r=1&_t=ZS-92Tl3sWNl2G"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-xl bg-espresso/8 flex items-center justify-center
                                group-hover:bg-espresso transition-all duration-300">
                  <Music2 size={15} className="text-espresso group-hover:text-cream-50 transition-colors duration-300" />
                </div>
                <span className="text-espresso/60 text-sm font-semibold group-hover:text-espresso transition-colors duration-300">
                  @bigfarrys_xx
                </span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* WhatsApp CTA card */}
        <motion.div
          {...fadeUp(0.15)}
          className="bg-espresso rounded-4xl p-10 md:p-14 flex flex-col justify-between min-h-[420px]"
        >
          <div>
            <p className="eyebrow text-sand mb-6">Fastest response</p>
            <h2
              className="font-black tracking-tighter leading-tight text-cream-50 mb-5"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Chat with us
              <br />
              <span className="font-serif italic font-bold text-sand">on WhatsApp.</span>
            </h2>
            <p className="text-cream-200/55 text-sm leading-relaxed max-w-xs">
              Tell us what you need. We typically respond within hours and get your project moving immediately.
            </p>
          </div>

          <a
            href="https://wa.me/2349069050668"
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex items-center gap-2.5 bg-cream-50 text-espresso
                       px-8 py-4 rounded-full font-black text-sm tracking-wide
                       hover:bg-cream-100 hover:scale-[1.03] transition-all duration-300 shadow-md self-start"
          >
            <MessageCircle size={16} fill="currentColor" />
            Open WhatsApp
          </a>
        </motion.div>
      </div>
    </div>
  );
}
