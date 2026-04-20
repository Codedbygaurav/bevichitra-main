"use client";

import Image from "next/image";
import MainBadge from "./MainBadge";
import Reveal from "./Reveal";

export default function PageHeroCard({
  title,
  description,
  image,
  align = "left", // image left / right,
  badge
}) {
  return (
    <section className="px-4 sm:px-6 pt-28 pb-16">
      <Reveal>
        <div className="max-w-6xl mx-auto">

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6 sm:p-10 md:p-12">

          <div
            className={`grid md:grid-cols-2 gap-10 items-center ${
              align === "right" ? "md:flex-row-reverse" : ""
            }`}
          >

            {/* IMAGE */}
            <div className="flex justify-center md:justify-start">
              <div className="relative w-[220px] sm:w-[260px] md:w-[300px]">
                <Image
                  src={image}
                  alt="hero"
                  width={400}
                  height={400}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* TEXT */}
            <div className="text-center md:text-left">

                <MainBadge>{badge}</MainBadge>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black  leading-tight text-[var(--text-primary)] font-[var(--font-heading)]">
                {title}
              </h1>

              <p className="mt-4 text-[var(--text-secondary)] leading-relaxed text-sm sm:text-base max-w-xl mx-auto md:mx-0">
                {description}
              </p>

            </div>

          </div>

        </div>

      </div>
      </Reveal>
    </section>
  );
}