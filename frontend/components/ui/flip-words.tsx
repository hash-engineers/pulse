'use client';

import { cn } from '@/lib/utils';
import { Div, Span } from '@/lib/motion';
import { AnimatePresence } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';

type Props = {
  words: string[];
  duration?: number;
  className?: string;
};

export function FlipWords({ words, duration = 3000, className }: Props) {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating)
      setTimeout(() => {
        startAnimation();
      }, duration);
  }, [isAnimating, duration, startAnimation]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsAnimating(false);
      }}
    >
      <Div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          ease: 'easeInOut',
          type: 'spring',
          stiffness: 100,
          damping: 10,
        }}
        exit={{
          opacity: 0,
          y: -40,
          x: 40,
          filter: 'blur(8px)',
          scale: 2,
          position: 'absolute',
        }}
        className={cn(
          'z-10 inline-block relative text-left text-neutral-900 dark:text-neutral-100 px-2',
          className
        )}
        key={currentWord}
      >
        {currentWord.split('').map((letter, index) => (
          <Span
            key={currentWord + index}
            initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            className="inline-block"
          >
            {letter}
          </Span>
        ))}
      </Div>
    </AnimatePresence>
  );
}
