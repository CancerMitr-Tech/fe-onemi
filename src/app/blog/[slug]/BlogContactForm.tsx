"use client";

import { useState } from "react";

export default function BlogContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ name: "", phone: "", message: "" });
    }, 1000);
  }

  return (
    <div className="border border-gray-200 rounded-xl p-5">
      <h3 className="text-base font-bold text-brand-dark text-center mb-4">
        Send Us A Message
      </h3>
      {sent ? (
        <p className="text-sm text-green-600 text-center py-4">
          Message sent! We&apos;ll get back to you soon.
        </p>
      ) : (
        <form onSubmit={handleSend} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-brand-dark placeholder-gray-400 focus:outline-none focus:border-brand-orange"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-brand-dark placeholder-gray-400 focus:outline-none focus:border-brand-orange"
          />
          <textarea
            placeholder="Enter your message here..."
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            required
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-brand-dark placeholder-gray-400 focus:outline-none focus:border-brand-orange resize-none"
          />
          <button
            type="submit"
            disabled={sending}
            className="w-full bg-brand-orange hover:bg-brand-orange-hover disabled:opacity-60 text-white font-bold py-3 rounded-lg transition-colors text-sm"
          >
            {sending ? "Sending..." : "Send"}
          </button>
        </form>
      )}
    </div>
  );
}