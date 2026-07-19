import React, { useState, useEffect } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsVisible(false), 800); 
          setTimeout(onComplete, 1600); 
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1; 
      });
    }, 100);
    return () => clearInterval(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${progress === 100 ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="relative">
        <span className="text-[12rem] md:text-[20rem] font-black text-neutral-900 tabular-nums leading-none select-none">
          {Math.min(progress, 100)}
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="text-xl md:text-3xl font-bold text-blue-400 tracking-[0.5em] uppercase mix-blend-difference animate-pulse">
             CreativeFlic
           </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default Preloader;