import React, { useRef, useState, useMemo, useEffect, Suspense, useLayoutEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// Import our flawlessly generated local base64 3D planet textures directly. 
// No 404s, no external unreliable github URLs!
import { mercuryMap, venusMap, marsMap, jupiterMap, saturnMap, uranusMap, neptuneMap, sunMap, earthMap, earthNormalMap, earthSpecularMap, earthCloudsMap, moonMap } from '../textures.js';

const SOLAR_SYSTEM = [
  { name: 'Mercury', textureUrl: mercuryMap, radius: 0.3, orbitRadius: 6, speed: 0.5, offset: 0, roughness: 0.8 },
  { name: 'Venus', textureUrl: venusMap, radius: 0.6, orbitRadius: 9, speed: 0.4, offset: 2, roughness: 0.5 },
  { name: 'Earth', 
    textureUrl: earthMap,
    normalUrl: earthNormalMap,
    specularUrl: earthSpecularMap,
    cloudsUrl: earthCloudsMap,
    moonUrl: moonMap,
    radius: 1.2, orbitRadius: 13, speed: 0.3, offset: 4, roughness: 0.7, isEarth: true 
  },
  { name: 'Mars', textureUrl: marsMap, radius: 0.5, orbitRadius: 17, speed: 0.25, offset: 1.5, roughness: 0.9 },
  { name: 'Jupiter', textureUrl: jupiterMap, radius: 1.8, orbitRadius: 23, speed: 0.15, offset: 5, roughness: 0.4 },
  { name: 'Saturn', textureUrl: saturnMap, radius: 1.5, orbitRadius: 29, speed: 0.1, 
    hasRing: true, ringInner: 1.8, ringOuter: 3, offset: 3, roughness: 0.4 
  },
  { name: 'Uranus', textureUrl: uranusMap, radius: 1.2, orbitRadius: 35, speed: 0.08, offset: 0.5, roughness: 0.3 },
  { name: 'Neptune', textureUrl: neptuneMap, radius: 1.1, orbitRadius: 40, speed: 0.06, offset: 6, roughness: 0.3 }
];

const OrbitPath = ({ radius }) => {
  const lineGeometry = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [radius]);
  
  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial color="#ffffff" transparent opacity={0.08} />
    </line>
  );
};

// Sun component using realistic sun texture map
const Sun = () => {
    const texture = useTexture(sunMap);
    
    // Rotate sun slowly
    const sunRef = useRef();
    useFrame(() => {
        if(sunRef.current) sunRef.current.rotation.y += 0.002;
    });

    return (
        <group>
            {/* Core textured Sun */}
            <mesh ref={sunRef}>
                <sphereGeometry args={[2.5, 64, 64]} />
                <meshBasicMaterial map={texture} />
                <Html distanceFactor={30} center position={[0, 4, 0]} zIndexRange={[100, 0]}>
                    <div className="text-xl md:text-2xl font-bold tracking-[0.3em] uppercase text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,1)] opacity-80 pointer-events-none">
                        Sun
                    </div>
                </Html>
            </mesh>
            
            {/* Halos for realistic glow effect */}
            <mesh>
                <sphereGeometry args={[2.7, 32, 32]} />
                <meshBasicMaterial color="#ffaa00" transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
            <mesh>
                <sphereGeometry args={[3.2, 32, 32]} />
                <meshBasicMaterial color="#ff6600" transparent opacity={0.15} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
            
            {/* Central light mimicking the sun's emission realistically covering planets */}
            <pointLight intensity={6} color="#fffcf5" distance={250} decay={1.5} castShadow />
            <pointLight intensity={2} color="#ffcc00" distance={20} decay={2} />
        </group>
    );
};

