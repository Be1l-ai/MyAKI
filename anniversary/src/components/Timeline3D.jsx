import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function Card3D({ memory, offsetIndex, isActive, onClick }) {
  const groupRef = useRef();
  const materialRef = useRef();
  const [texture, setTexture] = useState(null);
  const [aspect, setAspect] = useState(1);

  useEffect(() => {
    if (!memory?.image) return;
    const loader = new THREE.TextureLoader();
    loader.load(
      memory.image,
      (loaded) => {
        try { loaded.encoding = THREE.sRGBEncoding; } catch (e) {}
        loaded.wrapS = THREE.ClampToEdgeWrapping;
        loaded.wrapT = THREE.ClampToEdgeWrapping;
        loaded.generateMipmaps = true;
        loaded.minFilter = THREE.LinearMipMapLinearFilter;
        if (loaded.image && loaded.image.width && loaded.image.height) {
          setAspect(loaded.image.width / loaded.image.height);
        }
        loaded.needsUpdate = true;
        setTexture(loaded);
      },
      undefined,
      (err) => console.error('Texture load error', err)
    );
  }, [memory?.image]);

  useFrame(() => {
    if (!groupRef.current) return;
    const targetX = offsetIndex * 2.6;
    const targetZ = -Math.abs(offsetIndex) * 1.4 - 1.5;
    const targetRotY = offsetIndex * 0.25;
    const targetScale = isActive ? 1.25 : Math.max(0.75, 1 - Math.abs(offsetIndex) * 0.12);

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.08);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.08);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.08);
    const s = THREE.MathUtils.lerp(groupRef.current.scale.x || 1, targetScale, 0.08);
    groupRef.current.scale.setScalar(s);
    groupRef.current.position.y = Math.sin((performance.now() / 1000) + offsetIndex) * 0.06;
  });

  const maxWidth = 1.6;
  const maxHeight = 2.2;
  let photoW = maxWidth;
  let photoH = photoW / Math.max(aspect, 0.0001);
  if (photoH > maxHeight) {
    photoH = maxHeight;
    photoW = photoH * aspect;
  }

  return (
    <group ref={groupRef} onClick={onClick}>
      <RoundedBox args={[1.8, 2.4, 0.08]} radius={0.06} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial ref={materialRef} color={'#e6e6e6'} roughness={0.6} metalness={0.08} />
      </RoundedBox>

      {texture && (
        <mesh position={[0, 0, 0.051]}>
          <planeGeometry args={[photoW, photoH]} />
          <meshStandardMaterial map={texture} toneMapped={true} transparent={false} />
        </mesh>
      )}
    </group>
  );
}

function BackgroundParticles({ count = 300 }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      arr[i3 + 0] = (Math.random() - 0.5) * 40;
      arr[i3 + 1] = (Math.random() - 0.5) * 8;
      arr[i3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, [count]);

  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#d4af37" transparent opacity={0.55} />
    </points>
  );
}

function Scene({ memories, activeIndex, setActiveIndex }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={55} />
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

export default function Timeline3D({ memories = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleWheel = (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (isScrolling) return;
      e.stopPropagation();

      if (e.deltaX > 0 && activeIndex < memories.length - 1) {
        setActiveIndex((s) => Math.min(s + 1, memories.length - 1));
        setIsScrolling(true);
        setTimeout(() => setIsScrolling(false), 300);
      } else if (e.deltaX < 0 && activeIndex > 0) {
        setActiveIndex((s) => Math.max(s - 1, 0));
        setIsScrolling(true);
        setTimeout(() => setIsScrolling(false), 300);
      }
    }
  };

  const handleNext = () => setActiveIndex((s) => Math.min(s + 1, memories.length - 1));
  const handlePrev = () => setActiveIndex((s) => Math.max(s - 1, 0));

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full h-screen relative" onWheel={handleWheel}>
      <div className="h-full flex">
        {/* Left details panel for md+; hidden on small screens */}
        <div className="hidden md:block md:w-1/3 lg:w-1/4 p-6">
          <div className="sticky top-8">
            <div className="bg-theme-black/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border-2 border-theme-gold/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-theme-gold animate-pulse"></div>
                <h3 className="text-2xl font-romantic font-bold text-theme-gold">{memories[activeIndex]?.title}</h3>
              </div>
              <p className="text-gray-400 mb-3 font-modern text-sm">
                {memories[activeIndex]?.date ? new Date(memories[activeIndex].date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}
              </p>
              <p className="text-gray-300 font-modern leading-relaxed mb-4">{memories[activeIndex]?.description}</p>
              {memories[activeIndex]?.gif && (
                <img src={memories[activeIndex].gif} alt="memory animation" className="mt-2 rounded-xl w-full h-40 object-contain bg-theme-gray/30 shadow-lg" />
              )}
            </div>
          </div>
        </div>

        {/* Right: Canvas and controls */}
        <div className="relative flex-1">
          <Canvas shadows>
            <Scene memories={memories} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
          </Canvas>

          {/* Navigation Arrows (inside right pane) */}
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

          {/* Navigation hint */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-white text-center pointer-events-none">
            <p className="font-modern text-xs md:text-sm bg-black/40 px-4 py-2 rounded-full backdrop-blur-md shadow-lg">
              Memories {activeIndex + 1} of {memories.length}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom overlay for small screens only */}
      <div className="md:hidden absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-md mx-4 pointer-events-none">
        <div className="bg-theme-black/95 backdrop-blur-md rounded-2xl p-6 w-full shadow-2xl border-2 border-theme-gold/50 pointer-events-auto">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-theme-gold animate-pulse"></div>
            <h3 className="text-2xl font-romantic font-bold text-theme-gold">{memories[activeIndex]?.title}</h3>
          </div>
          <p className="text-gray-400 mb-3 font-modern text-sm">
            📅 {memories[activeIndex]?.date ? new Date(memories[activeIndex].date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}
          </p>
          <p className="text-gray-300 font-modern leading-relaxed">{memories[activeIndex]?.description}</p>
          {memories[activeIndex]?.gif && (
            <img src={memories[activeIndex].gif} alt="memory animation" className="mt-4 rounded-xl w-full h-32 object-contain bg-theme-gray/30 shadow-lg" />
          )}
        </div>
      </div>
    </div>
  );
}
