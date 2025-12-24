import { useMemo, useState } from "react";
import GlassCard from "../components/GlassCard.jsx";
import { payment, brand } from "../data/content.js";
import { useCart } from "../providers/CartProvider.jsx";
import { Copy, CheckCircle2 } from "lucide-react";

function CopyRow({ label, value }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // If clipboard fails, user can still manually copy.
      setCopied(false);
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/5 border border-white/10 p-3">
      <div className="min-w-0">
        <div className="text-xs text-white/60">{label}</div>
        <div className="font-semibold break-all">{value}</div>
      </div>

      <button
        onClick={onCopy}
        className="h-10 px-3 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 transition inline-flex items-center gap-2"
        aria-label={`Copy ${label}`}
        type="button"
      >
        <Copy size={16} />
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const nf = new Intl.NumberFormat("en-NG");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [proof, setProof] = useState(null);

  const waHref = useMemo(() => {
    const lines = [
      "Hi BIGFARRYS! I just made a payment and want to confirm my order.",
      "",
      `Name: ${fullName || "-"}`,
      `Phone: ${phone || "-"}`,
      `Address: ${address || "-"}`,
      "",
      "Order:",
      ...items.map((i) => `- ${i.name} (Size ${i.size}) x${i.qty} = ₦${nf.format(i.price * i.qty)}`),
      "",
      `Total: ₦${nf.format(subtotal)}`,
      "",
      `Note: ${note || "-"}`,
      "",
      "I will attach my payment proof here (screenshot)."
    ];
    return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [items, subtotal, fullName, phone, address, note, nf]);

  return (
    <section className="px-3 md:px-6 mt-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl md:text-5xl font-extrabold">Checkout</h1>
        <p className="text-white/70 mt-2 max-w-3xl">
          Pay via bank transfer, then upload your proof and confirm your order on WhatsApp.
        </p>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Payment Details */}
          <GlassCard className="p-5 lg:col-span-1">
            <div className="font-extrabold text-lg">Make payment</div>
            <p className="text-white/70 text-sm mt-2">
              Transfer to the account below. Use your name as narration if possible.
            </p>

            <div className="mt-4 space-y-2">
              <CopyRow label="Bank name" value={payment.bankName} />
              <CopyRow label="Account number" value={payment.accountNumber} />
              <CopyRow label="Account name" value={payment.accountName} />
            </div>

            <div className="mt-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/20 p-3 text-sm text-white/80 flex gap-2">
              <CheckCircle2 size={18} className="mt-0.5 text-emerald-300" />
              After payment, upload your proof and confirm your order.
            </div>
          </GlassCard>

          {/* Customer + Proof */}
          <GlassCard className="p-5 lg:col-span-2">
            <div className="font-extrabold text-lg">Your details</div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="text-sm text-white/70">
                Full name
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1 w-full h-12 px-4 rounded-2xl bg-white/10 border border-white/10 outline-none focus:border-white/20"
                  placeholder="e.g. Wuraola Client"
                />
              </label>

              <label className="text-sm text-white/70">
                Phone number
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full h-12 px-4 rounded-2xl bg-white/10 border border-white/10 outline-none focus:border-white/20"
                  placeholder="e.g. 090..."
                />
              </label>

              <label className="text-sm text-white/70 md:col-span-2">
                Delivery address
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 w-full h-12 px-4 rounded-2xl bg-white/10 border border-white/10 outline-none focus:border-white/20"
                  placeholder="Street, area, state"
                />
              </label>

              <label className="text-sm text-white/70 md:col-span-2">
                Extra note (optional)
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="mt-1 w-full min-h-[110px] p-4 rounded-2xl bg-white/10 border border-white/10 outline-none focus:border-white/20"
                  placeholder="Any special instructions…"
                />
              </label>
            </div>

            <div className="mt-4 rounded-2xl bg-white/5 border border-white/10 p-4">
              <div className="font-semibold">Upload payment proof</div>
              <p className="text-white/60 text-sm mt-1">
                Upload a screenshot/receipt. You’ll also send it on WhatsApp in the next step.
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProof(e.target.files?.[0] || null)}
                className="mt-3 block w-full text-sm text-white/70"
              />

              {proof && (
                <div className="text-sm text-white/70 mt-2">
                  Selected: <span className="font-semibold">{proof.name}</span>
                </div>
              )}
            </div>

            {/* Order summary */}
            <div className="mt-4 rounded-2xl bg-white/5 border border-white/10 p-4">
              <div className="font-extrabold">Order summary</div>
              <div className="mt-3 space-y-2 text-sm text-white/70">
                {items.length === 0 ? (
                  <div>Your cart is empty. Go to Shop and add items.</div>
                ) : (
                  items.map((i) => (
                    <div key={i.key} className="flex justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-semibold text-white truncate">{i.name}</div>
                        <div className="text-xs text-white/60">Size {i.size} • x{i.qty}</div>
                      </div>
                      <div className="font-semibold">₦{nf.format(i.price * i.qty)}</div>
                    </div>
                  ))
                )}

                <div className="pt-3 mt-3 border-t border-white/10 flex justify-between font-extrabold text-white">
                  <span>Total</span>
                  <span>₦{nf.format(subtotal)}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a
                href={waHref}
                className="h-12 rounded-2xl bg-pink-500 text-black font-semibold grid place-items-center hover:opacity-90 transition"
              >
                Confirm on WhatsApp 💬
              </a>

              <button
                onClick={clear}
                className="h-12 rounded-2xl bg-white/10 border border-white/10 font-semibold hover:bg-white/15 transition"
                type="button"
              >
                Clear cart
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

