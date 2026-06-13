"use client";

import { useState, useEffect } from "react";
import { X, Send, Clock } from "lucide-react";

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const phoneNumber = "8801576520009";

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = () => {
    const text = message.trim() || "Hello, I have a question about your products.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    setMessage("");
    setOpen(false);
  };

  const quickReplies = [
    "Is this fish still available?",
    "Do you deliver to Dhaka?",
    "What's the tank size needed?",
    "Can I get a discount for bulk?",
  ];

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-[90] flex items-center gap-2 pl-4 pr-5 py-3 rounded-full shadow-2xl transition-all duration-500 cursor-pointer ${
          visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        } ${
          open
            ? "bg-[var(--bg-soft)] border border-[#38bdf8]/30 text-foreground hover:bg-[var(--bg-elevated)]"
            : "bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white hover:shadow-[#25D366]/40"
        }`}
      >
        {open ? (
          <>
            <X className="h-5 w-5" />
            <span className="text-sm font-medium">Close</span>
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.48 3.45 1.38 4.94L2 22l5.94-1.3c1.43.78 3.07 1.2 4.77 1.2 5.46 0 9.91-4.45 9.91-9.91 0-2.63-1.03-5.11-2.9-6.98A9.86 9.86 0 0 0 12.04 2zm.04 1.99c4.37 0 7.92 3.55 7.92 7.92 0 4.37-3.55 7.92-7.92 7.92-1.45 0-2.85-.39-4.07-1.13l-.63-.37-3.53.77.77-3.45-.4-.66A7.92 7.92 0 0 1 12.08 4z"/>
            </svg>
            <span className="text-sm font-semibold">Chat with Us</span>
          </>
        )}
      </button>

      <div
        className={`fixed bottom-24 right-6 z-[90] w-80 glass-strong rounded-2xl shadow-2xl border border-[#38bdf8]/20 overflow-hidden transition-all duration-500 ${
          open ? "translate-y-0 opacity-100 visible" : "translate-y-6 opacity-0 invisible"
        }`}
      >
        <div className="bg-gradient-to-r from-[#25D366] to-[#128C7E] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.48 3.45 1.38 4.94L2 22l5.94-1.3c1.43.78 3.07 1.2 4.77 1.2 5.46 0 9.91-4.45 9.91-9.91 0-2.63-1.03-5.11-2.9-6.98A9.86 9.86 0 0 0 12.04 2zm.04 1.99c4.37 0 7.92 3.55 7.92 7.92 0 4.37-3.55 7.92-7.92 7.92-1.45 0-2.85-.39-4.07-1.13l-.63-.37-3.53.77.77-3.45-.4-.66A7.92 7.92 0 0 1 12.08 4z"/>
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-base">NK Aqua Support</p>
              <div className="flex items-center gap-1.5 text-white/80 text-sm">
                <span className="h-2 w-2 rounded-full bg-green-300"></span>
                Typically replies instantly
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-4 space-y-3 max-h-80 overflow-y-auto">
          <div className="flex items-start gap-2">
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] flex items-center justify-center flex-shrink-0 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.48 3.45 1.38 4.94L2 22l5.94-1.3c1.43.78 3.07 1.2 4.77 1.2 5.46 0 9.91-4.45 9.91-9.91 0-2.63-1.03-5.11-2.9-6.98A9.86 9.86 0 0 0 12.04 2zm.04 1.99c4.37 0 7.92 3.55 7.92 7.92 0 4.37-3.55 7.92-7.92 7.92-1.45 0-2.85-.39-4.07-1.13l-.63-.37-3.53.77.77-3.45-.4-.66A7.92 7.92 0 0 1 12.08 4z"/>
              </svg>
            </div>
            <div className="bg-[var(--bg-elevated)] rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-foreground leading-relaxed">
              Hi there! 👋 Welcome to <strong className="text-[#38bdf8]">NK Aqua</strong>. How can we help you today?
            </div>
          </div>

          <div className="pl-9 space-y-2">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => { setMessage(reply); handleSend(); }}
                className="block w-full text-left px-4 py-2.5 rounded-xl bg-[var(--bg-soft)] border border-[var(--text)]/10 text-sm text-muted hover:border-[#38bdf8]/30 hover:text-[#38bdf8] hover:bg-[#38bdf8]/5 transition-all"
              >
                {reply}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-soft)]/50 rounded-xl">
            <Clock className="h-4 w-4 text-[#38bdf8]" />
            <span className="text-xs text-muted">We reply 10am — 10pm, 7 days a week</span>
          </div>
        </div>

        <div className="px-4 py-3 border-t border-[var(--text)]/10 bg-[var(--bg)]/50">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 bg-[var(--bg-soft)] border border-[var(--text)]/10 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder-dim focus:outline-none focus:border-[#38bdf8]/30 transition"
            />
            <button
              onClick={handleSend}
              className="p-2.5 bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] rounded-xl text-white hover:shadow-lg hover:shadow-[#38bdf8]/30 transition flex-shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
