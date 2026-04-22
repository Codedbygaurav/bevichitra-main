import Hero from "../components/section/home/Hero";
import ShowProjectData from "../components/section/home/projects/ShowProjectData";
import Services from "../components/section/home/services/Services";
import CollaborativeApproach from "../components/section/home/CollaborativeApproach";
import FAQ from "../components/section/home/FAQ";
import Testimonial from "../components/section/home/Testimonial";
import BookCallCard from "../components/ui/BookCallCard";

export const metadata = {
  title: "Bevichitra | Creative Digital Agency for Brand Identity & Web Design",
  description:
    "Bevichitra helps brands build unique digital identities through websites, logos, themes, typography, and social presence. We design experiences that grow businesses.",
  keywords: [
    "digital agency",
    "web design agency",
    "branding agency",
    "logo design",
    "UI UX design",
    "website development",
    "brand identity",
    "social media branding",
    "Bevichitra",
  ],
  metadataBase: new URL("https://bevichitra.com/"),
  openGraph: {
    title: "Bevichitra | Creative Digital Agency",
    description:
      "We help brands create websites, logos, themes, fonts, and digital presence that stand out.",
    url: "https://bevichitra.com/",
    siteName: "Bevichitra",
    images: [
      {
        url: "https://bevichitra.com/images/Urlimages/LogoIcon.jpg",
        width: 1200,
        height: 630,
        alt: "Bevichitra Digital Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bevichitra | Creative Digital Agency",
    description:
      "Brand identity, websites, and digital experiences for modern brands.",
    url: ["https://bevichitra.com/images/URLimages/logoIcon.jpg"],
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <ShowProjectData />
      <CollaborativeApproach />
      <Testimonial />
      <FAQ />
      <BookCallCard />
    </>
  );
}