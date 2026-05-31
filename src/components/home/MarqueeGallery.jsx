import { motion } from "framer-motion";

const GALLERY = [
  { src: "/home/collage/advert-1.jpg",  label: "Advert",  rotate: -1.5 },
  { src: "/home/collage/edit-1.jpg",    label: "Editing",  rotate: 1.2 },
  { src: "/home/collage/signage-1.jpg", label: "Signage", rotate: -0.8 },
  { src: "/home/collage/cac-1.jpg",     label: "CAC",     rotate: 1.8 },
  { src: "/image_cad10a.jpg",           label: "Featured", rotate: -1.2 },
];

/* Only keep items whose image actually loads — filter on error */
const DOUBLED = [...GALLERY, ...GALLERY];

export default function MarqueeGallery() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-20 md:w-40 z-20 bg-gradient-to-r from-[#EDE0CC] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 md:w-40 z-20 bg-gradient-to-l from-[#EDE0CC] to-transparent pointer-events-none" />

      <div className="flex gap-5 w-max animate-marquee py-6">
        {DOUBLED.map((item, idx) => (
          <MarqueeCard key={idx} item={item} idx={idx} />
        ))}
      </div>
    </div>
  );
}

function MarqueeCard({ item, idx }) {
  const [hidden, setHidden] = useState(false);

  if (hidden) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: item.rotate }}
      animate={{ opacity: 1, y: 0, rotate: item.rotate }}
      transition={{ delay: (idx % 5) * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 0.97, rotate: 0, transition: { duration: 0.4 } }}
      className="relative group flex-shrink-0 w-[200px] h-[280px] md:w-[280px] md:h-[380px]"
    >
      <div className="w-full h-full rounded-3xl overflow-hidden shadow-lg"
           style={{ border: "1px solid rgba(92,45,26,0.08)" }}>
        <img
          src={item.src}
          alt={item.label}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={() => setHidden(true)}
        />
        <div className="absolute inset-0 bg-espresso/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-3xl" />
      </div>

      {/* Label on hover */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 translate-y-2
                      group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-350 z-10 whitespace-nowrap">
        <span className="bg-cream-50 text-espresso px-5 py-2 rounded-full text-[10px]
                         font-black tracking-[0.25em] uppercase shadow-lg">
          {item.label}
        </span>
      </div>
    </motion.div>
  );
}

/* useState needed inside the component */
import { useState } from "react";
