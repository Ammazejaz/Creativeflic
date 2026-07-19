import React, { useEffect, useRef } from 'react';

const useParticleEffect = (canvasRef: React.RefObject<HTMLCanvasElement>, isDark: boolean, forceColor: string | null) => {
  const mouse = useRef<{ x: number | undefined; y: number | undefined; radius: number }>({ x: undefined, y: undefined, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    class Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      vx: number;
      vy: number;

      constructor(x: number, y: number, size: number, color: string) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.vx = (Math.random() * 1) - 0.5;
        this.vy = (Math.random() * 1) - 0.5;
      }
      
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      
      update() {
        if (!canvas) return;
        if (mouse.current.x !== undefined && mouse.current.y !== undefined) {
            let dx = mouse.current.x - this.x;
            let dy = mouse.current.y - this.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            
            if (distance < mouse.current.radius) {
                const maxDistance = mouse.current.radius;
                const force = (maxDistance - distance) / maxDistance;
                const directionX = (dx / distance) * force * 5; 
                const directionY = (dy / distance) * force * 5;
                
                this.x -= directionX;
                this.y -= directionY;
            }
        }
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        this.draw();
      }
    }

    const init = () => {
      if (!canvas) return;
      particles = [];
      const parent = canvas.parentElement;
      if (!parent) return;

      const area = parent.clientWidth * parent.clientHeight;
      const numberOfParticles = Math.min(area / 9000, 100); 
      
      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1; 
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        
        let baseColor;
        if (forceColor) {
             baseColor = forceColor;
        } else {
             baseColor = isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.2)';
        }
        
        let accentColor = 'rgba(250, 204, 21, 0.8)'; // Yellow always
        let color = Math.random() > 0.8 ? accentColor : baseColor;
        
        particles.push(new Particle(x, y, size, color));
      }
    };

    const resize = () => {
      const parent = canvas?.parentElement;
      if (parent && canvas) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        init();
      }
    };

    window.addEventListener('resize', resize);
    
    const handleMouseMove = (e: MouseEvent) => {
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        mouse.current.x = e.clientX - rect.left;
        mouse.current.y = e.clientY - rect.top;
    };
    
    const handleMouseEnter = () => {
        window.addEventListener('mousemove', handleMouseMove);
    };

    const handleMouseLeave = () => {
        mouse.current.x = undefined;
        mouse.current.y = undefined;
        window.removeEventListener('mousemove', handleMouseMove);
    }
    
    const parentElement = canvas.closest('section');
    if (parentElement) {
        parentElement.addEventListener('mouseenter', handleMouseEnter);
        parentElement.addEventListener('mouseleave', handleMouseLeave);
    }

    resize();
    
    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (parentElement) {
          parentElement.removeEventListener('mouseenter', handleMouseEnter);
          parentElement.removeEventListener('mouseleave', handleMouseLeave);
      }
      
      cancelAnimationFrame(animationFrameId);
    };
  }, [canvasRef, isDark, forceColor]);
};

interface SectionParticlesProps {
    isDark: boolean;
    className?: string;
    forceColor?: string | null;
}

const SectionParticles: React.FC<SectionParticlesProps> = ({ isDark, className = "", forceColor = null }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticleEffect(canvasRef, isDark, forceColor);
  return <canvas ref={canvasRef} className={`absolute inset-0 z-0 w-full h-full pointer-events-none ${className}`} />;
};

export default SectionParticles;