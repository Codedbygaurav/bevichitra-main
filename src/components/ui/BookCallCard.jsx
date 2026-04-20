"use client";
import { useState } from "react";
import Button from "./Button";
import Image from "next/image";
import ContactPopup from "./ContactPopup";
import Reveal from "./Reveal";

export default function BookCallCard() {
  const [open, setOpen] = useState(false);
  return (
    <section className="relative py-24 md:py-32">
      <Reveal>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          {/* ================= MAIN CONTAINER ================= */}
          <div
            className="
            relative rounded-3xl p-8 md:p-12 lg:p-14
            border border-[var(--glass-border)]
            bg-[var(--glass-bg)]
            backdrop-blur-xl
            shadow-[var(--shadow-hover)]
            overflow-hidden
          "
          >
            {/* SOFT BRAND TINT */}
            <div className="absolute -top-20 -right-20 w-[320px] h-[320px] bg-[radial-gradient(circle,rgba(246,188,35,0.08),transparent_70%)] opacity-70 rounded-full pointer-events-none" />

            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12">
              {/* ================= LEFT ================= */}
              <div className="flex flex-col gap-6 max-w-lg text-center lg:text-left">
                <span className="text-sm text-[var(--text-secondary)] font-[var(--font-heading)]">
                  Let’s build something that actually works
                </span>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight">
                  <span className="block text-[var(--text-primary)] font-[var(--font-heading)]">
                    Stop guessing.
                  </span>
                  <span className="block gradient-text pb-2 font-[var(--font-heading)]">
                    Start building right.
                  </span>
                </h2>

                <p className="text-[var(--text-secondary)]">
                  We’ll help you turn your idea into a high-performing product —
                  with clarity, structure, and real strategy.
                </p>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4 mt-2 justify-center lg:justify-start">
                  <a href="#process">
                    <Button variant="primary" className="w-full py-3">
                      See our process
                    </Button>
                  </a>

                  <a className=" text-[var(--text-secondary)] hover:(--text-primary)] transition flex justify-center items-center" href="#services">
                    View Services →
                  </a>
                </div>
              </div>

              {/* ================= RIGHT ================= */}
              <div className="w-full max-w-sm">
                <div
                  className="
                  relative rounded-2xl p-6 text-center
                  border border-[var(--glass-border)]
                  bg-[var(--glass-bg)]
                  backdrop-blur-xl
                  shadow-[var(--shadow-soft)]
                  overflow-hidden
                "
                >
                  {/* GRADIENT DEPTH */}
                  <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(40,108,181,0.05),transparent)] pointer-events-none" />

                  {/* HEADER */}
                  <span className="text-xs text-[var(--color-blue)] uppercase tracking-wider font-[var(--font-heading)]">
                    How it works
                  </span>

                  {/* AVATAR */}
                  <div className="flex items-center justify-center my-5">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md">
                      <Image
                        src="/images/logoIcon.png"
                        alt="You"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />

                      <span className="text-[var(--text-secondary)] text-sm">
                        +
                      </span>

                      <div className="w-8 h-8 bg-[var(--text-primary)] text-[var(--bg-main)] rounded-full flex items-center justify-center text-xs font-medium">
                        You
                      </div>
                    </div>
                  </div>

                  {/* TEXT */}
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                    Simple onboarding flow
                  </h3>

                  <p className="text-sm text-[var(--text-secondary)] mt-2 mb-5">
                    Answer a few quick questions and we’ll guide you on the next
                    best step.
                  </p>

                  {/* BUTTON */}

                  <Button
                    variant="primary"
                    className="px-6 py-3"
                    onClick={() => setOpen(true)}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
      <ContactPopup open={open} setOpen={setOpen} />
    </section>
  );
}
