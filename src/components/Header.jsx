import { useContext, useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Sun, Moon, Menu, X, ChevronDown } from "lucide-react";
import { ThemeContext } from "../providers/ThemeProvider.jsx";
import { services } from "../data/content.js";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Mobile menu open/close
  const [open, setOpen] = useState(false);

  // Mobile "Services" accordion open/close
  const [servicesOpen, setServicesOpen] = useState(false);

  // Simple base links (Services handled separately for submenu)
 const baseLinks = useMemo(
  () => [
    { to: "/denim", label: "Denim" },
    { to: "/contact", label: "Contact" },
  ],
  []
);


  return (
    <header className="sticky top-0 z-50 px-3 pt-3">
      <div className="glass rounded-2xl px-4 py-3 flex items-center justify-between gap-3 mx-auto max-w-6xl">
        {/* Brand */}
       <Link to="/" className="font-extrabold text-lg tracking-tight">
  {/** BIGFARRYS primary */}
  <span className="font-extrabold">BIGFARRYS</span>{" "}
  <span className="text-white/60 font-semibold">Studio</span>
</Link>

        {/* Right controls (theme + hamburger) */}
        <div className="flex items-center gap-2 md:order-3">
          <button
            onClick={toggleTheme}
            className="h-10 w-10 rounded-xl bg-white/10 border border-white/10 grid place-items-center hover:bg-white/15 transition"
            aria-label="Toggle theme"
            type="button"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => {
              setOpen((v) => !v);
              // When opening/closing the mobile menu, collapse services list by default
              setServicesOpen(false);
            }}
            className="md:hidden h-10 w-10 rounded-xl bg-white/10 border border-white/10 grid place-items-center hover:bg-white/15 transition"
            aria-label="Toggle menu"
            type="button"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2 md:order-2">
          {/* Home */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 rounded-xl text-sm transition ${
                isActive ? "bg-white/10" : "hover:bg-white/10"
              }`
            }
          >
            Home
          </NavLink>

          {/* ✅ Services dropdown (desktop) */}
          <div className="relative group">
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `px-3 py-2 rounded-xl text-sm transition inline-flex items-center gap-2 ${
                  isActive ? "bg-white/10" : "hover:bg-white/10"
                }`
              }
            >
              Services
              <ChevronDown size={16} className="text-white/60" />
            </NavLink>

            {/* Dropdown */}
          <div className="absolute left-0 top-full pt-3 opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition">
           
              <div className="glass rounded-3xl p-2 w-[360px] border border-white/10 shadow-2xl shadow-black/30">
  <div className="px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-white/55">
    Select a service
  </div>

  <div className="grid gap-1">
    {services.map((s) => (
      <NavLink
        key={s.slug}
        to={`/services/${s.slug}`}
        className={({ isActive }) =>
          `group flex items-start gap-3 px-3 py-3 rounded-2xl transition ${
            isActive ? "bg-white/10" : "hover:bg-white/10"
          }`
        }
      >
        {/* Left dot indicator */}
        <span className="mt-2 h-2 w-2 rounded-full bg-pink-500/90 shrink-0 opacity-70 group-hover:opacity-100" />

        <div className="min-w-0">
          <div className="text-sm font-extrabold tracking-tight truncate">
            {s.title}
          </div>
          <div className="text-xs text-white/60 mt-1 truncate">
            {s.badge}
          </div>
        </div>

        {/* Right arrow */}
        <span className="ml-auto text-white/40 group-hover:text-white/70 transition">
          →
        </span>
      </NavLink>
    ))}
  </div>

  <div className="mt-2 px-2 pb-1">
    <NavLink
      to="/services"
      className="block px-3 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition text-sm font-semibold text-center"
    >
      View all services →
    </NavLink>
  </div>
</div>
          </div>
            </div> 

          {/* Other links */}
          {baseLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-xl text-sm transition ${
                  isActive ? "bg-white/10" : "hover:bg-white/10"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Mobile overlay menu */}
      {open && (
        <div className="md:hidden mt-2 glass rounded-2xl p-2 border border-white/10">
          {/* Home */}
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl transition ${
                isActive ? "bg-white/10" : "hover:bg-white/10"
              }`
            }
          >
            Home
          </NavLink>

          {/* ✅ Services accordion (mobile) */}
          <button
            type="button"
            onClick={() => setServicesOpen((v) => !v)}
            className="w-full px-4 py-3 rounded-xl hover:bg-white/10 transition flex items-center justify-between"
            aria-expanded={servicesOpen}
            aria-controls="mobile-services-submenu"
          >
            <span className="font-semibold">Services</span>
            <ChevronDown
              size={18}
              className={`transition ${servicesOpen ? "rotate-180" : ""}`}
            />
          </button>

          <div
            id="mobile-services-submenu"
            className={`overflow-hidden transition-all ${
              servicesOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-2 pb-2">
              <NavLink
                to="/services"
                onClick={() => setOpen(false)}
                className="block px-3 py-3 rounded-xl hover:bg-white/10 transition text-sm font-semibold"
              >
                View all services →
              </NavLink>

              {services.map((s) => (
                <NavLink
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-3 rounded-xl hover:bg-white/10 transition"
                >
                  <div className="text-sm font-semibold">{s.title}</div>
                  <div className="text-xs text-white/60 mt-1">{s.badge}</div>
                </NavLink>
                
              ))}
            </div>
          </div>
             
           

          {/* Portfolio + Contact */}
          {baseLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl transition ${
                  isActive ? "bg-white/10" : "hover:bg-white/10"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
