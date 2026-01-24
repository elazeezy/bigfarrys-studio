import { Link } from "react-router-dom"; // Essential to fix the console error
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="py-32 bg-slate-950 flex flex-col items-center text-center px-6">
      <h2 className="text-6xl md:text-9xl font-black text-white mb-6 uppercase tracking-tighter">
        READY TO GO <br/>
        <span className="text-pink-500">BIG?</span>
      </h2>
      <p className="text-slate-400 text-xl mb-12 max-w-xl">
        Stop blending in. Start dominating your industry with a visual authority that sells.
      </p>
      <button className="bg-pink-500 hover:bg-pink-600 text-white px-12 py-6 rounded-full font-black text-xl transition-all pink-glow hover:scale-105">
        START YOUR PROJECT →
      </button>
    </section>
  );
}