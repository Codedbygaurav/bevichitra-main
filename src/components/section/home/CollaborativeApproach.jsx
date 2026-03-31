"use client";

import { useState } from "react";
import { steps } from "@/data/process";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

export default function CollaborativeApproach() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative py-16 md:py-24" id="process">
      {/* BACKGROUND DEPTH */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(40,108,181,0.03),transparent)]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 text-center relative z-10">
        {/* HEADER */}
        <SectionHeader
          label="Our Process"
          title={["How we turn ideas", "into real products"]}
          description="A structured, collaborative process designed to move fast without compromising quality."
        />

        {/* ================= STEPS ================= */}
        <div className="mt-14 flex items-center">
          {steps.map((step, index) => {
            const isActive = index === active;
            const isDone = index < active;

            return (
              <div key={step.id} className="flex items-center flex-1">
                {/* STEP */}
                <button
                  onClick={() => setActive(index)}
                  className="flex flex-col items-center z-10"
                >
                  {/* LABEL */}
                  <span
                    className={`text-xs mb-2 transition ${
                      isActive
                        ? "text-[var(--color-red)]"
                        : isDone
                        ? "text-[var(--text-secondary)] opacity-70"
                        : "opacity-0"
                    }`}
                  >
                    Step {index + 1}
                  </span>

                  {/* CIRCLE */}
                  <motion.div
                    animate={{ scale: isActive ? 1.15 : 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`w-10 h-10 sm:mb-5 flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-300
                    ${
                      isActive
                        ? "bg-[var(--color-red)] text-white shadow-[var(--shadow-soft)]"
                        : isDone
                        ? "bg-[rgba(40,108,181,0.15)] text-[var(--color-blue)]"
                        : "bg-[var(--glass-bg)] text-[var(--text-secondary)] border border-[var(--glass-border)] backdrop-blur-md"
                    }`}
                  >
                    {index + 1}
                  </motion.div>
                </button>

                {/* LINE */}
                {index !== steps.length - 1 && (
                  <div className="flex-1 h-[3px] mx-2 rounded-full bg-[var(--bg-secondary)] relative overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-[var(--color-blue)]"
                      animate={{
                        width:
                          index < active
                            ? "100%"
                            : index === active
                            ? "50%"
                            : "0%",
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ================= CONTENT ================= */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <div
            className="
              relative
              rounded-2xl p-6 md:p-10
              border border-[var(--glass-border)]
              bg-[var(--glass-bg)]
              backdrop-blur-xl
              shadow-[var(--shadow-soft)]
              overflow-hidden
            "
          >
            {/* GRADIENT DEPTH */}
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(40,108,181,0.05),transparent)] pointer-events-none" />

            <div className="relative z-10">
              <h3 className="text-xl md:text-3xl font-semibold text-[var(--text-primary)]">
                {steps[active].title}
              </h3>

              <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                {steps[active].description}
              </p>

              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {steps[active].tags.map((tag, i) => (
                  <span
                    key={i}
                    className="
                      text-xs px-3 py-1 rounded-full
                      bg-[var(--bg-secondary)]
                      text-[var(--text-secondary)]
                      border border-[var(--border)]
                      transition
                      hover:text-[var(--color-blue)]
                      hover:border-[var(--color-blue)]
                    "
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= CONTROLS ================= */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => setActive((prev) => Math.max(prev - 1, 0))}
            disabled={active === 0}
            className="
              px-4 py-2 rounded-full
              border border-[var(--glass-border)]
              bg-[var(--glass-bg)]
              backdrop-blur-md
              hover:shadow-[var(--shadow-soft)]
              disabled:opacity-30
              transition
            "
          >
            ← Back
          </button>

          <button
            onClick={() =>
              setActive((prev) => Math.min(prev + 1, steps.length - 1))
            }
            disabled={active === steps.length - 1}
            className="
              px-4 py-2 rounded-full
              border border-[var(--glass-border)]
              bg-[var(--glass-bg)]
              backdrop-blur-md
              hover:shadow-[var(--shadow-soft)]
              disabled:opacity-30
              transition
            "
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
}