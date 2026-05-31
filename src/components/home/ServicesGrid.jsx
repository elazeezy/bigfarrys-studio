import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { services } from "../../data/content.js";

export default function ServicesGrid() {
  return (
    <div>
      <p className="eyebrow mb-4">Our Services</p>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
        <h2 className="heading-lg">EVERYTHING YOU<br /><span className="font-serif italic font-bold opacity-50">need, in one place.</span></h2>
        <p className="text-espresso/60 max-w-xs text-sm leading-relaxed">
          Choose a service, see full details, upload files, pay by transfer.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {services.map((s, idx) => (
          <Link
            key={s.slug}
            to={`/services/${s.slug}`}
            className="group relative overflow-hidden rounded-4xl border border-espresso/10 bg-cream-100
                       hover:border-espresso/25 hover:shadow-lg transition-all duration-400"
          >
            {/* Image area */}
            <div className="aspect-[16/9] w-full overflow-hidden bg-cream-200">
              <img
                src={`/home/services/${s.slug}.jpg`}
                alt={s.title}
                className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                onError={(e) => {
                  e.target.parentElement.style.background = `hsl(${25 + idx * 15}, 30%, 85%)`;
                  e.target.style.display = "none";
                }}
              />
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <p className="eyebrow mb-2">{s.badge}</p>
              <h3 className="text-xl md:text-2xl font-black text-espresso tracking-tight mb-2">
                {s.title}
              </h3>
              <p className="text-espresso/60 text-sm leading-relaxed">{s.short}</p>

              <div className="mt-6 inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase
                              text-espresso/40 group-hover:text-espresso transition-colors duration-300">
                View Packages <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>

            {/* Corner accent */}
            <div className="absolute top-5 right-5 w-8 h-8 rounded-full border border-espresso/10 bg-cream-50
                            flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowUpRight size={14} className="text-espresso" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
