// src/components/BottomTabs.jsx
import { NavLink } from "react-router-dom";
import { Home, LayoutGrid, Shirt, Phone } from "lucide-react";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/services", label: "Services", icon: LayoutGrid },
  { to: "/denim", label: "Denim", icon: Shirt },
  { to: "/contact", label: "Contact", icon: Phone },
];

export default function BottomTabs() {
  return (
    <div className="md:hidden fixed bottom-3 left-0 right-0 z-50 px-3">
      <div className="glass mx-auto max-w-md rounded-3xl border border-white/10 px-2 py-2">
        <div className="grid grid-cols-4 gap-2">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <NavLink
                key={t.to}
                to={t.to}
                className={({ isActive }) =>
                  [
                    "flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-3 text-[11px] font-semibold transition",
                    isActive ? "bg-white/12 text-white" : "text-white/70 hover:bg-white/8",
                  ].join(" ")
                }
              >
                <Icon size={18} />
                {t.label}
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}
