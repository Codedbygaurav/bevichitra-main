"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function ProjectCards() {
  const [index, setIndex] = useState(0);

  const next = () => {
    if (index < projects.length - 1) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto relative">
      {/* ================= SLIDER TRACK ================= */}
      <div className="overflow-hidden rounded-2xl">
        <motion.div
          className="flex"
          animate={{ x: `-${index * 100}%` }}
          transition={{
            type: "spring",
            stiffness: 90,
            damping: 18,
          }}
        >
          {projects.map((project) => (
            <div key={project.id} className="min-w-full px-2">
              <div
                className="
                  group relative
                  rounded-2xl overflow-hidden
                  border border-[var(--glass-border)]
                  bg-[var(--glass-bg)]
                  backdrop-blur-xl
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-[var(--shadow-hover)]
                "
              >
                {/* IMAGE */}
                <div className="relative w-full h-[180px] md:h-[220px]">
                  <Image
                    src={project.icon}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-5 md:p-6">
                  <h3 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--color-blue)] transition-colors duration-300">
                    {project.title}
                  </h3>

                  <div className="flex gap-3 mt-2 text-xs text-[var(--text-secondary)]">
                    <span>{project.industry}</span>
                    <span>•</span>
                    <span>{project.scope}</span>
                  </div>

                  <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mt-5">
                    <Button variant="warm">
                      View project
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ================= CONTROLS ================= */}
      <div className="flex items-center justify-between mt-6">
        {/* PREV */}
        <button
          onClick={prev}
          disabled={index === 0}
          className="
            px-3 py-2 rounded-full
            border border-[var(--glass-border)]
            bg-[var(--glass-bg)]
            backdrop-blur-md
            hover:shadow-[var(--shadow-soft)]
            disabled:opacity-30
            transition-all duration-300
          "
        >
          ←
        </button>

        {/* DOTS */}
        <div className="flex gap-2">
          {projects.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition ${
                i === index
                  ? "bg-[var(--color-blue)] scale-125"
                  : "bg-[var(--bg-secondary)]"
              }`}
            />
          ))}
        </div>

        {/* NEXT */}
        <button
          onClick={next}
          disabled={index === projects.length - 1}
          className="
            px-3 py-2 rounded-full
            border border-[var(--glass-border)]
            bg-[var(--glass-bg)]
            backdrop-blur-md
            hover:shadow-[var(--shadow-soft)]
            disabled:opacity-30
            transition-all duration-300
          "
        >
          →
        </button>
      </div>
    </div>
  );
}