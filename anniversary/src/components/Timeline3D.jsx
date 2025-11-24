import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { RoundedBox, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function Card3D({ memory, offsetIndex, isActive, onClick }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [texture, setTexture] = useState(null);
  const materialRef = useRef();

  // Load texture
  useEffect(() => {
    if (memory.image) {
      const loader = new THREE.TextureLoader();
      loader.load(
        memory.image,
        (loadedTexture) => {
          loadedTexture.wrapS = THREE.ClampToEdgeWrapping;
          loadedTexture.wrapT = THREE.ClampToEdgeWrapping;
          loadedTexture.minFilter = THREE.LinearFilter;
          loadedTexture.needsUpdate = true;
          setTexture(loadedTexture);
        },
        undefined,
        (error) => {
          console.error('Error loading texture:', error);
        }
      );
    }
  }, [memory.image]);

  // Force material update when texture loads
  useEffect(() => {
    if (materialRef.current && texture) {
      materialRef.current.map = texture;
      materialRef.current.needsUpdate = true;
    }
  }, [texture]);

  useFrame((state) => {
    if (groupRef.current) {
      // Calculate target position and rotation based on offset
      const targetX = offsetIndex * 2.5;
      const targetZ = -Math.abs(offsetIndex) * 1.5;
      const targetRotY = offsetIndex * 0.3;
      const targetScale = isActive ? 1.3 : Math.max(0.7, 1 - Math.abs(offsetIndex) * 0.15);
      
      // Smooth transitions
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.1);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.1);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.1);
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1));
      
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5 + offsetIndex) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <group
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Card base with depth */}
        <RoundedBox args={[2, 2.8, 0.15]} radius={0.05} smoothness={4}>
          <meshStandardMaterial
            color={memory.color || '#ff9999'}
            emissive={isActive ? memory.color : '#000000'}
            emissiveIntensity={isActive ? 0.4 : 0}
            roughness={0.2}
            metalness={0.3}
          />
        </RoundedBox>
        
        {/* Card border/frame */}
        <RoundedBox args={[2.1, 2.9, 0.16]} radius={0.06} smoothness={4} position={[0, 0, -0.001]}>
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.3}
            metalness={0.1}
            opacity={0.3}
            transparent
          />
        </RoundedBox>

        {/* Inner photo area with image texture */}
        <RoundedBox args={[1.7, 1.7, 0.17]} radius={0.04} smoothness={4} position={[0, 0.3, 0.08]}>
          <meshStandardMaterial
            ref={materialRef}
            map={texture}
            color={texture ? '#ffffff' : '#2d2d2d'}
            roughness={0.1}
            metalness={0.05}
          />
        </RoundedBox>
      </group>
    </group>
  );
}

function BackgroundParticles() {
  const particlesRef = useRef();
  const particleCount = 100;
  
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#d4af37" transparent opacity={0.6} />
    </points>
  );
}

function Scene({ memories, activeIndex, setActiveIndex }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={60} />
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-5, 3, -5]} intensity={0.5} color="#ff9999" />
      <spotLight position={[0, 5, 3]} angle={0.5} penumbra={1} intensity={0.8} />
      
      <BackgroundParticles />
      
      {memories.map((memory, index) => {
        const offsetIndex = index - activeIndex;
        return (
          <Card3D
            key={memory.id}
            memory={memory}
            offsetIndex={offsetIndex}
            isActive={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          />
        );
      })}
    </>
  );
}

export default function Timeline3D({ memories }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleWheel = (e) => {
    // Only handle horizontal scrolling for card navigation
    // Allow vertical scrolling to pass through for page scrolling
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      // Horizontal scroll - navigate cards
      if (isScrolling) return;
      e.stopPropagation();
      
      if (e.deltaX > 0 && activeIndex < memories.length - 1) {
        setActiveIndex(activeIndex + 1);
        setIsScrolling(true);
        setTimeout(() => setIsScrolling(false), 300);
      } else if (e.deltaX < 0 && activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
        setIsScrolling(true);
        setTimeout(() => setIsScrolling(false), 300);
      }
    }
    // Vertical scroll is not prevented, allowing page scrolling
  };

  const handleNext = () => {
    if (activeIndex < memories.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  return (
    <div className="w-full h-screen relative" onWheel={handleWheel}>
      <Canvas shadows>
        <Scene 
          memories={memories} 
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </Canvas>
      
      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        disabled={activeIndex === 0}
        className={`absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 bg-gradient-to-br from-love-pink to-love-rose hover:from-love-rose hover:to-love-pink rounded-full p-3 md:p-4 shadow-2xl transition-all z-10 ${
          activeIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-90 hover:scale-110'
        }`}
      >
        <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        disabled={activeIndex === memories.length - 1}
        className={`absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 bg-gradient-to-br from-love-pink to-love-rose hover:from-love-rose hover:to-love-pink rounded-full p-3 md:p-4 shadow-2xl transition-all z-10 ${
          activeIndex === memories.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-90 hover:scale-110'
        }`}
      >
        <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Card details overlay */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-theme-black/95 backdrop-blur-md rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl border-2 border-theme-gold/50 pointer-events-auto">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-theme-gold animate-pulse"></div>
          <h3 className="text-2xl font-romantic font-bold text-theme-gold">
            {memories[activeIndex]?.title}
          </h3>
        </div>
        <p className="text-gray-400 mb-3 font-modern text-sm">
          📅 {new Date(memories[activeIndex]?.date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </p>
        <p className="text-gray-300 font-modern leading-relaxed">
          {memories[activeIndex]?.description}
        </p>
        {memories[activeIndex]?.gif && (
          <img 
            src={memories[activeIndex].gif} 
            alt="memory animation" 
            className="mt-4 rounded-xl w-full h-32 object-contain bg-theme-gray/30 shadow-lg"
          />
        )}
      </div>

      {/* Navigation hint */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-white text-center pointer-events-none">
        <p className="font-modern text-xs md:text-sm bg-black/40 px-4 py-2 rounded-full backdrop-blur-md shadow-lg">
          Memories {activeIndex + 1} of {memories.length}
        </p>
      </div>
    </div>
  );
}
