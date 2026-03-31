"use client";
import { motion } from "framer-motion";

export default function Reveal({
  children,
  delay = 0,
  immediate = false,
  className = "",
}) {
  const animationProps = {
    initial: { opacity: 0, y: 40 },
    transition: {
      duration: 0.7,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
    className,
  };

  if (immediate) {
    return (
      <motion.div
        {...animationProps}
        animate={{ opacity: 1, y: 0 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      {...animationProps}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
}