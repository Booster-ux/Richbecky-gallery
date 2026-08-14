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

    // High-visibility glowing champagne gold particles
    const particleCount = Math.min(Math.floor((width * height) / 18000), 50);
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
        radius: Math.random() * 2.8 + 2.0, // Clearly visible 2.0px - 4.8px motes
        alpha: Math.random() * 0.35 + 0.30, // High contrast opacity 0.30 - 0.65
        targetAlpha: Math.random() * 0.40 + 0.35,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -Math.abs((Math.random() * 0.4 + 0.3)), // Continuous upward float like gold dust in gallery sunlight
        pulseSpeed: Math.random() * 0.008 + 0.003
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (!prefersReducedMotion) {
        time += 0.008;
      }

      // 1. Visible sweeping champagne light beam
      const lightX = width * (0.55 + Math.sin(time * 0.8) * 0.25);
      const lightY = height * (0.4 + Math.cos(time * 0.6) * 0.18);

      const glowGradient = ctx.createRadialGradient(
        lightX,
        lightY,
        30,
        lightX,
        lightY,
        Math.max(width, height) * 0.7
      );
      glowGradient.addColorStop(0, 'rgba(212, 175, 55, 0.22)');
      glowGradient.addColorStop(0.5, 'rgba(212, 175, 55, 0.08)');
      glowGradient.addColorStop(1, 'rgba(212, 175, 55, 0)');

      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Animated undulating fine gold arcs/lines
      ctx.lineWidth = 1.2;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const offsetY = (i + 1) * (height / 4);
        ctx.moveTo(0, offsetY);

        for (let x = 0; x <= width; x += 30) {
          const waveY = offsetY + Math.sin(time + x * 0.005 + i) * 25;
          ctx.lineTo(x, waveY);
        }

        ctx.strokeStyle = `rgba(212, 175, 55, ${0.18 + i * 0.05})`;
        ctx.stroke();
      }

      // 3. Render continuously moving gold light particles
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
          if (p.alpha > 0.75 || p.alpha < 0.25) {
            p.pulseSpeed = -p.pulseSpeed;
          }
        }

        const color = goldColors[idx % goldColors.length];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.65)';
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
