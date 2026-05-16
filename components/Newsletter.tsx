"use client";
import { useState } from "react";

interface Props {
  city?: string;
  compact?: boolean;
}

export default function Newsletter({ city, compact = false }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    // Store locally; wire to ConvertKit / Mailchimp / Resend when ready
    try {
      const stored = JSON.parse(localStorage.getItem("ct_subscribers") ?? "[]") as string[];
      if (!stored.includes(email)) {
        stored.push(email);
        localStorage.setItem("ct_subscribers", JSON.stringify(stored));
      }
      await new Promise((r) => setTimeout(r, 600));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (compact) {
    return (
      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
        <p className="text-sm font-semibold text-slate-800 mb-1">
          {city ? `Get the best of ${city} in your inbox` : "Weekly local picks"}
        </p>
        <p className="text-xs text-slate-500 mb-4">Hidden restaurants, seasonal menus, insider tips.</p>
        {status === "success" ? (
          <p className="text-orange-600 text-sm font-semibold">You&apos;re on the list!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 min-w-0 rounded-lg px-3 py-2 text-sm border border-slate-200 focus:outline-none focus:border-orange-400"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-60 whitespace-nowrap"
            >
              {status === "loading" ? "..." : "Join"}
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <section className="bg-[#1E293B] rounded-2xl p-8 md:p-10 text-center">
      <p className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-3">Newsletter</p>
      <h2
        className="text-2xl md:text-3xl font-bold text-white mb-3"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {city ? `The Best of ${city}, Weekly` : "Discover More, Every Week"}
      </h2>
      <p className="text-slate-300 text-sm mb-8 max-w-sm mx-auto">
        Hidden restaurants, seasonal specials, local tips and new guides — straight to your inbox. No spam, ever.
      </p>
      {status === "success" ? (
        <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 border border-orange-500/30 rounded-full px-6 py-3 text-sm font-semibold">
          <span>✓</span> You&apos;re on the list — welcome!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 rounded-xl px-4 py-3 text-sm bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-orange-400 focus:bg-white/15 transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors disabled:opacity-60"
          >
            {status === "loading" ? "Joining…" : "Get Free Tips"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="text-red-400 text-xs mt-3">Something went wrong — try again.</p>
      )}
    </section>
  );
}
