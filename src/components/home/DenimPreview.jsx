import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ImgOrPlaceholder from "./ImgOrPlaceholder.jsx";

const DENIM = [
  { src: "/denim/look-01.jpg", label: "STREET" },
  { src: "/denim/look-02.jpg", label: "LUXE" },
  { src: "/denim/look-03.jpg", label: "CLASSIC" },
];

export default function DenimPreview() {
  return (
    <div className="relative group">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-2">
          <span className="text-pink-500 font-black tracking-[0.4em] text-[10px] uppercase">Lifestyle Hub</span>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">PROOF.<br/><span className="italic font-serif opacity-50">DROPS.</span></h2>
        </div>
        <Link to="/denim-hub" className="group flex items-center gap-4 bg-white text-navy-base px-8 py-4 rounded-full font-black text-sm transition-transform hover:scale-105">
          VISIT HUB <span className="group-hover:translate-x-2 transition-transform">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DENIM.map((item, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -20 }}
            className="relative aspect-[3/4] rounded-[3rem] overflow-hidden border border-white/5"
          >
            <ImgOrPlaceholder src={item.src} className="h-full w-full grayscale hover:grayscale-0 transition-all duration-700" />
            <div className="absolute bottom-6 left-6">
              <span className="bg-black/20 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-[10px] font-bold tracking-widest text-white">
                {item.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}