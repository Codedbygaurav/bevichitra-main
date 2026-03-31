"use client";


import { AnimatePresence, motion, setStyle } from "framer-motion";

export default function Success({ success }) {
  return (
    <AnimatePresence>
      {success && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2"
        >
          <div className="px-6 py-3 rounded-full bg-[var(--bg-elevated)] border">
            ✅ Message sent successfully
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}