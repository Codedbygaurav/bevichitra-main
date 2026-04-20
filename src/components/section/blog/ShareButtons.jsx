import { Twitter, Linkedin } from "lucide-react";

export default function ShareButtons() {
  const url =
    typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="mt-14">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)] mb-4">
        Share this article
      </h3>

      <div className="flex flex-wrap gap-3">
        {/* TWITTER */}
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            url
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center gap-2 px-4 py-2 rounded-full
            border border-[var(--glass-border)]
            bg-[var(--glass-bg)]
            backdrop-blur-md
            text-[var(--text-primary)] text-sm
            transition-all duration-300
            hover:text-[var(--color-blue)]
            hover:border-[var(--color-blue)]
            hover:shadow-[var(--shadow-soft)]
          "
        >
          <Twitter size={16} />
          Twitter
        </a>

        {/* LINKEDIN */}
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center gap-2 px-4 py-2 rounded-full
            border border-[var(--glass-border)]
            bg-[var(--glass-bg)]
            backdrop-blur-md
            text-[var(--text-primary)] text-sm
            transition-all duration-300
            hover:text-[var(--color-blue)]
            hover:border-[var(--color-blue)]
            hover:shadow-[var(--shadow-soft)]
          "
        >
          <Linkedin size={16} />
          LinkedIn
        </a>
      </div>
    </div>
  );
}