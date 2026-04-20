import Link from "next/link";
import DeleteBlogButton from "@/components/admin/DeleteBlogButton";
import LogOut from "./LogOut";

async function getBlogs() {
  const res = await fetch("http://localhost:3000/api/blogs", {
    cache: "no-store",
  });

  return res.json();
}

export default async function AdminPage() {
  const blogs = await getBlogs();

  return (
    <main className="max-w-6xl mx-auto py-16 mt-20 px-6 bg-[var(--bg-main)] text-[var(--text-primary)]">
      {/* TOP BAR */}
      <div className="flex flex-col gap-4 mb-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Blog Dashboard
          </h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Manage, edit and track your content
          </p>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4">
          <span className="text-sm text-[var(--text-secondary)]">
            {blogs.length} blogs
          </span>
          <LogOut />
        </div>
      </div>

      {/* ACTION BAR */}
      <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-lg font-semibold text-[var(--text-secondary)]">
          All Blogs
        </h2>

        <Link
          href="/admin/create"
          className="w-full sm:w-auto text-center px-5 py-2.5 bg-[var(--gradient-cta)] text-white rounded-lg font-medium"
        >
          + New Blog
        </Link>
      </div>

      {/* EMPTY STATE */}
      {blogs.length === 0 && (
        <div className="border border-[var(--border)] rounded-2xl p-14 text-center bg-[var(--bg-secondary)] shadow-[var(--shadow-soft)]">
          <h2 className="text-xl font-semibold mb-2">No blogs yet</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Start building your content empire 🚀
          </p>

          <Link
            href="/admin/create"
            className="px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg"
          >
            Create Your First Blog
          </Link>
        </div>
      )}

      {/* BLOG LIST */}
      <div className="space-y-5">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="border border-[var(--border)] rounded-2xl p-5 bg-[var(--bg-elevated)] shadow-[var(--shadow-soft)] space-y-4 sm:flex sm:items-center sm:justify-between sm:space-y-0 hover:shadow-[var(--shadow-hover)] transition"
          >
            {/* CONTENT */}
            <div className="space-y-2">
              <h2 className="font-semibold text-base sm:text-lg leading-snug">
                {blog.title}
              </h2>

              <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-secondary)]">
                <span className="px-2 py-0.5 bg-[var(--bg-secondary)] rounded-full">
                  {blog.category}
                </span>

                <span>by {blog.author}</span>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-6 pt-2 border-t border-[var(--border)] sm:border-none sm:pt-0">
              <Link
                href={`/admin/edit/${blog._id}`}
                className="text-sm font-medium text-[var(--color-secondary)]"
              >
                Edit
              </Link>

              <DeleteBlogButton slug={blog._id} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}