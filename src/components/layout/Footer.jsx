"use client";

import Link from "next/link";
import {
Mail,
Phone,
MapPin,
Twitter,
Instagram,
Linkedin,
Facebook,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
return ( <footer className="mt-32"> <div className="max-w-7xl mx-auto px-4 md:px-6">

    {/* ================= MAIN ================= */}
    <div className="relative rounded-3xl mb-10 border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl p-10 md:p-14 shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-hidden">

      {/* SUBTLE GLOW */}
      <div className="absolute -top-20 -left-20 w-[250px] h-[250px] bg-[var(--glow-blue)] blur-[120px] opacity-20 pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-14 relative z-10">

        {/* BRAND */}
        <div className="space-y-6">
          <div className="flex items-center gap-1">
                    <Image
                      src="/images/logoIcon.png"
                      alt="Logo"
                      width={32}
                      height={32}/>
          
                    <h2 style={{fontFamily: "var(--font-logo)"}} className="text-xl tracking-wider">vichitra</h2>
                  </div>

          <p className="text-sm leading-relaxed text-[var(--text-secondary)] max-w-sm">
            Crafting modern digital products that help brands grow,
            scale, and stand out with clarity and purpose.
          </p>

          {/* SOCIAL */}
          <div className="flex gap-3 pt-2">
            {[Twitter, Instagram, Linkedin, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md hover:text-[var(--color-blue)] hover:shadow-[0_0_15px_rgba(40,108,181,0.2)] transition"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* SERVICES */}
        <FooterColumn
          title="Services"
          items={[
            "Web Development",
            "UI/UX Design",
            "Brand Identity",
            "SEO Optimization",
          ]}
        />

        {/* COMPANY */}
        <FooterColumn
          title="Company"
          items={[
            { name: "About Us", link: "/aboutUs" },
            { name: "Projects", link: "/projects" },
            { name: "Blogs", link: "/blogs" },
            { name: "Contact", link: "/contactUs" },
          ]}
        />

        {/* CONTACT */}
        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase text-[var(--text-primary)] mb-5">
            Contact
          </h3>

          <ul className="space-y-4 text-sm text-[var(--text-secondary)]">

            <li className="flex gap-3 items-start">
              <Mail size={16} />
              <a
                href="mailto:bevichitra1@gmail.com"
                className="hover:text-[var(--color-yellow)] transition"
              >
                bevichitra1@gmail.com
              </a>
            </li>

            <li className="flex gap-3 items-start">
              <Phone size={16} />
              <a
                href="tel:+917385568102"
                className="hover:text-[var(--color-yellow)] transition"
              >
                +91 73855 68102
              </a>
            </li>

            <li className="flex gap-3 items-start">
              <MapPin size={16} />
              India
            </li>

          </ul>
        </div>

      </div>

      {/* ================= DIVIDER ================= */}
      <div className="border-t border-[var(--border)] my-12 relative z-10" />

      {/* ================= BOTTOM ================= */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-[var(--text-secondary)] relative z-10">

        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-[var(--text-primary)] font-medium">
            Bevichitra
          </span>
          . All rights reserved.
        </p>

        <div className="flex gap-6">
          <Link
            href="#"
            className="hover:text-[var(--color-blue)] transition"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="hover:text-[var(--color-blue)] transition"
          >
            Terms
          </Link>
        </div>

      </div>

    </div>
  </div>
</footer>

);
}

/* ================= COLUMN ================= */
function FooterColumn({ title, items }) {
return ( <div> <h3 className="text-sm font-semibold tracking-wide uppercase text-[var(--text-primary)] mb-5">
{title} </h3>


  <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
    {items.map((item, i) => {
      const name = typeof item === "string" ? item : item.name;
      const link = typeof item === "string" ? "#" : item.link;

      return (
        <li key={i}>
          <Link
            href={link}
            className="hover:text-[var(--color-blue)] transition"
          >
            {name}
          </Link>
        </li>
      );
    })}
  </ul>
</div>


);
}
