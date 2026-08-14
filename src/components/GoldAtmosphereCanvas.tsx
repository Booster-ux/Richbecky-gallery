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

interface ShortLineSegment {
  x: number;
  y: number;
  length: number;
  angle: number;
  rotationSpeed: number;
  alpha: number;
  targetAlpha: number;
  vx: number;
  vy: number;
  pulseSpeed: number;
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

    // 1. Polka-Dot Champagne Gold Particles (20 items)
    const particleCount = 20;
    const particles: Particle[] = [];
    const goldColors = ['212, 175, 55', '197, 160, 89', '230, 202, 101'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 2.0, // 2.0px - 3.8px dots
        alpha: Math.random() * 0.3 + 0.3,
        targetAlpha: Math.random() * 0.3 + 0.35,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -Math.abs(Math.random() * 0.35 + 0.15),
        pulseSpeed: Math.random() * 0.006 + 0.002
      });
    }

    // 2. Short Fine Gold Line Segments (15 items, length 15px - 35px)
    const lineSegmentCount = 15;
    const lineSegments: ShortLineSegment[] = [];
    for (let i = 0; i < lineSegmentCount; i++) {
      lineSegments.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 20 + 15,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.004,
        alpha: Math.random() * 0.35 + 0.25,
        targetAlpha: Math.random() * 0.35 + 0.3,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25 - 0.05,
        pulseSpeed: Math.random() * 0.005 + 0.002
      });
    }

    // 3. Small Curved Stroke Marks (6 items, radius 12px - 24px)
    const arcMarks: SmallArcMark[] = [];
    for (let i = 0; i < 6; i++) {
      arcMarks.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 12 + 12,
        startAngle: Math.random() * Math.PI,
        endAngle: Math.random() * Math.PI + Math.PI * 0.4,
        alpha: Math.random() * 0.3 + 0.25,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        rotationSpeed: (Math.random() - 0.5) * 0.003
      });
    }

    let lightTime = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (!prefersReducedMotion) {
        lightTime += 0.006;
      }

      // Soft Sweeping Champagne Light Beam
      const lightX = width * (0.55 + Math.sin(lightTime * 0.7) * 0.25);
      const lightY = height * (0.45 + Math.cos(lightTime * 0.5) * 0.18);

      const glowGradient = ctx.createRadialGradient(
        lightX,
        lightY,
        30,
        lightX,
        lightY,
        Math.max(width, height) * 0.7
      );
      glowGradient.addColorStop(0, 'rgba(212, 175, 55, 0.18)');
      glowGradient.addColorStop(0.5, 'rgba(212, 175, 55, 0.05)');
      glowGradient.addColorStop(1, 'rgba(212, 175, 55, 0)');

      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, width, height);

      // Render 1: Polka-Dot Gold Particles
      particles.forEach((p, idx) => {
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
          if (p.alpha > 0.65 || p.alpha < 0.25) {
            p.pulseSpeed = -p.pulseSpeed;
          }
        }

        const color = goldColors[idx % goldColors.length];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.5)';
        ctx.fill();
      });

      // Render 2: Short Fine Gold Line Segments
      lineSegments.forEach((seg) => {
        if (!prefersReducedMotion) {
          seg.x += seg.vx;
          seg.y += seg.vy;
          seg.angle += seg.rotationSpeed;

          if (seg.x < -30) seg.x = width + 30;
          if (seg.x > width + 30) seg.x = -30;
          if (seg.y < -30) seg.y = height + 30;
          if (seg.y > height + 30) seg.y = -30;

          seg.alpha += seg.pulseSpeed;
          if (seg.alpha > 0.65 || seg.alpha < 0.2) {
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
        ctx.strokeStyle = `rgba(212, 175, 55, ${seg.alpha})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      });

      // Render 3: Small Curved Stroke Marks
      arcMarks.forEach((arc) => {
        if (!prefersReducedMotion) {
          arc.x += arc.vx;
          arc.y += arc.vy;
          arc.startAngle += arc.rotationSpeed;
          arc.endAngle += arc.rotationSpeed;

          if (arc.x < 0) arc.x = width;
          if (arc.x > width) arc.x = 0;
          if (arc.y < 0) arc.y = height;
          if (arc.y > height) arc.y = 0;
        }

        ctx.beginPath();
        ctx.arc(arc.x, arc.y, arc.radius, arc.startAngle, arc.endAngle);
        ctx.strokeStyle = `rgba(197, 160, 89, ${arc.alpha})`;
        ctx.lineWidth = 1.3;
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
