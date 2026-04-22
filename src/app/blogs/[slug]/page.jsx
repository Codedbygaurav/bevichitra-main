import ReadingProgress from "../../../components/section/blog/ReadingProgress";
import ShareButtons from "../../../components/section/blog/ShareButtons";
import TableOfContents from "../../../components/section/blog/TableOfContents";
import clientPromise from "../../../lib/mongodb";
import { authors } from "../../../data/authors";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  const baseUrl = "https://bevichitra.com";

  if (!blog) {
    return {
      title: "Blog Not Found | BeVichitra",
    };
  }

  const imageUrl = blog.coverImage?.startsWith("http")
    ? blog.coverImage
    : `${baseUrl}${blog.coverImage}`;

  const url = `${baseUrl}/blogs/${slug}`;

  return {
    title: `${blog.title} | BeVichitra`,
    description: blog.excerpt || "Read this blog on BeVichitra.",
    keywords: blog.tags || [],

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: blog.title,
      description: blog.excerpt || "",
      url,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
            },
          ]
        : [],
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt || "",
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

async function getBlog(slug) {
  const client = await clientPromise;
  const db = client.db("blogDB");

  return db.collection("blogs").findOne({ slug });
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return (
      <div className="p-20 text-center text-[var(--text-secondary)]">
        Blog not found
      </div>
    );
  }

  // ✅ Safe author fallback
  const author = authors?.[blog.author] || {
    name: "Unknown",
    avatar: "/default.webp",
  };

  // ✅ Safe headings extraction
  const headings = [];
  (blog.content || []).forEach((block, index) => {
    if (block?.type === "section") {
      (block.content || []).forEach((item, i) => {
        if (item?.type === "heading") {
          headings.push({
            id: `section-${index}-${i}`,
            text: item.text,
          });
        }
      });
    }
  });

  return (
    <main className="max-w-[1100px] mx-auto px-4 md:px-6 pt-36 pb-24">
      <ReadingProgress />

      {/* ================= HERO ================= */}
      <header className="max-w-3xl space-y-5">
        <span className="inline-flex px-3 py-1 text-xs rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md text-[var(--color-blue)]">
          {blog.category || "General"}
        </span>

        <h1 className="text-3xl md:text-5xl font-semibold leading-[1.1] text-[var(--text-primary)]">
          {blog.title || "Untitled"}
        </h1>

        <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[var(--border)]">
            {author.avatar && (
              <Image
                src={author.avatar}
                alt={author.name}
                fill
                className="object-cover"
              />
            )}
          </div>

          <span className="font-medium text-[var(--text-primary)]">
            {author.name}
          </span>

          <span>•</span>

          <span>
            {blog.publishedAt
              ? new Date(blog.publishedAt).toLocaleDateString()
              : "No date"}
          </span>

          <span>•</span>

          <span>{blog.readTime || "N/A"}</span>
        </div>
      </header>

      {/* ================= HERO IMAGE ================= */}
      {blog.coverImage && (
        <div className="relative h-[300px] md:h-[420px] mt-12 rounded-2xl overflow-hidden border border-[var(--glass-border)] shadow-[var(--shadow-soft)]">
          <Image
            src={blog.coverImage}
            alt={blog.title || "Blog image"}
            fill
            className="object-cover transition duration-700 hover:scale-105"
          />
        </div>
      )}

      {/* ================= MOBILE TOC ================= */}
      {headings.length > 0 && (
        <div className="lg:hidden mt-10">
          <TableOfContents headings={headings} />
        </div>
      )}

      {/* ================= CONTENT ================= */}
      <div className="grid lg:grid-cols-[minmax(0,720px)_260px] gap-20 mt-16">
        {/* ARTICLE */}
        <article className="text-[17px] leading-7 space-y-6">
          {(blog.content || []).map((block, index) => {
            if (block?.type === "section") {
              return (
                <section key={index}>
                  {(block.content || []).map((item, i) => {
                    if (item?.type === "heading") {
                      return (
                        <h2
                          key={i}
                          id={`section-${index}-${i}`}
                          className="text-2xl font-semibold text-[var(--text-primary)] mt-14 scroll-mt-32"
                        >
                          {item.text}
                        </h2>
                      );
                    }

                    if (item?.type === "subheading") {
                      return (
                        <h3
                          key={i}
                          className="text-xl font-semibold mt-10 text-[var(--text-primary)]"
                        >
                          {item.text}
                        </h3>
                      );
                    }

                    if (item?.type === "paragraph") {
                      return (
                        <p
                          key={i}
                          className="text-[var(--text-secondary)] leading-relaxed"
                        >
                          {item.text}
                        </p>
                      );
                    }

                    if (item?.type === "bullet") {
                      return (
                        <ul
                          key={i}
                          className="list-disc pl-6 space-y-2 text-[var(--text-secondary)]"
                        >
                          {(item.items || []).map((point, j) => (
                            <li key={j}>{point}</li>
                          ))}
                        </ul>
                      );
                    }

                    return null;
                  })}
                </section>
              );
            }

            if (block?.type === "quote") {
              return (
                <blockquote
                  key={index}
                  className="border-l-4 border-[var(--color-blue)] pl-5 italic text-[var(--text-secondary)] my-10"
                >
                  {block.text}
                </blockquote>
              );
            }

            if (block?.type === "image" && block.url) {
              return (
                <div
                  key={index}
                  className="rounded-xl overflow-hidden border border-[var(--glass-border)] my-10 shadow-[var(--shadow-soft)]"
                >
                  <Image
                    src={block.url}
                    alt={block.alt || "Blog image"}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            }

            return null;
          })}
        </article>

        {/* ================= SIDEBAR ================= */}
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <TableOfContents headings={headings} />
          </div>
        </aside>
      </div>

      {/* ================= TAGS ================= */}
      <div className="max-w-3xl mt-20 pt-8 border-t border-[var(--border)]">
        <h3 className="text-xs uppercase tracking-wide text-[var(--text-secondary)] mb-4">
          Tags
        </h3>

        <div className="flex flex-wrap gap-3">
          {(blog.tags || []).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md text-[var(--text-secondary)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <ShareButtons />
    </main>
  );
}