// Earth + Moon Component
const EarthWithMoon = ({ data, zooming, earthGroupRef, onEarthClick, isMobile }) => {
    const [colorMap, normalMap, specularMap, cloudsMap, moonMap] = useTexture([
        data.textureUrl, data.normalUrl, data.specularUrl, data.cloudsUrl, data.moonUrl
    ]);

    const localGroupRef = useRef();
    const earthMeshRef = useRef();
    const cloudsMeshRef = useRef();
    const moonGroupRef = useRef();
    
    useFrame((state) => {
        if (zooming) return;
        
        // Slow natural speed revolution around the sun
        const t = state.clock.getElapsedTime() * data.speed + data.offset;
        const x = Math.cos(t) * data.orbitRadius;
        const z = Math.sin(t) * data.orbitRadius;
        
        localGroupRef.current.position.set(x, 0, z);
        
        // Accurate rotation on its own axis
        earthMeshRef.current.rotation.y += 0.01;
        cloudsMeshRef.current.rotation.y += 0.012; // clouds move slightly faster

        // Realistic Moon orbit
        const moonT = state.clock.getElapsedTime() * 1.5;
        const moonDistance = 1.3;
        const mX = Math.cos(moonT) * moonDistance;
        const mZ = Math.sin(moonT) * moonDistance;
        moonGroupRef.current.position.set(mX, 0.2, mZ);
        moonGroupRef.current.rotation.y += 0.02; // Moon naturally rotates
    });

    useEffect(() => {
        if (earthGroupRef) {
            earthGroupRef.current = localGroupRef.current;
        }
    }, [earthGroupRef]);

    return (
        <group ref={localGroupRef}>
            {/* --- HERO3D LIGHTING SUITE START --- */}
            {/* Primary sunlight simulation specifically for Earth */}
            <directionalLight position={[5, 1, 5]} intensity={4} color="#fdb813" />
            {/* Secondary fill light simulating skylight / global bounce */}
            <directionalLight position={[-5, 2, -5]} intensity={1.5} color="#87ceeb" />
            {/* Cool moonlight/ambient point light for extra detail */}
            <pointLight position={[0, 5, 0]} intensity={2} color="#b0c4de" distance={20} />
            {/* --- HERO3D LIGHTING SUITE END --- */}

            <group rotation={[0, 0, 23.5 * Math.PI / 180]}> {/* Approximate Earth Tilt like Hero3D */}
                <mesh 
                    ref={earthMeshRef}
                    onClick={(e) => {
                        if (!zooming) {
                            e.stopPropagation();
                            onEarthClick();
                        }
                    }}
                    onPointerOver={(e) => {
                        if (!zooming) { e.stopPropagation(); document.body.style.cursor = 'pointer'; }
                    }}
                    onPointerOut={(e) => {
                        if (!zooming) { document.body.style.cursor = 'auto'; }
                    }}
                    castShadow receiveShadow
                >
                    <sphereGeometry args={[data.radius, 64, 64]} />
                    <meshPhongMaterial 
                        map={colorMap} 
                        normalMap={normalMap}
                        specularMap={specularMap}
                        normalScale={new THREE.Vector2(1.5, 1.5)} 
                        shininess={50} 
                        specular={new THREE.Color('#ffffff')}
                        emissive={new THREE.Color('#112244')}
                        emissiveIntensity={0.15}
                    />
                </mesh>
                
                {/* Atmospheric Rim Glow - Intense Hero Look */}
                <mesh scale={[1.05, 1.05, 1.05]}>
                    <sphereGeometry args={[data.radius, 64, 64]} />
                    <meshPhongMaterial 
                        color="#0088ff" 
                        transparent 
                        opacity={0.2} 
                        blending={THREE.AdditiveBlending} 
                        side={THREE.BackSide} 
                    />
                </mesh>

                {/* Earth Clouds */}
                <mesh ref={cloudsMeshRef}>
                    <sphereGeometry args={[data.radius + 0.02, 64, 64]} />
                    <meshPhongMaterial
                        map={cloudsMap}
                        transparent
                        opacity={0.8}
                        blending={THREE.AdditiveBlending}
                        side={THREE.DoubleSide}
                        depthWrite={false}
                    />
                </mesh>
            </group>

            {/* Orbiting Moon */}
            <mesh ref={moonGroupRef} castShadow receiveShadow>
                <sphereGeometry args={[data.radius * 0.27, 32, 32]} />
                <meshStandardMaterial map={moonMap} roughness={0.9} metalness={0.1} color="#ffffff" />
            </mesh>

            <Html distanceFactor={isMobile ? 18 : 12} center position={[0, data.radius + 0.8, 0]} zIndexRange={[100, 0]}>
                <div className="transition-all duration-300 flex flex-col items-center pointer-events-none scale-125">
                    <div className="text-sm md:text-base font-bold tracking-widest uppercase text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
                        {data.name}
                    </div>
                </div>
            </Html>
        </group>
    );
};

