// src/components/home/SectionNav.jsx
import { ChevronDown, ChevronUp } from "lucide-react";

function getHeaderOffset() {
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue("--header-h")
    .trim();
  const n = parseFloat(v);
  // fallback if variable isn't set yet
  return Number.isFinite(n) ? n : 84;
}

function scrollToId(id) {
  if (!id) return;

  const el = document.getElementById(id);
  if (!el) return;

  const header = getHeaderOffset();
  const extra = 12; // nice spacing below header
  const offset = header + extra;

  // If we're on the snap homepage, scroll inside the shell
  const shell = document.getElementById("home-shell");
  if (shell && shell.contains(el)) {
    const shellRect = shell.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    const current = shell.scrollTop;
    const target = current + (elRect.top - shellRect.top) - extra; // shell is already below header via padding
    shell.scrollTo({ top: target, behavior: "smooth" });
    return;
  }

  // Normal page scroll fallback
  const top = window.scrollY + el.getBoundingClientRect().top - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function SectionNav({
  prevId,
  nextId,
  className = "",
  showPrev = true,
  showNext = true,
}) {
  const prevDisabled = !showPrev || !prevId;
  const nextDisabled = !showNext || !nextId;

  return (
    <div className={["mt-10 flex items-center justify-between gap-3", className].join(" ")}>
      <button
        type="button"
        onClick={() => scrollToId(prevId)}
        disabled={prevDisabled}
        className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-extrabold hover:bg-white/10 disabled:opacity-40"
      >
        <ChevronUp size={18} className="text-white/70" />
        Back
      </button>

      <button
        type="button"
        onClick={() => scrollToId(nextId)}
        disabled={nextDisabled}
        className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-extrabold hover:bg-white/15 disabled:opacity-40"
      >
        Next
        <ChevronDown size={18} className="text-white/70" />
      </button>
    </div>
  );
}
