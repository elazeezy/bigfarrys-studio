import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const GALLERY = [
  { src: "/services/advert/ads1.jpeg",      label: "Advert",   rotate: -1.5 },
  { src: "/services/editing/edit1.jpeg",    label: "Editing",  rotate:  1.2 },
  { src: "/services/signage/signage2.jpeg", label: "Signage",  rotate: -0.8 },
  { src: "/services/advert/ads3.jpeg",      label: "Advert",   rotate:  1.8 },
  { src: "/services/editing/edit4.jpeg",    label: "Editing",  rotate: -1.2 },
  { src: "/services/signage/signage5.jpeg", label: "Signage",  rotate:  1.0 },
  { src: "/services/advert/ads6.jpeg",      label: "Advert",   rotate: -2.0 },
  { src: "/services/cac/cac1.jpeg",         label: "CAC",      rotate:  1.5 },
  { src: "/services/editing/edit7.jpeg",    label: "Editing",  rotate: -0.9 },
  { src: "/services/signage/signage8.jpeg", label: "Signage",  rotate:  1.3 },
];

const DOUBLED = [...GALLERY, ...GALLERY];

export default function MarqueeGallery() {
  const mobileRef   = useRef(null);
  const desktopRef  = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const CARD_W_MOBILE  = Math.min(0.72 * (typeof window !== "undefined" ? window.innerWidth : 375), 280) + 16; // card + gap
  const CARD_W_DESKTOP = 240 + 20; // card + gap

  const scrollBy = (ref, delta, isMobile) => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: delta, behavior: "smooth" });
    if (isMobile) {
      setActiveIdx((prev) => {
        const next = prev + (delta > 0 ? 1 : -1);
        return Math.max(0, Math.min(GALLERY.length - 1, next));
      });
    }
  };

  return (
    <div className="relative w-full overflow-hidden">

      {/* ── DESKTOP: marquee + arrow controls ── */}
      <div className="hidden md:block relative group/gallery">
        {/* Edge fades */}
        <div className="absolute inset-y-0 left-0 w-32 z-20 bg-gradient-to-r from-[#EDE0CC] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 z-20 bg-gradient-to-l from-[#EDE0CC] to-transparent pointer-events-none" />

        {/* Scrollable row (also has marquee animation when not interacted with) */}
        <div
          ref={desktopRef}
          className="flex gap-5 overflow-x-auto py-6 animate-marquee"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseEnter={() => {
            if (desktopRef.current) desktopRef.current.style.animationPlayState = "paused";
          }}
          onMouseLeave={() => {
            if (desktopRef.current) desktopRef.current.style.animationPlayState = "running";
          }}
        >
          {DOUBLED.map((item, idx) => (
            <DesktopCard key={idx} item={item} idx={idx} />
          ))}
        </div>

        {/* Arrow buttons — visible on hover */}
        <button
          type="button"
          onClick={() => scrollBy(desktopRef, -CARD_W_DESKTOP * 2, false)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30
                     w-11 h-11 rounded-full bg-cream-50 shadow-md flex items-center justify-center
                     opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300
                     hover:bg-white hover:scale-105"
          style={{ border: "1px solid rgba(92,45,26,0.12)" }}
        >
          <ChevronLeft size={18} className="text-espresso" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(desktopRef, CARD_W_DESKTOP * 2, false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30
                     w-11 h-11 rounded-full bg-cream-50 shadow-md flex items-center justify-center
                     opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300
                     hover:bg-white hover:scale-105"
          style={{ border: "1px solid rgba(92,45,26,0.12)" }}
        >
          <ChevronRight size={18} className="text-espresso" />
        </button>
      </div>

      {/* ── MOBILE: touch-swipe + arrow buttons ── */}
      <div className="md:hidden relative">
        {/* Swipeable scroll row */}
        <div
          ref={mobileRef}
          className="flex gap-4 overflow-x-auto px-6 py-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onScroll={() => {
            if (!mobileRef.current) return;
            const cardW = mobileRef.current.scrollWidth / GALLERY.length;
            const idx   = Math.round(mobileRef.current.scrollLeft / cardW);
            setActiveIdx(Math.max(0, Math.min(GALLERY.length - 1, idx)));
          }}
        >
          {GALLERY.map((item, idx) => (
            <MobileCard key={idx} item={item} idx={idx} />
          ))}
        </div>

        {/* Arrow + counter row */}
        <div className="flex items-center justify-between px-6 mt-1 pb-2">
          <button
            type="button"
            onClick={() => scrollBy(mobileRef, -CARD_W_MOBILE, true)}
            disabled={activeIdx === 0}
            className="w-9 h-9 rounded-full flex items-center justify-center
                       transition-all duration-200 disabled:opacity-25"
            style={{ border: "1px solid rgba(92,45,26,0.15)", background: "rgba(92,45,26,0.05)" }}
          >
            <ChevronLeft size={16} className="text-espresso" />
          </button>

          {/* Dot indicators */}
          <div className="flex gap-1.5">
            {GALLERY.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  if (!mobileRef.current) return;
                  mobileRef.current.scrollTo({ left: i * CARD_W_MOBILE, behavior: "smooth" });
                  setActiveIdx(i);
                }}
                className="rounded-full transition-all duration-300"
                style={{
                  width:  i === activeIdx ? 18 : 6,
                  height: 6,
                  background: i === activeIdx ? "rgba(92,45,26,0.6)" : "rgba(92,45,26,0.2)",
                }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollBy(mobileRef, CARD_W_MOBILE, true)}
            disabled={activeIdx === GALLERY.length - 1}
            className="w-9 h-9 rounded-full flex items-center justify-center
                       transition-all duration-200 disabled:opacity-25"
            style={{ border: "1px solid rgba(92,45,26,0.15)", background: "rgba(92,45,26,0.05)" }}
          >
            <ChevronRight size={16} className="text-espresso" />
          </button>
        </div>
      </div>

    </div>
  );
}

