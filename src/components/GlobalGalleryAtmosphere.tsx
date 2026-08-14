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

interface ShortLineSegment {
  x: number;
  y: number;
  length: number;
  angle: number;
  rotationSpeed: number;
  alpha: number;
  vx: number;
  vy: number;
  color: string;
  strokeWidth: number;
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
      '15, 37, 55',    // Deep Navy Blue (High Contrast against Ivory)
      '212, 175, 55',  // Champagne Gold
      '197, 160, 89',  // Warm Muted Gold
      '15, 37, 55'     // Deep Navy Blue Accent
    ];

    // Page-tailored element density configuration
    const getIntensity = (page: ActivePage) => {
      switch (page) {
        case 'home':
          return { dotCount: 22, lineCount: 16, alphaMult: 1.0, speed: 0.006 };
        case 'catalogue':
          return { dotCount: 16, lineCount: 10, alphaMult: 0.85, speed: 0.004 };
        case 'artwork-detail':
          return { dotCount: 12, lineCount: 8, alphaMult: 0.75, speed: 0.003 };
        case 'artist-profile':
        case 'artist-landing':
          return { dotCount: 18, lineCount: 12, alphaMult: 0.95, speed: 0.005 };
        case 'about':
        case 'journal':
          return { dotCount: 14, lineCount: 10, alphaMult: 0.85, speed: 0.004 };
        case 'contact-advisory':
        case 'policies':
          return { dotCount: 12, lineCount: 8, alphaMult: 0.75, speed: 0.003 };
        default: // cart, checkout, account, wishlist, login
          return { dotCount: 8, lineCount: 5, alphaMult: 0.55, speed: 0.002 };
      }
    };

    const config = getIntensity(activePage);

    // Polka-dot particles in Navy & Gold
    const particles: Particle[] = Array.from({ length: config.dotCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 2.8, // 2.8px - 5.0px
      alpha: (Math.random() * 0.3 + 0.35) * config.alphaMult,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.abs(Math.random() * 0.4 + 0.2),
      color: colorPalette[i % colorPalette.length]
    }));

    // Short line segments in Navy & Gold
    const lineSegments: ShortLineSegment[] = Array.from({ length: config.lineCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 35 + 25, // 25px - 60px length
      angle: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.006,
      alpha: (Math.random() * 0.3 + 0.38) * config.alphaMult,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      color: colorPalette[(i + 1) % colorPalette.length],
      strokeWidth: Math.random() * 0.6 + 1.8 // 1.8px - 2.4px
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

      // Render 1: Navy & Gold Polka-Dot Particles
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

      // Render 2: High-Contrast Navy & Gold Short Fine Line Segments
      lineSegments.forEach((seg) => {
        if (!prefersReducedMotion) {
          seg.x += seg.vx;
          seg.y += seg.vy;
          seg.angle += seg.rotationSpeed;

          if (seg.x < -35) seg.x = width + 35;
          if (seg.x > width + 35) seg.x = -35;
          if (seg.y < -35) seg.y = height + 35;
          if (seg.y > height + 35) seg.y = -35;
        }

        const halfLen = seg.length / 2;
        const x1 = seg.x - Math.cos(seg.angle) * halfLen;
        const y1 = seg.y - Math.sin(seg.angle) * halfLen;
        const x2 = seg.x + Math.cos(seg.angle) * halfLen;
        const y2 = seg.y + Math.sin(seg.angle) * halfLen;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(${seg.color}, ${seg.alpha})`;
        ctx.lineWidth = seg.strokeWidth;
        ctx.stroke();
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
