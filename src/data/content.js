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
    title: "Social Media Adverts",
    badge: "Advertisement Services",
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
    title: "Photography and Editing",
    badge: "Photography and Editing",
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
    title: "Business Registration (CAC)",
    badge: "CAC Registration",
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
    title: "Signs and Prints",
    badge: "Business Signage and Prints",
    short: "Bold signage and prints that make your brand impossible to ignore.",
    desc:
      "Stand out from the crowd with bold, professional signage that makes your brand impossible to ignore.",
    sampleImage: "/services/signage-hero.jpg",
    packages: [
      { id: "sign-1", group: "Flex Banners", name: "Large Flex Banner", price: 50000, eta: "2–3 days", note: "Price and size varies, starting from N50,000" },
      { id: "sign-2", group: "Classy Signage", name: "Midi Classy Signage (Standard)", price: 25000, eta: "2–3 days" },
      { id: "sign-5", group: "Classy Signage", name: "Midi Classy Signage (Premium)", price: 35000, eta: "2–3 days" },
      { id: "sign-3", group: "Custom Apparel", name: "Customized Tees", price: 12000, eta: "2–3 days" },
      { id: "sign-4", group: "Business Signage", name: "Rectangle Business Signage", price: 40000, eta: "2–3 days" },
      { id: "sign-4b", group: "Business Signage", name: "Rectangle Business Signage (Multi-color)", price: 45000, eta: "2–3 days" },
      { id: "sign-7", group: "Business Signage", name: "Rectangle Business Signage", price: 40000, eta: "2–3 days" },
      { id: "sign-7b", group: "Business Signage", name: "Rectangle Business Signage (Multi-color)", price: 45000, eta: "2–3 days" },
      { id: "sign-6a", group: "Neon Signage", name: "Neon (up to 10 letters)", price: 50000, eta: "3–5 days", note: "Price depends on writeup length" },
      { id: "sign-6b", group: "Neon Signage", name: "Neon (custom quote)", price: null, eta: "DM us", note: "For longer writeups, DM for pricing" },
      { id: "sign-8", group: "3D Signage", name: "Fabricated 3D Signage", price: 90000, eta: "5–7 days" }
    ]
  }
];

export const payment = {
  bankName: " Moniepoint MFB",
  accountNumber: "8144549849",
  accountName: "FARRYS COLLECTION owned by NOFISAT GANIU"
};
