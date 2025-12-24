import { useMemo, useState } from "react";
import GlassCard from "./GlassCard.jsx";
import { useCart } from "../providers/CartProvider.jsx";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [size, setSize] = useState(product.sizes?.[0] || "M");

  const priceText = useMemo(() => {
    const nf = new Intl.NumberFormat("en-NG");
    return `₦${nf.format(product.price)}`;
  }, [product.price]);

  return (
    <GlassCard className="p-4 overflow-hidden">
      <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="mt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="font-extrabold text-lg truncate">{product.name}</div>
            <div className="text-white/70 text-sm mt-1">{product.desc}</div>
          </div>

          <div className="shrink-0 px-3 py-1 rounded-xl bg-white/10 border border-white/10 text-sm font-semibold">
            {priceText}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <label className="text-sm text-white/70">
            Size
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="ml-2 h-10 px-3 rounded-xl bg-white/10 border border-white/10 text-white outline-none"
            >
              {product.sizes?.map((s) => (
                <option key={s} value={s} className="bg-black">
                  {s}
                </option>
              ))}
            </select>
          </label>

          <button
            onClick={() => addToCart(product, size, 1)}
            className="h-11 px-4 rounded-2xl bg-pink-500 text-black font-semibold hover:opacity-90 transition active:scale-[0.98]"
            aria-label={`Add ${product.name} to cart`}
          >
            Add to cart +
          </button>
        </div>
      </div>
    </GlassCard>
  );
}
