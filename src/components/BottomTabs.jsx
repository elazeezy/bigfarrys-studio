import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, LayoutGrid, Shirt, Phone } from "lucide-react";

const TABS = [
  { path: "/",         label: "Home",     Icon: Home },
  { path: "/services", label: "Services", Icon: LayoutGrid },
  { path: "/denim",    label: "Denim",    Icon: Shirt },
  { path: "/contact",  label: "Contact",  Icon: Phone },
];

export default function BottomTabs() {
  const { pathname } = useLocation();

  return (
    <nav className="hidden">
      <div className="bg-cream-50/95 backdrop-blur-2xl border border-espresso/12
                      rounded-full p-1.5 shadow-[0_8px_32px_rgba(92,45,26,0.16)]
                      flex items-center justify-between">
        {TABS.map(({ path, label, Icon }) => {
          const active = pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`relative flex items-center justify-center gap-1.5
                          px-4 py-2.5 rounded-full transition-all duration-350 ${
                active ? "text-cream-50" : "text-espresso/40 hover:text-espresso/70"
              }`}
            >
              {active && (
                <motion.div
                  layoutId="tab-pill"
                  className="absolute inset-0 bg-espresso rounded-full"
                  transition={{ type: "spring", stiffness: 420, damping: 38 }}
                />
              )}
              <Icon
                size={17}
                strokeWidth={active ? 2.5 : 1.75}
                className="relative z-10 transition-transform duration-300"
              />
              <AnimatePresence>
                {active && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.25 }}
                    className="relative z-10 text-[10px] font-black tracking-wider uppercase overflow-hidden whitespace-nowrap"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
