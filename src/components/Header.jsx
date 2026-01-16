import { useContext, useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, ShoppingBag } from "lucide-react";
import { ThemeContext } from "../providers/ThemeProvider.jsx";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const headerRef = useRef(null);

  // Measure header height for the rest of the app
  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const set = () => {
      const h = el.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    };
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 px-6 pt-4">
      <div className="glass-premium rounded-full px-6 py-4 flex items-center justify-between mx-auto max-w-7xl">
        
        {/* BRAND LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-black text-xl tracking-tighter transition-transform group-hover:scale-105">
            BIGFARRYS
          </span>
          <span className="text-white/40 font-medium text-sm uppercase tracking-[0.3em] hidden sm:block">
            Studio
          </span>
        </Link>

        {/* UTILITY CONTROLS */}
        <div className="flex items-center gap-3">
          {/* Cart Icon (Premium Denim context) */}
          <button className="h-10 w-10 rounded-full bg-white/5 border border-white/10 grid place-items-center hover:bg-white/10 transition text-white/70">
            <ShoppingBag size={18} />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="h-10 w-10 rounded-full bg-white/5 border border-white/10 grid place-items-center hover:bg-white/10 transition text-white/70"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}