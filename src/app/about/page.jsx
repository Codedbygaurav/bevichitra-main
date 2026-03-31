import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata = {
  title: "About Bevicitra | Creative Digital Agency",
  description:
    "Learn about Bevicitra, our story, team, and creative approach to building premium digital brands, websites, and scalable digital experiences.",
  keywords: [
    "Bevicitra",
    "creative digital agency",
    "branding agency",
    "web design agency",
    "UI UX design",
    "brand strategy",
    "website development",
  ],
  openGraph: {
    title: "About Bevicitra | Creative Digital Agency",
    description:
      "Meet the team behind Bevicitra and discover our story, values, and creative approach.",
    images: ["/images/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Bevicitra",
    description: "Story, team, and values behind Bevicitra digital agency.",
    images: ["/images/og-image.png"],
  },
};

export default function About() {
  return (
    <main className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)]">
      {/* HERO */}
      <section className="relative overflow-hidden py-24 md:py-32">
        

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-1.5 text-sm text-[var(--text-secondary)] backdrop-blur-md">
              About Us
            </span>

            <h1 className="mt-6 text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight">
              <span className="block">We build brands</span>
              <span className="block bg-[var(--gradient-brand)] bg-clip-text text-transparent">
                that people remember
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--text-secondary)]">
              We are a creative digital agency focused on strategy, design, and
              development. From first idea to final product, we help brands
              launch experiences that look premium, perform fast, and convert
              better.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button variant="warm">Start a Project</Button>
              <Button variant="secondary">View Work</Button>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl p-8 shadow-[var(--shadow-hover)]">
              <div className="grid grid-cols-2 gap-4">
                {[
                  ["4+", "Projects Delivered"],
                  ["3+", "Brands Scaled"],
                  ["98%", "Client Satisfaction"],
                  ["24/7", "Support & Strategy"],
                ].map(([num, label]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5"
                  >
                    <p className="text-2xl font-semibold text-[var(--color-blue)]">
                      {num}
                    </p>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl p-8 md:p-10 shadow-[var(--shadow-soft)]">
            <h2 className="text-3xl md:text-4xl font-semibold">Our story</h2>
            <p className="mt-5 leading-relaxed text-[var(--text-secondary)]">
              What started as a passion for building beautiful interfaces has
              grown into a full-service creative studio. We combine
              storytelling, UI/UX, and modern engineering to help brands stand
              out in a crowded digital world.
            </p>
            <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
              We do not believe in generic templates. Every brand has its own
              voice, audience, and business goal — and we design around that.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              "Strategy-first approach",
              "Premium design language",
              "Fast and scalable development",
              "Conversion-focused experiences",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5 backdrop-blur-md"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            title="What drives us"
            description="We blend creativity with performance so your brand not only looks good, but actually grows."
          />

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              [
                "Clarity",
                "Simple systems, clear communication, zero confusion.",
              ],
              [
                "Creativity",
                "Playful visuals that still feel premium and intentional.",
              ],
              [
                "Results",
                "Design decisions backed by growth and conversion goals.",
              ],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl p-8 shadow-[var(--shadow-soft)]"
              >
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-[var(--text-secondary)] leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY THE NAME */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl p-8 md:p-10 shadow-[var(--shadow-soft)]">
            <h2 className="text-3xl md:text-4xl font-semibold">
              Why we chose the name Bevicitra
            </h2>
            <p className="mt-5 leading-relaxed text-[var(--text-secondary)]">
              We wanted a name that instantly feels distinctive, creative, and
              memorable. “Bevicitra” reflects our belief that strong brands
              should never look ordinary.
            </p>
            <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
              For us, it is more than a name. It represents our approach:
              different thinking, refined execution, and designs that stand out
              with purpose rather than noise.
            </p>
          </div>
        </div>
      </section>

      {/* MEET OUR TEAM */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            title="Meet our team"
            description="A small, focused team driven by creativity, strategy, and execution."
          />

          <div className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl p-8 md:p-10 shadow-[var(--shadow-soft)] mb-8 mt-12">
            <div className="grid lg:grid-cols-[160px_1fr] gap-8 items-center">
              <div className="h-40 w-40 rounded-3xl bg-[var(--gradient-brand)] opacity-90" />
              <div>
                <span className="text-sm text-[var(--color-blue)]">
                  Founder
                </span>
                <h3 className="mt-2 text-2xl md:text-3xl font-semibold">
                  Rahul Prajapati
                </h3>
                <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                  Leading the vision behind Bevicitra with a focus on brand
                  strategy, modern UI systems, and digital experiences that help
                  businesses scale with clarity.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              ["Creative Designer", "Visual identity and storytelling"],
              ["UI/UX Specialist", "Product flows and user experience"],
              ["Developer", "Fast, scalable and polished builds"],
            ].map(([role, desc]) => (
              <div
                key={role}
                className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl p-6 shadow-[var(--shadow-soft)]"
              >
                <div className="h-16 w-16 rounded-2xl bg-[var(--gradient-primary)] mb-5" />
                <h4 className="text-xl font-semibold">{role}</h4>
                <p className="mt-3 text-[var(--text-secondary)] leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}