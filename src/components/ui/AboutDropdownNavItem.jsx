"use client";

import { useState } from "react";
import Link from "next/link";

export default function AboutDropdownNavItem() {
const [open, setOpen] = useState(false);

return (
<div
className="relative"
onMouseEnter={() => setOpen(true)}
onMouseLeave={() => setOpen(false)}
>
{/* TRIGGER */}
<span className="cursor-pointer text-[var(--text-secondary)] hover:text-[var(--color-blue)] transition">
About
</span>

  {/* DROPDOWN */}
  {open && (
    <div className="absolute top-full left-1/2 -translate-x-1/2 z-[60] pt-3">
      <div className="grid grid-cols-2 gap-3 w-[390px]">

        {/* ABOUT US */}
        <Link
          href="/about/about-us"
          className="
          rounded-2xl p-5
          transition-all duration-300 hover:scale-[1.02]

          border border-[var(--glass-border)]
          backdrop-blur-xl

          bg-[linear-gradient(135deg,rgba(246,188,35,0.22),var(--glass-bg))]
          dark:bg-[linear-gradient(135deg,rgba(246,188,35,0.18),var(--glass-bg))]
        "
        >
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            About Us
          </h3>

          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Story & vision
          </p>
        </Link>

        {/* TEAM */}
        <Link
          href="/about/team"
          className="
          rounded-2xl p-5
          transition-all duration-300 hover:scale-[1.02]

          border border-[var(--glass-border)]
          backdrop-blur-xl

          bg-[linear-gradient(135deg,rgba(224,31,68,0.22),var(--glass-bg))]
          dark:bg-[linear-gradient(135deg,rgba(224,31,68,0.18),var(--glass-bg))]
        "
        >
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            Team
          </h3>

          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Meet our people
          </p>
        </Link>

      </div>
    </div>
  )}
</div>

);
}