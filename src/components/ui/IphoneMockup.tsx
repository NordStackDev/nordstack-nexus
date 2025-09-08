import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, Signal, BatteryFull } from "lucide-react";

export interface IphoneMockupProps {
  images: string[];
  imageIndex?: number;
  autoRotate?: boolean;
  rotateInterval?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const IphoneMockup: React.FC<IphoneMockupProps> = ({
  images,
  imageIndex = 0,
  autoRotate = false,
  rotateInterval = 8000,
  className = "",
  style = {},
}) => {
  const [internalIndex, setInternalIndex] = useState(imageIndex);
  const [time, setTime] = useState<string>(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  // Auto-rotate images if enabled
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setInternalIndex((prev) => (prev + 1) % images.length);
    }, rotateInterval);
    return () => clearInterval(interval);
  }, [autoRotate, images.length, rotateInterval]);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // If imageIndex prop changes, update internalIndex
  useEffect(() => {
    if (!autoRotate) setInternalIndex(imageIndex);
  }, [imageIndex, autoRotate]);

  return (
    <motion.div
      className={`relative w-64 h-[520px] mx-auto perspective-[2000px] ${className}`}
      initial={{ rotateY: -12, rotateX: 6 }}
      animate={{ rotateY: -12, rotateX: 6 }}
      whileHover={{ rotateY: -18, rotateX: 10, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 60, damping: 15 }}
      style={style}
    >
      {/* Phone frame */}
      <div className="relative w-full h-full rounded-[3rem] bg-black shadow-[0_30px_80px_rgba(0,0,0,0.7)] border-[6px] border-gray-700 overflow-hidden">
        {/* Screen content */}
        <div className="absolute inset-0 bg-white rounded-[2.7rem] overflow-hidden">
          <AnimatePresence mode="wait">
            <picture key={internalIndex}>
              <source srcSet={images[internalIndex]} type="image/webp" />
              <motion.img
                src={images[internalIndex]}
                alt="App Screenshot"
                loading="lazy"
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -40, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-contain object-center bg-white p-4"
              />
            </picture>
          </AnimatePresence>

          {/* Status bar */}
          <div className="absolute top-2.5 left-4 right-0 flex items-center justify-between px-4 text-[12px] font-semibold text-black">
            <span className="tracking-tight">
              {time.replace(/(AM|PM|am|pm)/, "").trim()}
            </span>
            <div className="flex items-center space-x-1">
              <Signal size={14} strokeWidth={2.2} className="text-black" />
              <Wifi size={14} strokeWidth={2.2} className="text-black" />
              <BatteryFull size={18} strokeWidth={2.2} className="text-black" />
            </div>
          </div>
        </div>

        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full shadow-inner" />

        {/* Home indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-28 h-1.5 bg-black/40 rounded-full" />
      </div>

      {/* Glow behind phone */}
      <div className="absolute -inset-3 bg-gradient-to-b from-[#fff200]/50 via-[#fff200]/50 to-[#fff200]/50 rounded-[4rem] -z-10" />
    </motion.div>
  );
};
