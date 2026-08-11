import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  targetAlpha: number;
  vx: number;
  vy: number;
  pulseSpeed: number;
}

export const GoldAtmosphereCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Generate lightweight, slow floating champagne-gold particles
    const particleCount = Math.min(Math.floor((width * height) / 25000), 35);
    const particles: Particle[] = [];

    const goldColors = [
      '212, 175, 55',  // Champagne Gold #D4AF37
      '197, 160, 89',  // Warm Muted Gold #C5A059
      '230, 202, 101'  // Soft Light Gold #E6CA65
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.25 + 0.05,
        targetAlpha: Math.random() * 0.3 + 0.1,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15 - 0.05, // Gentle upward float
        pulseSpeed: Math.random() * 0.005 + 0.002
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle ambient gold radial glow in the center-right behind artwork
      const glowGradient = ctx.createRadialGradient(
        width * 0.7,
        height * 0.5,
        50,
        width * 0.7,
        height * 0.5,
        Math.max(width, height) * 0.6
      );
      glowGradient.addColorStop(0, 'rgba(212, 175, 55, 0.07)');
      glowGradient.addColorStop(0.5, 'rgba(212, 175, 55, 0.02)');
      glowGradient.addColorStop(1, 'rgba(212, 175, 55, 0)');

      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, width, height);

      // Render floating particles if not reduced motion
      particles.forEach((p, idx) => {
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Wrap boundaries
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // Gentle pulse opacity
          p.alpha += p.pulseSpeed;
          if (p.alpha > p.targetAlpha || p.alpha < 0.05) {
            p.pulseSpeed = -p.pulseSpeed;
          }
        }

        const color = goldColors[idx % goldColors.length];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.alpha})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.3)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
