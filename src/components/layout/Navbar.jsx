"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItems } from "../../data/NavData";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ContactPopup from "../ui/ContactPopup";
import AboutDropdownNavItem from "../ui/AboutDropdownNavItem";

export default function Navbar() {
const pathname = usePathname();

const [scrolled, setScrolled] = useState(false);
const [menuOpen, setMenuOpen] = useState(false);
const [dark, setDark] = useState(false);
const [open, setOpen] = useState(false);
const [aboutMobileOpen, setAboutMobileOpen] =
useState(false);

/* ================= SCROLL ================= */
useEffect(() => {
const handleScroll = () => {
setScrolled(window.scrollY > 10);
};

handleScroll();
window.addEventListener("scroll", handleScroll);

return () =>
  window.removeEventListener("scroll", handleScroll);

}, []);

/* ================= LOCK SCROLL ================= */
useEffect(() => {
document.body.style.overflow = menuOpen
? "hidden"
: "auto";

return () => {
  document.body.style.overflow = "auto";
};

}, [menuOpen]);

/* ================= THEME INIT ================= */
useEffect(() => {
const savedTheme =
localStorage.getItem("theme");

if (savedTheme === "dark") {
  setDark(true);
  document.documentElement.classList.add("dark");
}

}, []);

/* ================= TOGGLE ================= */
const toggleTheme = () => {
const newTheme = !dark;
setDark(newTheme);

if (newTheme) {
  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");
} else {
  document.documentElement.classList.remove("dark");
  localStorage.setItem("theme", "light");
}

};

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
      layout
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
          <Image
            src="/images/logoIcon.png"
            alt="Logo"
            width={32}
            height={32}
          />

          <h2 style={{fontFamily: "var(--font-logo)"}} className="text-xl tracking-wider">vichitra</h2>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          {NavItems.map((item) => {
            if (item.title === "About Us") {
              return (
                <AboutDropdownNavItem
                  key={item.id}
                />
              );
            }

            const isActive =
              pathname === item.link;

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
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md transition"
          >
            <AnimatePresence
              mode="wait"
              initial={false}
            >
              <motion.div
                key={dark ? "sun" : "moon"}
                initial={{
                  rotate: -90,
                  opacity: 0,
                  scale: 0.5,
                }}
                animate={{
                  rotate: 0,
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  rotate: 90,
                  opacity: 0,
                  scale: 0.5,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                {dark ? (
                  <Sun size={16} />
                ) : (
                  <Moon size={16} />
                )}
              </motion.div>
            </AnimatePresence>
          </button>

          {/* CTA */}
          <button
            onClick={() => setOpen(true)}
            className="hidden md:block px-5 py-2 rounded-full text-white text-sm font-medium bg-[linear-gradient(135deg,var(--color-blue),var(--color-yellow))] hover:scale-[1.05] transition-all duration-300"
          >
            Get Started
          </button>

          {/* MOBILE BTN */}
          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="md:hidden w-8 h-8 flex items-center justify-center relative text-[var(--text-primary)]"
          >
            <span
              className={`absolute w-5 h-[2px] bg-current transition ${
                menuOpen
                  ? "rotate-45"
                  : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute w-5 h-[2px] bg-current transition ${
                menuOpen
                  ? "-rotate-45"
                  : "translate-y-1.5"
              }`}
            />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="md:hidden overflow-hidden border-t border-[var(--glass-border)]"
          >
            <div className="px-6 py-5 flex flex-col gap-5">
              {NavItems.map((item) => {
                if (item.title === "About Us") {
                  return (
                    <div
                      key={item.id}
                      className="flex flex-col gap-3"
                    >
                      <button
                        onClick={() =>
                          setAboutMobileOpen(
                            !aboutMobileOpen
                          )
                        }
                        className="text-left text-lg font-medium text-[var(--text-primary)]"
                      >
                        About Us
                      </button>

                      <AnimatePresence>
                        {aboutMobileOpen && (
                          <motion.div
                            initial={{
                              height: 0,
                              opacity: 0,
                            }}
                            animate={{
                              height: "auto",
                              opacity: 1,
                            }}
                            exit={{
                              height: 0,
                              opacity: 0,
                            }}
                            className="overflow-hidden"
                          >
                            <div className="grid gap-3 pl-2 pt-2">
                              <Link
                                href="/about/about-us"
                                onClick={() =>
                                  setMenuOpen(
                                    false
                                  )
                                }
                                className="rounded-2xl p-4 bg-[linear-gradient(135deg,rgba(246,188,35,0.15),rgba(255,255,255,0.85))] dark:bg-[linear-gradient(135deg,rgba(246,188,35,0.22),rgba(255,255,255,0.05))] backdrop-blur-xl"
                              >
                                <h3 className="text-base font-semibold text-black dark:text-white">
                                  About Us
                                </h3>
                              </Link>

                              <Link
                                href="/about/team"
                                onClick={() =>
                                  setMenuOpen(
                                    false
                                  )
                                }
                                className="rounded-2xl p-4 bg-[linear-gradient(135deg,rgba(224,31,68,0.15),rgba(255,255,255,0.85))] dark:bg-[linear-gradient(135deg,rgba(224,31,68,0.22),rgba(255,255,255,0.05))] backdrop-blur-xl"
                              >
                                <h3 className="text-base font-semibold text-black dark:text-white">
                                  Team
                                </h3>
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                const isActive =
                  pathname === item.link;

                return (
                  <Link
                    key={item.id}
                    href={item.link}
                    onClick={() =>
                      setMenuOpen(false)
                    }
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

              <button
                onClick={() => {
                  setOpen(true);
                  setMenuOpen(false);
                }}
                className="mt-4 w-full px-5 py-3 rounded-full text-white bg-[linear-gradient(135deg,var(--color-blue),var(--color-yellow))]"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  </nav>

  <ContactPopup
    open={open}
    setOpen={setOpen}
  />
</>

);
}