const GenericTexturedPlanet = ({ data, zooming, sharedGeometry, isMobile }) => {
    const localRef = useRef();
    const ringRef = useRef();

    // Map the reliable texture
    const textureMap = useTexture(data.textureUrl);
    // If it has a ring, load ring map safely
    const ringMap = (data.hasRing && data.ringUrl) ? useTexture(data.ringUrl) : null;

    useFrame((state) => {
        if (zooming) return;
        const t = state.clock.getElapsedTime() * data.speed + data.offset;
        const x = Math.cos(t) * data.orbitRadius;
        const z = Math.sin(t) * data.orbitRadius;
        
        localRef.current.position.set(x, 0, z);
        localRef.current.rotation.y += 0.01; // rotate planet realistically
        
        if (ringRef.current) {
            ringRef.current.position.set(x, 0, z);
        }
    });

    return (
        <>
            <mesh ref={localRef} castShadow receiveShadow geometry={sharedGeometry}>
                <sphereGeometry args={[data.radius, 48, 48]} />
                <meshPhongMaterial 
                    map={textureMap}
                    roughness={data.roughness} 
                    metalness={0.1} 
                    shininess={10}
                    specular={new THREE.Color('#222222')}
                    emissive={new THREE.Color(data.color)}
                    emissiveIntensity={0.02}
                />
                
                {/* Subtle Planet Rim Light */}
                <mesh scale={[1.01, 1.01, 1.01]}>
                    <sphereGeometry args={[data.radius, 32, 32]} />
                    <meshBasicMaterial 
                        color={data.color} 
                        transparent 
                        opacity={0.05} 
                        blending={THREE.AdditiveBlending} 
                        side={THREE.BackSide} 
                    />
                </mesh>

                <Html distanceFactor={isMobile ? 35 : 25} center position={[0, data.radius + 0.6, 0]} zIndexRange={[100, 0]}>
                    <div className="transition-all duration-300 flex flex-col items-center pointer-events-none scale-100 opacity-70">
                        <div className="text-xs md:text-sm font-bold tracking-widest uppercase text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.4)]">
                            {data.name}
                        </div>
                    </div>
                </Html>
            </mesh>
            
            {data.hasRing && (
                <mesh ref={ringRef} rotation={[-Math.PI / 2.2, 0, 0]} receiveShadow>
                    <ringGeometry args={[data.ringInner, data.ringOuter, 64]} />
                    <meshStandardMaterial 
                        map={ringMap || undefined} 
                        color={data.ringColor || '#e8d4a2'} 
                        transparent 
                        opacity={0.6} 
                        side={THREE.DoubleSide} 
                    />
                </mesh>
            )}
        </>
    );
};

