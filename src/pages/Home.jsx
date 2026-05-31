import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Megaphone, Camera, Layers, FileText } from "lucide-react";
import MarqueeGallery from "../components/home/MarqueeGallery.jsx";
import HowItWorks from "../components/home/HowItWorks.jsx";
import FinalCTA from "../components/home/FinalCTA.jsx";

const SERVICES = [
  {
    slug: "advert",
    Icon: Megaphone,
    title: "Social Media Adverts",
    tagline: "Get your brand in front of thousands, fast.",
    desc: "We repost your product on our Instagram and TikTok pages with thousands of real followers. Pick 24hrs or 48hrs, and choose video, picture, or link format. From N6,000.",
    cta: "See advert packages",
    image: "/home/services/advert.jpg",
  },
  {
    slug: "editing",
    Icon: Camera,
    title: "Photography and Editing",
    tagline: "Professional photos that make your products look premium.",
    desc: "Outdoor photoshoots with mobile or digital camera. We shoot, edit, and deliver clean high-quality images the same day. Perfect for fashion, beauty, and product brands.",
    cta: "Book a session",
    image: "/home/services/editing.jpg",
  },
  {
    slug: "signage",
    Icon: Layers,
    title: "Signs and Prints",
    tagline: "Bold, professional signage for your business.",
    desc: "Flex banners, business cards, stickers, and more. We design and print everything you need to make your physical brand presence impossible to ignore.",
    cta: "Get a quote",
    image: "/home/services/signage.jpg",
  },
  {
    slug: "cac",
    Icon: FileText,
    title: "CAC Registration",
    tagline: "Register your business legally. We handle everything.",
    desc: "We take care of the entire CAC registration process for you. Business name or limited company. Send us your details and we handle all paperwork from start to finish.",
    cta: "Start registration",
    image: "/home/services/cac.jpg",
  },
];

const TESTIMONIALS = [
  { quote: "Bigfarrys took my brand from unknown to everywhere in one week.", who: "Fashion Brand Owner" },
  { quote: "Instant ROI. The most professional creative direction I have ever experienced.", who: "Skincare Brand Owner" },
  { quote: "They handled my CAC registration in days. Completely stress-free.", who: "Small Business Owner" },
];

