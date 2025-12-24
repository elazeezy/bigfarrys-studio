// src/components/payment/BankDetailsCard.jsx
import { useState } from "react";
import { Copy, CheckCircle2, Upload, Info } from "lucide-react";

function CopyRow({ label, value }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // clipboard can fail on some browsers; we keep it silent
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="min-w-0">
        <div className="text-xs text-white/60">{label}</div>
        <div className="truncate text-sm font-semibold text-white">{value}</div>
      </div>

      <button
        type="button"
        onClick={onCopy}
        className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10 active:scale-[0.98]"
      >
        {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

export default function BankDetailsCard({ payment, referenceId, onProofSelected }) {
  const [proofName, setProofName] = useState("");

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5">
      <div className="mb-3 flex items-start gap-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-2">
          <Info className="h-5 w-5 text-white/80" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Payment</h3>
          <p className="mt-1 text-sm text-white/70">
            Make a bank transfer, then send proof + Reference ID on WhatsApp.
          </p>
        </div>
      </div>

      <div className="grid gap-3">
        <CopyRow label="Bank" value={payment.bankName} />
        <CopyRow label="Account Name" value={payment.accountName} />
        <CopyRow label="Account Number" value={payment.accountNumber} />
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3">
        <div className="text-sm font-semibold text-white">Reference ID</div>
        <div className="mt-1 flex items-center justify-between gap-3">
          <div className="truncate text-sm text-white/80">{referenceId}</div>
          <CopyRow label="" value={referenceId} />
        </div>

        <div className="mt-3">
          <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-3 hover:bg-white/10">
            <div className="flex items-center gap-2">
              <Upload className="h-4 w-4 text-white/80" />
              <div className="text-sm font-semibold text-white">
                {proofName ? "Proof selected" : "Upload payment proof"}
              </div>
            </div>

            <span className="text-xs text-white/60">
              {proofName ? proofName : "Choose file"}
            </span>

            <input
              type="file"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setProofName(file.name);
                onProofSelected?.(file);
              }}
            />
          </label>

          <p className="mt-2 text-xs text-white/55">
            WhatsApp can’t auto-attach files from a website. After this, attach your proof manually
            inside WhatsApp.
          </p>
        </div>
      </div>
    </section>
  );
}
