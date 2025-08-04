import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  previousZ: number;
}

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initStars = () => {
      const numStars = 800;
      starsRef.current = [];
      
      for (let i = 0; i < numStars; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width - canvas.width / 2,
          y: Math.random() * canvas.height - canvas.height / 2,
          z: Math.random() * 1000,
          previousZ: Math.random() * 1000
        });
      }
    };

    const moveStars = (distance: number) => {
      starsRef.current.forEach(star => {
        star.previousZ = star.z;
        star.z += distance;
        
        if (star.z <= 0) {
          star.x = Math.random() * canvas.width - canvas.width / 2;
          star.y = Math.random() * canvas.height - canvas.height / 2;
          star.previousZ = star.z = 1000;
        }
      });
    };

    const drawStars = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.translate(canvas.width / 2, canvas.height / 2);
      
      starsRef.current.forEach(star => {
        const k = 128;
        const px = star.x / star.previousZ * k;
        const py = star.y / star.previousZ * k;
        const x = star.x / star.z * k;
        const y = star.y / star.z * k;
        
        const opacity = (1000 - star.z) / 1000;
        const radius = (1000 - star.z) / 1000 * 2;
        
        ctx.lineWidth = radius;
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.stroke();
      });
      
      ctx.resetTransform();
    };

    const animate = () => {
      moveStars(5);
      drawStars();
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initStars();
    animate();

    const handleResize = () => {
      resizeCanvas();
      initStars();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)' }}
    />
  );
};

export default AnimatedBackground;