function DesktopCard({ item, idx }) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: item.rotate }}
      animate={{ opacity: 1, y: 0,  rotate: item.rotate }}
      transition={{ delay: (idx % 10) * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 0.97, rotate: 0, transition: { duration: 0.35 } }}
      className="relative group flex-shrink-0 w-[240px] h-[320px]"
    >
      <div className="w-full h-full rounded-3xl overflow-hidden shadow-lg bg-cream-200"
           style={{ border: "1px solid rgba(92,45,26,0.08)" }}>
        <img
          src={item.src}
          alt={item.label}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={() => setHidden(true)}
          draggable={false}
        />
        <div className="absolute inset-0 bg-espresso/18 opacity-0 group-hover:opacity-100
                        transition-opacity duration-400 rounded-3xl" />
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 translate-y-2
                      group-hover:opacity-100 group-hover:translate-y-0
                      transition-all duration-300 z-10 whitespace-nowrap">
        <span className="bg-cream-50 text-espresso px-4 py-1.5 rounded-full text-[10px]
                         font-black tracking-[0.25em] uppercase shadow-lg">
          {item.label}
        </span>
      </div>
    </motion.div>
  );
}

function MobileCard({ item, idx }) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex-shrink-0 snap-center w-[72vw] max-w-[280px]"
    >
      <div className="rounded-3xl overflow-hidden shadow-md bg-cream-200"
           style={{ height: 320, border: "1px solid rgba(92,45,26,0.08)" }}>
        <img
          src={item.src}
          alt={item.label}
          className="w-full h-full object-cover"
          onError={() => setHidden(true)}
          draggable={false}
        />
        {/* Bottom gradient + label */}
        <div className="absolute bottom-0 left-0 right-0 h-20 rounded-b-3xl"
             style={{ background: "linear-gradient(to top, rgba(92,45,26,0.55), transparent)" }} />
        <div className="absolute bottom-4 left-4">
          <span className="text-[10px] font-black tracking-[0.25em] uppercase text-cream-50/80">
            {item.label}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
