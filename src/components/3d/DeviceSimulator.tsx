import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface DeviceProps {
  deviceType: 'phone' | 'tablet' | 'desktop';
  codeContent: string;
  isRunning: boolean;
}

const MinimalDevice: React.FC<{ deviceType: string }> = ({ deviceType }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  // Device dimensions
  const getDeviceSize = () => {
    switch (deviceType) {
      case 'tablet':
        return [2.5, 3.5, 0.2];
      case 'desktop':
        return [4, 3, 0.2];
      default: // phone
        return [1.5, 3, 0.2];
    }
  };

  const [width, height, depth] = getDeviceSize();

  return (
    <group>
      {/* Device Frame */}
      <mesh ref={meshRef}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0, depth / 2 + 0.01]}>
        <boxGeometry args={[width * 0.9, height * 0.8, 0.01]} />
        <meshStandardMaterial 
          color="#4285f4" 
          emissive="#2563eb" 
          emissiveIntensity={0.2} 
        />
      </mesh>

      {/* Screen Content Simulation */}
      <mesh position={[0, 0, depth / 2 + 0.02]}>
        <boxGeometry args={[width * 0.8, height * 0.7, 0.01]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#f8fafc" 
          emissiveIntensity={0.1} 
        />
      </mesh>
    </group>
  );
};

const LoadingFallback: React.FC = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl">
    <div className="text-white text-center">
      <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-3"></div>
      <div className="text-sm">Loading 3D Scene...</div>
    </div>
  </div>
);

const DeviceSimulator: React.FC<DeviceProps> = ({ deviceType, codeContent, isRunning }) => {
  console.log('DeviceSimulator rendering - minimal version');

  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          {/* Basic Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          
          {/* Minimal Device */}
          <MinimalDevice deviceType={deviceType} />
          
          {/* Basic Controls */}
          <OrbitControls 
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
          />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default DeviceSimulator;