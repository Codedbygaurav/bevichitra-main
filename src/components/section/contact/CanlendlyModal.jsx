"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function CalendlyModal({ open, setOpen }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(
        document.documentElement.classList.contains("dark")
      );
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const calendlySrc = useMemo(() => {
    return isDark
      ? "https://calendly.com/bevichitra1/30min?primary_color=286cb5&text_color=ffffff&background_color=0f172a&theme=dark"
      : "https://calendly.com/bevichitra1/30min?primary_color=286cb5&text_color=0f172a&background_color=f8fafc";
  }, [isDark]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
        >
          {/* BACKDROP */}
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />

          {/* MODAL */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 30 }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative w-full max-w-5xl h-[88vh] rounded-3xl overflow-hidden border border-[var(--glass-border)] bg-transparent backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.25)]"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full border border-white/20 bg-black/20 backdrop-blur-md text-white hover:bg-black/30 transition-all duration-300"
            >
              ✕
            </button>

            {/* CALENDLY */}
            <div className="w-full h-full rounded-3xl overflow-hidden">
              <iframe
                src={calendlySrc}
                className="w-full h-full border-0 rounded-3xl"
                title="Calendly Booking"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}