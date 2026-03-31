"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const scrollTop = window.scrollY;

      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const progress = (scrollTop / docHeight) * 100;
      setWidth(progress);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[100]">
      {/* TRACK */}
      <div className="absolute inset-0 bg-[var(--bg-secondary)]/60 backdrop-blur-sm" />

      {/* PROGRESS */}
      <div
        className="h-full transition-[width] duration-200 ease-out"
        style={{
          width: `${width}%`,
          background: "var(--gradient-brand)",
        }}
      />
    </div>
  );
}