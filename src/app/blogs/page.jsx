import clientPromise from "../../lib/mongodb";
import BlogCard from "../../components/section/blog/BlogCard";
import PageHeroCard from "@/components/ui/PageHeroCard";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Blogs | BeVichitra",
  description:
    "Actionable insights on branding, UI/UX, and digital growth for founders and creators.",

  openGraph: {
    title: "Blogs | BeVichitra",
    description:
      "We don’t just write blogs, we craft clarity for modern brands.",
    url: "https://bevichitra.com/blogs", // ✅ FULL URL
    siteName: "BeVichitra",
    images: [
      {
        url: "https://bevichitra.com/images/URLimages/blog.jpg", // ✅ JPG + absolute
        width: 1200,
        height: 630,
        alt: "BeVichitra Blogs",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Blogs | BeVichitra",
    description:
      "Actionable insights on branding, UI/UX, and digital growth.",
    images: ["https://bevichitra.com/images/URLimages/blog.jpg"], // ✅ SAME IMAGE
  },
};

async function getBlogs() {
const client = await clientPromise;
const db = client.db("blogDB");

const blogs = await db
.collection("blogs")
.find({})
.sort({ _id: -1 })
.toArray();

return blogs;
}

export const dynamic = "force-dynamic";

export const revalidate = 0;

export default async function BlogPage() {
const blogs = await getBlogs();
const featured = blogs[0];
const rest = blogs.slice(1);

return (
<main className="w-full">
  <PageHeroCard
    image="/images/banner/Blog.webp"
    badge="Our Blogs"
    title="We don’t just write blogs, we craft clarity"
    description="Built for founders who want more than information. We break down branding, strategy, and growth into actionable insights that drive real decisions. Because consuming content is easy, applying it creates impact."
  />
  {/* ================= CONTENT ================= */}
  <section className="max-w-6xl mx-auto px-4 md:px-6 pb-24">
    {blogs.length === 0 ? (
      <div className="text-center py-32">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">
          No blogs yet
        </h2>

        <p className="text-[var(--text-secondary)]">
          Blogs will appear here once published.
        </p>
      </div>
    ) : (
      <>
        {/* ================= FEATURED ================= */}
        {featured && (
          <Link href={`/blogs/${featured.slug}`}>
            <article className="mb-20 grid lg:grid-cols-2 gap-10 items-center group rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl p-6 md:p-8 transition hover:shadow-[var(--shadow-soft)]">
              {/* IMAGE */}
              <div className="relative h-[220px] lg:h-[300px] rounded-xl overflow-hidden">
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* CONTENT */}
              <div>
                <p className="text-sm text-[var(--text-secondary)] mb-3">
                  Featured Article
                </p>

                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[var(--text-primary)] group-hover:text-[var(--color-blue)] transition">
                  {featured.title}
                </h2>

                <p className="text-[var(--text-secondary)] mb-6 line-clamp-3">
                  {featured.excerpt}
                </p>

                <span className="text-sm font-medium text-[var(--color-blue)]">
                  Read article →
                </span>
              </div>
            </article>
          </Link>
        )}

        {/* ================= GRID ================= */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={{
                ...blog,
                slug: blog.slug,
              }}
            />
          ))}
        </div>
      </>
    )}
  </section>
</main>

);
}