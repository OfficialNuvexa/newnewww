"use client";

import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  startDelay?: number;
  className?: string;
}

export default function TypewriterText({ text, delay = 100, startDelay = 0, className = '' }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (startDelay > 0) {
      const startTimeout = setTimeout(() => {
        setHasStarted(true);
      }, startDelay);

      return () => clearTimeout(startTimeout);
    } else {
      setHasStarted(true);
    }
  }, [startDelay]);

  useEffect(() => {
    if (hasStarted && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text, hasStarted]);

  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
    setHasStarted(startDelay === 0);
  }, [text]);

  return (
    <span className={className}>
      {displayText}
      {hasStarted && currentIndex < text.length && <span className="animate-pulse">|</span>}
    </span>
  );
}