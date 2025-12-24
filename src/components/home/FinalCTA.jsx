// src/components/home/FinalCTA.jsx
import { Link } from "react-router-dom";

export default function FinalCTA() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
      <div className="rounded-[44px] border border-white/10 bg-white/5 p-6 md:p-10 overflow-hidden relative">
        <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_25%_25%,rgba(255,0,128,0.22),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(0,140,255,0.18),transparent_55%)]" />
        <div className="relative">
          <div className="text-xs uppercase tracking-[0.18em] text-white/60">Ready</div>
          <h2 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight">
            Welcome to BIGFARRYS.
          </h2>
          <p className="mt-2 max-w-2xl text-sm md:text-base text-white/70">
            Explore services, submit your order on the website, upload files safely, and send one clean summary.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/services"
              className="inline-flex justify-center rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-sm font-extrabold hover:bg-white/15"
            >
              Explore Services →
            </Link>
            <Link
              to="/services/advert"
              className="inline-flex justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-extrabold hover:bg-white/10"
            >
              Start an Order →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
