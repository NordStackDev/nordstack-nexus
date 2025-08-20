import { AnimatePresence, motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";

const AnimatedHeroText: React.FC<{ words: string[] }> = ({ words }) => {
  const { currentWord, currentWordIndex } = useTypewriter({
    words,
    delayBetweenWords: 3000,
  });

  return (
    <div className="mb-12 h-20 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentWordIndex}
          initial={{ opacity: 0, filter: "blur(8px)", scale: 0.92 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)", scale: 0.92 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="text-3xl md:text-4xl font-semibold text-white"
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedHeroText;
