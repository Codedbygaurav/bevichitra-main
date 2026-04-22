import FounderCard from '@/components/section/about/FounderCard'
import OurPhilosophy from '@/components/section/about/OurPhilosophy'
import ServicesSection from '@/components/section/about/ServicesSection'
import TeamSection from '@/components/section/about/TeamSection'
import WhatWeBelieve from '@/components/section/about/WhatWeBelieve'
import PageHeroCard from '@/components/ui/PageHeroCard'

// ✅ SEO METADATA
export const metadata = {
  title: "About BeVichitra | Brand Architecture Studio for Modern Businesses",
  
  description:
    "Learn about BeVichitra — a brand architecture studio helping founders build strong, memorable identities through branding, websites, and digital systems.",

  keywords: [
    "BeVichitra",
    "brand architecture studio",
    "branding agency India",
    "brand identity design",
    "digital branding services",
    "website development agency",
    "creative agency India"
  ],

  openGraph: {
    title: "About BeVichitra",
    description:
      "We build brands that stand out and scale. Discover our philosophy, team, and approach.",
    url: "https://bevichitra.com/about-us", // 🔁 replace this
    siteName: "BeVichitra",
    images: [
      {
        url: "https://bevichitra.com/images/URLimages/about.jpg",
        width: 1200,
        height: 630,
        alt: "BeVichitra",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "About BeVichitra",
    description:
      "A brand architecture studio helping businesses build strong identities and digital presence.",
    images: ["https://bevichitra.com/images/URLImages/about.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function page() {
  return (
    <>
      <PageHeroCard
  image="/images/banner/about.webp"
  badge="About Us"
  title="We are BeVichitra, not just a brand architecture studio"
  description="Built for founders who refuse to blend in. We don’t just design brands. We engineer identities that demand attention. Because being different is not enough anymore."
/>
      <WhatWeBelieve />
      <FounderCard />
      <ServicesSection />
      <TeamSection />
      <OurPhilosophy />
    </>
  )
}