import { motion } from "framer-motion";
import { Cloud, Laptop, Code, Database } from "lucide-react";

const iconTooltips = [
  { Icon: Cloud, text: "Start Small" },
  { Icon: Laptop, text: "Start Today" },
  { Icon: Code, text: "With NordStack" },
  { Icon: Database, text: "By NordStack" },
];

const FloatingIcons: React.FC = () => (
  <div className="absolute inset-0 flex flex-row items-center justify-center gap-32 -ml-16">
    {iconTooltips.map(({ Icon, text }, idx) => (
      <motion.div
        key={text}
        className="relative group text-white/20 cursor-pointer"
        animate={{ y: [0, -16, 0] }}
        transition={{
          duration: 4 + idx * 0.5,
          delay: idx * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Icon size={28} />
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 mt-3 w-max px-4 py-2 rounded bg-black/80 text-base text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-nowrap shadow-lg font-semibold">
          {text}
        </div>
      </motion.div>
    ))}
  </div>
);

export default FloatingIcons;
