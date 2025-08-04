import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  PerspectiveCamera,
  Text,
  Html,
  ContactShadows
} from '@react-three/drei';
import * as THREE from 'three';
import FlutterApp from './FlutterApp';

interface DeviceProps {
  deviceType: 'phone' | 'tablet' | 'desktop';
  codeContent: string;
  isRunning: boolean;
}

const PhoneDevice: React.FC<{ codeContent: string; isRunning: boolean }> = ({ codeContent, isRunning }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current && !hovered) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group 
      ref={groupRef} 
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Phone Frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.6, 3.2, 0.15]} />
        <meshPhysicalMaterial
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Screen Bezel */}
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[1.45, 2.9, 0.02]} />
        <meshPhysicalMaterial
          color="#000000"
          metalness={0.1}
          roughness={0.1}
          emissive="#001122"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Screen Content */}
      <mesh position={[0, 0, 0.09]}>
        <boxGeometry args={[1.35, 2.7, 0.01]} />
        <meshPhysicalMaterial
          color="#ffffff"
          emissive="#4285f4"
          emissiveIntensity={0.3}
          metalness={0}
          roughness={0.1}
        />
      </mesh>

      {/* Flutter App Simulation */}
      <Html
        transform
        occlude
        position={[0, 0, 0.1]}
        scale={[0.15, 0.15, 0.15]}
        rotation={[0, 0, 0]}
      >
        <FlutterApp codeContent={codeContent} isRunning={isRunning} deviceType="phone" />
      </Html>

      {/* Home Indicator */}
      <mesh position={[0, -1.3, 0.08]}>
        <boxGeometry args={[0.25, 0.05, 0.01]} />
        <meshPhysicalMaterial
          color="#333333"
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Camera Notch */}
      <mesh position={[0, 1.2, 0.08]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshPhysicalMaterial
          color="#000000"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Side Buttons */}
      <mesh position={[-0.85, 0.5, 0]}>
        <boxGeometry args={[0.05, 0.3, 0.08]} />
        <meshPhysicalMaterial
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      <mesh position={[-0.85, 0, 0]}>
        <boxGeometry args={[0.05, 0.15, 0.08]} />
        <meshPhysicalMaterial
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
};

const TabletDevice: React.FC<{ codeContent: string; isRunning: boolean }> = ({ codeContent, isRunning }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Tablet Frame */}
      <mesh>
        <boxGeometry args={[2.8, 4, 0.12]} />
        <meshPhysicalMaterial
          color="#2a2a2a"
          metalness={0.7}
          roughness={0.3}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0, 0.07]}>
        <boxGeometry args={[2.6, 3.7, 0.01]} />
        <meshPhysicalMaterial
          color="#ffffff"
          emissive="#4285f4"
          emissiveIntensity={0.2}
          metalness={0}
          roughness={0.1}
        />
      </mesh>

      {/* Flutter App */}
      <Html
        transform
        occlude
        position={[0, 0, 0.08]}
        scale={[0.25, 0.25, 0.25]}
      >
        <FlutterApp codeContent={codeContent} isRunning={isRunning} deviceType="tablet" />
      </Html>
    </group>
  );
};

const DesktopDevice: React.FC<{ codeContent: string; isRunning: boolean }> = ({ codeContent, isRunning }) => {
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
        <meshPhysicalMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Monitor Arm */}
      <mesh position={[0, -1.3, 0]}>
        <boxGeometry args={[0.1, 1.5, 0.1]} />
        <meshPhysicalMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Monitor Frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4.5, 3, 0.15]} />
        <meshPhysicalMaterial
          color="#0a0a0a"
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[4.2, 2.7, 0.01]} />
        <meshPhysicalMaterial
          color="#ffffff"
          emissive="#4285f4"
          emissiveIntensity={0.15}
          metalness={0}
          roughness={0.1}
        />
      </mesh>

      {/* Flutter App */}
      <Html
        transform
        occlude
        position={[0, 0, 0.09]}
        scale={[0.4, 0.4, 0.4]}
      >
        <FlutterApp codeContent={codeContent} isRunning={isRunning} deviceType="desktop" />
      </Html>

      {/* Logo/Brand */}
      <Text
        position={[0, -1.3, 0.08]}
        fontSize={0.1}
        color="#666666"
        anchorX="center"
        anchorY="middle"
      >
        Flutter Display
      </Text>
    </group>
  );
};

const FloatingElements: React.FC = () => {
  const elementsRef = useRef<THREE.Group[]>([]);

  useFrame((state) => {
    elementsRef.current.forEach((element, index) => {
      if (element) {
        element.rotation.x += 0.01;
        element.rotation.y += 0.01;
        element.position.y += Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.002;
        element.position.x += Math.cos(state.clock.elapsedTime * 0.3 + index) * 0.001;
      }
    });
  });

  return (
    <>
      {[...Array(6)].map((_, index) => (
        <group
          key={index}
          ref={(el) => {
            if (el) elementsRef.current[index] = el;
          }}
          position={[
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 4
          ]}
        >
          <mesh>
            <icosahedronGeometry args={[0.1, 0]} />
            <meshPhysicalMaterial
              color={index % 2 === 0 ? "#02569b" : "#54c5f8"}
              emissive={index % 2 === 0 ? "#001a33" : "#002244"}
              emissiveIntensity={0.3}
              metalness={0.8}
              roughness={0.2}
              transparent
              opacity={0.8}
            />
          </mesh>
        </group>
      ))}
    </>
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
  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          shadows
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
          }}
          dpr={[1, 2]}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
          
          {/* Lighting Setup */}
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#02569b" />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#54c5f8" />
          
          {/* Environment */}
          <Environment preset="city" background={false} />
          
          {/* Devices */}
          {deviceType === 'phone' && <PhoneDevice codeContent={codeContent} isRunning={isRunning} />}
          {deviceType === 'tablet' && <TabletDevice codeContent={codeContent} isRunning={isRunning} />}
          {deviceType === 'desktop' && <DesktopDevice codeContent={codeContent} isRunning={isRunning} />}
          
          {/* Floating Elements */}
          <FloatingElements />
          
          {/* Ground Shadow */}
          <ContactShadows 
            position={[0, -3, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2} 
            far={4} 
          />
          
          {/* Controls */}
          <OrbitControls 
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minDistance={4}
            maxDistance={12}
            maxPolarAngle={Math.PI / 1.8}
            autoRotate={!isRunning}
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default DeviceSimulator;