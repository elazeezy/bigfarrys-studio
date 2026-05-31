import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, MapPin, Phone } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="bg-espresso py-28 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="eyebrow text-sand mb-6">Ready to start?</p>

        <h2
          className="font-black tracking-tighter leading-[0.95] text-cream-50 mb-6"
          style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)" }}
        >
          Let's get your brand
          <br />
          <span className="font-serif italic font-bold text-sand">moving today.</span>
        </h2>

        <p className="text-cream-200/50 text-sm leading-relaxed mb-12 max-w-xs mx-auto">
          Pick a service, place your order, and we will handle the rest.
          Most jobs are done within 24 to 48 hours.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/services"
            className="inline-flex items-center gap-2.5 bg-cream-50 text-espresso
                       px-8 py-4 rounded-full font-black text-sm tracking-wide
                       hover:bg-white hover:scale-[1.03] transition-all duration-300 shadow-md"
          >
            See Services <ArrowRight size={15} />
          </Link>
          <a
            href="https://wa.me/2349069050668"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 border border-cream-50/20 text-cream-50
                       px-8 py-4 rounded-full font-semibold text-sm
                       hover:bg-cream-50/8 hover:border-cream-50/40 transition-all duration-300"
          >
            <MessageCircle size={15} /> WhatsApp Us
          </a>
        </div>

        <div className="mt-16 pt-8 border-t border-cream-50/8 flex flex-col sm:flex-row items-center justify-center gap-6">
          {[
            { Icon: MapPin, text: "Lagos (Ikorodu)" },
            { Icon: MapPin, text: "Ilaro, Ogun State" },
            { Icon: Phone,  text: "09069050668" },
          ].map(({ Icon, text }) => (
            <div key={text} className="flex items-center gap-1.5 text-cream-50/28">
              <Icon size={11} strokeWidth={2} />
              <span className="text-xs font-semibold tracking-wide">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
