"use client";

import { useState } from "react";
import ContactFlow from "../../components/section/contact/ContactFlow";
import SectionHeader from "../../components/ui/SectionHeader";
import MainBadge from "../../components/ui/MainBadge";

export default function ContactClient() {
  const [step, setStep] = useState(1);

  return (
    <section className="relative pt-30 sm: pt-36 pb-24 px-2 sm:px-6 ">
      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
        {/* LEFT */}
        <div className="space-y-6 ">
          <MainBadge>Contact Us</MainBadge>

          <div >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight">
              <span className="block text-[var(--text-primary)] ">
                Let’s build something
              </span>

              <span className="block gradient-text pb-2">
                meaningful together
              </span>
            </h1>
          </div>

          {/* PROGRESS */}
          <div className="flex gap-2 mt-6 ">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                  step >= s
                    ? "bg-[var(--gradient-brand)]"
                    : "bg-[var(--bg-secondary)]"
                }`}
                style={{
                  background:
                    step >= s ? "var(--gradient-brand)" : "var(--bg-secondary)",
                }}
              />
            ))}
          </div>

          <p className="text-[var(--text-secondary)] max-w-md leading-relaxed">
            Clear process. Honest advice. Real execution. No confusion, no
            wasted calls.
          </p>
        </div>

        {/* RIGHT */}
        <ContactFlow step={step} setStep={setStep} />
      </div>

      {/* FAQ BLOCK */}
      <div className="relative z-10 max-w-5xl mx-auto mt-28">
        <div className="mb-10">
          <SectionHeader
            label="Before We Talk"
            title={"Things you should know first"}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              q: "How long is the call?",
              a: "A focused 15-minute session designed to give clarity fast.",
            },
            {
              q: "Is it a sales call?",
              a: "No pressure selling. We focus on understanding your goal.",
            },
            {
              q: "What happens after?",
              a: "You’ll receive next steps, direction, or a roadmap.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl p-6 shadow-[var(--shadow-soft)] hover:-translate-y-1 transition-all duration-300"
            >
              <p className="font-semibold mb-3 text-[var(--text-primary)]">
                {item.q}
              </p>

              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
