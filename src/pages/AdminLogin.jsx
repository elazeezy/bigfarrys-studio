import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient.js";

export default function AdminLogin() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const signIn = async () => {
    setErr("");
    setOk("");

    if (!email.trim()) return setErr("Enter your email.");
    if (!password.trim()) return setErr("Enter your password.");

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;

      setOk("Logged in successfully.");
      nav("/admin/dashboard");
    } catch (e) {
      setErr(e?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] grid place-items-center px-4">
      <div className="glass w-full max-w-md rounded-3xl border border-white/10 p-6 md:p-7">
        <h1 className="text-2xl font-extrabold">Admin Login</h1>
        <p className="mt-2 text-sm text-white/60">
          Login with your admin email & password.
        </p>

        <div className="mt-5 grid gap-3">
          <input
            className="h-12 rounded-2xl bg-white/5 border border-white/10 px-4 outline-none focus:border-pink-400/40"
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <input
            className="h-12 rounded-2xl bg-white/5 border border-white/10 px-4 outline-none focus:border-pink-400/40"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="current-password"
          />

          {err ? (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-white/85">
              {err}
            </div>
          ) : null}

          {ok ? (
            <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-white/85">
              {ok}
            </div>
          ) : null}

          <button
            type="button"
            onClick={signIn}
            disabled={loading}
            className="mt-1 h-12 rounded-2xl bg-pink-500/90 hover:bg-pink-500 transition font-extrabold disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
