import React, { useState, useEffect, useRef } from 'react';

interface WordRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span';
  stagger?: number;
  delay?: number;
  accentWords?: number;   // number of trailing words that receive accentClass
  accentClass?: string;
}

/**
 * Splits text into words and reveals each from behind a mask,
 * staggered, when scrolled into view. Luxury editorial feel.
 */
const WordReveal: React.FC<WordRevealProps> = ({
  text,
  className = '',
  as = 'div',
  stagger = 70,
  delay = 0,
  accentWords = 0,
  accentClass = ''
}) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  const words = text.split(' ');
  const accentStart = accentWords > 0 ? words.length - accentWords : words.length;
  const Tag = as as any;

  return (
    <Tag ref={ref} className={`${className} ${visible ? 'wr-visible' : ''}`} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="wr-mask" aria-hidden="true">
          <span
            className={`wr-word ${i >= accentStart ? accentClass : ''}`}
            style={{ transitionDelay: `${delay + i * stagger}ms` }}
          >
            {word}
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
};

export default WordReveal;