export default function Home() {
  return (
    <div className="w-full min-h-screen">

      {/* ── HERO ── */}
      <section className="relative h-[100svh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/home/hero/founder.jpg"
            alt="Bigfarrys Studio"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-espresso-dark/90 via-espresso-dark/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso-dark/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 px-6 md:px-16 lg:px-24 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="eyebrow text-sand mb-5 tracking-[0.4em]"
          >
            Creative Studio · Lagos
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-black tracking-tighter leading-[0.95] text-cream-50 mb-6"
            style={{ fontSize: "clamp(2.8rem, 6.5vw, 6rem)" }}
          >
            We help your brand
            <br />
            <span className="font-serif italic font-bold text-sand">
              get seen and make sales.
            </span>
          </motion.h1>


          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.52 }}
            className="flex flex-row gap-2"
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-cream-50 text-espresso
                         px-5 py-3 md:px-7 md:py-3.5 rounded-full font-black text-xs md:text-sm tracking-wide
                         hover:bg-white hover:scale-[1.03] transition-all duration-300 shadow-lg whitespace-nowrap"
            >
              See Services <ArrowRight size={13} />
            </Link>
            <a
              href="https://wa.me/2349069050668"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-cream-50/35
                         text-cream-50 px-5 py-3 md:px-7 md:py-3.5 rounded-full font-semibold text-xs md:text-sm
                         hover:bg-cream-50/10 hover:border-cream-50/55 transition-all duration-300 whitespace-nowrap"
            >
              Chat on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── TICKER BAR ── */}
      <div className="bg-espresso border-b border-cream-50/5 overflow-hidden py-3">
        <div className="flex w-max" style={{ animation: "ticker 18s linear infinite" }}>
          {["Clear pricing, no hidden fees", "Most jobs delivered in 24 to 48 hours", "Order on the site, confirm on WhatsApp",
            "Clear pricing, no hidden fees", "Most jobs delivered in 24 to 48 hours", "Order on the site, confirm on WhatsApp"].map((t, i) => (
            <div key={i} className="flex items-center gap-4 px-8 flex-shrink-0">
              <span className="w-1 h-1 rounded-full bg-sand flex-shrink-0" />
              <span className="text-cream-50/55 text-[11px] font-semibold tracking-widest uppercase whitespace-nowrap">{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── SERVICES WITH IMAGES ── */}
      <section className="bg-cream-50 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <p className="eyebrow mb-3">What we do</p>
            <h2
              className="font-black tracking-tighter text-espresso leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Four ways we grow your brand.
            </h2>
            <p className="text-espresso/50 text-sm mt-3 max-w-sm leading-relaxed">
              Click any service to see full pricing and place your order directly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {SERVICES.map(({ slug, Icon, title, tagline, desc, cta, image }, i) => (
              <Link
                key={slug}
                to={`/services/${slug}`}
                className="group flex flex-col bg-white rounded-4xl overflow-hidden
                           hover:shadow-[0_8px_40px_rgba(92,45,26,0.10)] hover:-translate-y-1
                           transition-all duration-400"
                style={{ border: "1px solid rgba(92,45,26,0.08)" }}
              >
                {/* Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-cream-200">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.04]"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.style.background =
                        ["#C9A882","#9B6B47","#8B5E3C","#7C4A2D"][i];
                    }}
                  />
                  {/* Icon badge over image */}
                  <div className="absolute top-4 left-4 w-9 h-9 rounded-xl bg-white/90 backdrop-blur-sm
                                  flex items-center justify-center shadow-sm">
                    <Icon size={17} strokeWidth={1.75} className="text-espresso" />
                  </div>
                </div>

                {/* Text */}
                <div className="flex flex-col gap-4 p-7 flex-1">
                  <div className="flex-1">
                    <h3 className="font-black text-lg text-espresso tracking-tight mb-1.5">{title}</h3>
                    <p className="text-bark text-xs font-semibold mb-3 tracking-wide">{tagline}</p>
                    <p className="text-espresso/55 text-sm leading-relaxed">{desc}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-espresso/6">
                    <span className="text-[11px] font-black tracking-[0.2em] uppercase text-espresso/35
                                     group-hover:text-espresso transition-colors duration-300">
                      {cta}
                    </span>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center
                                    group-hover:bg-espresso transition-all duration-400"
                         style={{ border: "1px solid rgba(92,45,26,0.1)" }}>
                      <ArrowRight
                        size={13}
                        className="text-espresso/35 group-hover:text-cream-50 group-hover:translate-x-0.5 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-espresso py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-14">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#C9A882" className="text-sand" />
              ))}
            </div>
            <span className="text-sand text-xs font-bold tracking-widest uppercase">
              5.0 · Trusted by brands across Lagos and Ogun State
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.who}
                className="flex flex-col justify-between gap-8 rounded-3xl p-8
                           hover:border-cream-50/20 transition-colors duration-300"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <p className="font-serif italic text-cream-50/80 text-base leading-relaxed">
                  "{t.quote}"
                </p>
                <div>
                  <div className="h-px w-8 bg-sand mb-3" />
                  <span className="eyebrow text-sand/60">{t.who}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="bg-[#EDE0CC] py-20">
        <div className="max-w-6xl mx-auto px-6 mb-10">
          <p className="eyebrow mb-3">Our work</p>
          <h2
            className="font-black tracking-tighter text-espresso"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Proof we deliver.
          </h2>
        </div>
        <MarqueeGallery />
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-cream-50 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <HowItWorks />
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <FinalCTA />
    </div>
  );
}
