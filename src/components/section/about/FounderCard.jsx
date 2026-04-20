import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

export default function FounderCard() {
  return (
    <section className="py-10 md:py-18 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-8 md:p-12">
            <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-10 items-center">
              
              {/* IMAGE */}
              <div className="relative w-full h-[320px] md:h-[420px] flex items-end justify-center">
                <Image
                  src="/images/team/RahulPrajapati.webp"
                  alt="Rahul Prajapati"
                  fill
                  className="object-contain object-bottom"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />
              </div>

              {/* CONTENT */}
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)] font-[var(--font-ui)]">
                  From the Founder
                </p>

                <p className="mt-4 text-xl md:text-2xl font-medium text-[var(--text-primary)] leading-relaxed font-[var(--font-heading)]">
                  “I’ve seen founders struggle not because they lack vision, but
                  because they lack a system that brings that vision to life
                  consistently.”
                </p>

                <div className="mt-6 space-y-4 text-[var(--text-secondary)] leading-relaxed">
                  <p>BeVichitra was built to be that system.</p>
                  <p>
                    A place where brand identity, digital presence, and content
                    don’t live separately they work together to create impact.
                  </p>
                  <p>
                    Because in today’s world, the brands that win aren’t the
                    loudest they’re the most intentional.
                  </p>
                </div>

                <div className="mt-6">
                  <p className="font-semibold text-[var(--text-primary)] font-[var(--font-heading)]">
                    Rahul Prajapati
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Founder & Content Strategist
                  </p>
                </div>
              </div>

            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}