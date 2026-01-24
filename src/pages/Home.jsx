import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";

// Components
import HomeShell from "../components/home/HomeShell.jsx";
import MarqueeGallery from "../components/home/MarqueeGallery.jsx";
import ServicesGrid from "../components/home/ServicesGrid.jsx";
import DenimPreview from "../components/home/DenimPreview.jsx";
import FinalCTA from "../components/home/FinalCTA.jsx";
import HowItWorks from "../components/home/HowItWorks.jsx";

export default function Home() {
  const { scrollYProgress } = useScroll();
  
  // Background Image Animation (Keeping your cinematic shrink)
  const imgScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.4]);
  const imgBlur = useTransform(scrollYProgress, [0, 0.2], ["blur(0px)", "blur(15px)"]);

  return (
    <HomeShell>
      {/* 1. HERO SECTION - Back to the Pink Vibe */}
      <section className="relative h-screen bg-[#050505] flex items-center justify-center overflow-hidden">
        
        {/* BACKGROUND ANIMATION */}
        <motion.div 
          style={{ scale: imgScale, opacity: imgOpacity, filter: imgBlur }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="/home/hero/founder.jpg" 
            alt="Bigfarrys Founder" 
            className="w-full h-full object-cover object-top"
          />
          {/* Subtle Pink Overlays */}
          <div className="absolute inset-0 bg-black/40 md:bg-black/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]" />
        </motion.div>

        {/* HERO TEXT */}
        {/* HERO TEXT */}
<div className="relative z-10 text-center px-6 max-w-7xl">
  {/* The "Small Label" */}
  <div className="mb-6 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-pink-500/30 bg-pink-500/5 backdrop-blur-md">
    <span className="text-[10px] font-black tracking-[0.4em] text-pink-500 uppercase">
      The Visual Authority Studio
    </span>
  </div>

  {/* The Power Headline */}
  <h1 className="text-[10vw] md:text-[8rem] font-black tracking-tighter leading-[0.85] mb-8 text-white uppercase">
    MAKE YOUR BRAND <br />
    <span className="text-pink-500 italic font-serif normal-case drop-shadow-[0_0_30px_rgba(236,72,153,0.3)]">
      Impossible to ignore.
    </span>
  </h1>

  <p className="text-lg md:text-2xl text-slate-300 max-w-2xl mx-auto font-medium leading-tight mb-12">
    At BIGFARRYS, we help your brand make more money through advertisemnts, signs and prints, designs and lots more. Ready ? 
    click the button below and be happier in a week. 
  </p>
  
  {/* The High-End Button */}
  <Link to="/services" className="group relative inline-flex items-center gap-4 bg-pink-500 px-12 py-6 rounded-full text-white font-black hover:scale-105 transition-all duration-500">
    START YOUR PROJECT
    <ArrowRight className="group-hover:translate-x-2 transition-transform" />
    <div className="absolute inset-0 rounded-full bg-pink-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
  </Link>
</div>
      </section>

      {/* 2. RATINGS SECTION - Visual Trust with Pink Accents */}
      <section className="relative z-20 pb-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 md:p-20 shadow-2xl">
            <div className="grid lg:grid-cols-3 gap-16 items-center">
              <div className="text-center lg:text-left">
                <div className="flex justify-center lg:justify-start gap-1 text-pink-500 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={28} />)}
                </div>
                <h2 className="text-6xl font-black text-white tracking-tighter">5.0</h2>
                <p className="text-white/40 uppercase tracking-[0.3em] text-xs font-bold mt-2">Client Satisfaction</p>
              </div>
              
              <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <p className="text-white/70 italic font-serif text-xl leading-relaxed">
                    "Bigfarrys took my brand from "unknown" to public in just one week."
                  </p>
                  <div className="h-px w-12 bg-pink-500" />
                  <span className="block text-[10px] font-black text-white/40 uppercase tracking-widest"> Fashion Brand</span>
                </div>
                <div className="space-y-4">
                  <p className="text-white/70 italic font-serif text-xl leading-relaxed">
                    "The ROI was instant. The most professional creative direction we've ever had."
                  </p>
                  <div className="h-px w-12 bg-pink-500" />
                  <span className="block text-[10px] font-black text-white/40 uppercase tracking-widest">Skin care Brand</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONTENT FLOW */}
      <div className="bg-[#050505]">
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 mb-16">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white">SELECTED WORK</h2>
          </div>
          <MarqueeGallery />
        </section>

        <HowItWorks />

        {/* Clean wrapping to fix the Vite Error */}
        <div className="max-w-7xl mx-auto px-6 space-y-32 py-32">
          <ServicesGrid />
          <DenimPreview />
        </div>

        <FinalCTA />
      </div>

    </HomeShell>
  );
}