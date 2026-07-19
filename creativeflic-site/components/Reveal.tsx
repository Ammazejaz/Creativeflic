import React, { useState, useEffect, useRef, ReactNode } from 'react';

type RevealVariant = 'fade-up' | 'fade-in' | 'scale-up' | 'slide-left' | 'slide-right' | 'creative-up';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: RevealVariant;
  threshold?: number;
}

const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className = "", variant = 'creative-up', threshold = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [threshold]);

  const getTransformClasses = () => {
    switch (variant) {
      case 'fade-in':
        return isVisible ? 'opacity-100' : 'opacity-0';
      case 'scale-up':
        return isVisible 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-90';
      case 'slide-left': 
        // Moves to the left (enters from right)
        return isVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-12'; 
      case 'slide-right': 
        // Moves to the right (enters from left)
        return isVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 -translate-x-12';
      case 'fade-up':
        return isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-12';
      case 'creative-up':
      default:
        return isVisible 
          ? 'opacity-100 translate-y-0 rotate-0 skew-y-0 clip-path-full' 
          : 'opacity-0 translate-y-24 rotate-1 skew-y-3';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] transform ${getTransformClasses()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default Reveal;