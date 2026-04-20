import Reveal from "@/components/ui/Reveal"
import SectionHeader from "@/components/ui/SectionHeader"

export default function ContactFaq() {
  return (
    <div className="relative z-10 max-w-5xl mx-auto mt-28">
            <div className="mb-10">
              <Reveal>
                <SectionHeader
                label="Before We Talk"
                title={"Things you should know first"}
              />
              </Reveal>
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
            <Reveal>
                <div
                  key={i}
                  className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl p-6 shadow-[var(--shadow-soft)] hover:-translate-y-1 transition-all duration-300"
                >
                  <p className="font-semibold mb-3 text-[var(--text-primary)] font-[var(--font-heading)]">
                    {item.q}
                  </p>
    
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.a}
                  </p>
                </div>
            </Reveal>
              ))}
            </div>
          </div>
  )
}
