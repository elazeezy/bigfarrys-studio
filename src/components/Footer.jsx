import { Link } from "react-router-dom";
import { Instagram, MessageCircle, Music2, MapPin } from "lucide-react";

const NAV = [
  { label: "Home",     to: "/" },
  { label: "Services", to: "/services" },
  { label: "Denim",    to: "/denim" },
  { label: "Contact",  to: "/contact" },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/bigfarrys?igsh=MTUxYTJwZmJhcGp2bg==",
    Icon: Instagram,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@bigfarrys_xx?_r=1&_t=ZS-92Tl3sWNl2G",
    Icon: Music2,
  },
];

export default function Footer() {
  return (
    <footer className="bg-espresso-dark px-6 pb-32 md:pb-12 pt-16">
      <div className="max-w-6xl mx-auto">

        {/* Top */}
        <div className="grid md:grid-cols-3 gap-12 pb-12 border-b border-cream-50/8">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="font-black text-2xl tracking-tighter text-cream-50 mb-1">BIGFARRYS</p>
            <p className="eyebrow text-sand mb-5">The Visual Authority Studio</p>
            <div className="flex items-center gap-2 text-cream-50/35 text-xs mb-2">
              <MapPin size={11} strokeWidth={2} />
              <span>Lagos (Ikorodu)</span>
            </div>
            <div className="flex items-center gap-2 text-cream-50/35 text-xs">
              <MapPin size={11} strokeWidth={2} />
              <span>Ilaro, Ogun State</span>
            </div>
          </div>

          {/* Nav */}
          <div className="md:col-span-1">
            <p className="eyebrow text-sand/60 mb-5">Navigation</p>
            <div className="flex flex-col gap-3">
              {NAV.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-cream-50/50 hover:text-cream-50 text-sm font-semibold
                             tracking-wide transition-colors duration-300 w-fit"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact + Socials */}
          <div className="md:col-span-1">
            <p className="eyebrow text-sand/60 mb-5">Get in touch</p>
            <a
              href="https://wa.me/2349069050668"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 bg-sand text-espresso px-6 py-3 rounded-full
                         font-black text-xs tracking-wider hover:bg-bark hover:text-cream-50
                         transition-all duration-300 mb-6"
            >
              <MessageCircle size={13} fill="currentColor" />
              Chat on WhatsApp
            </a>

            <div className="flex gap-2.5">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-cream-50/12 bg-cream-50/5
                             grid place-items-center text-cream-50/40 hover:text-cream-50
                             hover:bg-cream-50/12 hover:border-cream-50/25 transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-cream-50/25 text-xs tracking-widest font-medium">
            {new Date().getFullYear()} BIGFARRYS STUDIO
          </p>
          <p className="text-cream-50/20 text-xs">
            Prices are non-negotiable. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
