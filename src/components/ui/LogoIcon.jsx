"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LogoIcon() {
  const [isTapped, setIsTapped] = useState(false);

  return (
    <Link href="/" aria-label="Go to homepage">
      <motion.div
        onTapStart={() => setIsTapped(true)}
        onTapCancel={() => setIsTapped(false)}
        onTap={() => setIsTapped(false)}

        animate={{ rotate: isTapped ? -90 : 0 }}

        whileHover={{ rotate: -90, scale: 1.05 }} // desktop
        whileTap={{ scale: 0.92 }}                // tactile feedback

        transition={{
          duration: 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}

        className="origin-center cursor-pointer"
      >
        <Image
          src="/images/logoIcon.webp"
          alt="BeVichitra"
          width={28}
          height={28}
          priority
        />
      </motion.div>
    </Link>
  );
}