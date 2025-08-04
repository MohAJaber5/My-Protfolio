import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import HALO from 'vanta/dist/vanta.halo.min';
import { useTheme, colorSchemes } from '@/contexts/ThemeContext';

const AnimatedBackground = () => {
  const { theme, colorScheme } = useTheme();
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  // Convert HSL to HEX for Vanta.js
  const hslToHex = (h: number, s: number, l: number) => {
    const sNorm = s / 100;
    const lNorm = l / 100;
    const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = lNorm - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return (r << 16) | (g << 8) | b;
  };

  const currentColors = colorSchemes[colorScheme];
  const primaryColor = hslToHex(currentColors.primary.h, currentColors.primary.s, currentColors.primary.l);
  const secondaryColor = hslToHex(currentColors.secondary.h, currentColors.secondary.s, currentColors.secondary.l);

  useEffect(() => {
    if (!vantaEffect.current && vantaRef.current) {
      vantaEffect.current = HALO({
        el: vantaRef.current,
        THREE: THREE,
        amplitudeFactor: 1,
        backgroundAlpha: theme === 'dark' ? 0.1 : 0.3,
        backgroundColor: theme === 'dark' ? 0x000000 : 0xffffff,
        baseColor: primaryColor,
        color2: secondaryColor,
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

  // Update background color and colors when theme or color scheme changes
  useEffect(() => {
    if (vantaEffect.current) {
      vantaEffect.current.setOptions({
        backgroundColor: theme === 'dark' ? 0x000000 : 0xffffff,
        backgroundAlpha: theme === 'dark' ? 0.1 : 0.3,
        baseColor: primaryColor,
        color2: secondaryColor
      });
    }
  }, [theme, primaryColor, secondaryColor]);

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
      className="fixed top-0 left-0 w-full h-full -z-10 transition-colors duration-300"
      style={{ 
        background: theme === 'dark' 
          ? 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 30%, #e2e8f0 70%, #cbd5e1 100%)'
      }}
    />
  );
};

export default AnimatedBackground;