// src/components/home/DenimPreview.jsx
import { Link } from "react-router-dom";
import ImgOrPlaceholder from "./ImgOrPlaceholder.jsx";

const DENIM = [
  "/home/collage/denim-1.jpg",
  "/home/collage/denim-2.jpg",
  "/home/collage/denim-1.jpg",
];

export default function DenimPreview() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-white/60">Denim Hub</div>
          <h2 className="mt-2 text-2xl md:text-4xl font-extrabold tracking-tight">
            Lifestyle. Proof. Drops.
          </h2>
          <p className="mt-2 max-w-2xl text-sm md:text-base text-white/70">
            Not a shop — just vibes + proof. Order when ready.
          </p>
        </div>

        <Link
          to="/denim-hub"
          className="hidden md:inline-flex rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-extrabold hover:bg-white/10"
        >
          Visit Denim Hub →
        </Link>
      </div>

      <div className="mt-5 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {DENIM.map((src, idx) => (
          <div key={idx} className="min-w-[220px] md:min-w-[280px]">
            <div className="aspect-[3/4]">
              <ImgOrPlaceholder src={src} alt="Denim" className="h-full w-full" />
            </div>
          </div>
        ))}
      </div>

      <Link
        to="/denim-hub"
        className="mt-4 inline-flex md:hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-extrabold hover:bg-white/10"
      >
        Visit Denim Hub →
      </Link>
    </div>
  );
}
