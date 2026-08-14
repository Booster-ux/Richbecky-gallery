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

interface AbstractShape {
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
  angle: number;
  rotationSpeed: number;
  vx: number;
  vy: number;
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

    // Dual-Tone Palette: Deep Navy (#0F2537) & Champagne Gold (#D4AF37)
    const colorPalette = [
      '212, 175, 55',  // Champagne Gold
      '15, 37, 55',    // Deep Navy Blue (High Contrast Accent)
      '197, 160, 89',  // Warm Muted Gold
      '230, 202, 101'  // Soft Light Gold
    ];

    // 1. Soft Polka-Dot Light Particles (30 items, NO LINES)
    const particles: Particle[] = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 2.5, // 2.5px - 5.0px dots
        alpha: Math.random() * 0.3 + 0.35, // 0.35 - 0.65 opacity
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.abs(Math.random() * 0.4 + 0.2), // Continuous gentle upward float
        pulseSpeed: Math.random() * 0.006 + 0.002,
        color: colorPalette[i % colorPalette.length]
      });
    }

    // 2. Large Soft-Blurred Abstract Organic Shapes (3 items, NO LINES)
    const abstractShapes: AbstractShape[] = [
      {
        x: width * 0.2,
        y: height * 0.3,
        radiusX: 220,
        radiusY: 140,
        angle: 0,
        rotationSpeed: 0.0015,
        vx: 0.15,
        vy: 0.1,
        color: '212, 175, 55' // Champagne Gold
      },
      {
        x: width * 0.75,
        y: height * 0.45,
        radiusX: 260,
        radiusY: 170,
        angle: Math.PI / 4,
        rotationSpeed: -0.0012,
        vx: -0.12,
        vy: 0.08,
        color: '15, 37, 55' // Deep Navy Blue
      },
      {
        x: width * 0.5,
        y: height * 0.7,
        radiusX: 190,
        radiusY: 120,
        angle: Math.PI / 3,
        rotationSpeed: 0.001,
        vx: 0.08,
        vy: -0.1,
        color: '197, 160, 89' // Muted Gold
      }
    ];

    let lightTime = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (!prefersReducedMotion) {
        lightTime += 0.006;
      }

      // 1. Soft Sweeping Radial Champagne Spotlight
      const lightX = width * (0.55 + Math.sin(lightTime * 0.6) * 0.28);
      const lightY = height * (0.45 + Math.cos(lightTime * 0.4) * 0.2);

      const glowGradient = ctx.createRadialGradient(
        lightX,
        lightY,
        40,
        lightX,
        lightY,
        Math.max(width, height) * 0.75
      );
      glowGradient.addColorStop(0, 'rgba(212, 175, 55, 0.22)');
      glowGradient.addColorStop(0.5, 'rgba(212, 175, 55, 0.06)');
      glowGradient.addColorStop(1, 'rgba(212, 175, 55, 0)');

      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Render Soft-Blurred Abstract Organic Shapes (NO LINES)
      abstractShapes.forEach((shape) => {
        if (!prefersReducedMotion) {
          shape.x += shape.vx;
          shape.y += shape.vy;
          shape.angle += shape.rotationSpeed;

          if (shape.x < width * 0.05 || shape.x > width * 0.95) shape.vx = -shape.vx;
          if (shape.y < height * 0.1 || shape.y > height * 0.9) shape.vy = -shape.vy;
        }

        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.angle);

        const shapeGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, Math.max(shape.radiusX, shape.radiusY));
        const alpha = shape.color.startsWith('15') ? 0.06 : 0.09;
        shapeGrad.addColorStop(0, `rgba(${shape.color}, ${alpha})`);
        shapeGrad.addColorStop(0.7, `rgba(${shape.color}, ${alpha * 0.4})`);
        shapeGrad.addColorStop(1, `rgba(${shape.color}, 0)`);

        ctx.beginPath();
        ctx.ellipse(0, 0, shape.radiusX, shape.radiusY, 0, 0, Math.PI * 2);
        ctx.fillStyle = shapeGrad;
        ctx.fill();
        ctx.restore();
      });

      // 3. Render Soft Polka-Dot Light Particles (NO LINES)
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
          if (p.alpha > 0.65 || p.alpha < 0.35) {
            p.pulseSpeed = -p.pulseSpeed;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.shadowBlur = p.color.startsWith('15') ? 4 : 8;
        ctx.shadowColor = `rgba(${p.color}, 0.45)`;
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
