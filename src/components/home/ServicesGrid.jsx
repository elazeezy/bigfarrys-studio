// src/components/home/ServicesGrid.jsx
import { Link } from "react-router-dom";
import ImgOrPlaceholder from "./ImgOrPlaceholder.jsx";
import { services } from "../../data/content.js";

const serviceImage = (slug) => `/home/services/${slug}.jpg`;

export default function ServicesGrid() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
      <div className="mb-5">
        <div className="text-xs uppercase tracking-[0.18em] text-white/60">Services</div>
        <h2 className="mt-2 text-2xl md:text-4xl font-extrabold tracking-tight">
          Everything you need, inside one home.
        </h2>
        <p className="mt-2 max-w-2xl text-sm md:text-base text-white/70">
          Choose a service, see full details, upload files, pay by transfer, and send a summary.
        </p>
      </div>

      <div className="grid gap-4 md:gap-5 md:grid-cols-2">
        {services.map((s) => (
          <Link
            key={s.slug}
            to={`/services/${s.slug}`}
            className="group rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition overflow-hidden"
          >
            <div className="aspect-[16/9] w-full">
              <ImgOrPlaceholder src={serviceImage(s.slug)} alt={s.title} className="h-full w-full" />
            </div>

            <div className="p-4 md:p-5">
              <div className="text-xs text-white/60">{s.badge}</div>
              <div className="mt-2 text-lg md:text-xl font-extrabold tracking-tight">
                {s.title}
              </div>
              <div className="mt-1 text-sm text-white/70">{s.short}</div>

              <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/80 group-hover:text-white">
                View details <span className="text-white/50 group-hover:text-white/80">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
