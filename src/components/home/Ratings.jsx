// src/components/home/Ratings.jsx
const REVIEWS = [
  { name: "Client", text: "Fast delivery and clean work. Very professional." },
  { name: "Customer", text: "My brand looked premium after the edits. 10/10." },
  { name: "Business Owner", text: "Smooth process. Clear communication and good results." },
];

export default function Ratings() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
      <div className="rounded-[40px] border border-white/10 bg-white/5 p-5 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-white/60">Trust</div>
            <div className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight">
              4.9<span className="text-white/60">/5</span>
            </div>
            <div className="mt-1 text-sm text-white/70">Based on customer feedback</div>
          </div>

          <div className="flex items-center gap-1 text-xl">
            {"★★★★★".split("").map((s, i) => (
              <span key={i} className="text-white/90">{s}</span>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <div key={r.text} className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm font-extrabold">{r.name}</div>
              <div className="mt-2 text-sm text-white/70">{r.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
