export default function Ratings() {
  return (
    <div className="bg-gradient-to-br from-white/5 to-transparent p-1 border border-white/10 rounded-[4rem]">
      <div className="bg-[#0a1628] rounded-[3.8rem] p-8 md:p-16">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-pink-500 font-bold mb-4 tracking-widest">TESTIMONIALS</h3>
            <div className="text-7xl md:text-[9rem] font-black text-white leading-none tracking-tighter">
              4.9<span className="text-pink-500 text-4xl">★</span>
            </div>
            <p className="text-white/40 mt-4 max-w-xs font-medium">Average rating across 40+ high-end projects in 2025.</p>
          </div>
          
          <div className="space-y-4">
            {[
              { n: "Founder, Mayab", t: "Redefined our visual identity. Results were immediate." },
              { n: "CEO, Marmas", t: "The best content studio in Lagos. Period." }
            ].map((r, i) => (
              <div key={i} className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5 hover:border-pink-500/30 transition-colors">
                <p className="text-white/80 italic mb-4 font-light text-lg">"{r.t}"</p>
                <p className="text-[10px] font-black tracking-widest uppercase text-pink-500">{r.n}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}