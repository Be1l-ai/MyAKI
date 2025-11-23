import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function Polaroid3D({ image, position, rotation = [0, 0, 0] }) {
  const groupRef = useRef();
  const [texture, setTexture] = useState(null);

  // Load texture
  useEffect(() => {
    if (image) {
      const loader = new THREE.TextureLoader();
      loader.load(
        image,
        (loadedTexture) => {
          setTexture(loadedTexture);
        },
        undefined,
        (error) => {
          console.error('Error loading polaroid texture:', error);
        }
      );
    }
  }, [image]);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.15;
      groupRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Polaroid frame - black with gold border */}
      <mesh position={[0, 0, -0.01]}>
        <boxGeometry args={[2.2, 2.6, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.4} />
      </mesh>
      
      {/* Gold border */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.3, 2.7, 0.04]} />
        <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.8} />
      </mesh>
      
      {/* Photo area with image texture */}
      <mesh position={[0, 0.15, 0.03]}>
        <boxGeometry args={[1.9, 1.9, 0.06]} />
        <meshStandardMaterial 
          map={texture}
          color={texture ? '#ffffff' : '#2d2d2d'} 
          roughness={0.5} 
        />
      </mesh>
      
      {/* Bottom text area */}
      <mesh position={[0, -0.85, 0.03]}>
        <boxGeometry args={[1.9, 0.6, 0.06]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.4} />
      </mesh>
    </group>
  );
}

function FloatingGif({ position, scale = 1 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.7 + position[0]) * 0.2;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial 
        color="#d4af37" 
        emissive="#f4d03f"
        emissiveIntensity={0.4}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

function BackgroundSpheres() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[0.3, 32, 32]} position={[-8, 3, -8]}>
        <meshStandardMaterial color="#d4af37" emissive="#f4d03f" emissiveIntensity={0.5} transparent opacity={0.6} />
      </Sphere>
      <Sphere args={[0.4, 32, 32]} position={[8, -2, -10]}>
        <meshStandardMaterial color="#b8942c" emissive="#d4af37" emissiveIntensity={0.4} transparent opacity={0.5} />
      </Sphere>
      <Sphere args={[0.25, 32, 32]} position={[-6, -4, -6]}>
        <meshStandardMaterial color="#f4d03f" emissive="#d4af37" emissiveIntensity={0.6} transparent opacity={0.7} />
      </Sphere>
      <Sphere args={[0.35, 32, 32]} position={[7, 4, -7]}>
        <meshStandardMaterial color="#d4af37" emissive="#b8942c" emissiveIntensity={0.5} transparent opacity={0.6} />
      </Sphere>
    </group>
  );
}

export default function FutureScene({ futureMemories }) {
  return (
    <div className="w-full h-screen relative">
      <Canvas>
        <color attach="background" args={['#1a0a2e']} />
        <fog attach="fog" args={['#1a0a2e', 5, 20]} />
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, 5]} intensity={0.5} />
        <spotLight position={[0, 5, 3]} angle={0.3} penumbra={1} intensity={0.8} />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <BackgroundSpheres />
        
        {/* Main polaroids */}
        <Polaroid3D 
          image={futureMemories[0]?.image} 
          position={[-2.5, 0, 0]} 
          rotation={[0, 0.3, -0.1]}
        />
        <Polaroid3D 
          image={futureMemories[1]?.image} 
          position={[0, 0, 0.5]} 
          rotation={[0, 0, 0]}
        />
        <Polaroid3D 
          image={futureMemories[2]?.image} 
          position={[2.5, 0, 0]} 
          rotation={[0, -0.3, 0.1]}
        />
        
        {/* Floating GIF placeholders */}
        <FloatingGif position={[-3.5, 1.5, -1]} scale={0.8} />
        <FloatingGif position={[3.5, -1, -1]} scale={0.6} />
        <FloatingGif position={[-1.5, -1.8, -0.5]} scale={0.7} />
        <FloatingGif position={[1.8, 2, -0.5]} scale={0.5} />
        
        <OrbitControls 
          enableZoom={true}
          minDistance={4}
          maxDistance={10}
          enablePan={true}
          panSpeed={0.5}
          rotateSpeed={0.5}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
      
      {/* Overlay text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <h2 className="text-6xl font-romantic font-bold text-theme-gold text-center drop-shadow-2xl">
          Our Future
        </h2>
        <p className="text-xl font-modern text-gray-300 text-center mt-4 drop-shadow-lg">
          Together, forever
        </p>
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center">
        <p className="font-modern text-sm bg-theme-black/60 border border-theme-gold/30 px-4 py-2 rounded-full backdrop-blur-md shadow-lg">
          Drag to rotate • Right-click to pan • Scroll to zoom
        </p>
      </div>
    </div>
  );
}
