"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import MainBadge from "@/components/ui/MainBadge";
import Link from "next/link";

export default function ShowProjectData() {
  return (
    <section className="py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <div className="flex justify-center">
              <MainBadge>Featured Project</MainBadge>
            </div>

            <h2 className="mt-6 text-3xl md:text-5xl font-semibold leading-tight text-[var(--text-primary)]">
              Real work. Real impact.
            </h2>
          </div>
        </Reveal>

        {/* PROJECT */}
        <div className="mt-16 grid lg:grid-cols-2 gap-10 items-center">

          {/* IMAGE */}
          <Reveal>
            <div className="rounded-2xl overflow-hidden border border-[var(--glass-border)]">
              <Image
                src="/images/project/fillip/fillipBanner.webp"
                alt="fillip Project"
                width={800}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>

          {/* CONTENT */}
          <Reveal delay={0.2}>
            <div className="max-w-xl">
              <h3 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)]">
                Fillip Innovative Solutions
              </h3>

              <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                Fillip Innovative Solutions is built to empower modern businesses through intelligent technology and seamless brand experiences. From strategic branding to refined logo and design systems, the focus is on creating identities that communicate clarity, reliability, and innovation. Designed to support growth in digital-first environments, Fillip transforms complex ideas into structured, future-ready brand systems that drive consistency and impact.
              </p>

              <div className="mt-6 text-sm text-[var(--text-secondary)]">
                Branding • Logo • Digital Identity
              </div>

              <div className="mt-8">
                <Link href="/projects/Fillip-Innovative-Solutions">
                  <Button variant="secondary">
                    View Full Case Study
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}