import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";

export default function TeamSection() {
  const team = [
    {
      name: "Rahul Prajapati",
      role: "Founder",
      image: "/images/team/RahulPrajapati.webp",
      highlight: true,
    },
    {
      name: "Saurabh Pal",
      role: "Cyber Security & Founding Team",
      image: "/images/team/Saurabh.webp",
    },
    {
      name: "Gaurav",
      role: "Senior Developer & Consultant",
      image: "/images/team/Gaurav.webp",
    },
    {
      name: "Rohit Prajapati",
      role: "Developer & Database Engineer",
      image: "/images/team/RohitPrajapati.webp",
    },
    {
      name: "Rohit Ratate",
      role: "Graphic & UI/UX Designer",
      image: "/images/team/RohitRatate.webp",
    },
    {
      name: "Atul Prajapati",
      role: "Content Strategist",
      image: "/images/team/Atul.webp",
    },
  ];

  return (
    <section className="py-10 md:py-18 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <Reveal>
          <SectionHeader
            title="Meet Our Team"
            description="The people behind the systems, strategy, and execution."
          />
        </Reveal>

        {/* GRID */}
        <div className="mt-14 grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.08}>
              <div
                className={`group rounded-2xl border border-[var(--glass-border)] 
                bg-[var(--glass-bg)] overflow-hidden 
                transition-all duration-300 
                hover:-translate-y-2 
                hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)]
                ${member.highlight ? "md:col-span-2" : ""}
                font-[var(--font-heading)]
                `}
              >
                {/* IMAGE CONTAINER */}
                <div className="relative w-full px-9 py-5 h-72 overflow-hidden flex items-start justify-center bg-[var(--section-bg)]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="object-contain object-top scale-[1.15]"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-6 text-center">
                  <h3 className="text-lg md:text-xl font-semibold text-[var(--text-primary)]">
                    {member.name}
                  </h3>

                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    {member.role}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
