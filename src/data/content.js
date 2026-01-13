export const brand = {
  name: "BIGFARRYS",
  founder: "Akintoye Wuraola Nofisat",
  instagram: "BIGFARRYS",
  tiktok: "BIGFARRYS_xx",
  email: "Meetwithwura@gmail.com",
  phone: "09069050668",
  whatsappNumber: "2349069050668",
  location: "Lagos (Ikorodu) • Ilaro, Ogun State"
};

const WHATSAPP = (text) =>
  `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(text)}`;

export const services = [
  {
    slug: "advert",
    title: "BIGFARRYS ADVERT",
    badge: "✨ Advertisement Services",
    short: "Promotional content that gets your brand seen and noticed.",
    desc:
      "Get your brand seen, heard, and noticed with quality promotional content that attracts the right audience.",
    sampleImage: "/services/advert-hero.jpg",
    reviewsImages: ["/reviews/advert-1.jpg", "/reviews/advert-2.jpg", "/reviews/advert-3.jpg"],

    packages: [
      { id: "link-24", group: "24hrs Link Ads", name: "Link Only", price: 5000, eta: "24hrs" },
      { id: "link-pic-24", group: "24hrs Link Ads", name: "Link + Picture", price: 8000, eta: "24hrs" },
      { id: "link-video-24", group: "24hrs Link Ads", name: "Link + Video", price: 10000, eta: "24hrs" },
      { id: "voice-24", group: "24hrs Link Ads", name: "Voice Over", price: 15000, eta: "24hrs" },

      { id: "link-pic-48", group: "48hrs Link Ads", name: "Link + Picture", price: 15000, eta: "24–48hrs" },
      { id: "link-video-48", group: "48hrs Link Ads", name: "Link + Video", price: 18000, eta: "24–48hrs" },

      { id: "demo-free", group: "24hrs Demo Ads", name: "With Free Products (not returnable)", price: 30000, eta: "24hrs" },
      { id: "demo-no", group: "24hrs Demo Ads", name: "Without Products", price: 35000, eta: "24hrs" },

      { id: "inf-week", group: "Influencing Deal", name: "A Week", price: 50000, eta: "7 days" },
      { id: "inf-week-training", group: "Influencing Deal", name: "A Week (training)", price: 40000, eta: "7 days" },
      { id: "inf-2w", group: "Influencing Deal", name: "2 Weeks", price: 70000, eta: "14 days" },
      { id: "inf-month", group: "Influencing Deal", name: "A Month", price: 120000, eta: "30 days" },
      { id: "inf-2m", group: "Influencing Deal", name: "2 Months", price: 200000, eta: "60 days" },
      { id: "inf-3m", group: "Influencing Deal", name: "3 Months", price: 300000, eta: "90 days" },
      { id: "amb", group: "Influencing Deal", name: "Ambassador Deal", price: null, eta: "DM" }
    ],

    deliverables: [
      "Ad creatives (flyers, banners, promo designs)",
      "Copy direction (headline + offer positioning)",
      "Platform formats (IG story, feed, WhatsApp status)"
    ],
    process: ["Choose package", "Submit details", "We design + revise", "Delivery"]
  },

  {
    slug: "editing",
    title: "BIGFARRYS EDIT",
    badge: "🎨 Picture Editing",
    short: "Touch-ups to full transformations — clean, premium, creative edits.",
    desc:
      "From simple touch-ups to full transformations, our editing brings your images to life with clarity, style, and creativity.",

    sampleImage: "/services/editing-hero.jpg",
    reviewImages: [
      "/services/editing/review-1.jpg",
      "/services/editing/review-2.jpg",
      "/services/editing/review-3.jpg"
    ],

    // ✅ From the rate card you sent (visible part)
    packages: [
      {
        id: "mobile-20k",
        group: "Outdoor Photography Session",
        name: "Mobile — Per Outfit",
        price: 20000,
        eta: "Same day / schedule",
        includes: ["5 edited pictures", "40 minutes session", "Raw pictures available if requested"]
      },

      // ⚠️ If you confirm the “Digital” price later, just change the number here.
      {
        id: "digital-40k",
        group: "Outdoor Photography Session",
        name: "Digital — Per Outfit",
        price: 40000,
        eta: "Same day / schedule",
        includes: ["5 edited pictures", "40 minutes session", "Raw pictures available if requested"]
      },

      { id: "couple-add", group: "Add-ons", name: "Couple Shoot (extra)", price: 15000, eta: "Add-on" },
      { id: "extra-digital", group: "Add-ons", name: "Extra picture (Digital) — each", price: 4000, eta: "Add-on" },
      { id: "extra-mobile", group: "Add-ons", name: "Extra picture (Mobile) — each", price: 2000, eta: "Add-on" }
    ],

    deliverables: ["Skin retouch", "Color grading", "Background change/removal", "Creative effects"],
    process: ["Choose package", "Upload pictures", "We edit + preview", "Final delivery in HD"]
  },

  {
    slug: "cac",
    title: "CAC Registration",
    badge: "📝 CAC Registration",
    short: "We handle the paperwork — you focus on business.",
    desc:
      "Let us handle the paperwork, the stress, and the process. You focus on your business — we’ll get you registered seamlessly.",
    sampleImage: "/services/cac-hero.jpg",
    reviewImages: ["/services/cac/review-1.jpg", "/services/cac/review-2.jpg"],
    packages: [
      { id: "cac-basic", group: "CAC", name: "Business Name Registration", price: null, eta: "Depends on CAC" },
      { id: "cac-ltd", group: "CAC", name: "Limited Company (LTD)", price: null, eta: "Depends on CAC" }
    ]
  },

  {
    slug: "signage",
    title: "BIGFARRYS SIGNS & PRINTS",
    badge: "🚧 Business Signage",
    short: "Bold signage and prints that make your brand impossible to ignore.",
    desc:
      "Stand out from the crowd with bold, professional signage that makes your brand impossible to ignore.",
    sampleImage: "/services/signage-hero.jpg",
    reviewImages: ["/services/signage/review-1.jpg", "/services/signage/review-2.jpg"],
    packages: [
      { id: "sign-basic", group: "Signs & Prints", name: "Design + Print Prep", price: null, eta: "1–3 days" }
    ]
  }
];

export const payment = {
  bankName: " Moniepoint MFB",
  accountNumber: "8144549849",
  accountName: "FARRYS COLLECTION owned by NOFISAT GANIU"
};
