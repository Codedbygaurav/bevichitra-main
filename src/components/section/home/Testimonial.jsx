"use client";

import { useState } from "react";
import { testimonials } from "../../../data/testimonial";
import SectionHeader from "../../ui/SectionHeader";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

function QuoteIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="w-10 h-10 sm:w-12 sm:h-12 mb-8 mx-auto"
      fill="none"
    >
      <path
        d="M18 24H10C10.4 18.8 13.2 15.6 18 14V9C10.8 11 6 17.6 6 25V38H18V24ZM42 24H34C34.4 18.8 37.2 15.6 42 14V9C34.8 11 30 17.6 30 25V38H42V24Z"
        fill="var(--color-blue)"
        opacity="0.9"
      />
    </svg>
  );
}

export default function Testimonial() {
  const [active, setActive] = useState(0);

  const next = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setActive((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* HEADER */}
        <div className="text-center mb-16">
          <Reveal>
            <SectionHeader label="Testimonials" title="What clients say" />
          </Reveal>
        </div>

        {/* PREMIUM CARD */}
        <Reveal>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="
              max-w-5xl mx-auto
              rounded-[32px]
              border border-[var(--glass-border)]
              bg-[var(--glass-bg)]
              backdrop-blur-xl
              px-6 sm:px-10 md:px-14
              py-10 sm:py-14
              shadow-[var(--shadow-soft)]
            "
            >
              <QuoteIcon />

              {/* TEXT */}
              <p
                className="
                text-lg sm:text-xl md:text-2xl
                leading-[1.9]
                font-normal
                text-center
                text-[var(--text-primary)]
                tracking-[-0.01em]
              "
              >
                {testimonials[active].text}
              </p>

              {/* CLIENT */}
              <a
                href={testimonials[active].website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 flex flex-col items-center group transition-all duration-300 hover:opacity-80"
              >
                <img
                  src={testimonials[active].image}
                  alt={testimonials[active].name}
                  className=" w-14 h-14 sm:w-20 sm:h-20  bg-[#FBF6F6] rounded-full object-cover border-4 border-[#FBF6F6] mb-4"
                />

                <p className="text-base font-semibold text-[var(--text-primary)] font-[var(--font-heading)]">
                  {testimonials[active].name}
                </p>

                <p className="text-sm text-[var(--text-secondary)] mt-1">
                  {testimonials[active].role}
                </p>

                <p className="text-sm text-[var(--text-secondary)] opacity-70">
                  {testimonials[active].company}
                </p>
              </a>
            </motion.div>
          </AnimatePresence>
        </Reveal>
        <Reveal>
          <p className="text-xs mt-2 text-[var(--text-secondary)] opacity-60">
            Visit website ↗
          </p>
        </Reveal>

        {/* MINIMAL CONTROLS */}
        <div className="flex justify-center items-center gap-6 mt-10">
          <button
            onClick={prev}
            className="
              w-9 h-9 rounded-full
              border border-[var(--glass-border)]
              bg-[var(--glass-bg)]
              backdrop-blur-md
              transition-all duration-300
              hover:scale-105
            "
          >
            ←
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-6 h-1.5 bg-[var(--color-blue)]"
                    : "w-1.5 h-1.5 bg-[var(--bg-secondary)]"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="
              w-9 h-9 rounded-full
              border border-[var(--glass-border)]
              bg-[var(--glass-bg)]
              backdrop-blur-md
              transition-all duration-300
              hover:scale-105
            "
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
