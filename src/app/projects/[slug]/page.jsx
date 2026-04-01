"use client";

import { projectImages } from "../../../data/projectImages";
import { notFound } from "next/navigation";
import Image from "next/image";
import { use } from "react";
import Button from "../../../components/ui/Button";

export default function ProjectPage({ params }) {
  const { slug } = use(params);

  const project = projectImages.find((p) => p.slug === slug);
  if (!project) return notFound();

  return (
    <>

      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-32 pb-24">
        {/* ================= HERO ================= */}
        <div className="mb-24">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-[var(--text-primary)]">
            {project.title}
          </h1>

          <p className="mt-6 text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            {project.description}
          </p>

          {/* HERO IMAGE */}
          <div className="mt-12 rounded-2xl overflow-hidden border border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-[var(--shadow-soft)]">
            <Image
              src={project.cover}
              alt={project.title}
              width={1200}
              height={700}
              className="w-full h-full object-cover transition duration-700 hover:scale-[1.02]"
            />
          </div>
        </div>

        {/* ================= OVERVIEW ================= */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {[
            { label: "Client", value: project.client || "Confidential" },
            {
              label: "Services",
              value: project.services || "Design, Development",
            },
            {
              label: "Timeline",
              value: project.timeline || "4–6 weeks",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl p-6 shadow-[var(--shadow-soft)]"
            >
              <p className="text-sm text-[var(--color-blue)] mb-2 font-medium">
                {item.label}
              </p>
              <p className="text-[var(--text-primary)] font-medium">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* ================= CONTENT ================= */}
        <div className="space-y-20 max-w-3xl">
          {/* PROBLEM */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">
              The Challenge
            </h2>

            <p className="text-[var(--text-secondary)] leading-relaxed">
              {project.problem ||
                "The client needed a scalable and modern digital presence that could support growth while maintaining performance and clarity."}
            </p>
          </div>

          {/* SOLUTION */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">
              The Solution
            </h2>

            <p className="text-[var(--text-secondary)] leading-relaxed">
              {project.solution ||
                "We designed and developed a high-performance solution focused on usability, scalability, and visual clarity."}
            </p>
          </div>
        </div>

        {/* ================= GALLERY ================= */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
          {project.images.map((img, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden border border-[var(--glass-border)] shadow-[var(--shadow-soft)] group"
            >
              <Image
                src={img}
                alt={`${project.title} ${i + 1}`}
                width={800}
                height={1000}
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* ================= CTA ================= */}
        <div className="mt-28 text-center">
          <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl p-10 md:p-14 shadow-[var(--shadow-soft)]">
            <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-[var(--text-primary)]">
              Have a similar project in mind?
            </h3>

            <p className="text-[var(--text-secondary)] mb-6">
              Let’s build something impactful together.
            </p>

            <Button variant="warm">
              Start your project
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}