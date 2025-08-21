import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, Signal, Battery } from "lucide-react";

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

  // Viser aktuel tid (hh:mm)
  const [time, setTime] = useState<string>(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="relative w-64 h-[520px] mx-auto perspective-[2000px]"
      initial={{ rotateY: -12, rotateX: 6 }}
      animate={{ rotateY: -12, rotateX: 6 }}
      whileHover={{ rotateY: -18, rotateX: 10, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 60, damping: 15 }}
    >
      {/* Telefon-ramme */}
      <div className="relative w-full h-full rounded-[3rem] bg-black shadow-[0_30px_80px_rgba(0,0,0,0.7)] border-[6px] border-gray-700 overflow-hidden">
        {/* Indmad */}
        <div className="absolute inset-0 bg-white rounded-[2.7rem] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={iphoneImages[index]}
              alt="Pitch 'N Sales App Screenshot"
              initial={{ y: 120, scale: 1.1, opacity: 0, rotateX: -20 }}
              animate={{ y: 0, scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ y: -120, scale: 0.95, opacity: 0, rotateX: 20 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-contain p-4 drop-shadow-2xl"
            />
          </AnimatePresence>

          {/* Status bar */}
          <div className="absolute top-2.5 left-4 right-0 flex items-center justify-between px-4 text-[12px] font-semibold text-black">
            {/* Tid (venstre side) */}
            <span className="tracking-tight">{time}</span>

            {/* Højre side ikoner */}
            <div className="flex items-center space-x-1">
              <Signal size={14} strokeWidth={2.2} className="text-black" />
              <Wifi size={14} strokeWidth={2.2} className="text-black" />
              <Battery size={18} strokeWidth={2.2} className="text-black" />
            </div>
          </div>
        </div>

        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full shadow-inner" />

        {/* Hjem-indikator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-28 h-1.5 bg-black/40 rounded-full" />
      </div>

      {/* Glow bag telefonen */}
      <div className="absolute -inset-3 bg-gradient-to-b from-[#fff200]/50 via-[#fff200]/50 to-[#fff200]/50 rounded-[4rem] -z-10"/>
    </motion.div>
  );
};
