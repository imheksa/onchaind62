"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
}

const NODE_COUNT = 55;
const CONNECTION_DIST = 160;
const NODE_COLOR = "139, 92, 246";

export function BlockchainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];

    function resize() {
      canvas!.width = canvas!.offsetWidth || window.innerWidth;
      canvas!.height = canvas!.offsetHeight || window.innerHeight;
    }

    function initParticles() {
      const w = canvas!.width;
      const h = canvas!.height;
      particles = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      }));
    }

    function draw() {
      const w = canvas!.width;
      const h = canvas!.height;
      ctx!.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const glowR = p.radius + Math.sin(p.pulse) * 1.5;
        const alpha = p.opacity + Math.sin(p.pulse) * 0.15;

        const grd = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR * 4);
        grd.addColorStop(0, `rgba(${NODE_COLOR}, ${alpha})`);
        grd.addColorStop(1, `rgba(${NODE_COLOR}, 0)`);
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, glowR * 4, 0, Math.PI * 2);
        ctx!.fillStyle = grd;
        ctx!.fill();

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${NODE_COLOR}, ${Math.min(alpha + 0.3, 1)})`;
        ctx!.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.25;
            ctx!.save();
            ctx!.setLineDash([4, 8]);
            ctx!.lineDashOffset = -(Date.now() / 60);
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(${NODE_COLOR}, ${alpha})`;
            ctx!.lineWidth = 0.8;
            ctx!.stroke();
            ctx!.restore();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    initParticles();
    draw();

    const ro = new ResizeObserver(() => {
      resize();
      initParticles();
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.55 }}
    />
  );
}
