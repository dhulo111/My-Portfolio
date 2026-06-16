import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";

// Textures
const EARTH_DAY = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg";
const EARTH_NORMAL = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg";
const EARTH_SPECULAR = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg";
const EARTH_CLOUDS = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png";
const MOON_MAP = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg";

function Earth() {
  const earthRef = useRef();
  const cloudsRef = useRef();

  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(TextureLoader, [
    EARTH_DAY, EARTH_NORMAL, EARTH_SPECULAR, EARTH_CLOUDS
  ]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Rotate Earth on its axis
    if (earthRef.current) earthRef.current.rotation.y = t * 0.15;
    // Rotate clouds slightly faster to simulate wind
    if (cloudsRef.current) cloudsRef.current.rotation.y = t * 0.17;
  });

  return (
    <group rotation={[0, 0, 23.5 * Math.PI / 180]}> {/* Approximate Earth Tilt */}
      {/* Main Earth Sphere - Slightly reduced scale */}
      <mesh ref={earthRef} scale={1.2}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={colorMap}
          normalMap={normalMap}
          specularMap={specularMap}
          specular={new THREE.Color(0x888888)}
          shininess={20}
          emissive={new THREE.Color(0x111111)}
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* Cloud Layer */}
      <mesh ref={cloudsRef} scale={[1.21, 1.21, 1.21]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={cloudsMap}
          transparent={true}
          opacity={0.8}
          side={THREE.DoubleSide}
          blending={THREE.NormalBlending}
          depthWrite={false} // Prevents z-fighting
        />
      </mesh>
    </group>
  );
}

function Moon() {
  const moonRef = useRef();
  const [moonMap] = useLoader(TextureLoader, [MOON_MAP]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.3;
    const radius = 3.5; // Adjusted radius for smaller Earth

    // Moon assumes an elliptical orbit
    const x = Math.cos(t) * radius;
    const z = Math.sin(t) * radius;
    const y = Math.sin(t) * 0.8;

    if (moonRef.current) {
      moonRef.current.position.set(x, y, z);
      moonRef.current.rotation.y = t * 0.2; // Moon rotates
    }
  });

  return (
    <mesh ref={moonRef} scale={0.35}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        map={moonMap}
        roughness={0.9}
        metalness={0.1}
        color="#ffffff" // Brighter moon
      />
    </mesh>
  );
}

function Hero3D() {
  // Use a state for FOV/Camera position based on screen width
  const [cameraZoom, setCameraZoom] = useState(4.5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCameraZoom(5.5); // Zoom out on mobile
      } else {
        setCameraZoom(4.5); // Closer on desktop
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Init

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center relative z-10">
      <Canvas camera={{ position: [0, 0, cameraZoom], fov: 45 }} gl={{ antialias: true, alpha: true, shadows: "basic" }}>
        {/* Realistic Lighting Setup */}
        {/* Ambient light for overall scene illumination */}
        <ambientLight intensity={0.5} color="#ffffff" />
        <hemisphereLight skyColor="#ffffff" groundColor="#888888" intensity={0.35} />

        {/* Primary light source - Whiter daylight for a cleaner Earth view */}
        <directionalLight
          position={[8, 5, 8]}
          intensity={2.2}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        {/* Secondary fill light - Soft neutral fill */}
        <directionalLight
          position={[-3, 2, -8]}
          intensity={1.0}
          color="#f0f8ff"
        />

        {/* Moonlight effect - White point light to brighten the scene */}
        <pointLight
          position={[-6, 4, 0]}
          intensity={0.75}
          color="#ffffff"
          distance={30}
          decay={2}
        />

        {/* Backlight for rim lighting effect */}
        <pointLight
          position={[0, -3, -5]}
          intensity={0.45}
          color="#c8e1ff"
          distance={20}
          decay={2}
        />

        {/* Floating Animation */}
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <Earth castShadow />
          <Moon castShadow />
        </Float>

        {/* Note: Stars component removed as requested */}

        {/* Interactive OrbitControls */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
          minDistance={3}
          maxDistance={12}
          dampingFactor={0.05}
          enableDamping={true}
        />
      </Canvas>
    </div>
  );
}

export default Hero3D;
