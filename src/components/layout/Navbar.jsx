"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItems } from "../../data/NavData";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ContactPopup from "../ui/ContactPopup";
import LogoIcon from "../ui/LogoIcon";
import Button from "../ui/Button";

export default function Navbar() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();
  const dark = theme === "dark";

  /* ================= MOUNT FIX (prevents hydration flicker) ================= */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* ================= SCROLL ================= */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= LOCK SCROLL ================= */
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = menuOpen ? "hidden" : original;

    return () => {
      document.body.style.overflow = original;
    };
  }, [menuOpen]);

  /* ================= ESC KEY CLOSE ================= */
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  /* ================= THEME TOGGLE ================= */
  const toggleTheme = () => {
    setTheme(dark ? "light" : "dark");
  };

  /* ================= PREVENT HYDRATION ISSUE ================= */
  if (!mounted) return null;

  return (
    <>
      {/* BACKDROP */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      {/* NAV */}
      <nav className="fixed top-4 left-0 w-full z-50 flex justify-center">
        <motion.div
          transition={{ duration: 0.25 }}
          className={`relative w-[92%] max-w-4xl rounded-3xl border border-[var(--nav-border)] overflow-visible transition-all duration-300 ${
            scrolled || menuOpen
              ? "bg-[var(--glass-bg)] backdrop-blur-xl"
              : "bg-transparent"
          }`}
        >
          {/* TOP BAR */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3">
            
            {/* LOGO */}
            <div className="flex items-center gap-1">
              <LogoIcon />
              <h2
                style={{ fontFamily: "var(--font-logo)" }}
                className="text-xl tracking-wider"
              >
                vichitra
              </h2>
            </div>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center gap-8 text-sm">
              {NavItems.map((item) => {
                const isActive = pathname.startsWith(item.link);

                return (
                  <Link
                    key={item.id}
                    href={item.link}
                    className={`relative transition ${
                      isActive
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--color-blue)]"
                    }`}
                  >
                    {item.title}

                    {isActive && (
                      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--color-blue)]" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-2 sm:gap-3">

              {/* THEME */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md transition"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={dark ? "sun" : "moon"}
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {dark ? <Sun size={16} /> : <Moon size={16} />}
                  </motion.div>
                </AnimatePresence>
              </button>

              {/* CTA */}
              <div className="hidden md:block">
                <Button onClick={() => setOpen(true)} variant="primary">
                  Get Started
                </Button>
              </div>

              {/* MOBILE BTN */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                className="md:hidden w-8 h-8 flex items-center justify-center relative text-[var(--text-primary)]"
              >
                <span
                  className={`absolute w-5 h-[2px] bg-current transition ${
                    menuOpen ? "rotate-45" : "-translate-y-1.5"
                  }`}
                />
                <span
                  className={`absolute w-5 h-[2px] bg-current transition ${
                    menuOpen ? "-rotate-45" : "translate-y-1.5"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* MOBILE MENU */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="md:hidden overflow-hidden border-t border-[var(--glass-border)]"
              >
                <div className="px-6 py-5 flex flex-col gap-5">
                  {NavItems.map((item) => {
                    const isActive = pathname.startsWith(item.link);

                    return (
                      <Link
                        key={item.id}
                        href={item.link}
                        onClick={() => setMenuOpen(false)}
                        className={`text-lg font-medium transition ${
                          isActive
                            ? "text-[var(--color-blue)]"
                            : "text-[var(--text-primary)] hover:text-[var(--color-blue)]"
                        }`}
                      >
                        {item.title}
                      </Link>
                    );
                  })}

                  <Button
                    onClick={() => {
                      setOpen(true);
                      setMenuOpen(false);
                    }}
                    variant="primary"
                  >
                    Get Started
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </nav>

      <ContactPopup open={open} setOpen={setOpen} />
    </>
  );
}