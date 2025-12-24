// src/components/cta/WhatsAppCtaBar.jsx
import { MessageCircle } from "lucide-react";

export default function WhatsAppCtaBar({ label = "Book on WhatsApp", onClick }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
      <div className="mx-auto max-w-6xl px-3 pb-3">
        <button
          type="button"
          onClick={onClick}
          className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-left font-bold text-white backdrop-blur-sm active:scale-[0.99]"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <span>{label}</span>
            </div>
            <span className="text-white/70">→</span>
          </div>
          <div className="mt-1 text-xs text-white/60">
            Includes package + price + Reference ID
          </div>
        </button>
      </div>
    </div>
  );
}
