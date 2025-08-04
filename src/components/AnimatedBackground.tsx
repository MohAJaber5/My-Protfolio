import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import HALO from 'vanta/dist/vanta.halo.min';

const AnimatedBackground = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    if (!vantaEffect.current && vantaRef.current) {
      vantaEffect.current = HALO({
        el: vantaRef.current,
        THREE: THREE,
        amplitudeFactor: 1,
        backgroundAlpha: 1,
        backgroundColor: 0x000000,
        baseColor: 0x6745,
        color2: 0xf2f901,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        mouseControls: true,
        mouseEase: true,
        ringFactor: 1,
        rotationFactor: 1,
        scale: 1.00,
        scaleMobile: 1.00,
        size: 1.00,
        speed: 1.00,
        touchControls: true,
        xOffset: 0,
        yOffset: 0
      });
    }
    
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (vantaEffect.current) {
        vantaEffect.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      ref={vantaRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ 
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)'
      }}
    />
  );
};

export default AnimatedBackground;