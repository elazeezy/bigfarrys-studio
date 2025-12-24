// src/components/home/HowItWorks.jsx
const STEPS = [
  { title: "Choose a service", desc: "Explore full details, rates & packages." },
  { title: "Fill your info", desc: "Submit what you need directly on the website." },
  { title: "Upload files", desc: "Upload proof + content safely (not inside WhatsApp chat)." },
  { title: "Send summary once", desc: "One click sends order summary to WhatsApp." },
];

export default function HowItWorks() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
      <div className="mb-5">
        <div className="text-xs uppercase tracking-[0.18em] text-white/60">How it works</div>
        <h2 className="mt-2 text-2xl md:text-4xl font-extrabold tracking-tight">
          Website-first. WhatsApp-last.
        </h2>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        {STEPS.map((s, i) => (
          <div key={s.title} className="rounded-3xl border border-white/10 bg-white/5 p-4 md:p-5">
            <div className="text-xs text-white/60">Step {i + 1}</div>
            <div className="mt-2 text-base font-extrabold">{s.title}</div>
            <div className="mt-1 text-sm text-white/70">{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
