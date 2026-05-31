import { motion } from "framer-motion";
import { services } from "../data/content.js";
import { ArrowUpRight } from "lucide-react";

export default function BentoServices() {
  return (
    /* We add the id="services-section" here */
    <section id="services-section" className="section-pad bg-navy-base">
      <div className="mx-auto max-w-7xl">
        
        {/* Title row - Bold & Impactful */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <div className="max-w-3xl">
            <span className="text-pink-500 font-black tracking-[0.4em] text-xs uppercase">Premium Solutions</span>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mt-4 text-white">
              SERVICES THAT GET <br /> YOU <span className="gradient-text">SEEN.</span>
            </h2>
          </div>
          <p className="text-white/40 text-lg italic max-w-xs md:text-right border-l md:border-l-0 md:border-r border-white/10 pl-6 md:pl-0 md:pr-6">
            Tap any service to message BIGFARRYS instantly.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {services.map((s, idx) => {
            // High-end Bento Sizing Logic
            const span =
              idx === 0 ? "md:col-span-8 md:h-[500px]" :
              idx === 1 ? "md:col-span-4 md:h-[500px]" :
              idx === 2 ? "md:col-span-4 md:h-[450px]" :
              idx === 3 ? "md:col-span-8 md:h-[450px]" :
              "md:col-span-6 md:h-[400px]";

            return (
              <motion.a
                key={s.title}
                href={s.ctaHref}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className={`${span} group relative block overflow-hidden rounded-[3.5rem] border border-white/10 bg-white/5 p-10 transition-all duration-500 hover:bg-white/10`}
              >
                {/* Background Glow Effect */}
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-pink-500/10 blur-[80px] group-hover:bg-pink-500/20 transition-all duration-700" />
                
                <div className="relative h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/40 group-hover:text-pink-500 transition-colors">
                        {s.badge}
                      </span>
                      <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-white leading-tight">
                        {s.title}
                      </h3>
                    </div>
                    
                    {/* Minimalist Price Tag */}
                    <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold text-white/60 group-hover:border-pink-500 group-hover:text-white transition-all">
                      {s.price}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-6">
                    <p className="text-white/40 text-lg font-light leading-relaxed max-w-md group-hover:text-white/70 transition-colors">
                      {s.desc}
                    </p>

                    <div className="flex items-center gap-4">
                       <div className="h-12 w-12 rounded-full bg-white text-navy-base flex items-center justify-center group-hover:bg-pink-500 group-hover:text-white transition-all duration-500">
                          <ArrowUpRight size={20} />
                       </div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-white/20 group-hover:text-white transition-colors">
                         Secure Slot via WhatsApp
                       </span>
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
            <a href="/services" className="text-white/20 hover:text-pink-500 transition-colors font-black uppercase tracking-[0.5em] text-[10px]">
                Explore Full Directory — Explore Full Directory
            </a>
        </div>
      </div>
    </section>
  );
}