import { useMemo, useState } from "react";
import GlassCard from "../components/GlassCard.jsx";
import { shopProducts } from "../data/content.js";
import { ShoppingBag, Filter } from "lucide-react";
import { Link } from "react-router-dom";

export default function Shop() {
  const [size, setSize] = useState("All");

  const sizes = useMemo(() => {
    const set = new Set();
    shopProducts.forEach((p) => (p.sizes || []).forEach((s) => set.add(s)));
    return ["All", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    if (size === "All") return shopProducts;
    return shopProducts.filter((p) => (p.sizes || []).includes(size));
  }, [size]);

  return (
    <section className="px-3 md:px-6 mt-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-white/60 text-sm flex items-center gap-2">
              <ShoppingBag size={16} />
              BIGFARRYS <span className="gradient-text font-semibold">DENIM HUB</span>
            </p>

            <h1 className="mt-2 text-3xl md:text-5xl font-extrabold">
              The Denim Hub 🧵👖
            </h1>

            <p className="mt-2 text-white/70 max-w-2xl">
              Baddest Denim Plug — browse products, choose a size, add to cart, then checkout
              via bank transfer (GTB) + upload proof.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <div className="h-11 px-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2">
              <Filter size={16} className="text-white/60" />
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="bg-transparent outline-none text-sm"
                aria-label="Filter by size"
              >
                {sizes.map((s) => (
                  <option key={s} value={s} className="text-black">
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <Link
              to="/checkout"
              className="h-11 px-4 rounded-2xl bg-pink-500 text-black font-semibold grid place-items-center hover:opacity-90 transition"
            >
              Go to Checkout →
            </Link>
          </div>
        </div>

        {/* Mobile filter + checkout */}
        <div className="md:hidden mt-4 grid grid-cols-2 gap-3">
          <div className="h-12 px-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2">
            <Filter size={16} className="text-white/60" />
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="bg-transparent outline-none text-sm w-full"
              aria-label="Filter by size"
            >
              {sizes.map((s) => (
                <option key={s} value={s} className="text-black">
                  {s}
                </option>
              ))}
            </select>
          </div>

          <Link
            to="/checkout"
            className="h-12 px-4 rounded-2xl bg-pink-500 text-black font-semibold grid place-items-center hover:opacity-90 transition"
          >
            Checkout →
          </Link>
        </div>

        {/* Product Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <GlassCard key={p.id} className="p-4 overflow-hidden">
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/20">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-56 object-cover"
                  loading="lazy"
                />
              </div>

              <div className="mt-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-extrabold text-lg">{p.name}</h3>
                    <p className="text-white/60 text-sm mt-1">{p.desc}</p>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-white/60">Price</div>
                    <div className="font-extrabold">₦{p.price?.toLocaleString()}</div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {(p.sizes || []).map((s) => (
                    <span
                      key={s}
                      className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80"
                    >
                      Size {s}
                    </span>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <a
                    href={`https://wa.me/2349069050668?text=${encodeURIComponent(
                      `Hi BIGFARRYS, I want to buy: ${p.name} (₦${p.price}). Available sizes: ${(p.sizes || []).join(
                        ", "
                      )}.`
                    )}`}
                    className="h-11 rounded-2xl bg-white/10 border border-white/10 font-semibold grid place-items-center hover:bg-white/15 transition"
                  >
                    Ask on WhatsApp
                  </a>

                  <Link
                    to="/checkout"
                    className="h-11 rounded-2xl bg-pink-500 text-black font-semibold grid place-items-center hover:opacity-90 transition"
                  >
                    Buy Now →
                  </Link>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
