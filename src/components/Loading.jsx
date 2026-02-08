import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// Custom Galaxy Particle System
function Galaxy() {
  const pointsRef = useRef();

  const { positions, colors } = useMemo(() => {
    const count = 4000; // Number of stars
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorInside = new THREE.Color("#ff6030");
    const colorOutside = new THREE.Color("#1b3984");

    for (let i = 0; i < count; i++) {
      // Spiral Galaxy Logic
      const radius = Math.random() * 8; // Radius of the galaxy
      const branches = 3;
      const spinAngle = radius * 0.8;
      const branchAngle = (i % branches) * ((Math.PI * 2) / branches);

      // Randomness / Spread
      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5 * radius;
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5 * radius;
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5 * radius;

      const x = Math.cos(branchAngle + spinAngle) * radius + randomX;
      const y = randomY * 0.5; // Flatten the galaxy
      const z = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color mix
      const mixedColor = colorInside.clone().lerp(colorOutside, radius / 8);

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Rotate the galaxy
      pointsRef.current.rotation.y += delta * 0.05;
      // Subtle pulsation
      pointsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <Galaxy />
    </>
  )
}

const Loading = () => {
  // DOM Refs for GSAP
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const counterRef = useRef(null);
  const barRef = useRef(null);
  const percentRef = useRef({ value: 0 }); // To track number for tweening

  useEffect(() => {
    const tl = gsap.timeline();

    // Fade in container
    gsap.set(containerRef.current, { opacity: 0 });
    gsap.to(containerRef.current, { opacity: 1, duration: 1 });

    // Text Animation
    gsap.fromTo(textRef.current,
      { y: 20, opacity: 0, letterSpacing: '0.1em' },
      { y: 0, opacity: 1, letterSpacing: '0.5em', duration: 1.5, ease: "power3.out" }
    );

    // Progress Bar & Counter Animation (sync with 5s total load time approx)
    gsap.to(barRef.current, {
      width: "100%",
      duration: 4.0,
      ease: "power1.inOut",
      delay: 0.5
    });

    gsap.to(percentRef.current, {
      value: 100,
      duration: 4.0,
      ease: "power1.inOut",
      delay: 0.5,
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerText = Math.round(percentRef.current.value);
        }
      }
    });

    // Exit animation
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      delay: 4.5, // Start fading just before the 5s unmount
      ease: "power2.inOut"
    });

  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] bg-black text-white w-full h-full overflow-hidden">
      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 5, 12], fov: 45 }}>
          <Scene />
        </Canvas>
      </div>

      {/* UI Overlay Layer */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        {/* Main Text */}
        <h1 ref={textRef} className="text-4xl md:text-7xl font-light tracking-[0.5em] mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          Entering My Universe
        </h1>

        {/* Counter */}
        {/* Counter */}
        <div className="relative mb-8 group">
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-xl rounded-full opacity-50 group-hover:opacity-75 transition-opacity"></div>
          <div className="flex items-baseline gap-1 relative z-10">
            <span ref={counterRef} className="text-6xl md:text-5xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-500">
              0
            </span>
            <span className="text-2xl md:text-3xl font-light text-cyan-300 opacity-80">%</span>
          </div>
        </div>

        {/* Futuristic Progress Bar */}
        <div className="relative w-64 md:w-96 h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            ref={barRef}
            className="absolute left-0 top-0 h-full w-0 bg-gradient-to-r from-transparent via-cyan-400 to-purple-500 shadow-[0_0_20px_rgba(34,211,238,0.8)]"
          ></div>
        </div>

        <p className="absolute bottom-10 text-xs text-white/30 tracking-widest uppercase">
          Initializing Universe
        </p>
      </div>
    </div>
  );
};

export default Loading;
