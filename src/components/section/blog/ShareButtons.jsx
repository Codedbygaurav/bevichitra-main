"use client";
import { useEffect, useState } from "react";
import { Twitter, Linkedin } from "lucide-react";

export default function ShareButtons() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  if (!url) return null; // prevent broken links

  return (
    <div className="mt-14">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)] mb-4">
        Share this article
      </h3>

      <div className="flex flex-wrap gap-3">
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn"
        >
          <Twitter size={16} />
          Twitter
        </a>

        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn"
        >
          <Linkedin size={16} />
          LinkedIn
        </a>
      </div>
    </div>
  );
}