import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Menu, X } from "lucide-react";

const NAV = [
  { path: "/",         label: "Home" },
  { path: "/services", label: "Services" },
  { path: "/denim",    label: "Denim" },
  { path: "/contact",  label: "Contact" },
];

export default function Header() {
  const headerRef = useRef(null);
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const set = () =>
      document.documentElement.style.setProperty("--header-h", `${el.getBoundingClientRect().height}px`);
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close mobile menu on route change */
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <header ref={headerRef} className="absolute top-0 left-0 w-full z-50 px-5 pt-4">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`mx-auto max-w-7xl flex items-center justify-between rounded-full px-5 py-3
                    transition-all duration-400 ${
          scrolled
            ? "bg-cream-50/95 backdrop-blur-2xl border border-espresso/10 shadow-lg"
            : "bg-cream-50/70 backdrop-blur-xl border border-espresso/8 shadow-sm"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="font-black text-base tracking-tighter text-espresso
                           group-hover:text-mocha transition-colors duration-300">
            BIGFARRYS
          </span>
          <span className="hidden sm:block text-[9px] font-black tracking-[0.3em] uppercase
                           text-bark border border-bark/30 px-2.5 py-1 rounded-full">
            Studio
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {NAV.map(({ path, label }) => {
            const active = pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`relative px-4 py-2 rounded-full text-sm font-semibold tracking-wide
                             transition-all duration-300 ${
                  active ? "text-espresso" : "text-espresso/50 hover:text-espresso"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-espresso/8 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <a
            href="https://wa.me/2349069050668"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-2 bg-espresso text-cream-50 px-5 py-2.5
                       rounded-full text-xs font-black tracking-wider hover:bg-espresso-dark
                       hover:scale-[1.04] transition-all duration-300"
          >
            <MessageCircle size={13} fill="currentColor" />
            Book Now
          </a>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden w-9 h-9 rounded-full bg-espresso/8 flex items-center justify-center
                       text-espresso hover:bg-espresso/15 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden mx-auto max-w-7xl mt-2 bg-cream-50/98 backdrop-blur-2xl
                       border border-espresso/10 rounded-3xl p-4 shadow-xl"
          >
            {NAV.map(({ path, label }) => {
              const active = pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center px-5 py-3.5 rounded-2xl text-sm font-semibold
                               transition-colors duration-200 ${
                    active
                      ? "bg-espresso text-cream-50"
                      : "text-espresso/65 hover:text-espresso hover:bg-espresso/6"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
            <div className="h-px bg-espresso/8 my-3" />
            <a
              href="https://wa.me/2349069050668"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-espresso text-cream-50
                         py-3.5 rounded-2xl text-sm font-black tracking-wide"
            >
              <MessageCircle size={15} fill="currentColor" /> Book Now on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
