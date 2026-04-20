
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";

export default function ServicesSection() {
  const services = [
    {
      title: "Branding & Identity Systems",
      desc: "Build a brand people instantly recognize and trust.",
    },
    {
      title: "Website Creation (Next.js + CMS)",
      desc: "Fast, scalable websites designed to convert.",
    },
    {
      title: "SEO & Digital Marketing",
      desc: "Position your brand where attention already exists.",
    },
    {
      title: "Social Media Content Creation",
      desc: "Content engineered for engagement and retention.",
    },
    {
      title: "Social Media Management",
      desc: "Consistency that builds long-term brand equity.",
    },
  ];

  return (
    <section className="py-10 md:py-18 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <Reveal>
          <SectionHeader
            title="What We Do"
            description="We don’t offer disconnected services. We build complete brand ecosystems."
          />
        </Reveal>

        {/* GRID */}
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.1}>
              <div className="group rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6 md:p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] cursor-pointer">
                {/* TITLE */}
                <h3 className="text-lg md:text-xl font-semibold text-[var(--text-primary)] font-[var(--font-heading)]">
                  {service.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="mt-3 text-sm text-[var(--text-secondary)] md:opacity-0 md:translate-y-2  md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300">
                  {service.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
