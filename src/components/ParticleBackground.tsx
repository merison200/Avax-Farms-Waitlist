// import { useEffect, useRef } from 'react';

// interface Particle {
//   x: number;
//   y: number;
//   vx: number;
//   vy: number;
//   size: number;
// }

// export default function ParticleBackground() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     const setCanvasSize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };
//     setCanvasSize();

//     const particles: Particle[] = [];
//     const particleCount = 50;

//     for (let i = 0; i < particleCount; i++) {
//       particles.push({
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         vx: (Math.random() - 0.5) * 0.3,
//         vy: (Math.random() - 0.5) * 0.3,
//         size: Math.random() * 2 + 1,
//       });
//     }

//     const animate = () => {
//       ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       particles.forEach((particle) => {
//         particle.x += particle.vx;
//         particle.y += particle.vy;

//         if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
//         if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

//         ctx.beginPath();
//         ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
//         ctx.fillStyle = 'rgba(34, 197, 94, 0.3)';
//         ctx.fill();
//       });

//       particles.forEach((p1, i) => {
//         particles.slice(i + 1).forEach((p2) => {
//           const dx = p1.x - p2.x;
//           const dy = p1.y - p2.y;
//           const distance = Math.sqrt(dx * dx + dy * dy);

//           if (distance < 120) {
//             ctx.beginPath();
//             ctx.strokeStyle = `rgba(34, 197, 94, ${0.15 * (1 - distance / 120)})`;
//             ctx.lineWidth = 0.5;
//             ctx.moveTo(p1.x, p1.y);
//             ctx.lineTo(p2.x, p2.y);
//             ctx.stroke();
//           }
//         });
//       });

//       requestAnimationFrame(animate);
//     };

//     animate();

//     window.addEventListener('resize', setCanvasSize);
//     return () => window.removeEventListener('resize', setCanvasSize);
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="fixed inset-0 w-full h-full pointer-events-none"
//       style={{ background: '#000000' }}
//     />
//   );
// }





import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // pixel ratio for crispness on high-DPI screens
    const setCanvasSize = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setCanvasSize();

    const particles: Particle[] = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
      });
    }

    let lastTimestamp = performance.now();

    const animate = (timestamp: number) => {
      const dt = Math.min(50, timestamp - lastTimestamp);
      lastTimestamp = timestamp;

      // slight fade for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // draw particles
      particles.forEach((particle) => {
        particle.x += particle.vx * (dt / 16.67);
        particle.y += particle.vy * (dt / 16.67);

        if (particle.x < 0) particle.x = 0;
        if (particle.y < 0) particle.y = 0;
        if (particle.x > window.innerWidth) particle.x = window.innerWidth;
        if (particle.y > window.innerHeight) particle.y = window.innerHeight;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34, 197, 94, 0.28)';
        ctx.fill();
      });

      // draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(34, 197, 94, ${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.4;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    // debounce resize to avoid excessive layout thrash
    let resizeTimer: number | null = null;
    const onResize = () => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        setCanvasSize();
        // reposition particles so none are out of bounds
        particles.forEach((p) => {
          p.x = Math.min(p.x, window.innerWidth);
          p.y = Math.min(p.y, window.innerHeight);
        });
      }, 120);
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ background: '#000000' }}
      aria-hidden="true"
    />
  );
}
