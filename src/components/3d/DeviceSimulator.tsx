import React, { useState, useEffect } from 'react';
import FlutterApp from './FlutterApp';

interface DeviceProps {
  deviceType: 'phone' | 'tablet' | 'desktop';
  codeContent: string;
  isRunning: boolean;
}

const CSS3DDevice: React.FC<DeviceProps> = ({ deviceType, codeContent, isRunning }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let animationId: number;
    
    const animate = () => {
      if (!isHovered) {
        setRotation(prev => ({
          x: Math.sin(Date.now() * 0.001) * 5,
          y: prev.y + 0.5
        }));
      }
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationId);
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateX = (e.clientY - centerY) / 10;
    const rotateY = (e.clientX - centerX) / 10;
    
    setRotation({ x: -rotateX, y: rotateY });
  };

  const getDeviceStyles = () => {
    const baseStyles = {
      transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
      transformStyle: 'preserve-3d' as const,
      transition: isHovered ? 'none' : 'transform 0.1s ease-out',
    };

    switch (deviceType) {
      case 'tablet':
        return {
          ...baseStyles,
          width: '280px',
          height: '400px',
        };
      case 'desktop':
        return {
          ...baseStyles,
          width: '450px',
          height: '300px',
        };
      default: // phone
        return {
          ...baseStyles,
          width: '160px',
          height: '320px',
        };
    }
  };

  const getScreenSize = () => {
    switch (deviceType) {
      case 'tablet':
        return { width: '220px', height: '300px' };
      case 'desktop':
        return { width: '350px', height: '200px' };
      default: // phone
        return { width: '120px', height: '220px' };
    }
  };

  return (
    <div className="w-full h-[500px] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl overflow-hidden relative">
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Device Container */}
      <div
        className="relative cursor-pointer"
        style={getDeviceStyles()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Device Frame */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700">
          {/* Screen Bezel */}
          <div className="absolute inset-2 bg-black rounded-xl overflow-hidden">
            {/* Screen Content */}
            <div 
              className="absolute inset-1 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg overflow-hidden flex items-center justify-center"
              style={{
                width: getScreenSize().width,
                height: getScreenSize().height,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <FlutterApp 
                codeContent={codeContent} 
                isRunning={isRunning} 
                deviceType={deviceType} 
              />
            </div>
          </div>

          {/* Device Details */}
          {deviceType === 'phone' && (
            <>
              {/* Home indicator */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-600 rounded-full" />
              {/* Camera notch */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-2 bg-black rounded-full" />
              {/* Side buttons */}
              <div className="absolute left-0 top-16 w-1 h-8 bg-gray-700 rounded-r" />
              <div className="absolute left-0 top-28 w-1 h-6 bg-gray-700 rounded-r" />
            </>
          )}

          {deviceType === 'desktop' && (
            <>
              {/* Monitor stand */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-gray-800 rounded-t-lg" />
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-gray-900 rounded-lg" />
              {/* Brand logo */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
                Flutter Display
              </div>
            </>
          )}
        </div>

        {/* Glow effect */}
        <div 
          className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
            isHovered ? 'opacity-60' : 'opacity-30'
          }`}
          style={{
            background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
            zIndex: -1,
          }}
        />

        {/* Running animation overlay */}
        {isRunning && (
          <div className="absolute inset-0 bg-blue-500/10 rounded-2xl animate-pulse">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm bg-blue-600/80 px-3 py-1 rounded-full">
              Compiling...
            </div>
          </div>
        )}
      </div>

      {/* Control hints */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-xs text-center">
        <div>🖱️ Hover and move mouse to rotate</div>
        <div>✨ Auto-rotation when not interacting</div>
      </div>
    </div>
  );
};

const DeviceSimulator: React.FC<DeviceProps> = (props) => {
  return <CSS3DDevice {...props} />;
};

export default DeviceSimulator;