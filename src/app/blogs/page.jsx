import clientPromise from "@/lib/mongodb";
import BlogCard from "@/components/section/blog/BlogCard";
import Image from "next/image";
import Link from "next/link";

async function getBlogs() {
  const client = await clientPromise;
  const db = client.db("blogDB");

  const blogs = await db
    .collection("blogs")
    .find({})
    .sort({ publishedAt: -1 })
    .toArray();

  return blogs;
}

export default async function BlogPage() {
  const blogs = await getBlogs();
  const featured = blogs[0];
  const rest = blogs.slice(1);

  return (
    <main className="w-full section-bg">

      {/* ================= HERO ================= */}
      <section className="pt-40 pb-20 text-center">
        <div className="max-w-3xl mx-auto px-4 md:px-6">

          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1]">
            Insights that
            <span className="block gradient-text">
              actually matter
            </span>
          </h1>

          <p className="mt-6 text-[var(--text-secondary)] text-lg">
            Ideas, strategies, and insights to help you build better digital products.
          </p>

        </div>
      </section>

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

                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[var(--text-primary)] group-hover:text-[var(--color-primary)] transition">
                      {featured.title}
                    </h2>

                    <p className="text-[var(--text-secondary)] mb-6 line-clamp-3">
                      {featured.excerpt}
                    </p>

                    <span className="text-sm font-medium text-[var(--color-primary)]">
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