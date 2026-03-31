"use client";

import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

export default function ServiceText() {
  return (
    <div className="flex flex-col gap-5 md:gap-6 max-w-full xl:max-w-md items-center xl:items-start text-center xl:text-left">
      
      {/* HEADER */}
      <Reveal>
        <SectionHeader
          label="Services"
          title={["We build brands", "that grow and scale"]}
          description="From strategy to execution, we design, build, and optimize digital experiences that help brands stand out and grow faster."
          align="left"
        />
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