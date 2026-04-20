import ServiceText from "./ServiceText";
import ServiceCardItem from "./ServiceCardItem";
import { services } from "../../../../data/services";
import Reveal from "../../../ui/Reveal";

export default function Services() {
  return (
    <section className="relative py-20 md:py-32" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 md:gap-20 relative z-10">
        {/* LEFT */}
        <div className="lg:sticky lg:top-32 h-fit">
          <Reveal>
            <ServiceText />
          </Reveal>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-6 md:gap-8">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.1}>
              <ServiceCardItem
                key={index}
                service={service}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
