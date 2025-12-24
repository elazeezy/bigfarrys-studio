import { Instagram, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="px-3 pb-6">
      <div className="mx-auto max-w-6xl glass rounded-2xl border border-white/10 px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Left */}
          <div className="text-sm text-white/70">
            © {new Date().getFullYear()} BIGFARRYS Studio — All rights reserved.
          </div>

          {/* Right (social icons) */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/bigfarrys?igsh=MTUxYTJwZmJhcGp2bg=="
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 grid place-items-center hover:bg-white/10 transition"
            >
              <Instagram size={18} />
            </a>

            {/* TikTok icon (simple text badge for now, we can swap to SVG later) */}
            <a
              href="https://www.tiktok.com/@bigfarrys_xx?_r=1&_t=ZS-92Tl3sWNl2G"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 grid place-items-center hover:bg-white/10 transition text-xs font-bold"
            >
              TT
            </a>

            <a
              href="https://wa.me/2349069050668"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="h-10 w-10 rounded-xl bg-pink-500/90 hover:bg-pink-500 text-white grid place-items-center transition shadow-lg shadow-pink-500/25"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
