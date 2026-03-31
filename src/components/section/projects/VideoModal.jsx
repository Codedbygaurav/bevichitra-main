"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function VideoModal({ videoId, close }) {
  /* ESC CLOSE + LOCK SCROLL */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") close();
    };

    // lock background scroll
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKey);

    return () => {
      // restore scroll
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKey);
    };
  }, [close]);

  return (
    <AnimatePresence>
      <motion.div
        onClick={close}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        {/* BACKDROP */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

        {/* MODAL */}
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 40 }}
          transition={{
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative w-[92%] max-w-5xl aspect-video rounded-3xl overflow-hidden border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl shadow-[var(--shadow-hover)]"
        >
          {/* VIDEO */}
          <iframe
            title="Project video preview"
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />

          {/* CLOSE BUTTON */}
          <button
            onClick={close}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-300"
          >
            <X size={20} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}