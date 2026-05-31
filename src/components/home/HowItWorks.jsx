import { Search, ClipboardList, CreditCard, MessageCircle } from "lucide-react";

const STEPS = [
  {
    Icon: Search,
    n: "01",
    title: "Browse and pick a service",
    desc: "Read full details and prices on this website. No need to DM just to ask how much.",
  },
  {
    Icon: ClipboardList,
    n: "02",
    title: "Fill in your details",
    desc: "Choose your package, enter your name and contact info, and add any extra notes.",
  },
  {
    Icon: CreditCard,
    n: "03",
    title: "Pay and upload your receipt",
    desc: "Transfer to our account, then upload a screenshot of your receipt directly on the site.",
  },
  {
    Icon: MessageCircle,
    n: "04",
    title: "We confirm on WhatsApp",
    desc: "Hit Submit and get a pre-filled WhatsApp message. We confirm and get to work immediately.",
  },
];

export default function HowItWorks() {
  return (
    <div>
      <div className="mb-14">
        <p className="eyebrow mb-3">How it works</p>
        <h2
          className="font-black tracking-tighter text-espresso leading-tight"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          Order in 4 simple steps.
        </h2>
        <p className="text-espresso/50 text-sm mt-3 max-w-sm leading-relaxed">
          No long back-and-forth. Everything happens on the website. WhatsApp is just for the final confirmation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STEPS.map(({ Icon, n, title, desc }) => (
          <div
            key={n}
            className="bg-white border border-espresso/8 rounded-4xl p-7 flex flex-col gap-5
                       hover:shadow-[0_4px_24px_rgba(92,45,26,0.08)] hover:-translate-y-0.5
                       transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-espresso/6 flex items-center justify-center">
                <Icon size={18} className="text-espresso" strokeWidth={1.75} />
              </div>
              <span className="font-black text-3xl text-espresso/8 leading-none select-none tabular-nums">
                {n}
              </span>
            </div>
            <div>
              <p className="font-black text-espresso text-sm leading-tight mb-2">{title}</p>
              <p className="text-espresso/50 text-xs leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
