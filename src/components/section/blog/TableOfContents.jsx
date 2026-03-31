"use client";

import { useEffect, useState } from "react";

export default function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState("");

  /* ================= OBSERVER ================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      {
        rootMargin: "-30% 0px -60% 0px",
      }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  /* ================= SCROLL FIX ================= */
  const handleScroll = (id) => {
    const el = document.getElementById(id);

    if (el) {
      const yOffset = -100; // navbar offset
      const y =
        el.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-20">
      <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl p-2 shadow-[var(--shadow-soft)]">
        {/* TITLE */}
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)] mb-4 text-center">
          On this page
        </p>

        {/* LIST */}
        <ul className="space-y-1">
          {headings.map((heading, index) => {
            const isActive = activeId === heading.id;

            return (
              <li key={heading.id}>
                <button
                  onClick={() => handleScroll(heading.id)}
                  className={`w-full flex items-start gap-3 text-left px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-[var(--bg-elevated)] text-[var(--color-blue)] border-l-2 border-[var(--color-blue)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                  }`}
                >
                  {/* NUMBER */}
                  <span className="text-xs mt-[2px] font-medium">
                    {index + 1}
                  </span>

                  {/* TEXT */}
                  <span className="leading-snug">
                    {heading.text}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}