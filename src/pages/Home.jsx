// src/pages/Home.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { brand } from "../data/content.js";

import HomeShell from "../components/home/HomeShell.jsx";
import SnapSection from "../components/home/SnapSection.jsx";
import SectionNav from "../components/home/SectionNav.jsx";
import ImgOrPlaceholder from "../components/home/ImgOrPlaceholder.jsx";
import FloatingCollage from "../components/home/FloatingCollage.jsx";
import ServicesGrid from "../components/home/ServicesGrid.jsx";
import HowItWorks from "../components/home/HowItWorks.jsx";
import Ratings from "../components/home/Ratings.jsx";
import DenimPreview from "../components/home/DenimPreview.jsx";
import FinalCTA from "../components/home/FinalCTA.jsx";
import MarqueeGallery from "../components/home/MarqueeGallery.jsx";

export default function Home() {
  return (
    <HomeShell>
      {/* HERO */}
      {/* HERO (full image + overlay text) */}
<section id="hero" className="relative">
  <div className="relative mx-auto w-full max-w-6xl px-4 md:px-6 pt-4 md:pt-8 pb-10">
    <div className="relative overflow-hidden rounded-3xl border border-white/10">
      {/* Full image background */}
      <div className="absolute inset-0">
       <img
  src="/home/hero/founder.jpg"
  alt="BIGFARRYS Founder"
  className="h-full w-full object-cover object-top md:object-center"
/>

        {/* Overlay (fade image + add girly glow) */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,42,166,0.22),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(0,140,255,0.16),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative px-5 pt-16 pb-10 md:px-10 md:pt-20 md:pb-16">
        <div className="text-xs uppercase tracking-[0.18em] text-white/70">
          BIGFARRYS • Lagos (Ikorodu) • Ilaro, Ogun State
        </div>

        <h1 className="mt-4 max-w-3xl text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.02]">
          Make your brand
          <span className="block gradient-text">impossible to ignore.</span>
        </h1>

        <p className="mt-4 max-w-xl text-sm md:text-base text-white/75">
          At BIGFARRYS, we believe your business, brand, and personal style deserve nothing less than excellence. That’s why we’ve created a full range of services designed to elevate you, your ideas, and your visibility.
Tell us which of our services do you need today? 🫶🏽

        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/services"
            className="inline-flex justify-center rounded-2xl border border-white/10 bg-white/15 px-5 py-4 text-sm font-extrabold hover:bg-white/20"
          >
            Explore Services →
          </Link>

          <button
            type="button"
            onClick={() => {
              const shell = document.getElementById("home-shell");
              const el = document.getElementById("gallery");
              if (!shell || !el) return;
              const shellTop = shell.getBoundingClientRect().top;
              const elTop = el.getBoundingClientRect().top;
              shell.scrollTo({ top: shell.scrollTop + (elTop - shellTop) - 12, behavior: "smooth" });
            }}
            className="inline-flex justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-extrabold hover:bg-white/10"
          >
            See results ↓
          </button>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="glass rounded-2xl px-4 py-4">
            <div className="text-lg font-extrabold">Fast</div>
            <div className="text-xs text-white/65 mt-1">Delivery + support</div>
          </div>
          <div className="glass rounded-2xl px-4 py-4">
            <div className="text-lg font-extrabold">Premium</div>
            <div className="text-xs text-white/65 mt-1">Clean, girly, bold</div>
          </div>
          <div className="glass rounded-2xl px-4 py-4">
            <div className="text-lg font-extrabold">Website-first</div>
            <div className="text-xs text-white/65 mt-1">WhatsApp summary only</div>
          </div>
        </div>

        <SectionNav nextId="gallery" showPrev={false} className="justify-end" />
      </div>
    </div>
  </div>
</section>

      {/* COLLAGE (full-bleed background feel) */}
      <section id="gallery" className="relative py-10 md:py-14">
  <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
    <div className="text-xs uppercase tracking-[0.18em] text-white/60">RESULTS</div>
    <h2 className="mt-2 text-2xl md:text-4xl font-extrabold tracking-tight">
      Proof that sells.
    </h2>
    <p className="mt-2 max-w-2xl text-sm md:text-base text-white/70">
      Clean work. Girly feel. Real outcomes.
    </p>

    <div className="mt-6">
      <MarqueeGallery />
    </div>

    <SectionNav prevId="hero" nextId="services" />
  </div>
</section>

      {/* SERVICES */}
      <SnapSection id="services">
        <ServicesGrid />
        <SectionNav prevId="gallery" nextId="how-it-works" />
      </SnapSection>

      {/* HOW IT WORKS */}
      <SnapSection id="how-it-works">
        <HowItWorks />
        <SectionNav prevId="services" nextId="ratings" />
      </SnapSection>

      {/* RATINGS */}
      <SnapSection id="ratings">
        <Ratings />
        <SectionNav prevId="how-it-works" nextId="denim" />
      </SnapSection>

      {/* DENIM */}
      <SnapSection id="denim">
        <DenimPreview />
        <SectionNav prevId="ratings" nextId="final" />
      </SnapSection>

      {/* FINAL CTA */}
      <SnapSection id="final">
        <FinalCTA />
        <SectionNav prevId="denim" showNext={false} />
      </SnapSection>
    </HomeShell>
  );
}
