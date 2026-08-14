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

interface FineLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  alpha: number;
  speed: number;
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
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Floating dust & champagne light particles
    const particleCount = Math.min(Math.floor((width * height) / 22000), 40);
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
        radius: Math.random() * 1.6 + 0.7,
        alpha: Math.random() * 0.2 + 0.05,
        targetAlpha: Math.random() * 0.28 + 0.08,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12 - 0.04, // Ultra-slow upward float like sunlight in gallery
        pulseSpeed: Math.random() * 0.004 + 0.0015
      });
    }

    // Fine gold line accents shifting position slowly
    const lineCount = 3;
    const lines: FineLine[] = [];
    for (let i = 0; i < lineCount; i++) {
      lines.push({
        x1: Math.random() * width * 0.5,
        y1: Math.random() * height,
        x2: Math.random() * width + width * 0.4,
        y2: Math.random() * height,
        alpha: Math.random() * 0.12 + 0.03,
        speed: (Math.random() - 0.5) * 0.001
      });
    }

    let lightTime = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Slow-moving natural champagne light source moving horizontally across the hero
      if (!prefersReducedMotion) {
        lightTime += 0.003;
      }
      
      const lightX = width * (0.65 + Math.sin(lightTime) * 0.12);
      const lightY = height * (0.45 + Math.cos(lightTime * 0.8) * 0.1);

      const glowGradient = ctx.createRadialGradient(
        lightX,
        lightY,
        40,
        lightX,
        lightY,
        Math.max(width, height) * 0.65
      );
      glowGradient.addColorStop(0, 'rgba(212, 175, 55, 0.085)');
      glowGradient.addColorStop(0.4, 'rgba(212, 175, 55, 0.03)');
      glowGradient.addColorStop(1, 'rgba(212, 175, 55, 0)');

      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Render delicate gold lines
      lines.forEach((l) => {
        if (!prefersReducedMotion) {
          l.alpha += l.speed;
          if (l.alpha > 0.15 || l.alpha < 0.02) l.speed = -l.speed;
        }
        ctx.beginPath();
        ctx.moveTo(l.x1, l.y1);
        ctx.lineTo(l.x2, l.y2);
        ctx.strokeStyle = `rgba(212, 175, 55, ${l.alpha})`;
        ctx.lineWidth = 0.75;
        ctx.stroke();
      });

      // 3. Render floating gallery light dust particles
      particles.forEach((p, idx) => {
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          p.alpha += p.pulseSpeed;
          if (p.alpha > p.targetAlpha || p.alpha < 0.04) {
            p.pulseSpeed = -p.pulseSpeed;
          }
        }

        const color = goldColors[idx % goldColors.length];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.25)';
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
