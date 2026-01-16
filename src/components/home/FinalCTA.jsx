import { Link } from "react-router-dom"; // Essential to fix the console error
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none uppercase">
            READY TO GO <br />
            <span className="text-pink-500 italic font-serif normal-case">Big?</span>
          </h2>
          
          <p className="text-white/40 text-lg md:text-xl max-w-xl mx-auto font-light">
            Stop blending in. Start dominating. Let’s engineer your visual authority today.
          </p>

          <div className="pt-4">
            <Link 
              to="/services" // Redirects to Studio/Services instead of Contact
              className="group relative inline-flex items-center gap-4 bg-pink-500 hover:bg-white text-white hover:text-pink-600 px-12 py-6 rounded-full font-black transition-all duration-500 shadow-[0_0_40px_rgba(236,72,153,0.3)]"
            >
              START YOUR PROJECT 
              <ArrowRight className="group-hover:translate-x-2 transition-transform" size={24} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}