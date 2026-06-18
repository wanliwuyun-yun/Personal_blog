"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored === "dark" || (!stored && true);
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const newDark = !dark;
    setDark(newDark);
    document.documentElement.classList.toggle("dark", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      className="relative w-14 h-7 rounded-full bg-star-blue/50 border border-star-light/20
                 hover:border-star-light/40 transition-all duration-300 cursor-pointer"
      aria-label={dark ? "切换到浅色模式" : "切换到深色模式"}
    >
      <motion.div
        className="absolute top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs"
        animate={{
          x: dark ? 0 : 28,
          backgroundColor: dark ? "rgba(192,216,255,0.3)" : "rgba(255,255,255,0.9)",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {dark ? "🌙" : "☀️"}
      </motion.div>
    </button>
  );
}
