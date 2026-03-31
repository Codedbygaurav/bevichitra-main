"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [locked, setLocked] = useState(false);
  const [timer, setTimer] = useState(0);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (timer === 0) setLocked(false);
  }, [timer]);

  /* ================= LOGIN ================= */
  const handleLogin = async () => {
    if (locked) return;

    document.activeElement?.blur();

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.status === 429) {
        setLocked(true);
        setTimer(30);
        setError("Too many attempts. Try again in 30 seconds.");
        return;
      }

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      router.push("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 section-bg pt-24 pb-10">
      <div className="w-full max-w-md">
        {/* HEADING */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-[var(--text-primary)]">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Secure admin access portal
          </p>
        </div>

        {/* CARD */}
        <div className="relative rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl p-6 sm:p-8 shadow-[var(--shadow-soft)] overflow-hidden">
          {/* SOFT GLOW */}
          <div className="absolute -top-10 -right-10 w-[120px] h-[120px] bg-[var(--color-blue)] blur-[90px] opacity-10 pointer-events-none" />

          {/* LOGO */}
          <div className="flex justify-center mb-6 relative z-10">
            <Image
              src="/images/logoIcon.png"
              width={64}
              height={64}
              alt="logo"
            />
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-[var(--color-red)] text-sm text-center mb-4 relative z-10">
              {error}
            </p>
          )}

          {/* FORM */}
          <div className="space-y-4 relative z-10">
            {/* USERNAME */}
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-main)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] outline-none transition-all duration-300 focus:border-[var(--color-blue)] focus:shadow-[0_0_0_3px_rgba(40,108,181,0.12)]"
            />

            {/* PASSWORD */}
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-main)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] outline-none transition-all duration-300 focus:border-[var(--color-blue)] focus:shadow-[0_0_0_3px_rgba(40,108,181,0.12)]"
            />

            {/* BUTTON */}
            <button
              onClick={handleLogin}
              disabled={loading || locked}
              className="w-full py-3 rounded-xl font-medium text-white transition-all duration-300 active:scale-[0.98] disabled:opacity-50 shadow-[0_10px_30px_rgba(40,108,181,0.2)] hover:shadow-[0_14px_36px_rgba(224,31,68,0.25)]"
              style={{
                background: "var(--gradient-cta)",
              }}
            >
              {locked
                ? `Try again in ${timer}s`
                : loading
                ? "Logging in..."
                : "Login"}
            </button>
          </div>

          {/* FOOTER */}
          <p className="text-center text-[var(--text-secondary)] text-xs mt-6 relative z-10">
            Admin panel access
          </p>
        </div>
      </div>
    </div>
  );
}