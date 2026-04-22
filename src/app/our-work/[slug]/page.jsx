import { projectImages } from "../../../data/projectImages";
import { notFound } from "next/navigation";
import Image from "next/image";
import Button from "../../../components/ui/Button";
import Link from "next/link";

const baseUrl = "https://bevichitra.com";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const project = projectImages.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | BeVichitra",
    };
  }

  // ✅ Ensure absolute + safe image
  let imagePath = project.cover || "/images/URLimages/LogoIcon.jpg";

// 🔥 convert .webp → .jpg for OG
imagePath = imagePath.replace(".webp", ".jpg");

const imageUrl = `${baseUrl}${imagePath}`;

  return {
    title: `${project.title} | BeVichitra Projects`,
    description: project.description,

    openGraph: {
      title: project.title,
      description: project.description,
      url: `${baseUrl}/our-work/${slug}`, // ✅ REQUIRED
      siteName: "BeVichitra",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [imageUrl], // ✅ SAME IMAGE
    },

    alternates: {
      canonical: `${baseUrl}/our-work/${slug}`, // ✅ FIXED
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;

  const project = projectImages.find((p) => p.slug === slug);
  if (!project) return notFound();

  const featuredImages = project.images.slice(0, 6);
  const remainingImages = project.images.slice(6);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 pt-32 pb-24">
      {/* ================= HERO ================= */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
        {/* LEFT TEXT */}
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-6xl font-semibold leading-[1.05] text-[var(--text-primary)]">
            {project.title}
          </h1>

          <p className="mt-6 text-lg text-[var(--text-secondary)] leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* RIGHT VISUAL */}
        <div>
          <div className="rounded-2xl overflow-hidden border border-[var(--glass-border)]">
            <Image
              src={project.banner}
              alt={project.title}
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* ================= OVERVIEW ================= */}
      <div className="grid md:grid-cols-3 gap-6 mb-24">
        {[
          { label: "Client", value: project.client || "Confidential" },
          { label: "Services", value: project.services || "-" },
          { label: "Timeline", value: project.timeline || "-" },
        ].map((item, i) => (
          <div
            key={i}
            className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6"
          >
            <p className="text-sm text-[var(--text-secondary)] mb-2">
              {item.label}
            </p>
            <p className="text-[var(--text-primary)] font-medium">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* ================= CHALLENGE + SOLUTION ================= */}
      <div className="grid md:grid-cols-2 gap-6 mb-24">
        <div className="p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)]">
          <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">
            The Challenge
          </p>
          <p className="mt-3 text-[var(--text-primary)] leading-relaxed">
            {project.challange}
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)]">
          <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">
            The Solution
          </p>
          <p className="mt-3 text-[var(--text-primary)] leading-relaxed">
            {project.solution}
          </p>
        </div>
      </div>

      {/* ================= HIGHLIGHTS ================= */}
      <div className="mb-24 max-w-3xl">
        <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">
          Key Highlights
        </p>

        <ul className="mt-4 space-y-3 text-[var(--text-primary)] list-disc pl-5">
          {project.highlights.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* ================= FEATURED WORK ================= */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {featuredImages.map((img, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden border border-[var(--glass-border)] group"
          >
            <Image
              src={img}
              alt={`${project.title} ${i}`}
              width={800}
              height={1000}
              className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* ================= FULL GALLERY ================= */}
      {remainingImages.length > 0 && (
        <>
          <div className="my-16 border-t border-[var(--glass-border)]" />

          <div className="grid md:grid-cols-2 gap-8">
            {remainingImages.map((img, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden border border-[var(--glass-border)] group"
              >
                <Image
                  src={img}
                  alt={`${project.title} extra ${i}`}
                  width={800}
                  height={1000}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/* ================= CTA ================= */}
      <div className="mt-28 text-center">
        <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-10 md:p-14">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-[var(--text-primary)]">
            Have a similar project in mind?
          </h3>

          <p className="text-[var(--text-secondary)] mb-6">
            Let’s build something impactful together.
          </p>

          <Link href="/contact-us">
            <Button variant="primary">Start your project</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
