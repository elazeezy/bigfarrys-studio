// src/components/home/MarqueeGallery.jsx
import ImgOrPlaceholder from "./ImgOrPlaceholder.jsx";

const ROW_1 = [
  { src: "/home/collage/advert-1.jpg", label: "ADVERT" },
  { src: "/home/collage/edit-1.jpg", label: "EDIT" },
  { src: "/home/collage/cac-1.jpg", label: "CAC" },
  { src: "/home/collage/signage-1.jpg", label: "SIGNS" },
  { src: "/home/collage/advert-2.jpg", label: "ADVERT" },
  { src: "/home/collage/edit-2.jpg", label: "EDIT" },
];

const ROW_2 = [
  { src: "/home/collage/signage-2.jpg", label: "SIGNS" },
  { src: "/home/collage/cac-2.jpg", label: "CAC" },
  { src: "/home/collage/edit-3.jpg", label: "EDIT" },
  { src: "/home/collage/advert-3.jpg", label: "ADVERT" },
  { src: "/home/collage/signage-3.jpg", label: "SIGNS" },
  { src: "/home/collage/cac-3.jpg", label: "CAC" },
];

function Tile({ src, label }) {
  return (
    <div className="relative h-[180px] w-[260px] md:h-[220px] md:w-[320px] shrink-0 overflow-hidden rounded-2xl border border-white/10">
      <ImgOrPlaceholder src={src} alt={label} className="h-full w-full" rounded="rounded-2xl" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
      <div className="absolute bottom-3 left-3 rounded-full bg-black/40 border border-white/10 px-3 py-1 text-[10px] font-extrabold tracking-[0.18em] text-white/85">
        {label}
      </div>
    </div>
  );
}

function MarqueeRow({ items, reverse = false }) {
  return (
    <div className="overflow-hidden">
      <div
        className={[
          "flex gap-4 py-3",
          reverse ? "animate-marquee-rev" : "animate-marquee",
        ].join(" ")}
      >
        {[...items, ...items].map((it, idx) => (
          <Tile key={`${it.label}-${idx}`} src={it.src} label={it.label} />
        ))}
      </div>
    </div>
  );
}

export default function MarqueeGallery() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 glass">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,42,166,0.18),transparent_55%),radial-gradient(circle_at_80%_40%,rgba(0,140,255,0.12),transparent_55%)]" />
      <div className="relative p-4 md:p-6">
        <MarqueeRow items={ROW_1} />
        <MarqueeRow items={ROW_2} reverse />
      </div>
    </div>
  );
}
