"use client";

import Link from "next/link";

export default function AboutDropdown() {
return (
<div className="absolute top-full mt-4 right-0 z-50">
<div className="grid md:grid-cols-2 gap-4 w-[580px]">

    {/* ABOUT US */}
    <Link
      href="/about/about-us"
      className="
      group rounded-3xl p-6
      bg-[linear-gradient(135deg,#f6bc23,#ffd86a)]
      hover:scale-[1.02]
      transition-all duration-300
      shadow-[0_10px_30px_rgba(246,188,35,0.2)]
    "
    >
      <div className="flex flex-col justify-between h-full min-h-[180px]">
        <div>
          <h3 className="text-3xl font-semibold text-black">
            About Us.
          </h3>
          <p className="mt-3 text-black/70 leading-relaxed">
            Learn our story, vision, and why BeVichitra exists.
          </p>
        </div>

        <span className="text-3xl self-end group-hover:translate-x-1 transition">
          →
        </span>
      </div>
    </Link>

    {/* TEAM */}
    <Link
      href="/about/team"
      className="
      group rounded-3xl p-6
      bg-[linear-gradient(135deg,#e01f44,#ff5b79)]
      hover:scale-[1.02]
      transition-all duration-300
      shadow-[0_10px_30px_rgba(224,31,68,0.2)]
    "
    >
      <div className="flex flex-col justify-between h-full min-h-[180px]">
        <div>
          <h3 className="text-3xl font-semibold text-white">
            Team.
          </h3>
          <p className="mt-3 text-white/80 leading-relaxed">
            Meet the founder and the people building BeVichitra.
          </p>
        </div>

        <span className="text-3xl self-end group-hover:translate-x-1 transition">
          →
        </span>
      </div>
    </Link>

  </div>
</div>

);
}