
import ProjectData from "../../components/section/projects/ProjectData";
import PageHeroCard from "@/components/ui/PageHeroCard";

export const metadata = {
  title: "Our Work | BeVichitra",
  description:
    "Explore branding, UI/UX, and web design projects built to deliver measurable results.",
  openGraph: {
    title: "Our Work | BeVichitra",
    description:
      "We design systems that convert attention into action.",
    url: "/projects",
    images: [
      {
        url: "/images/banner/OurWork.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function ProjectsPage() {


  return (
    <>
    <PageHeroCard
        image="/images/banner/OurWork.webp"
        badge="Our work"
        title="Our work at BeVichitra goes beyond visuals."
        description="We design performance-driven brand systems that convert attention into action. Each project is built with clarity, strategy, and intent, ensuring measurable impact because design should deliver results, not look different."
      />

    <ProjectData/>
    </>
  );
}