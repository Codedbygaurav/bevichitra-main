import SectionHeader from "@/components/ui/SectionHeader"
import Reveal from "@/components/ui/Reveal"

export default function WhatWeBelieve() {
  return (
    <section className="py-10 md:py-18 px-4 sm:px-6">
  <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-12 md:gap-16 items-center">

    {/* LEFT CONTENT */}
    <div>

      <Reveal>
        <SectionHeader
          align="left"
          title="What We Believe"
        />
      </Reveal>

      <div className="mt-8 space-y-6 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl">

        <Reveal delay={0.1}>
          <p>
            We believe a brand is the sum of user experience.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-[var(--text-primary)] font-medium">
            Not just visuals. Not just messaging.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <p>
            But how it feels to interact with you, at every touchpoint.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <p>
            It’s a system of perception how people see you, remember you, and choose you.
          </p>
        </Reveal>

        <Reveal delay={0.5}>
          <p>
            And that system needs clarity, consistency, and creative intelligence.
          </p>
        </Reveal>

      </div>
    </div>


    {/* RIGHT INTERACTIVE STACK */}
    <div className="flex flex-col gap-4">

      {[
        {
          title: "Clarity",
          desc: "Clear positioning that people instantly understand.",
        },
        {
          title: "Consistency",
          desc: "Same message across every touchpoint.",
        },
        {
          title: "Creative Intelligence",
          desc: "Ideas that stand out and actually convert.",
        },
      ].map((item, i) => (
        <Reveal key={item.title} delay={i * 0.15}>
          <div className="group p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)] cursor-pointer">

            <p className="font-semibold text-[var(--text-primary)] font-[var(--font-heading)]">
              {item.title}
            </p>

            <p className="mt-2 text-sm text-[var(--text-secondary)] md:opacity-0 md:group-hover:opacity-100 transition duration-300">
              {item.desc}
            </p>

          </div>
        </Reveal>
      ))}

    </div>

  </div>
</section>
  )
}
