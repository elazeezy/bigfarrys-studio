import { Instagram, MessageCircle, Music2 } from "lucide-react";

export default function Footer() {
  return (
    // pb-28 ensures the footer content is visible above the mobile bottom nav
    // md:pb-8 resets it for desktop where there is no bottom bar
    <footer className="px-3 pb-28 md:pb-8 pt-4">
      <div className="mx-auto max-w-6xl glass rounded-3xl border border-white/10 px-6 py-5 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Brand Identity */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="text-sm font-bold text-white tracking-tight">
              © {new Date().getFullYear()} BIGFARRYS STUDIO
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-pink-500 font-black">
              The Visual Authority
            </div>
          </div>

          {/* Right: Social Ecosystem */}
          <div className="flex items-center gap-4">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/bigfarrys?igsh=MTUxYTJwZmJhcGp2bg=="
              target="_blank"
              rel="noreferrer"
              className="h-11 w-11 rounded-2xl bg-white/5 border border-white/10 grid place-items-center hover:bg-white/10 hover:border-pink-500/50 transition-all duration-300 group"
            >
              <Instagram size={20} className="group-hover:text-pink-500 transition-colors" />
            </a>

            {/* TikTok - Swapped text for Icon */}
            <a
              href="https://www.tiktok.com/@bigfarrys_xx?_r=1&_t=ZS-92Tl3sWNl2G"
              target="_blank"
              rel="noreferrer"
              className="h-11 w-11 rounded-2xl bg-white/5 border border-white/10 grid place-items-center hover:bg-white/10 hover:border-pink-500/50 transition-all duration-300 group"
            >
              <Music2 size={20} className="group-hover:text-pink-500 transition-colors" />
            </a>

            {/* WhatsApp - The Main CTA */}
            <a
              href="https://wa.me/2349069050668"
              target="_blank"
              rel="noreferrer"
              className="h-11 w-11 rounded-2xl bg-pink-500 text-white grid place-items-center hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(236,72,153,0.3)]"
            >
              <MessageCircle size={20} fill="currentColor" className="text-pink-100" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}