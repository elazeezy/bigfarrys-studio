import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

export default function ProofGallery({ images = [], label = "Client reviews", heading = "Real results, real clients." }) {
  const [lightbox, setLightbox] = useState(null); // index or null

  const close  = useCallback(() => setLightbox(null), []);
  const prev   = useCallback(() => setLightbox((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next   = useCallback(() => setLightbox((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e) => {
      if (e.key === "Escape")     close();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, close, prev, next]);

  // lock scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const rotations = [-2, 1.5, -1, 2.5, -1.8, 1, -2.5, 2, -0.8, 1.8];

  return (
    <section className="py-16 bg-[#EDE0CC] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-10">
        <p className="eyebrow mb-3">{label}</p>
        <h2
          className="font-black tracking-tighter text-espresso"
          style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
        >
          {heading}
        </h2>
        <p className="text-espresso/45 text-sm mt-2">Tap any screenshot to view full size.</p>
      </div>

      {/* Horizontal scroll strip */}
      <div className="flex gap-5 px-6 overflow-x-auto pb-6"
           style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {images.map((src, i) => (
          <motion.button
            key={src}
            type="button"
            onClick={() => setLightbox(i)}
            initial={{ opacity: 0, y: 20, rotate: rotations[i % rotations.length] }}
            animate={{ opacity: 1, y: 0, rotate: rotations[i % rotations.length] }}
            transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, rotate: 0, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex-shrink-0 relative group"
            style={{
              width: 200,
              background: "#fff",
              padding: 8,
              borderRadius: 12,
              boxShadow: "0 4px 20px rgba(92,45,26,0.15)",
            }}
          >
            <img
              src={src}
              alt={`Review ${i + 1}`}
              className="w-full rounded-lg object-cover"
              style={{ height: 280, objectPosition: "top" }}
              draggable={false}
            />
            {/* zoom hint */}
            <div className="absolute inset-0 flex items-center justify-center
                            opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                 style={{ borderRadius: 12, background: "rgba(92,45,26,0.18)" }}>
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow">
                <ZoomIn size={15} className="text-espresso" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(24, 10, 4, 0.92)", backdropFilter: "blur(12px)" }}
            onClick={close}
          >
            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={lightbox}
                src={images[lightbox]}
                alt={`Review ${lightbox + 1}`}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="max-h-[85vh] max-w-[90vw] rounded-2xl shadow-2xl object-contain"
                onClick={(e) => e.stopPropagation()}
                draggable={false}
              />
            </AnimatePresence>

            {/* Close */}
            <button
              type="button"
              onClick={close}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20
                         flex items-center justify-center transition-colors duration-200"
            >
              <X size={18} className="text-white" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2
                            bg-white/10 text-white text-xs font-bold tracking-widest uppercase
                            px-4 py-2 rounded-full">
              {lightbox + 1} / {images.length}
            </div>

            {/* Prev / Next */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2
                             w-11 h-11 rounded-full bg-white/10 hover:bg-white/20
                             flex items-center justify-center transition-colors duration-200"
                >
                  <ChevronLeft size={20} className="text-white" />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2
                             w-11 h-11 rounded-full bg-white/10 hover:bg-white/20
                             flex items-center justify-center transition-colors duration-200"
                >
                  <ChevronRight size={20} className="text-white" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
