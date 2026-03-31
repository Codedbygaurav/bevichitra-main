"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      
      {/* VIDEO */}
      <video
        key={isMobile ? "mobile" : "desktop"} // forces reload on change
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="none">
        <source
          src={isMobile ? "/videos/HeroMobile.mp4" : "/videos/HeroDesktop.mp4"}
          type="video/mp4"
        />
      </video>



    
    </section>
  );
}