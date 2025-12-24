// src/components/home/FloatingCollage.jsx
import { motion, useScroll, useTransform } from "framer-motion";
import ImgOrPlaceholder from "./ImgOrPlaceholder.jsx";

const ITEMS = [
  // Use public paths (you’ll drop images later in public/home/collage/)
  { src: "/home/collage/advert-1.jpg", label: "ADVERT", x: "6%",  y: "18%", w: 220, h: 150, r: -8 },
  { src: "/home/collage/edit-1.jpg",   label: "EDIT",   x: "64%", y: "12%", w: 240, h: 190, r: 7  },
  { src: "/home/collage/cac-1.jpg",    label: "CAC",    x: "72%", y: "46%", w: 210, h: 160, r: -5 },
  { src: "/home/collage/signage-1.jpg",label: "SIGNS",  x: "12%", y: "52%", w: 260, h: 200, r: 6  },

  { src: "/home/collage/denim-1.jpg",  label: "DENIM",  x: "40%", y: "64%", w: 220, h: 260, r: -10 },
  { src: "/home/collage/advert-2.jpg", label: "ADVERT", x: "2%",  y: "70%", w: 190, h: 170, r: 9  },
  { src: "/home/collage/edit-2.jpg",   label: "EDIT",   x: "52%", y: "34%", w: 200, h: 140, r: 4  },
  { src: "/home/collage/signage-2.jpg",label: "SIGNS",  x: "82%", y: "72%", w: 200, h: 180, r: -9 },
];

function LabelChip({ text }) {
  return (
    <div className="absolute -bottom-3 left-3 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] font-extrabold tracking-[0.18em] text-white/85 backdrop-blur-sm">
      {text}
    </div>
  );
}

export default function FloatingCollage() {
  // Parallax (super light)
  const { scrollYProgress } = useScroll();
  const yA = useTransform(scrollYProgress, [0, 1], [0, -16]);
  const yB = useTransform(scrollYProgress, [0, 1], [0, 12]);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Full-bleed ambient background */}
      <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_20%_20%,rgba(255,0,128,0.18),transparent_55%),radial-gradient(circle_at_80%_60%,rgba(0,140,255,0.16),transparent_55%)]" />
      <div className="absolute inset-0 bg-black/40" />

      {/* Floating images layer */}
      <div className="relative mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="relative h-[420px] md:h-[560px]">
          {ITEMS.map((it, idx) => {
            const drift = idx % 2 === 0 ? yA : yB;
            return (
              <motion.div
                key={`${it.label}-${idx}`}
                className="absolute"
                style={{ left: it.x, top: it.y }}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55 }}
              >
                <motion.div
                  className="relative will-change-transform"
                  style={{
                    width: it.w,
                    height: it.h,
                    transform: `rotate(${it.r}deg)`,
                  }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 7 + idx, repeat: Infinity, ease: "easeInOut" }}
                >
                  <motion.div style={{ y: drift }} className="h-full w-full">
                    <ImgOrPlaceholder
                      src={it.src}
                      alt={it.label}
                      className="h-full w-full"
                      rounded="rounded-2xl"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/12" />
                    <LabelChip text={it.label} />
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom fade so it blends into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-black/70" />
    </div>
  );
}
