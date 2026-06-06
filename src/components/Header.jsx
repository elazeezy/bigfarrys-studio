import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Menu, X, ChevronDown, Megaphone, Camera, Layers, FileText } from "lucide-react";

const NAV = [
  { path: "/",        label: "Home" },
  { path: "/services", label: "Services" },
  { path: "/denim",   label: "Denim" },
  { path: "/contact", label: "Contact" },
];

const SERVICES = [
  { path: "/services/advert",  label: "Social Media Adverts",      Icon: Megaphone, desc: "Reach thousands fast"         },
  { path: "/services/editing", label: "Photography & Editing",     Icon: Camera,    desc: "Premium photos, same day"     },
  { path: "/services/signage", label: "Signs & Prints",            Icon: Layers,    desc: "Bold signage for your brand"  },
  { path: "/services/cac",    label: "CAC Registration",          Icon: FileText,  desc: "We handle all the paperwork"  },
];

export default function Header() {
  const headerRef = useRef(null);
  const { pathname } = useLocation();
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

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

  useEffect(() => { setMenuOpen(false); setServicesOpen(false); }, [pathname]);

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
            const active = pathname === path || (path === "/services" && pathname.startsWith("/services"));
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

      {/* ── MOBILE DROPDOWN ── */}
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
            {/* Home */}
            <Link
              to="/"
              className={`flex items-center px-5 py-3.5 rounded-2xl text-sm font-semibold
                           transition-colors duration-200 ${
                pathname === "/"
                  ? "bg-espresso text-cream-50"
                  : "text-espresso/65 hover:text-espresso hover:bg-espresso/6"
              }`}
            >
              Home
            </Link>

            {/* Services — expandable */}
            <div>
              <button
                type="button"
                onClick={() => setServicesOpen((v) => !v)}
                className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl
                             text-sm font-semibold transition-colors duration-200 ${
                  pathname.startsWith("/services")
                    ? "bg-espresso text-cream-50"
                    : "text-espresso/65 hover:text-espresso hover:bg-espresso/6"
                }`}
              >
                <span>Services</span>
                <motion.div
                  animate={{ rotate: servicesOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={15} />
                </motion.div>
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-1 ml-3 flex flex-col gap-1 pb-1">
                      {/* "All services" shortcut */}
                      <Link
                        to="/services"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl
                                   text-espresso/50 hover:text-espresso hover:bg-espresso/5
                                   transition-colors duration-200"
                      >
                        <span className="text-[10px] font-black tracking-[0.25em] uppercase text-bark">
                          View all
                        </span>
                      </Link>

                      {SERVICES.map(({ path, label, Icon, desc }) => {
                        const active = pathname === path;
                        return (
                          <Link
                            key={path}
                            to={path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl
                                         transition-colors duration-200 ${
                              active
                                ? "bg-espresso/8 text-espresso"
                                : "text-espresso/65 hover:text-espresso hover:bg-espresso/5"
                            }`}
                          >
                            <div className="w-8 h-8 rounded-lg bg-espresso/6 flex items-center justify-center flex-shrink-0">
                              <Icon size={14} className="text-espresso" strokeWidth={1.75} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-bold leading-tight">{label}</p>
                              <p className="text-[11px] text-espresso/40 font-medium">{desc}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Denim */}
            <Link
              to="/denim"
              className={`flex items-center px-5 py-3.5 rounded-2xl text-sm font-semibold
                           transition-colors duration-200 ${
                pathname === "/denim"
                  ? "bg-espresso text-cream-50"
                  : "text-espresso/65 hover:text-espresso hover:bg-espresso/6"
              }`}
            >
              Denim
            </Link>

            {/* Contact */}
            <Link
              to="/contact"
              className={`flex items-center px-5 py-3.5 rounded-2xl text-sm font-semibold
                           transition-colors duration-200 ${
                pathname === "/contact"
                  ? "bg-espresso text-cream-50"
                  : "text-espresso/65 hover:text-espresso hover:bg-espresso/6"
              }`}
            >
              Contact
            </Link>

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
