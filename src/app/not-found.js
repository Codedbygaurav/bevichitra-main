"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-6 section-bg relative overflow-hidden">
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-[var(--color-blue)] blur-[140px] opacity-10" />
        <div className="absolute bottom-20 right-10 w-[280px] h-[280px] bg-[var(--color-red)] blur-[120px] opacity-10" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 flex flex-col items-center w-full max-w-5xl text-center"
      >
        {/* LOGO */}
        <div className="mb-8">
          <Image
            src="/images/logoIcon.png"
            alt="BeVichitra"
            width={90}
            height={90}
            priority
            className="object-contain"
          />
        </div>

        {/* 404 */}
        <span className="block font-bold tracking-tight mb-4 text-2xl md:text-3xl text-[var(--color-primary)]">
          404
        </span>

        {/* HEADING */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.02]">
          Lost in the{" "}
          <span className="gradient-text">
            odd?
          </span>
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-6 text-[var(--text-secondary)] max-w-2xl text-lg md:text-xl leading-relaxed">
          The page you’re looking for doesn’t exist or may have been moved.
          Let’s get you back to something meaningful with{" "}
          <span className="font-semibold text-[var(--text-primary)]">
            BeVichitra
          </span>
          .
        </p>

        {/* CTA */}
        <Link
          href="/"
          className="group mt-10 inline-flex items-center justify-center px-8 py-4 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-[var(--shadow-soft)]"
          style={{
            background: "var(--gradient-cta)",
          }}
        >
          Return to Home

          <motion.span
            className="ml-2 inline-block"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            →
          </motion.span>
        </Link>
      </motion.div>
    </div>
  );
}