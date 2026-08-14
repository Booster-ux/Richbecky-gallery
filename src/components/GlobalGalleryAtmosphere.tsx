import React, { useEffect, useRef } from 'react';
import { ActivePage } from '../types';

interface AtmosphereProps {
  activePage: ActivePage;
}

export const GlobalGalleryAtmosphere: React.FC<AtmosphereProps> = ({ activePage }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Admin pages use no decorative background atmosphere
  if (activePage === 'admin-dashboard' || activePage === 'admin-login') {
    return null;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Page-specific particle density, speed, and contrast configuration
    const getIntensity = (page: ActivePage) => {
      switch (page) {
        case 'home':
          return { particleCount: 35, lightSpeed: 0.005, lineAlpha: 0.22, baseAlpha: 0.35 };
        case 'catalogue':
          return { particleCount: 25, lightSpeed: 0.003, lineAlpha: 0.18, baseAlpha: 0.28 };
        case 'artwork-detail':
          return { particleCount: 18, lightSpeed: 0.002, lineAlpha: 0.14, baseAlpha: 0.22 };
        case 'artist-profile':
        case 'artist-landing':
          return { particleCount: 28, lightSpeed: 0.004, lineAlpha: 0.20, baseAlpha: 0.30 };
        case 'about':
        case 'journal':
          return { particleCount: 22, lightSpeed: 0.003, lineAlpha: 0.16, baseAlpha: 0.25 };
        case 'contact-advisory':
        case 'policies':
          return { particleCount: 18, lightSpeed: 0.002, lineAlpha: 0.15, baseAlpha: 0.22 };
        default: // cart, checkout, account, wishlist, login
          return { particleCount: 12, lightSpeed: 0.0015, lineAlpha: 0.10, baseAlpha: 0.18 };
      }
    };

    const config = getIntensity(activePage);

    // High-visibility floating champagne gold light dust particles
    const particles = Array.from({ length: config.particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 1.8, // 1.8px - 4.0px clearly visible motes
      alpha: Math.random() * 0.3 + config.baseAlpha,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.abs(Math.random() * 0.3 + 0.2) // Upward drift
    }));

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (!prefersReducedMotion) {
        time += config.lightSpeed;
      }

      // 1. Slow-moving champagne-gold light source (20–40s cycle)
      const glowX = width * (0.5 + Math.sin(time * 0.6) * 0.35);
      const glowY = height * (0.4 + Math.cos(time * 0.5) * 0.25);

      const lightGlow = ctx.createRadialGradient(
        glowX,
        glowY,
        40,
        glowX,
        glowY,
        Math.max(width, height) * 0.75
      );
      lightGlow.addColorStop(0, 'rgba(212, 175, 55, 0.15)');
      lightGlow.addColorStop(0.5, 'rgba(212, 175, 55, 0.05)');
      lightGlow.addColorStop(1, 'rgba(212, 175, 55, 0)');

      ctx.fillStyle = lightGlow;
      ctx.fillRect(0, 0, width, height);

      // 2. Fine gold architectural arcs / linework
      ctx.beginPath();
      const arcX = width * (0.8 + Math.sin(time * 0.3) * 0.08);
      const arcY = height * (0.3 + Math.cos(time * 0.3) * 0.08);
      ctx.arc(arcX, arcY, 350, 0, Math.PI * 0.85);
      ctx.strokeStyle = `rgba(212, 175, 55, ${config.lineAlpha})`;
      ctx.lineWidth = 1.0;
      ctx.stroke();

      // 3. Floating champagne light dust motes
      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) {
            p.y = height;
            p.x = Math.random() * width;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.5)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activePage]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-90 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
};
