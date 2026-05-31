import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const LOOKS = [
  { src: "/denim/look-01.jpg", label: "STREET" },
  { src: "/denim/look-02.jpg", label: "LUXE" },
  { src: "/denim/look-03.jpg", label: "CLASSIC" },
];

export default function DenimPreview() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <p className="eyebrow text-sand mb-3">Lifestyle Hub</p>
          <h2 className="heading-lg text-cream-50">PROOF.<br /><span className="font-serif italic font-bold opacity-40">Drops.</span></h2>
        </div>
        <Link
          to="/denim"
          className="self-start inline-flex items-center gap-3 bg-cream-50 text-espresso px-8 py-4
                     rounded-full font-black text-sm tracking-wide hover:scale-[1.04] transition-transform"
        >
          VISIT HUB <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {LOOKS.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -12 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative aspect-[3/4] rounded-4xl overflow-hidden border border-cream-50/10"
          >
            <img
              src={item.src}
              alt={item.label}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              onError={(e) => {
                e.target.parentElement.style.background = "rgba(92,45,26,0.4)";
                e.target.style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso-dark/60 to-transparent" />
            <div className="absolute bottom-5 left-5">
              <span className="bg-cream-50/15 backdrop-blur-md border border-cream-50/20
                               px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest text-cream-50">
                {item.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
