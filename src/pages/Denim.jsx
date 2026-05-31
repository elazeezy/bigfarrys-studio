import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ArrowRight, Image } from "lucide-react";
import { brand } from "../data/content.js";

const WA_TEXT = "Hi BIGFARRYS! I am interested in a Denim look. I will send a screenshot now.";
const WA_LINK = `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(WA_TEXT)}`;

const LOOKS = [
  { src: "/denim/look-01.jpg", label: "Look 01" },
  { src: "/denim/look-02.jpg", label: "Look 02" },
  { src: "/denim/look-03.jpg", label: "Look 03" },
  { src: "/denim/look-04.jpg", label: "Look 04" },
  { src: "/denim/look-05.jpg", label: "Look 05" },
  { src: "/denim/look-06.jpg", label: "Look 06" },
];

/* Individual card — hides itself if image fails to load */
function LookCard({ src, label, index }) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
      className="group relative overflow-hidden rounded-3xl bg-cream-200 cursor-pointer"
      style={{ border: "1px solid rgba(92,45,26,0.08)" }}
    >
      <div className="aspect-[3/4]">
        <img
          src={src}
          alt={label}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.04]"
          onError={() => setFailed(true)}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-espresso-dark/60 via-transparent to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

      {/* Label */}
      <div className="absolute bottom-4 left-4 translate-y-2 opacity-0
                      group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-350">
        <span className="bg-cream-50/15 backdrop-blur-md text-cream-50 px-4 py-1.5 rounded-full
                         text-[10px] font-black tracking-widest uppercase"
              style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
          {label} · Screenshot and send
        </span>
      </div>
    </motion.div>
  );
}

export default function Denim() {
  return (
    <div className="min-h-screen bg-cream-50">

      {/* Hero */}
      <div className="bg-espresso-dark pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="eyebrow text-sand mb-5"
          >
            Denim Hub
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="font-black tracking-tighter leading-[0.95] text-cream-50 mb-5"
            style={{ fontSize: "clamp(2.8rem, 8vw, 6.5rem)" }}
          >
            Looks,
            <br />
            <span className="font-serif italic font-bold text-sand">not a store.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="text-cream-200/60 max-w-md text-sm leading-relaxed mb-10"
          >
            Designs vary and prices change, so this page is a lookbook only.
            If you love a look, screenshot it and send it on WhatsApp and we will confirm availability and price.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.44 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 bg-sand text-espresso px-7 py-3.5
                         rounded-full font-black text-sm tracking-wide hover:bg-bark hover:text-cream-50
                         transition-all duration-300"
            >
              <MessageCircle size={15} fill="currentColor" /> Ask on WhatsApp
            </a>
            <div className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-cream-50/40 text-sm font-semibold"
                 style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
              <Image size={14} />
              Screenshot the look you want
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lookbook grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {LOOKS.map((look, i) => (
            <LookCard key={look.src} {...look} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 bg-espresso rounded-4xl p-10 md:p-14 flex flex-col md:flex-row
                     items-start md:items-center justify-between gap-8"
        >
          <div>
            <p className="eyebrow text-sand mb-3">Want this look?</p>
            <h2 className="font-black text-2xl md:text-3xl tracking-tight text-cream-50 leading-tight">
              Screenshot it and
              <br />
              <span className="font-serif italic font-bold text-sand">send it to us.</span>
            </h2>
            <p className="text-cream-200/50 text-sm mt-3 max-w-xs leading-relaxed">
              We will confirm availability, current price, and get you sorted quickly.
            </p>
          </div>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 bg-cream-50 text-espresso
                       px-8 py-4 rounded-full font-black text-sm tracking-wide flex-shrink-0
                       hover:bg-white hover:scale-[1.03] transition-all duration-300 shadow-md"
          >
            <MessageCircle size={15} fill="currentColor" />
            Message Us on WhatsApp
          </a>
        </motion.div>
      </div>
    </div>
  );
}
