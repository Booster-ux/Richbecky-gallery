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

    // Page-specific particle density and light speed configuration
    const getIntensity = (page: ActivePage) => {
      switch (page) {
        case 'home':
          return { particleCount: 30, lightSpeed: 0.001, lineAlpha: 0.12 };
        case 'catalogue':
          return { particleCount: 18, lightSpeed: 0.0006, lineAlpha: 0.08 };
        case 'artwork-detail':
          return { particleCount: 12, lightSpeed: 0.0004, lineAlpha: 0.06 };
        case 'artist-profile':
        case 'artist-landing':
          return { particleCount: 20, lightSpeed: 0.0007, lineAlpha: 0.1 };
        case 'about':
        case 'journal':
          return { particleCount: 16, lightSpeed: 0.0005, lineAlpha: 0.08 };
        case 'contact-advisory':
        case 'policies':
          return { particleCount: 12, lightSpeed: 0.0004, lineAlpha: 0.07 };
        default: // cart, checkout, account, wishlist, login
          return { particleCount: 8, lightSpeed: 0.0002, lineAlpha: 0.04 };
      }
    };

    const config = getIntensity(activePage);

    // Dynamic light particles
    const particles = Array.from({ length: config.particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.2 + 0.03,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1 - 0.02
    }));

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (!prefersReducedMotion) {
        time += config.lightSpeed;
      }

      // 1. Slow-moving champagne-gold light source (20–40s cycle)
      const glowX = width * (0.5 + Math.sin(time * 0.5) * 0.3);
      const glowY = height * (0.4 + Math.cos(time * 0.4) * 0.2);

      const lightGlow = ctx.createRadialGradient(
        glowX,
        glowY,
        50,
        glowX,
        glowY,
        Math.max(width, height) * 0.7
      );
      lightGlow.addColorStop(0, 'rgba(212, 175, 55, 0.06)');
      lightGlow.addColorStop(0.5, 'rgba(212, 175, 55, 0.02)');
      lightGlow.addColorStop(1, 'rgba(212, 175, 55, 0)');

      ctx.fillStyle = lightGlow;
      ctx.fillRect(0, 0, width, height);

      // 2. Fine gold architectural arcs / linework
      ctx.beginPath();
      const arcX = width * (0.8 + Math.sin(time * 0.2) * 0.05);
      const arcY = height * (0.3 + Math.cos(time * 0.2) * 0.05);
      ctx.arc(arcX, arcY, 300, 0, Math.PI * 0.8);
      ctx.strokeStyle = `rgba(212, 175, 55, ${config.lineAlpha})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // 3. Floating champagne light particles
      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
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
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-80 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
};
