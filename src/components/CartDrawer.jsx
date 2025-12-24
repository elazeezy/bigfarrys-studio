import React from "react";
import { createPortal } from "react-dom";
import { useCart } from "./cart.jsx";

export default function CartDrawer({ open, onClose }) {
  const { items, total, remove, clear } = useCart();

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[200]">
      {/* backdrop */}
      <button
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
        aria-label="Close cart"
      />

      {/* panel */}
      <aside className="absolute right-0 top-0 h-full w-[92vw] max-w-md bg-neutral-950 text-white shadow-2xl border-l border-white/10">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="text-lg font-semibold">Your Cart</div>
          <button
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 bg-white/10 hover:bg-white/15"
          >
            Close
          </button>
        </div>

        <div className="p-5 space-y-4 overflow-auto h-[calc(100%-140px)]">
          {items.length === 0 ? (
            <div className="text-white/70">Your cart is empty.</div>
          ) : (
            items.map((it) => (
              <div
                key={it.id}
                className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-3"
              >
                <img
                  src={it.image}
                  alt={it.title}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="font-semibold">{it.title}</div>
                  <div className="text-white/70 text-sm">
                    ₦{it.price.toLocaleString()} • Qty {it.qty}
                  </div>
                </div>
                <button
                  onClick={() => remove(it.id)}
                  className="rounded-lg px-3 py-2 bg-white/10 hover:bg-white/15 text-sm"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-5 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-white/70">Total</span>
            <span className="text-lg font-semibold">₦{total.toLocaleString()}</span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={clear}
              className="flex-1 rounded-xl bg-white/10 hover:bg-white/15 py-3"
            >
              Clear
            </button>
            <button
              className="flex-1 rounded-xl bg-[#b89a53] text-black font-semibold py-3 hover:brightness-110"
            >
              Checkout
            </button>
          </div>
        </div>
      </aside>
    </div>,
    document.body
  );
}
