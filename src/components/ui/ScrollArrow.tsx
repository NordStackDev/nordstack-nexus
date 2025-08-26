"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type ScrollArrowProps = {
  offset?: number; // sticky header højde i px
  targetId?: string; // id på sektionen vi vil scrolle til
};

const ScrollArrow: React.FC<ScrollArrowProps> = ({
  offset = 0,
  targetId = "services",
}) => {
  const scrollToTarget = () => {
    if (typeof window === "undefined") return;
    const el = document.getElementById(targetId);
    if (!el) {
      // Fallback: Try to scroll to the section if it appears later
      setTimeout(() => {
        const elLater = document.getElementById(targetId);
        if (elLater) {
          const top =
            elLater.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 300);
      return;
    }
    // If sticky header, use offset, else just scroll to element
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <motion.div
      className="flex justify-center mt-12 relative z-10"
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [0, 0, 12, 12],
        scale: [1, 1.04, 1.04, 1],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <button
        type="button"
        onClick={scrollToTarget}
        aria-label="Scroll ned til services"
        aria-controls={targetId}
        className="group flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-full"
      >
        <ArrowRight
          aria-hidden="true"
          className="w-10 h-10 text-white/60 rotate-90 group-hover:text-white/80 transition-colors duration-200"
        />
        <span className="sr-only">Scroll ned</span>
      </button>
    </motion.div>
  );
};

export default ScrollArrow;
