"use client";

import ProjectCards from "./ProjectCards";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";

export default function ShowProjectData() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 pointer-events-none">
        {/* SOFT BASE TINT */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(40,108,181,0.03),transparent)]" />

        {/* SOFT BRAND TINT */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-[radial-gradient(circle,rgba(246,188,35,0.08),transparent_70%)] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* HEADER */}
        <div className="mb-12 md:mb-16">
          <Reveal>
            <SectionHeader
              label="Featured Projects"
              title={["Refined projects with", "purpose"]}
            />
          </Reveal>
        </div>

        {/* PROJECT CARDS */}
        <Reveal delay={0.1}>
          <ProjectCards />
        </Reveal>
      </div>
    </section>
  );
}