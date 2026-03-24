"use client";

import { useState } from "react";

export function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error);
      }
    } catch {
      setStatus("error");
      setMessage("Connection error. Please try again.");
    }

    // Reset status after 4 seconds
    setTimeout(() => {
      setStatus("idle");
      setMessage("");
    }, 4000);
  };

  return (
    <div className="border-2 border-ink p-8 md:p-12 text-center bg-cream/50">
      <h2 className="font-heading text-2xl md:text-3xl font-black tracking-tight mb-2 uppercase">
        Subscribe to Our Edition
      </h2>
      <div className="w-16 h-[2px] bg-ink mx-auto mb-4" />
      <p className="font-serif text-[13px] text-muted mb-6 max-w-md mx-auto leading-relaxed">
        Receive the morning&apos;s top headlines delivered directly to your inbox.
        Quality journalism, every day.
      </p>

      {status === "success" ? (
        <div className="py-3 px-6 bg-green-50 border border-green-200 text-green-800 text-sm font-serif max-w-md mx-auto">
          ✓ {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            disabled={status === "loading"}
            className="flex-1 px-4 py-2.5 border border-ink/30 bg-paper text-sm font-serif placeholder:text-muted/40 focus:outline-none focus:border-ink transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-2.5 bg-ink text-paper text-[11px] font-serif font-bold tracking-[0.15em] uppercase hover:bg-accent transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Sending..." : "Subscribe"}
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="text-accent text-[12px] font-serif mt-3">{message}</p>
      )}
    </div>
  );
}
