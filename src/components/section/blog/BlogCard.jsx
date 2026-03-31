import Image from "next/image";
import Link from "next/link";
import { authors } from "@/data/authors";

export default function BlogCard({ blog }) {
  const author = authors[blog.author];

  return (
    <Link href={`/blogs/${encodeURIComponent(blog.slug)}`}>
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
        {/* ================= IMAGE ================= */}
        <div className="relative h-44 w-full overflow-hidden">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />

          {/* CATEGORY */}
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
        </div>

        {/* ================= CONTENT ================= */}
        <div className="p-5">
          <h2
            className="
              text-lg font-semibold leading-snug
              text-[var(--text-primary)]
              transition
              group-hover:text-[var(--color-blue)]
              line-clamp-2
            "
          >
            {blog.title}
          </h2>

          <p className="text-[var(--text-secondary)] mt-2 text-sm line-clamp-2">
            {blog.excerpt}
          </p>

          {/* ================= FOOTER ================= */}
          <div className="flex items-center justify-between mt-5 text-xs text-[var(--text-secondary)]">
            {/* AUTHOR */}
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[var(--border)]">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              </div>

              <span className="font-medium text-[var(--text-primary)]">
                {author.name}
              </span>
            </div>

            {/* READ TIME */}
            <span>{blog.readTime}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}