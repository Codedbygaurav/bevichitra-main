
import MainBadge from "@/components/ui/MainBadge";
import Reveal from "@/components/ui/Reveal";

export default function OurPhilosophy() {
  return (
    <section className="py-14 md:py-22 px-4 sm:px-6 text-center">
      <div className="max-w-5xl mx-auto">

        {/* BADGE */}
        <Reveal>
          <div className="flex justify-center">
            <MainBadge>Our Philosophy</MainBadge>
          </div>
        </Reveal>

        {/* TEXT */}
        <div className="mt-12 space-y-10">

          {/* LINE 1 */}
          <Reveal delay={0.1}>
            <p className="text-2xl sm:text-3xl md:text-4xl font-medium text-[var(--text-secondary)] leading-tight">
              Be normal,
              <span className="block">and you’ll be ignored.</span>
            </p>
          </Reveal>

          {/* LINE 2 */}
          <Reveal delay={0.25}>
            <p className="text-2xl sm:text-3xl md:text-4xl font-medium text-[var(--text-secondary)] leading-tight opacity-80">
              Be different,
              <span className="block">and you’ll be noticed.</span>
            </p>
          </Reveal>

          {/* FINAL LINE */}
          <Reveal delay={0.4}>
            <p className="text-2xl sm:text-4xl md:text-5xl font-semibold leading-tight text-[var(--text-primary)]">
              Be Vichitra,
              <span className="block mt-2 text-[var(--color-yellow)]">
                and you’ll be remembered.
              </span>
            </p>
          </Reveal>

        </div>

      </div>
    </section>
  );
}