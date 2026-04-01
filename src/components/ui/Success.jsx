"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Success({ success, setSuccess }) {
useEffect(() => {
if (!success) return;

const timer = setTimeout(() => {
  setSuccess(false);
}, 2000);

return () => clearTimeout(timer);

}, [success, setSuccess]);

return (
<AnimatePresence>
{success && (
<motion.div
initial={{ opacity: 0, y: 24, scale: 0.95 }}
animate={{ opacity: 1, y: 0, scale: 1 }}
exit={{ opacity: 0, y: 24, scale: 0.95 }}
transition={{
duration: 0.25,
ease: "easeOut",
}}
className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999]"
>
<div
className="
flex items-center gap-3
px-5 py-3 rounded-2xl

        border border-[var(--glass-border)]
        bg-[var(--glass-bg)]
        backdrop-blur-xl

        shadow-[0_10px_30px_rgba(0,0,0,0.12)]
      "
      >
        <div
          className="
          w-8 h-8 rounded-full
          flex items-center justify-center

          bg-[linear-gradient(135deg,var(--color-blue),var(--color-yellow))]
          text-white text-sm
        "
        >
          ✓
        </div>

        <div>
          <p className="text-sm font-medium text-[var(--text-primary)]">
            Message sent successfully
          </p>

          <p className="text-xs text-[var(--text-secondary)]">
            We’ll reach out soon
          </p>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>

);
}