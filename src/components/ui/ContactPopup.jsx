"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ContactFlow from "@/components/section/contact/ContactFlow";

export default function ContactPopup({ open, setOpen }) {
const [step, setStep] = useState(1);

/* RESET STEP ON OPEN */
useEffect(() => {
if (open) {
setStep(1);
}
}, [open]);

return (
<AnimatePresence>
{open && (
<>
{/* BACKDROP */}
<motion.div
onClick={() => setOpen(false)}
className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999]"
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
/>

      {/* MODAL */}
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-[1000] px-4"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
      >
        <div className="relative w-full max-w-lg">
          {/* CLOSE BUTTON */}
          <button
            onClick={() => setOpen(false)}
            className="absolute -top-3 -right-3 w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--bg-main)] flex items-center justify-center text-sm hover:bg-[var(--bg-elevated)] transition z-10"
          >
            ✕
          </button>

          <ContactFlow
            step={step}
            setStep={setStep}
          />
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>

);
}