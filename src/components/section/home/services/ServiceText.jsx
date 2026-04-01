"use client";

import Button from "../../../ui/Button";
import Reveal from "../../../ui/Reveal";

import MainBadge from "../../../ui/MainBadge";

export default function ServiceText() {
  return (
    <div className="flex flex-col gap-5 md:gap-6 max-w-full xl:max-w-md items-center xl:items-start text-center xl:text-left pt-0 sm:pt-20">
      
      {/* HEADER */}
      <Reveal>
        <MainBadge>
Services
</MainBadge>

     
      <div>
        <h1 className="text-4xl sm:text-5xl lg:text-5xl font-semibold leading-[1.08] tracking-tight">
          <span className="block text-[var(--text-primary)]">
            We build brands 
          </span>

          <span className="block text-[var(--text-primary)] pb-2">
            that grow and scale
          </span>
        </h1>
      </div>
      </Reveal>

      {/* CTA - KEEP OUTSIDE REVEAL FOR NOW */}
      <div className="mt-3 flex flex-col sm:flex-row items-center gap-4">
        <Button variant="warm">
          Start a project
        </Button>

        <span
          className="
            text-sm text-[var(--text-secondary)]
            hidden sm:flex items-center gap-2
            transition
            hover:text-[var(--color-blue)]
            cursor-pointer
          "
        >
          explore services
          <span className="transition-transform hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </div>
  );
}