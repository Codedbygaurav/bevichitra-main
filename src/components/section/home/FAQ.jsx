"use client";

import { useState, useEffect } from "react";
import SectionHeader from "../../ui/SectionHeader";
import { faqs } from "../../../data/Faqs";
import Reveal from "@/components/ui/Reveal";

/* 🔥 STABLE + INDEX SAFE */
function getRelatedFaqs(faqs, activeIndex, count) {
  const mapped = faqs.map((faq, index) => ({ ...faq, index }));

  const ordered = [
    ...mapped.slice(activeIndex + 1),
    ...mapped.slice(0, activeIndex),
  ];

  return ordered.slice(0, count);
}

export default function FAQ() {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  /* ================= RESPONSIVE ================= */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const previewFaqs = getRelatedFaqs(
    faqs,
    active,
    isMobile ? 1 : 3
  );

  const next = () => {
    setActive((prev) =>
      prev < faqs.length - 1 ? prev + 1 : prev
    );
  };

  const prev = () => {
    setActive((prev) =>
      prev > 0 ? prev - 1 : prev
    );
  };

  return (
    <section className="relative py-24 md:py-32">
      {/* BACKGROUND DEPTH */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(40,108,181,0.03),transparent)]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* HEADER */}
        <div className="mb-16">
          <Reveal>
          <SectionHeader
            label="Got Questions?"
            title={"We've got answers"}
          />
          </Reveal>
        </div>

        {/* MAIN */}
        
        <div className="max-w-3xl mx-auto">
          {/* MAIN CARD */}
          <Reveal>
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
            

            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)]">
                {faqs[active].question}
              </h3>

              <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                {faqs[active].answer}
              </p>
            </div>
          </div>

          {/* CONTROLS */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              disabled={active === 0}
              className="
                w-11 h-11 flex items-center justify-center rounded-full
                border border-[var(--glass-border)]
                bg-[var(--glass-bg)]
                backdrop-blur-md
                hover:shadow-[var(--shadow-soft)]
                transition-all duration-300
                disabled:opacity-30
              "
            >
              ←
            </button>

            <button
              onClick={next}
              disabled={active === faqs.length - 1}
              className="
                w-11 h-11 flex items-center justify-center rounded-full
                border border-[var(--glass-border)]
                bg-[var(--glass-bg)]
                backdrop-blur-md
                hover:shadow-[var(--shadow-soft)]
                transition-all duration-300
                disabled:opacity-30
              "
            >
              →
            </button>
          </div>
          </Reveal>
          

          {/* SUGGESTIONS */}
         <Reveal>
          <div className="flex justify-center gap-3 mt-8 overflow-x-auto no-scrollbar px-1">
            {previewFaqs.map((faq) => (
              <button
                key={faq.id}
                onClick={() => setActive(faq.index)}
                className="
                  text-sm px-4 py-2 rounded-full whitespace-nowrap
                  border border-[var(--glass-border)]
                  bg-[var(--glass-bg)]
                  backdrop-blur-md
                  text-[var(--text-secondary)]
                  transition-all duration-300
                  hover:text-[var(--color-blue)]
                  hover:border-[var(--color-blue)]
                  hover:shadow-[var(--shadow-soft)]
                "
              >
                {faq.question.length > 42
                  ? faq.question.slice(0, 42) + "..."
                  : faq.question}
              </button>
            ))}
          </div>
          </Reveal>
        </div>
      </div>
        
    </section>
  );
}