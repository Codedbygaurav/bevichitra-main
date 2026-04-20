import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { authors } from "../../../data/authors";

export default function BlogCard({ blog, index = 0 }) {
  const author = authors?.[blog.author] || {
    name: "Unknown",
    avatar: "/default.webp",
  };

  return (
    <Reveal delay={index * 0.08}>
      <Link href={`/blogs/${encodeURIComponent(blog.slug || "")}`}>
        <article
          className="
            group rounded-xl overflow-hidden
            border border-[var(--glass-border)]
            bg-[var(--glass-bg)]
            backdrop-blur-xl
            transition-all duration-300
            hover:-translate-y-1
            hover:border-[var(--color-blue)]
            hover:shadow-[var(--shadow-soft)]
          "
        >
          {/* IMAGE */}
          <div className="relative h-44 w-full overflow-hidden">
            {blog.coverImage ? (
              <Image
                src={blog.coverImage}
                alt={blog.title || "Blog image"}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                No Image
              </div>
            )}

            {blog.category && (
              <span
                className="
                  absolute top-3 left-3 px-3 py-1 text-[11px] font-medium rounded-full
                  bg-[var(--glass-bg)]
                  backdrop-blur-md
                  border border-[var(--glass-border)]
                  text-[var(--color-blue)]
                "
              >
                {blog.category}
              </span>
            )}
          </div>

          {/* CONTENT */}
          <div className="p-5">
            <h2 className="text-lg font-semibold leading-snug text-[var(--text-primary)] transition group-hover:text-[var(--color-blue)] line-clamp-2">
              {blog.title || "Untitled"}
            </h2>

            <p className="text-[var(--text-secondary)] mt-2 text-sm line-clamp-2">
              {blog.excerpt || "No description available."}
            </p>

            {/* FOOTER */}
            <div className="flex items-center justify-between mt-5 text-xs text-[var(--text-secondary)]">
              
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[var(--border)]">
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
              </div>

              <span>{blog.readTime || "—"}</span>
            </div>
          </div>
        </article>
      </Link>
    </Reveal>
  );
}