"use client";

import { useState } from "react";
import { testimonials } from "@/data/testimonial";
import SectionHeader from "@/components/ui/SectionHeader";
import { motion, AnimatePresence } from "framer-motion";

export default function Testimonial() {
  const [active, setActive] = useState(0);

  const next = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setActive((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section className="relative py-24 md:py-32">
      {/* SUBTLE DEPTH */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(40,108,181,0.02),transparent)]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* HEADER */}
        <div className="mb-16">
          <SectionHeader
            label="Testimonials"
            title={["What clients", "say"]}
          />
        </div>

        {/* ================= QUOTE ================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* QUOTE */}
            <p className="text-2xl md:text-4xl lg:text-5xl leading-[1.4] font-medium text-[var(--text-primary)]">
              “{testimonials[active].text}”
            </p>

            {/* AUTHOR */}
            <div className="mt-10">
              <p className="text-lg font-semibold text-[var(--text-primary)]">
                {testimonials[active].name}
              </p>
              <p className="text-sm text-[var(--text-secondary)]">
                {testimonials[active].role}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ================= CONTROLS ================= */}
        <div className="flex justify-center items-center gap-6 mt-12">
          <button
            onClick={prev}
            className="
              w-10 h-10 rounded-full
              border border-[var(--glass-border)]
              bg-[var(--glass-bg)]
              backdrop-blur-md
              hover:shadow-[var(--shadow-soft)]
              transition-all duration-300
            "
          >
            ←
          </button>

          {/* DOTS */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition ${
                  i === active
                    ? "bg-[var(--color-blue)] scale-125"
                    : "bg-[var(--bg-secondary)]"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="
              w-10 h-10 rounded-full
              border border-[var(--glass-border)]
              bg-[var(--glass-bg)]
              backdrop-blur-md
              hover:shadow-[var(--shadow-soft)]
              transition-all duration-300
            "
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}