const CameraController = ({ zooming, earthRef, onZoomComplete, isMobile }) => {
    const { camera } = useThree();
    const stateRef = useRef({ 
        angle: Math.PI / 4, 
        target: new THREE.Vector3(0, 0, 0) 
    });

    useFrame((state, delta) => {
        if (!zooming) {
            stateRef.current.angle += delta * 0.03; // Even slower natural orbital camera
            
            // Adjust camera radius and height to perfectly frame the mobile screen (which is tall) versus desktop
            const radius = isMobile ? 85 : 55; 
            const height = isMobile ? 40 : 25;
            
            camera.position.x = Math.sin(stateRef.current.angle) * radius;
            camera.position.z = Math.cos(stateRef.current.angle) * radius;
            camera.position.y = height;
            camera.lookAt(stateRef.current.target);
        }
    });

    useEffect(() => {
        if (zooming && earthRef.current) {
            const earthPos = new THREE.Vector3();
            earthRef.current.getWorldPosition(earthPos);
            const earthDir = earthPos.clone().normalize();
            
            // Match Hero3D distance (approx 5) to ensure size consistency
            const distance = isMobile ? 7 : 5;
            const targetCamPos = earthPos.clone().add(earthDir.clone().multiplyScalar(distance)); 

            // Calculate a target offset to push Earth to the right side of the screen
            // We use the cross product of Up and the Earth direction to find the "right" vector
            const up = new THREE.Vector3(0, 1, 0);
            const rightV = new THREE.Vector3().crossVectors(up, earthDir).normalize();
            
            // Shift target to the LEFT to make Earth appear on the RIGHT
            // Only shift on desktop; center it on mobile for better visibility
            const horizontalOffset = isMobile ? 0 : 1.8;
            const finalTarget = earthPos.clone().add(rightV.clone().multiplyScalar(-horizontalOffset));

            gsap.to(camera.position, {
                x: targetCamPos.x,
                y: targetCamPos.y,
                z: targetCamPos.z,
                duration: 2.5,
                ease: "power2.inOut"
            });

            gsap.to(stateRef.current.target, {
                x: finalTarget.x,
                y: finalTarget.y,
                z: finalTarget.z,
                duration: 2.5,
                ease: "power2.inOut",
                onUpdate: () => {
                    camera.lookAt(stateRef.current.target);
                },
                onComplete: () => {
                   onZoomComplete();
                }
            });
        }
    }, [zooming, earthRef, camera, onZoomComplete]);

    return null;
}

const Loading = ({ onComplete }) => {
  const [zooming, setZooming] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const earthRef = useRef(null);

  // Smooth UI responsive effect check
  useLayoutEffect(() => {
      const handleResize = () => {
          setIsMobile(window.innerWidth < 768);
      };
      
      handleResize(); // intial call
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleEarthClick = () => {
      if(zooming) return;
      setZooming(true);
      // Removed the delayed setFade(true) to avoid blank/black screen overlay
  };

  const handleZoomComplete = () => {
      // Call onComplete immediately when zoom finishes
      if (onComplete) onComplete();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black text-white w-full h-full overflow-hidden">
      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 25, 55], fov: isMobile ? 55 : 45, near: 0.1, far: 1000 }} shadows>
            {/* Extremely dark ambient space light so we just see precise pointLight sun illumination */}
            <ambientLight intensity={0.05} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            
            {/* Cinematic fill light from camera angle */}
            <pointLight position={[10, 20, 30]} intensity={0.5} color="#4466ff" transparent />
            
            <Sun />
            
            {SOLAR_SYSTEM.map((planet) => {
                if (planet.isEarth) {
                    return (
                        <React.Fragment key={planet.name}>
                            <OrbitPath radius={planet.orbitRadius} />
                            <EarthWithMoon 
                                data={planet} 
                                zooming={zooming} 
                                earthGroupRef={earthRef} 
                                onEarthClick={handleEarthClick}
                                isMobile={isMobile}
                            />
                        </React.Fragment>
                    )
                }
                return (
                    <React.Fragment key={planet.name}>
                        <OrbitPath radius={planet.orbitRadius} />
                        <GenericTexturedPlanet 
                            data={planet} 
                            zooming={zooming}
                            isMobile={isMobile}
                        />
                    </React.Fragment>
                )
            })}

            <CameraController 
                zooming={zooming} 
                earthRef={earthRef} 
                onZoomComplete={handleZoomComplete} 
                isMobile={isMobile}
            />
          </Canvas>
        </Suspense>
      </div>

      {/* Minimalist UI Overlay */}
      <div className={`absolute inset-0 z-10 flex flex-col items-center pt-12 md:pt-20 pointer-events-none transition-opacity duration-700 ${zooming ? 'opacity-0' : 'opacity-100'}`}>
          <div className="text-center px-4">
              <p className="text-cyan-100/80 text-[10px] md:text-xs tracking-[0.3em] font-light uppercase flex items-center justify-center gap-3">
                  Locate and click on Earth to enter
              </p>
          </div>
      </div>
    </div>
  );
};

export default Loading;
