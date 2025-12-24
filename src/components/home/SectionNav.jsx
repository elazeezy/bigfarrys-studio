// src/components/home/SectionNav.jsx
import { ChevronDown, ChevronUp } from "lucide-react";

function scrollToSection(id) {
  const shell = document.getElementById("home-shell");
  const el = document.getElementById(id);
  if (!shell || !el) return;

  const shellTop = shell.getBoundingClientRect().top;
  const elTop = el.getBoundingClientRect().top;
  const current = shell.scrollTop;
  const target = current + (elTop - shellTop) - 12;

  shell.scrollTo({ top: target, behavior: "smooth" });
}

export default function SectionNav({
  prevId,
  nextId,
  className = "",
  showPrev = true,
  showNext = true,
}) {
  return (
    <div className={["mt-10 flex items-center justify-between gap-3", className].join(" ")}>
      <button
        type="button"
        onClick={() => prevId && scrollToSection(prevId)}
        disabled={!prevId || !showPrev}
        className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-extrabold hover:bg-white/10 disabled:opacity-40"
      >
        <ChevronUp size={18} className="text-white/70" />
        Back
      </button>

      <button
        type="button"
        onClick={() => nextId && scrollToSection(nextId)}
        disabled={!nextId || !showNext}
        className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-extrabold hover:bg-white/15 disabled:opacity-40"
      >
        Next
        <ChevronDown size={18} className="text-white/70" />
      </button>
    </div>
  );
}
