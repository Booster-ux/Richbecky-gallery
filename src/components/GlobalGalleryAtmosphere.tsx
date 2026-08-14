import React, { useEffect, useRef } from 'react';
import { ActivePage } from '../types';

interface AtmosphereProps {
  activePage: ActivePage;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  vx: number;
  vy: number;
  color: string;
}

interface AbstractShape {
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
  angle: number;
  rotationSpeed: number;
  color: string;
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

    // Dual-Tone Palette: Deep Navy (#0F2537) & Champagne Gold (#D4AF37)
    const colorPalette = [
      '212, 175, 55',  // Champagne Gold
      '15, 37, 55',    // Deep Navy Blue Accent
      '197, 160, 89',  // Warm Muted Gold
      '15, 37, 55'     // Deep Navy Blue Accent
    ];

    // Page-tailored particle & shape density config (NO LINES)
    const getIntensity = (page: ActivePage) => {
      switch (page) {
        case 'home':
          return { dotCount: 26, shapeCount: 3, alphaMult: 1.0, speed: 0.005 };
        case 'catalogue':
          return { dotCount: 18, shapeCount: 2, alphaMult: 0.8, speed: 0.003 };
        case 'artwork-detail':
          return { dotCount: 14, shapeCount: 1, alphaMult: 0.7, speed: 0.002 };
        case 'artist-profile':
        case 'artist-landing':
          return { dotCount: 22, shapeCount: 2, alphaMult: 0.9, speed: 0.004 };
        case 'about':
        case 'journal':
          return { dotCount: 16, shapeCount: 2, alphaMult: 0.8, speed: 0.003 };
        case 'contact-advisory':
        case 'policies':
          return { dotCount: 14, shapeCount: 1, alphaMult: 0.7, speed: 0.002 };
        default: // cart, checkout, account, wishlist, login
          return { dotCount: 8, shapeCount: 1, alphaMult: 0.5, speed: 0.0015 };
      }
    };

    const config = getIntensity(activePage);

    // Polka-dot light particles (NO LINES)
    const particles: Particle[] = Array.from({ length: config.dotCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 2.6, // 2.6px - 4.8px
      alpha: (Math.random() * 0.3 + 0.35) * config.alphaMult,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.abs(Math.random() * 0.35 + 0.15),
      color: colorPalette[i % colorPalette.length]
    }));

    // Soft blurred abstract shapes (NO LINES)
    const abstractShapes: AbstractShape[] = Array.from({ length: config.shapeCount }, (_, i) => ({
      x: width * (0.25 + i * 0.35),
      y: height * (0.3 + i * 0.25),
      radiusX: 200 + i * 40,
      radiusY: 130 + i * 30,
      angle: (i * Math.PI) / 3,
      rotationSpeed: (i % 2 === 0 ? 1 : -1) * 0.0012,
      color: colorPalette[i % colorPalette.length]
    }));

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (!prefersReducedMotion) {
        time += config.speed;
      }

      // Soft Moving Radial Champagne Spotlight
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
      lightGlow.addColorStop(0, `rgba(212, 175, 55, ${0.18 * config.alphaMult})`);
      lightGlow.addColorStop(0.5, `rgba(212, 175, 55, ${0.05 * config.alphaMult})`);
      lightGlow.addColorStop(1, 'rgba(212, 175, 55, 0)');

      ctx.fillStyle = lightGlow;
      ctx.fillRect(0, 0, width, height);

      // Render 1: Soft-Blurred Abstract Organic Shapes (NO LINES)
      abstractShapes.forEach((shape) => {
        if (!prefersReducedMotion) {
          shape.angle += shape.rotationSpeed;
        }

        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.angle);

        const shapeGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, Math.max(shape.radiusX, shape.radiusY));
        const alpha = (shape.color.startsWith('15') ? 0.05 : 0.08) * config.alphaMult;
        shapeGrad.addColorStop(0, `rgba(${shape.color}, ${alpha})`);
        shapeGrad.addColorStop(0.7, `rgba(${shape.color}, ${alpha * 0.3})`);
        shapeGrad.addColorStop(1, `rgba(${shape.color}, 0)`);

        ctx.beginPath();
        ctx.ellipse(0, 0, shape.radiusX, shape.radiusY, 0, 0, Math.PI * 2);
        ctx.fillStyle = shapeGrad;
        ctx.fill();
        ctx.restore();
      });

      // Render 2: Soft Polka-Dot Light Particles (NO LINES)
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
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.shadowBlur = p.color.startsWith('15') ? 4 : 6;
        ctx.shadowColor = `rgba(${p.color}, 0.4)`;
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
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-95 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
};
