"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(
        document.documentElement.classList.contains("dark")
      );
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* DESKTOP LIGHT */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={`hidden lg:block absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isDark ? "opacity-0" : "opacity-100"
        }`}
      >
        <source
          src="/videos/HeroDesktopLight.webm"
          type="video/webm"
        />
      </video>

      {/* DESKTOP DARK */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={`hidden lg:block absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isDark ? "opacity-100" : "opacity-0"
        }`}
      >
        <source
          src="/videos/HeroDesktopDark.webm"
          type="video/webm"
        />
      </video>

      {/* MOBILE LIGHT */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={`block lg:hidden absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isDark ? "opacity-0" : "opacity-100"
        }`}
      >
        <source
          src="/videos/HeroMobileLight.webm"
          type="video/webm"
        />
      </video>

      {/* MOBILE DARK */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={`block lg:hidden absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isDark ? "opacity-100" : "opacity-0"
        }`}
      >
        <source
          src="/videos/HeroMobileDark.webm"
          type="video/webm"
        />
      </video>
    </div>
  );
}