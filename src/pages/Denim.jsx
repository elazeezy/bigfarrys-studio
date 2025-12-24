// src/pages/Denim.jsx
import { brand } from "../data/content.js";

const WHATSAPP = (text) =>
  `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(text)}`;

const LOOKS = [
  { src: "/denim/look-01.jpg", title: "Denim Look 01" },
  { src: "/denim/look-02.jpg", title: "Denim Look 02" },
  { src: "/denim/look-03.jpg", title: "Denim Look 03" },
  { src: "/denim/look-04.jpg", title: "Denim Look 04" },
  { src: "/denim/look-05.jpg", title: "Denim Look 05" },
  { src: "/denim/look-06.jpg", title: "Denim Look 06" },
];

export default function Denim() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-6 pt-6 md:pt-10">
      <div className="glass rounded-3xl border border-white/10 p-5 md:p-8">
        <div className="text-xs uppercase tracking-[0.18em] text-white/60">
          Denim Hub
        </div>

        <h1 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight">
          Looks, not a store.
        </h1>

        <p className="mt-3 max-w-2xl text-sm md:text-base text-white/70">
          Designs vary and prices change — so this page is a lookbook. If you love a look,
          message us with a screenshot and we’ll confirm availability and current price.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a
            href={WHATSAPP("Hi BIGFARRYS! I’m interested in a Denim look. I’ll send a screenshot here.")}
            className="inline-flex items-center justify-center rounded-2xl bg-white/15 border border-white/10 px-5 py-4 text-sm font-extrabold hover:bg-white/20"
          >
            Ask on WhatsApp →
          </a>

          <div className="inline-flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-sm font-semibold text-white/75">
            Tip: screenshot the look you want
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 pb-8">
        {LOOKS.map((l) => (
          <div
            key={l.src}
            className="relative overflow-hidden rounded-3xl border border-white/10 glass"
          >
            <div className="aspect-[4/5]">
              <img
                src={l.src}
                alt={l.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <div className="text-xs font-extrabold tracking-tight">{l.title}</div>
              <div className="text-[11px] text-white/70">Screenshot & send</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
