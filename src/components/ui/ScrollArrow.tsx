import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ScrollArrow: React.FC<{ offset?: number }> = ({ offset = 0 }) => (
  <motion.div
    className="flex justify-center mt-12"
    initial={{ opacity: 0 }}
    animate={{
      opacity: [0, 1, 1, 0],
      y: [0, 0, 12, 12],
      scale: [1, 1.04, 1.04, 1],
    }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  >
    <button
      aria-label="Scroll ned til features"
      onClick={() => scrollToFeatures(offset)}
      className="group flex flex-col items-center focus:outline-none"
      type="button"
    >
      <ArrowRight
        className="w-10 h-10 text-white/60 rotate-90 group-hover:text-white/80 transition-colors duration-200"
        aria-hidden
      />
      <span className="sr-only">Scroll ned</span>
    </button>
  </motion.div>
);

const scrollToFeatures = (offset = 0) => {
  const el = document.getElementById("features");
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
};

export default ScrollArrow;
