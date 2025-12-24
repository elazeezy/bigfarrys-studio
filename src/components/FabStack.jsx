import { MessageCircle, PhoneCall } from "lucide-react";

export default function FabStack() {
  return (
    <div className="fixed right-3 bottom-20 md:bottom-6 z-40 flex flex-col gap-3">
      <a
        href="https://wa.me/60123456789?text=Hi%20Big%20Farry%E2%80%99s%20Studio!%20I%20want%20to%20start%20a%20project."
        className="glass h-14 w-14 rounded-2xl grid place-items-center hover:scale-[1.05] active:scale-[0.98] transition"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle />
      </a>

      <a
        href="tel:+60123456789"
        className="glass h-14 w-14 rounded-2xl grid place-items-center hover:scale-[1.05] active:scale-[0.98] transition"
        aria-label="Call us"
      >
        <PhoneCall />
      </a>
    </div>
  );
}
