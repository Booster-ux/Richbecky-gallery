import React, { useEffect, useRef } from 'react';
import { ActivePage } from '../types';

interface AtmosphereProps {
  activePage: ActivePage;
}

export const GlobalGalleryAtmosphere: React.FC<AtmosphereProps> = ({ activePage }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Admin views use no decorative background atmosphere
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

    // Page-tailored visual line opacity and speed config
    const getIntensity = (page: ActivePage) => {
      switch (page) {
        case 'home':
          return { lineAlpha: 0.42, lightAlpha: 0.18, speed: 0.005 };
        case 'catalogue':
          return { lineAlpha: 0.32, lightAlpha: 0.12, speed: 0.003 };
        case 'artwork-detail':
          return { lineAlpha: 0.25, lightAlpha: 0.09, speed: 0.002 };
        case 'artist-profile':
        case 'artist-landing':
          return { lineAlpha: 0.38, lightAlpha: 0.15, speed: 0.004 };
        case 'about':
        case 'journal':
          return { lineAlpha: 0.35, lightAlpha: 0.14, speed: 0.003 };
        case 'contact-advisory':
        case 'policies':
          return { lineAlpha: 0.28, lightAlpha: 0.10, speed: 0.002 };
        default: // cart, checkout, account, wishlist, login
          return { lineAlpha: 0.18, lightAlpha: 0.06, speed: 0.0015 };
      }
    };

    const config = getIntensity(activePage);

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (!prefersReducedMotion) {
        time += config.speed;
      }

      // 1. Moving Radial Champagne Spotlight Beam
      const lightX = width * (0.5 + Math.sin(time * 0.5) * 0.35);
      const lightY = height * (0.4 + Math.cos(time * 0.4) * 0.25);

      const lightGlow = ctx.createRadialGradient(
        lightX,
        lightY,
        40,
        lightX,
        lightY,
        Math.max(width, height) * 0.75
      );
      lightGlow.addColorStop(0, `rgba(212, 175, 55, ${config.lightAlpha})`);
      lightGlow.addColorStop(0.5, `rgba(212, 175, 55, ${config.lightAlpha * 0.3})`);
      lightGlow.addColorStop(1, 'rgba(212, 175, 55, 0)');

      ctx.fillStyle = lightGlow;
      ctx.fillRect(0, 0, width, height);

      // 2. Section-Tailored Flowing Champagne Gold Lines & Arcs
      ctx.lineWidth = 1.6;

      if (activePage === 'home' || activePage === 'artist-profile') {
        // Large Flowing Bezier Arcs
        ctx.strokeStyle = `rgba(212, 175, 55, ${config.lineAlpha})`;
        ctx.beginPath();
        const startY = height * (0.3 + Math.sin(time) * 0.05);
        const endY = height * (0.7 + Math.cos(time) * 0.05);
        ctx.moveTo(-100, startY);
        ctx.bezierCurveTo(width * 0.35, height * 0.1, width * 0.65, height * 0.9, width + 100, endY);
        ctx.stroke();

        // Architectural Traveling Arc
        ctx.beginPath();
        const arcX = width * (0.8 + Math.sin(time * 0.4) * 0.08);
        const arcY = height * (0.4 + Math.cos(time * 0.3) * 0.08);
        ctx.arc(arcX, arcY, 360, Math.PI * 0.1, Math.PI * 0.95);
        ctx.strokeStyle = `rgba(197, 160, 89, ${config.lineAlpha * 0.8})`;
        ctx.stroke();
      } else if (activePage === 'catalogue' || activePage === 'artwork-detail') {
        // Fine Horizontal Contour Waves
        for (let i = 0; i < 2; i++) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(212, 175, 55, ${config.lineAlpha * (1 - i * 0.3)})`;
          const basePos = height * (0.35 + i * 0.3);
          ctx.moveTo(0, basePos);
          for (let x = 0; x <= width; x += 40) {
            const y = basePos + Math.sin(time + x * 0.004 + i) * 20;
            ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      } else {
        // Soft Translucent Shape & Line Morphs (About, Journal, Contact)
        ctx.save();
        ctx.translate(width * 0.5, height * 0.5);
        ctx.rotate(time * 0.15);
        ctx.beginPath();
        ctx.ellipse(0, 0, width * 0.35, height * 0.25, Math.PI / 6, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(212, 175, 55, ${config.lineAlpha * 0.7})`;
        ctx.stroke();
        ctx.restore();
      }

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
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-95 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
};
