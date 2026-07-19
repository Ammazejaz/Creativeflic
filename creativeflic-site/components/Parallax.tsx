import React, { useEffect, useRef, ReactNode } from 'react';

/**
 * Scroll-linked depth: translates children vertically relative to their
 * distance from the viewport center. Subtle speeds only (0.05 to 0.2).
 */
const Parallax = ({ speed = 0.12, className = '', children }: { speed?: number; className?: string; children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return <div ref={ref} className={`will-change-transform ${className}`}>{children}</div>;
};

export default Parallax;
