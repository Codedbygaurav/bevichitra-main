"use client";

import { motion } from "framer-motion";

export default function CallDecision({ onCalendly, onManual }) {
  const tags = [
    "⚡ Fast response within 24 hours",
    "🧠 Clear guidance, no confusion",
    "🤝 No pressure, just honest advice",
  ];

  return (
    <div className="space-y-6">
      {/* MAIN CARD */}
      <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl p-6 md:p-7 shadow-[var(--shadow-soft)]">
        <h3 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)] mb-2">
          How would you like to proceed?
        </h3>

        <p className="text-sm text-[var(--text-secondary)] mb-6">
          Choose what works best for you — schedule instantly or let us reach out.
        </p>

        <div className="space-y-4">
          {/* OPTION 1 */}
          <button
            onClick={onCalendly}
            className="w-full text-left rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md px-5 py-5 transition-all duration-300 hover:border-[var(--color-blue)] hover:shadow-[0_0_20px_rgba(40,108,181,0.15)] hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-[var(--text-primary)]">
                  Book a call
                </p>
                <p className="text-sm text-[var(--text-secondary)] mt-1">
                  Pick a time that suits you instantly
                </p>
              </div>

              <span className="text-[var(--color-blue)] text-lg">
                →
              </span>
            </div>
          </button>

          {/* OPTION 2 */}
          <button
            onClick={onManual}
            className="w-full text-left rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md px-5 py-5 transition-all duration-300 hover:border-[var(--color-red)] hover:shadow-[0_0_20px_rgba(224,31,68,0.15)] hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-[var(--text-primary)]">
                  Let us contact you
                </p>
                <p className="text-sm text-[var(--text-secondary)] mt-1">
                  Share your preferred timing and we’ll reach out
                </p>
              </div>

              <span className="text-[var(--color-red)] text-lg">
                →
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* TRUST TAGS */}
      <div className="flex flex-wrap gap-3">
        {tags.map((text, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: [0, -2, 0] }}
            transition={{
              delay: i * 0.15,
              duration: 3 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-xs px-3 py-1.5 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md text-[var(--text-secondary)]"
          >
            {text}
          </motion.div>
        ))}
      </div>
    </div>
  );
}