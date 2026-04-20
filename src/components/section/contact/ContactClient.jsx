"use client";

import { useState } from "react";
import ContactFlow from "./ContactFlow";
import PageHeroCard from "@/components/ui/PageHeroCard";
import ContactFaq from "@/components/section/contact/ContactFaq";

export default function ContactClient() {
  const [step, setStep] = useState(1);

  return (
    <>
    <PageHeroCard
          image="/images/banner/contact.webp"
          badge="Contact us"
          title="Let’s make it Vichitra, start a conversation that actually matters"
          description="Start with a message, leave with direction. This panda helps you think clearer, move smarter, and build with intent. Because the right conversation, at the right time, can turn uncertainty into confident, measurable action."
        />
    <section className="relative  sm: pt-10 pb-24 px-2 sm:px-6 ">
      
        <ContactFlow step={step} setStep={setStep} />

      {/* FAQ BLOCK */}
      <ContactFaq/>
    </section>
    </>
    
  );
}
