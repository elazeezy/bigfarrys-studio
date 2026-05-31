import { Link } from "react-router-dom";
import { ArrowRight, Megaphone, Camera, Layers, FileText, CheckCircle2 } from "lucide-react";

const SERVICES = [
  {
    slug: "advert",
    Icon: Megaphone,
    label: "Advertisement",
    title: "Social Media Adverts",
    tagline: "We post your brand on our pages and people see it.",
    desc: "We repost your content on our Instagram and TikTok pages with thousands of real followers in Nigeria. Choose a video, picture, or link ad. Available for 24hrs or 48hrs. Perfect for products, brands, and businesses launching anything new.",
    details: [
      "Starts from N6,000",
      "24hr or 48hr duration",
      "Video, picture, or link format",
      "Demo ads and influencer deals available",
    ],
    cta: "See pricing and book",
  },
  {
    slug: "editing",
    Icon: Camera,
    label: "Photography",
    title: "Photography and Editing",
    tagline: "We shoot your products and make them look premium.",
    desc: "Outdoor photoshoots with mobile or digital camera. We handle the shoot, the editing, and deliver clean professional images the same day. Great for fashion brands, beauty products, and entrepreneurs who need quality content fast.",
    details: [
      "Mobile shoots from N20,000",
      "Digital from N40,000",
      "5 edited pictures per session",
      "Same-day or scheduled delivery",
    ],
    cta: "Book a session",
  },
  {
    slug: "signage",
    Icon: Layers,
    label: "Signs and Prints",
    title: "Business Signage and Prints",
    tagline: "Flex banners, business cards, and prints for your shop or event.",
    desc: "We design and print everything you need to brand your physical space. Flex banners, signboards, business cards, stickers, and more. Bold designs that make your business visible and memorable wherever you are.",
    details: [
      "Custom sizes available",
      "We design and print",
      "Quick turnaround",
      "DM for pricing by size",
    ],
    cta: "Get a quote",
  },
  {
    slug: "cac",
    Icon: FileText,
    label: "CAC Registration",
    title: "Business Registration (CAC)",
    tagline: "Make your business legal. We handle all the paperwork.",
    desc: "We register your business with the Corporate Affairs Commission so you can operate legally in Nigeria. Whether it is a business name or a limited liability company, we take care of everything from start to finish.",
    details: [
      "Business name registration",
      "Limited company (LTD) available",
      "We handle all documents",
      "Price depends on CAC, DM us",
    ],
    cta: "Start registration",
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-cream-50">

      {/* Hero */}
      <div className="bg-espresso pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="eyebrow text-sand mb-5">All Services</p>
          <h1
            className="font-black tracking-tighter leading-[0.95] text-cream-50 mb-5"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
          >
            What can we do
            <br />
            <span className="font-serif italic font-bold text-sand">for your brand?</span>
          </h1>
          <p className="text-cream-200/55 max-w-md text-sm leading-relaxed">
            Browse all four services below. Each has clear pricing and a booking form.
            No need to DM just to ask how much.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col gap-4">
        {SERVICES.map(({ slug, Icon, label, title, tagline, desc, details, cta }) => (
          <div key={slug} className="bg-white border border-espresso/8 rounded-4xl overflow-hidden">
            <div className="p-8 md:p-10">
              {/* Header row */}
              <div className="flex items-start gap-5 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-espresso flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-cream-50" strokeWidth={1.75} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="eyebrow mb-1.5 block">{label}</span>
                  <h2 className="font-black text-xl md:text-2xl text-espresso tracking-tight leading-tight">
                    {title}
                  </h2>
                  <p className="text-bark text-xs font-semibold mt-1.5">{tagline}</p>
                </div>
              </div>

              <p className="text-espresso/60 text-sm leading-relaxed mb-7">{desc}</p>

              {/* Detail grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
                {details.map((d) => (
                  <div key={d} className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-bark mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span className="text-espresso/65 text-xs font-medium leading-snug">{d}</span>
                  </div>
                ))}
              </div>

              <Link
                to={`/services/${slug}`}
                className="inline-flex items-center gap-2.5 bg-espresso text-cream-50
                           px-7 py-3.5 rounded-full font-black text-xs tracking-wider
                           hover:bg-espresso-dark hover:scale-[1.03] transition-all duration-300"
              >
                {cta} <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom strip */}
      <div className="bg-espresso py-14 px-6 text-center">
        <p className="text-cream-50/50 text-sm font-medium mb-2">Not sure what you need?</p>
        <p className="text-cream-50/30 text-xs mb-7 max-w-xs mx-auto leading-relaxed">
          Send us a message and we will tell you exactly what to go for.
        </p>
        <a
          href="https://wa.me/2349069050668"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2.5 bg-sand text-espresso px-8 py-3.5 rounded-full
                     font-black text-xs tracking-wider hover:bg-bark hover:text-cream-50 transition-all duration-300"
        >
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}
