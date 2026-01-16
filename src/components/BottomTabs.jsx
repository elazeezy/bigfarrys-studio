import { NavLink, useLocation } from "react-router-dom";
import { Home, LayoutGrid, Shirt, Phone } from "lucide-react";
import { motion } from "framer-motion";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/services", label: "Studio", icon: LayoutGrid },
  { to: "/denim", label: "Denim", icon: Shirt },
  { to: "/contact", label: "Contact", icon: Phone },
];

export default function BottomTabs() {
  const location = useLocation();

  return (
    <div className="fixed bottom-6 inset-x-0 z-[100] flex justify-center px-6 pointer-events-none">
      <nav className="glass-dock pointer-events-auto flex items-center gap-1 p-2 rounded-full max-w-fit shadow-2xl">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = location.pathname === t.to;

          return (
            <NavLink
              key={t.to}
              to={t.to}
              className="relative flex items-center justify-center gap-2 px-4 py-3 rounded-full transition-colors duration-300"
            >
              {/* Animated Background for Active Tab */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-pink-500 shadow-[0_0_20px_rgba(255,42,166,0.4)] rounded-full"
                  transition={{ type: "spring", duration: 0.6, bounce: 0.25 }}
                />
              )}

              {/* Icon and Label */}
              <div className={`relative z-10 flex items-center gap-2 ${isActive ? "text-white" : "text-white/50 hover:text-white/80"}`}>
                <Icon size={19} strokeWidth={isActive ? 2.5 : 2} />
                
                {/* Label: Hidden on mobile, visible on desktop/active */}
                <span className={`text-[11px] font-bold uppercase tracking-widest overflow-hidden transition-all duration-300 
                  ${isActive ? "max-w-[80px] opacity-100" : "max-w-0 opacity-0 md:max-w-[80px] md:opacity-50"}`}
                >
                  {t.label}
                </span>
              </div>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}