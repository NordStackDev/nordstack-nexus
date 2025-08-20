import { useState, useEffect } from 'react';

interface UseTypewriterProps {
  words: string[];
  loop?: boolean;
  delayBetweenWords?: number;
}

export const useTypewriter = ({
  words,
  loop = true,
  delayBetweenWords = 3000,
}: UseTypewriterProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentWordIndex((prev) => 
        loop ? (prev + 1) % words.length : Math.min(prev + 1, words.length - 1)
      );
    }, delayBetweenWords);

    return () => clearTimeout(timeout);
  }, [currentWordIndex, words, loop, delayBetweenWords]);

  return { currentWord: words[currentWordIndex], currentWordIndex };
};