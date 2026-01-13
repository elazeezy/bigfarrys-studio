import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient.js";

// ---- helpers
const money = (n) => {
  if (n === null || n === undefined) return "₦0";
  return `₦${Number(n).toLocaleString("en-NG")}`;
};

const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const startOfWeek = () => {
  // Monday-start week
  const d = new Date();
  const day = d.getDay(); // 0=Sun
  const diff = (day === 0 ? -6 : 1) - day; // shift to Monday
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

const startOfMonth = () => {
  const d = new Date();
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
};

function safeDate(ts) {
  if (!ts) return "";
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString();
}

async function getSignedProofUrl(order) {
  // If you stored a public URL already:
  if (order?.proof_url) return order.proof_url;

  // Prefer proof_path, but fallback if you used payment_proof_path before
  const bucket = order?.proof_bucket;
  const path = order?.proof_path || order?.payment_proof_path;

  if (!bucket || !path) return "";

  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, 60 * 60); // 1 hour

  if (error) return "";
  return data?.signedUrl || "";
}

export default function AdminDashboard() {
  const nav = useNavigate();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const [statusFilter, setStatusFilter] = useState("pending"); // pending | confirmed | rejected | all
  const [search, setSearch] = useState("");

  const [toast, setToast] = useState("");
  const [errMsg, setErrMsg] = useState("");

  // Proof modal
  const [proofOpen, setProofOpen] = useState(false);
  const [proofUrl, setProofUrl] = useState("");
  const [proofMeta, setProofMeta] = useState(null);

  // Prevent spam clicks while confirming/rejecting
  const [updatingId, setUpdatingId] = useState("");

  // ---- auth guard
  useEffect(() => {
    let mounted = true;

    (async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!mounted) return;

      if (error || !data?.user) {
        setCheckingAuth(false);
        nav("/admin/login", { replace: true });
        return;
      }

      setUserEmail(data.user.email || "");
      setCheckingAuth(false);
    })();

    return () => {
      mounted = false;
    };
  }, [nav]);

  const fetchOrders = async () => {
    setErrMsg("");
    setLoading(true);

    const query = supabase
      .from("orders")
      .select(
        `
        id,
        created_at,
        service_slug,
        service_title,
        package_id,
        package_name,
        amount,
        currency,
        customer_name,
        customer_phone,
        customer_email,
        customer_details,
        details,
        proof_bucket,
        proof_path,
        payment_proof_path,
        proof_url,
        status,
        confirmed_at,
        rejected_at,
        admin_note
      `
      )
      .order("created_at", { ascending: false });

    let q = query;
    if (statusFilter !== "all") {
      q = q.eq("status", statusFilter);
    }

    const { data, error } = await q;

    setLoading(false);

    if (error) {
      setErrMsg(error.message);
      return;
    }

    setOrders(data || []);
  };

  useEffect(() => {
    if (checkingAuth) return;
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkingAuth, statusFilter]);

  const filteredOrders = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return orders;

    return orders.filter((o) => {
      const hay = [
        o.id,
        o.service_title,
        o.service_slug,
        o.package_name,
        o.customer_name,
        o.customer_phone,
        o.customer_email,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return hay.includes(s);
    });
  }, [orders, search]);

  const stats = useMemo(() => {
    const all = orders;
    const total = all.length;
    const pending = all.filter((o) => o.status === "pending").length;
    const confirmed = all.filter((o) => o.status === "confirmed").length;
    const rejected = all.filter((o) => o.status === "rejected").length;
    return { total, pending, confirmed, rejected };
  }, [orders]);

  const revenue = useMemo(() => {
    const confirmedOrders = orders.filter((o) => o.status === "confirmed");

    const todayStart = startOfToday().getTime();
    const weekStart = startOfWeek().getTime();
    const monthStart = startOfMonth().getTime();

    const sum = (list) =>
      list.reduce((acc, o) => acc + (Number(o.amount) || 0), 0);

    const allTime = sum(confirmedOrders);

    const today = sum(
      confirmedOrders.filter(
        (o) =>
          new Date(o.confirmed_at || o.created_at).getTime() >= todayStart
      )
    );

    const week = sum(
      confirmedOrders.filter(
        (o) => new Date(o.confirmed_at || o.created_at).getTime() >= weekStart
      )
    );

    const month = sum(
      confirmedOrders.filter(
        (o) =>
          new Date(o.confirmed_at || o.created_at).getTime() >= monthStart
      )
    );

    return { today, week, month, allTime };
  }, [orders]);

  const logout = async () => {
    await supabase.auth.signOut();
    nav("/admin/login", { replace: true });
  };

  const updateStatus = async (order, nextStatus) => {
    setErrMsg("");
    setToast("");
    setUpdatingId(order.id);

    try {
      const patch = {
        status: nextStatus,
        confirmed_at:
          nextStatus === "confirmed" ? new Date().toISOString() : null,
        rejected_at:
          nextStatus === "rejected" ? new Date().toISOString() : null,
      };

      const { error } = await supabase
        .from("orders")
        .update(patch)
        .eq("id", order.id);

      if (error) throw error;

      setToast(`Order ${order.id.slice(0, 8)} → ${nextStatus}`);
      setOrders((prev) =>
        prev.map((o) => (o.id === order.id ? { ...o, ...patch } : o))
      );
    } catch (e) {
      setErrMsg(e?.message || "Could not update order");
    } finally {
      setUpdatingId("");
    }
  };

  const openProof = async (order) => {
    setErrMsg("");
    setProofMeta(order);
    setProofUrl("");
    setProofOpen(true);

    const url = await getSignedProofUrl(order);

    if (!url) {
      setErrMsg(
        "Could not load proof. Check that proof_bucket + proof_path were saved for this order."
      );
      return;
    }

    setProofUrl(url);
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen grid place-items-center text-white">
        <div className="text-white/70">Checking admin session…</div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-premium text-white">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-6 md:py-10">
        {/* Top bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-white/55">
              Admin dashboard
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
              Orders & Revenue
            </h1>
            <div className="text-white/60 text-sm mt-1">
              Logged in as <span className="text-white/85">{userEmail}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchOrders}
              className="h-11 px-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition font-semibold"
            >
              Refresh
            </button>
            <button
              onClick={logout}
              className="h-11 px-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition font-semibold"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Toast / errors */}
        <div className="mt-4 grid gap-3">
          {errMsg ? (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-white/85">
              {errMsg}
            </div>
          ) : null}

          {toast ? (
            <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-white/85">
              {toast}
            </div>
          ) : null}
        </div>

        {/* Stats */}
        <section className="mt-6 grid gap-4 md:grid-cols-4">
          <div className="glass rounded-3xl border border-white/10 p-5">
            <div className="text-xs uppercase tracking-[0.18em] text-white/55">
              Total Orders
            </div>
            <div className="mt-2 text-3xl font-extrabold">{stats.total}</div>
          </div>
          <div className="glass rounded-3xl border border-white/10 p-5">
            <div className="text-xs uppercase tracking-[0.18em] text-white/55">
              Pending
            </div>
            <div className="mt-2 text-3xl font-extrabold">{stats.pending}</div>
          </div>
          <div className="glass rounded-3xl border border-white/10 p-5">
            <div className="text-xs uppercase tracking-[0.18em] text-white/55">
              Confirmed
            </div>
            <div className="mt-2 text-3xl font-extrabold">{stats.confirmed}</div>
          </div>
          <div className="glass rounded-3xl border border-white/10 p-5">
            <div className="text-xs uppercase tracking-[0.18em] text-white/55">
              Rejected
            </div>
            <div className="mt-2 text-3xl font-extrabold">{stats.rejected}</div>
          </div>
        </section>

        {/* Revenue */}
        <section className="mt-4 grid gap-4 md:grid-cols-4">
          <div className="glass rounded-3xl border border-white/10 p-5">
            <div className="text-xs uppercase tracking-[0.18em] text-white/55">
              Revenue Today
            </div>
            <div className="mt-2 text-2xl font-extrabold">{money(revenue.today)}</div>
            <div className="text-xs text-white/55 mt-1">Confirmed only</div>
          </div>
          <div className="glass rounded-3xl border border-white/10 p-5">
            <div className="text-xs uppercase tracking-[0.18em] text-white/55">
              This Week
            </div>
            <div className="mt-2 text-2xl font-extrabold">{money(revenue.week)}</div>
            <div className="text-xs text-white/55 mt-1">Mon → now</div>
          </div>
          <div className="glass rounded-3xl border border-white/10 p-5">
            <div className="text-xs uppercase tracking-[0.18em] text-white/55">
              This Month
            </div>
            <div className="mt-2 text-2xl font-extrabold">{money(revenue.month)}</div>
            <div className="text-xs text-white/55 mt-1">1st → now</div>
          </div>
          <div className="glass rounded-3xl border border-white/10 p-5">
            <div className="text-xs uppercase tracking-[0.18em] text-white/55">
              All-time
            </div>
            <div className="mt-2 text-2xl font-extrabold">{money(revenue.allTime)}</div>
            <div className="text-xs text-white/55 mt-1">Confirmed only</div>
          </div>
        </section>

        {/* Controls */}
        <section className="mt-6 glass rounded-3xl border border-white/10 p-4 md:p-5">
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              {["pending", "confirmed", "rejected", "all"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`h-10 px-4 rounded-2xl border transition font-semibold ${
                    statusFilter === s
                      ? "bg-white/10 border-white/20"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search: name, phone, service, order id…"
              className="h-10 rounded-2xl bg-white/5 border border-white/10 px-4 outline-none focus:border-white/25"
            />
          </div>
        </section>

        {/* Orders list */}
        <section className="mt-4">
          <div className="glass rounded-3xl border border-white/10 overflow-hidden">
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
              <div className="font-extrabold">
                Orders{" "}
                <span className="text-white/55 font-semibold">
                  ({filteredOrders.length})
                </span>
              </div>
              {loading ? <div className="text-sm text-white/60">Loading…</div> : null}
            </div>

            {filteredOrders.length === 0 ? (
              <div className="p-6 text-white/70">
                No orders yet for this filter.
                <div className="mt-3">
                  <Link to="/services" className="underline text-white/85">
                    Go to website
                  </Link>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-white/10">
                {filteredOrders.map((o) => (
                  <div key={o.id} className="p-5">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="text-sm font-extrabold">{o.service_title}</div>
                          <span className="text-xs px-2 py-1 rounded-xl bg-white/10 border border-white/10">
                            {o.status}
                          </span>
                          {o.amount ? (
                            <span className="text-xs px-2 py-1 rounded-xl bg-white/5 border border-white/10">
                              {money(o.amount)}
                            </span>
                          ) : null}
                        </div>

                        <div className="text-xs text-white/60 mt-1">
                          Order ID: <span className="text-white/80">{o.id}</span>
                        </div>

                        <div className="text-xs text-white/60 mt-1">
                          Created: <span className="text-white/80">{safeDate(o.created_at)}</span>
                          {o.confirmed_at ? (
                            <>
                              {" "}
                              • Confirmed:{" "}
                              <span className="text-white/80">{safeDate(o.confirmed_at)}</span>
                            </>
                          ) : null}
                          {o.rejected_at ? (
                            <>
                              {" "}
                              • Rejected:{" "}
                              <span className="text-white/80">{safeDate(o.rejected_at)}</span>
                            </>
                          ) : null}
                        </div>

                        <div className="mt-3 grid gap-1 text-sm">
                          <div>
                            <span className="text-white/60">Customer:</span>{" "}
                            <span className="font-semibold">{o.customer_name}</span>{" "}
                            <span className="text-white/60">• {o.customer_phone}</span>
                          </div>
                          {o.customer_email ? (
                            <div className="text-white/70">Email: {o.customer_email}</div>
                          ) : null}
                          {o.customer_details || o.details ? (
                            <div className="text-white/70">
                              Note: {o.customer_details || o.details}
                            </div>
                          ) : null}
                          {o.package_name ? (
                            <div className="text-white/70">Package: {o.package_name}</div>
                          ) : null}
                        </div>
                      </div>

                      <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2">
                        <button
                          onClick={() => openProof(o)}
                          className="h-10 px-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition font-semibold"
                        >
                          View proof
                        </button>

                        <button
                          onClick={() => updateStatus(o, "confirmed")}
                          disabled={o.status === "confirmed" || updatingId === o.id}
                          className="h-10 px-4 rounded-2xl bg-emerald-500/80 hover:bg-emerald-500 transition font-extrabold disabled:opacity-50"
                        >
                          {updatingId === o.id ? "Updating..." : "Confirm"}
                        </button>

                        <button
                          onClick={() => updateStatus(o, "rejected")}
                          disabled={o.status === "rejected" || updatingId === o.id}
                          className="h-10 px-4 rounded-2xl bg-red-500/70 hover:bg-red-500 transition font-extrabold disabled:opacity-50"
                        >
                          {updatingId === o.id ? "Updating..." : "Reject"}
                        </button>

                        <button
                          onClick={() => updateStatus(o, "pending")}
                          disabled={o.status === "pending" || updatingId === o.id}
                          className="h-10 px-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition font-semibold disabled:opacity-50"
                        >
                          Reset → Pending
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Proof modal */}
        {proofOpen ? (
          <div className="fixed inset-0 z-[999] bg-black/60 grid place-items-center p-4">
            <div className="glass w-full max-w-3xl rounded-3xl border border-white/10 overflow-hidden">
              <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="font-extrabold">
                  Payment proof{" "}
                  <span className="text-white/55 font-semibold">
                    {proofMeta?.id ? `(${proofMeta.id.slice(0, 8)})` : ""}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setProofOpen(false);
                    setProofUrl("");
                    setProofMeta(null);
                  }}
                  className="h-10 px-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition font-semibold"
                >
                  Close
                </button>
              </div>

              <div className="p-5">
                {!proofUrl ? (
                  <div className="text-white/70">
                    Loading proof…
                    <div className="text-xs text-white/50 mt-2">
                      If this never loads, confirm the order has{" "}
                      <code className="text-white/80">proof_bucket</code> and{" "}
                      <code className="text-white/80">proof_path</code> (or{" "}
                      <code className="text-white/80">payment_proof_path</code>) saved.
                    </div>
                  </div>
                ) : (
                  <>
                    <img
                      src={proofUrl}
                      alt="Payment proof"
                      className="w-full max-h-[70vh] object-contain rounded-2xl border border-white/10 bg-black/30"
                    />
                    <div className="mt-4 flex flex-wrap gap-2">
                      <a
                        href={proofUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="h-10 px-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition font-semibold grid place-items-center"
                      >
                        Open in new tab
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
