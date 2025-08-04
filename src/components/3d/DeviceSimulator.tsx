import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Html } from '@react-three/drei';
import * as THREE from 'three';
import FlutterApp from './FlutterApp';

interface DeviceProps {
  deviceType: 'phone' | 'tablet' | 'desktop';
  codeContent: string;
  isRunning: boolean;
}

const SimplePhoneDevice: React.FC<{ codeContent: string; isRunning: boolean }> = ({ codeContent, isRunning }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Phone Frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.6, 3.2, 0.15]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[1.4, 2.8, 0.02]} />
        <meshStandardMaterial color="#000000" emissive="#001122" />
      </mesh>

      {/* App Content */}
      <mesh position={[0, 0, 0.09]}>
        <boxGeometry args={[1.3, 2.6, 0.01]} />
        <meshStandardMaterial color="#4285f4" emissive="#4285f4" emissiveIntensity={0.2} />
      </mesh>

      {/* Flutter App */}
      <Html
        transform
        position={[0, 0, 0.1]}
        scale={0.15}
      >
        <FlutterApp codeContent={codeContent} isRunning={isRunning} deviceType="phone" />
      </Html>
    </group>
  );
};

const SimpleTabletDevice: React.FC<{ codeContent: string; isRunning: boolean }> = ({ codeContent, isRunning }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Tablet Frame */}
      <mesh>
        <boxGeometry args={[2.8, 4, 0.12]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0, 0.07]}>
        <boxGeometry args={[2.6, 3.7, 0.01]} />
        <meshStandardMaterial color="#4285f4" emissive="#4285f4" emissiveIntensity={0.1} />
      </mesh>

      {/* Flutter App */}
      <Html
        transform
        position={[0, 0, 0.08]}
        scale={0.25}
      >
        <FlutterApp codeContent={codeContent} isRunning={isRunning} deviceType="tablet" />
      </Html>
    </group>
  );
};

const SimpleDesktopDevice: React.FC<{ codeContent: string; isRunning: boolean }> = ({ codeContent, isRunning }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Monitor Stand */}
      <mesh position={[0, -2.2, 0]}>
        <cylinderGeometry args={[0.3, 0.5, 0.3, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Monitor Frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4.5, 3, 0.15]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[4.2, 2.7, 0.01]} />
        <meshStandardMaterial color="#4285f4" emissive="#4285f4" emissiveIntensity={0.1} />
      </mesh>

      {/* Flutter App */}
      <Html
        transform
        position={[0, 0, 0.09]}
        scale={0.4}
      >
        <FlutterApp codeContent={codeContent} isRunning={isRunning} deviceType="desktop" />
      </Html>
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
  console.log('DeviceSimulator rendering with:', { deviceType, isRunning });

  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          gl={{ antialias: true }}
          dpr={[1, 2]}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
          
          {/* Simple Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} />
          
          {/* Devices */}
          {deviceType === 'phone' && <SimplePhoneDevice codeContent={codeContent} isRunning={isRunning} />}
          {deviceType === 'tablet' && <SimpleTabletDevice codeContent={codeContent} isRunning={isRunning} />}
          {deviceType === 'desktop' && <SimpleDesktopDevice codeContent={codeContent} isRunning={isRunning} />}
          
          {/* Simple Controls */}
          <OrbitControls 
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minDistance={4}
            maxDistance={12}
          />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default DeviceSimulator;