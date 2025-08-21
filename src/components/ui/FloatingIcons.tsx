import { motion } from "framer-motion";
import { Cloud, Laptop, Code, Database } from "lucide-react";

const floatingIcons = [
  { Icon: Cloud, delay: 0 },
  { Icon: Laptop, delay: 0.5 },
  { Icon: Code, delay: 1 },
  { Icon: Database, delay: 1.5 },
];

const FloatingIcons: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none">
    {floatingIcons.map(({ Icon, delay }, idx) => (
      <motion.div
        key={idx}
        className="absolute text-white/20"
        style={{ top: `${20 + idx * 15}%`, left: `${10 + idx * 20}%` }}
        animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, 5, -5, 0] }}
        transition={{
          duration: 4 + idx,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Icon size={24 + idx * 4} />
      </motion.div>
    ))}
  </div>
);

export default FloatingIcons;
