"use client";
import { motion } from "framer-motion";

export default function Float({ children, delay = 0 }) {
  return (
    <motion.div
      animate={{
        y: [0, -12, 0],
        x: [0, 6, 0],
        rotate: [0, 1, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}