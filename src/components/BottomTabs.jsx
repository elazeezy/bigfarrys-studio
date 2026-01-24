import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, Shirt, Phone } from 'lucide-react';

export default function BottomTabs() {
  const location = useLocation();

  const tabs = [
    {
      path: "/",
      label: "HOME",
      icon: <Home size={20} />
    },
    {
      path: "/services", // Updated path
      label: "SERVICES", // Updated label from STUDIO to SERVICES
      icon: <LayoutGrid size={20} />
    },
    {
      path: "/denim",
      label: "DENIM",
      icon: <Shirt size={20} />
    },
    {
      path: "/contact",
      label: "CONTACT",
      icon: <Phone size={20} />
    }
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-md">
      <div className="bg-[#020617]/80 backdrop-blur-2xl border border-white/10 rounded-full p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`relative flex items-center justify-center gap-2 px-4 py-3 rounded-full transition-all duration-500 group ${
                isActive 
                  ? "text-white" 
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {/* Active Background Glow */}
              {isActive && (
                <div className="absolute inset-0 bg-pink-500 rounded-full shadow-[0_0_20px_rgba(236,72,153,0.4)] z-0" />
              )}
              
              <span className="relative z-10 transition-transform duration-300 group-active:scale-90">
                {tab.icon}
              </span>
              
              {isActive && (
                <span className="relative z-10 text-[10px] font-black tracking-widest uppercase animate-in fade-in slide-in-from-left-2 duration-300">
                  {tab.label}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}