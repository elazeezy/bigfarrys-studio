import GlassCard from "./GlassCard.jsx";

export default function ServiceDetail({ service }) {
  return (
    <div className="px-3 md:px-6 mt-6">
      <div className="mx-auto max-w-6xl">
        <GlassCard className="p-6 md:p-10">
          <p className="text-sm text-white/70">{service.badge}</p>

          <h1 className="mt-3 text-3xl md:text-5xl font-extrabold leading-tight">
            {service.title}
          </h1>

          <p className="text-white/70 mt-4 text-lg max-w-3xl">
            {service.desc}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href={service.ctaHref}
              className="h-12 px-6 rounded-2xl bg-pink-500 text-black font-semibold grid place-items-center hover:opacity-90 transition active:scale-[0.98]"
            >
              {service.ctaText} 💬
            </a>

            <div className="h-12 px-6 rounded-2xl bg-white/10 border border-white/10 font-semibold grid place-items-center">
              Starting: {service.demoPrice}
            </div>
          </div>
        </GlassCard>

        {/* Deliverables + Process + FAQ */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <GlassCard className="p-5">
            <h2 className="font-bold text-lg">What you get</h2>
            <ul className="mt-3 space-y-2 text-white/70">
              {service.deliverables.map((d) => (
                <li key={d}>• {d}</li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard className="p-5">
            <h2 className="font-bold text-lg">How it works</h2>
            <ol className="mt-3 space-y-2 text-white/70 list-decimal list-inside">
              {service.process.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ol>
          </GlassCard>

          <GlassCard className="p-5">
            <h2 className="font-bold text-lg">FAQ</h2>
            <div className="mt-3 space-y-3">
              {service.faqs.map((f) => (
                <div key={f.q}>
                  <div className="font-semibold">{f.q}</div>
                  <div className="text-white/70 text-sm mt-1">{f.a}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
