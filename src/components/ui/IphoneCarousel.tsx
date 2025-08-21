import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const iphoneImages = [
  "/iphone_images/IphoneMockup1.png",
  "/iphone_images/IphoneMockup3.png",
  "/iphone_images/IphoneMockup2.png",
];

export const IPhoneMockup: React.FC = () => {
  const [index, setIndex] = useState(0);

  // Auto-skift hvert 5 sekunder
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % iphoneImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-64 h-[520px] mx-auto perspective-[1200px]">
      {/* Telefon-ramme */}
      <div className="relative w-full h-full rounded-[3rem] bg-black shadow-2xl border-[5px] border-gray-700 overflow-hidden">
        {/* Indmad (hvid baggrund som i en iPhone) */}
        <div className="absolute inset-0 bg-white rounded-[2.7rem] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={iphoneImages[index]}
              alt="Pitch 'N Sales App Screenshot"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-contain p-4"
            />
          </AnimatePresence>
        </div>

        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full" />

        {/* Hjem-indikator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-28 h-1.5 bg-black/30 rounded-full" />
      </div>

      {/* Glow bag telefonen */}
      <div className="absolute -inset-6 bg-gradient-to-b from-transparent via-gray-900/20 to-gray-900/40 rounded-[4rem] -z-10 blur-2xl" />
    </div>
  );
};
