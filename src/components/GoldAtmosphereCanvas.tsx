import React, { useEffect, useRef } from 'react';

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

    // Minimal particle accents (8 subtle motes)
    const particles = Array.from({ length: 8 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.0 + 1.5,
      alpha: Math.random() * 0.3 + 0.2,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.abs(Math.random() * 0.2 + 0.1)
    }));

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (!prefersReducedMotion) {
        time += 0.006;
      }

      // 1. Moving Radial Champagne Light Beam
      const lightX = width * (0.55 + Math.sin(time * 0.7) * 0.3);
      const lightY = height * (0.45 + Math.cos(time * 0.5) * 0.2);

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

      // 2. Large Abstract Translucent Shifting Shapes
      ctx.save();
      ctx.translate(width * 0.8, height * 0.3);
      ctx.rotate(time * 0.2);
      ctx.beginPath();
      ctx.ellipse(0, 0, 240, 140, Math.PI / 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(212, 175, 55, 0.05)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.18)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // 3. Flowing Architectural Champagne Gold Bezier Lines & Arcs
      const lineConfigs = [
        { color: 'rgba(212, 175, 55, 0.48)', width: 2.2, speedMult: 1.0, yOffset: 0.2 },
        { color: 'rgba(197, 160, 89, 0.42)', width: 1.8, speedMult: 0.8, yOffset: 0.45 },
        { color: 'rgba(230, 202, 101, 0.38)', width: 1.5, speedMult: 1.2, yOffset: 0.7 }
      ];

      lineConfigs.forEach((cfg, idx) => {
        ctx.beginPath();
        ctx.lineWidth = cfg.width;
        ctx.strokeStyle = cfg.color;

        const startX = -100;
        const startY = height * (cfg.yOffset + Math.sin(time * cfg.speedMult + idx) * 0.08);

        const cp1x = width * 0.3;
        const cp1y = height * (cfg.yOffset - 0.25 + Math.cos(time * cfg.speedMult * 0.9) * 0.15);

        const cp2x = width * 0.7;
        const cp2y = height * (cfg.yOffset + 0.25 + Math.sin(time * cfg.speedMult * 1.1) * 0.15);

        const endX = width + 100;
        const endY = height * (cfg.yOffset + Math.cos(time * cfg.speedMult + idx) * 0.08);

        ctx.moveTo(startX, startY);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
        ctx.stroke();
      });

      // 4. Traveling Architectural Arcs
      ctx.beginPath();
      const arcCenterX = width * (0.85 + Math.sin(time * 0.4) * 0.1);
      const arcCenterY = height * (0.35 + Math.cos(time * 0.3) * 0.1);
      ctx.arc(arcCenterX, arcCenterY, 320, Math.PI * 0.2, Math.PI * 1.1);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // 5. Minimal Supporting Mote Accents
      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
