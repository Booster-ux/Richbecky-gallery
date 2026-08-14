import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  vx: number;
  vy: number;
  pulseSpeed: number;
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
  pulseSpeed: number;
  color: string;
  strokeWidth: number;
}

interface SmallArcMark {
  x: number;
  y: number;
  radius: number;
  startAngle: number;
  endAngle: number;
  alpha: number;
  vx: number;
  vy: number;
  rotationSpeed: number;
  color: string;
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

    // High-Contrast Dual-Tone Palette: Deep Navy (#0F2537) & Champagne Gold (#D4AF37)
    const colorPalette = [
      '15, 37, 55',    // Deep Navy Blue (High Contrast on Ivory)
      '212, 175, 55',  // Champagne Gold
      '197, 160, 89',  // Muted Warm Gold
      '15, 37, 55',    // Deep Navy Blue Accent
      '230, 202, 101'  // Light Gold
    ];

    // 1. High-Contrast Polka-Dot Particles (25 items)
    const particles: Particle[] = [];
    for (let i = 0; i < 25; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 3.0, // 3.0px - 5.5px
        alpha: Math.random() * 0.3 + 0.40, // 0.40 - 0.70 high contrast
        vx: (Math.random() - 0.5) * 0.6,
        vy: -Math.abs(Math.random() * 0.5 + 0.3),
        pulseSpeed: Math.random() * 0.008 + 0.003,
        color: colorPalette[i % colorPalette.length]
      });
    }

    // 2. High-Contrast Short Line Segments (20 items, length 25px - 65px)
    const lineSegments: ShortLineSegment[] = [];
    for (let i = 0; i < 20; i++) {
      lineSegments.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 40 + 25, // 25px - 65px length
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.008, // Clearly observable rotation
        alpha: Math.random() * 0.3 + 0.45, // 0.45 - 0.75 opacity
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5 - 0.1,
        pulseSpeed: Math.random() * 0.008 + 0.003,
        color: colorPalette[(i + 1) % colorPalette.length],
        strokeWidth: Math.random() * 0.8 + 1.8 // 1.8px - 2.6px stroke width
      });
    }

    // 3. Small Curved Stroke Marks (10 items, radius 18px - 35px)
    const arcMarks: SmallArcMark[] = [];
    for (let i = 0; i < 10; i++) {
      arcMarks.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 17 + 18,
        startAngle: Math.random() * Math.PI,
        endAngle: Math.random() * Math.PI + Math.PI * 0.45,
        alpha: Math.random() * 0.3 + 0.40,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        rotationSpeed: (Math.random() - 0.5) * 0.006,
        color: colorPalette[(i + 2) % colorPalette.length]
      });
    }

    let lightTime = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (!prefersReducedMotion) {
        lightTime += 0.008;
      }

      // Sweeping Radial Champagne Spotlight
      const lightX = width * (0.55 + Math.sin(lightTime * 0.7) * 0.25);
      const lightY = height * (0.45 + Math.cos(lightTime * 0.5) * 0.18);

      const glowGradient = ctx.createRadialGradient(
        lightX,
        lightY,
        40,
        lightX,
        lightY,
        Math.max(width, height) * 0.7
      );
      glowGradient.addColorStop(0, 'rgba(212, 175, 55, 0.25)');
      glowGradient.addColorStop(0.5, 'rgba(212, 175, 55, 0.08)');
      glowGradient.addColorStop(1, 'rgba(212, 175, 55, 0)');

      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, width, height);

      // Render 1: Polka-Dot Particles (Navy & Gold)
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

          p.alpha += p.pulseSpeed;
          if (p.alpha > 0.75 || p.alpha < 0.35) {
            p.pulseSpeed = -p.pulseSpeed;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.shadowBlur = p.color.startsWith('15') ? 4 : 8;
        ctx.shadowColor = `rgba(${p.color}, 0.5)`;
        ctx.fill();
      });

      // Render 2: High-Contrast Short Fine Line Segments (Navy & Gold)
      lineSegments.forEach((seg) => {
        if (!prefersReducedMotion) {
          seg.x += seg.vx;
          seg.y += seg.vy;
          seg.angle += seg.rotationSpeed;

          if (seg.x < -40) seg.x = width + 40;
          if (seg.x > width + 40) seg.x = -40;
          if (seg.y < -40) seg.y = height + 40;
          if (seg.y > height + 40) seg.y = -40;

          seg.alpha += seg.pulseSpeed;
          if (seg.alpha > 0.78 || seg.alpha < 0.35) {
            seg.pulseSpeed = -seg.pulseSpeed;
          }
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

      // Render 3: Small Curved Arc Marks (Navy & Gold)
      arcMarks.forEach((arc) => {
        if (!prefersReducedMotion) {
          arc.x += arc.vx;
          arc.y += arc.vy;
          arc.startAngle += arc.rotationSpeed;
          arc.endAngle += arc.rotationSpeed;

          if (arc.x < -20) arc.x = width + 20;
          if (arc.x > width + 20) arc.x = -20;
          if (arc.y < -20) arc.y = height + 20;
          if (arc.y > height + 20) arc.y = -20;
        }

        ctx.beginPath();
        ctx.arc(arc.x, arc.y, arc.radius, arc.startAngle, arc.endAngle);
        ctx.strokeStyle = `rgba(${arc.color}, ${arc.alpha})`;
        ctx.lineWidth = 2.0;
        ctx.stroke();
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
