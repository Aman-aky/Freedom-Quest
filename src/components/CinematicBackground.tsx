import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { SceneConfig } from '@/data/sceneConfigs';

interface CinematicBackgroundProps {
  config: SceneConfig;
}

// ── Color lerp helper ──
function lerpColor(a: THREE.Color, b: THREE.Color, t: number): THREE.Color {
  return a.clone().lerp(b, t);
}

// ── Dust particle system ──
function DustParticles({ config }: { config: SceneConfig }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, velocities } = useMemo(() => {
    const count = config.particleCount;
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const spread = config.particleSpread;

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread;

      vel[i * 3] = (Math.random() - 0.5) * 0.003 * config.particleSpeed;
      vel[i * 3 + 1] = Math.random() * 0.004 * config.particleSpeed;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003 * config.particleSpeed;
    }
    return { positions: pos, velocities: vel };
  }, [config.particleCount, config.particleSpread, config.particleSpeed]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const geom = pointsRef.current.geometry;
    const pos = geom.attributes.position.array as Float32Array;
    const spread = config.particleSpread;
    const half = spread / 2;

    for (let i = 0; i < config.particleCount; i++) {
      pos[i * 3] += velocities[i * 3];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      pos[i * 3 + 2] += velocities[i * 3 + 2];

      if (pos[i * 3 + 1] > half) pos[i * 3 + 1] = -half;
      if (pos[i * 3] > half) pos[i * 3] = -half;
      else if (pos[i * 3] < -half) pos[i * 3] = half;
      if (pos[i * 3 + 2] > half) pos[i * 3 + 2] = -half;
      else if (pos[i * 3 + 2] < -half) pos[i * 3 + 2] = half;
    }
    geom.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y += 0.0003;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={config.particleSize}
        color={config.particleColor}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ── Scene-specific geometry ──
function SceneGeometry({ config }: { config: SceneConfig }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.02;
    groupRef.current.position.y = Math.sin(t * 0.3) * 0.1;
  });

  const accent = new THREE.Color(config.accentColor);
  const accent2 = new THREE.Color(config.accentColor2);

  if (config.geometry === 'press') {
    return (
      <group ref={groupRef}>
        {[...Array(4)].map((_, i) => (
          <mesh key={i} position={[(i - 1.5) * 2.5, 0, -3]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.8 + i * 0.2, 0.8 + i * 0.2, 0.3, 24]} />
            <meshStandardMaterial
              color={accent}
              emissive={accent}
              emissiveIntensity={0.15}
              metalness={0.6}
              roughness={0.4}
              transparent
              opacity={0.3}
            />
          </mesh>
        ))}
        {[...Array(8)].map((_, i) => (
          <mesh
            key={`paper-${i}`}
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 6,
              -2 - Math.random() * 3,
            ]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
          >
            <planeGeometry args={[0.4, 0.55]} />
            <meshStandardMaterial
              color="#f5ecd0"
              emissive={accent2}
              emissiveIntensity={0.05}
              transparent
              opacity={0.15}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>
    );
  }

  if (config.geometry === 'protest') {
    return (
      <group ref={groupRef}>
        {[...Array(10)].map((_, i) => (
          <mesh key={i} position={[(i - 5) * 1.5, 0, -4 - (i % 3)]}>
            <boxGeometry args={[0.3, 4 + Math.random() * 2, 0.05]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? accent : accent2}
              emissive={i % 2 === 0 ? accent : accent2}
              emissiveIntensity={0.1}
              transparent
              opacity={0.2}
            />
          </mesh>
        ))}
        {[...Array(6)].map((_, i) => (
          <mesh
            key={`flag-${i}`}
            position={[(i - 3) * 2, 1.5, -3]}
            rotation={[0, 0, 0.1 + Math.sin(i) * 0.05]}
          >
            <planeGeometry args={[0.6, 0.35]} />
            <meshStandardMaterial
              color={accent}
              emissive={accent}
              emissiveIntensity={0.2}
              transparent
              opacity={0.25}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>
    );
  }

  if (config.geometry === 'mission') {
    return (
      <group ref={groupRef}>
        {[...Array(8)].map((_, i) => (
          <mesh key={i} position={[(i - 4) * 1.8, 0, -3 - (i % 2) * 2]}>
            <boxGeometry args={[0.15, 6, 0.15]} />
            <meshStandardMaterial
              color={accent}
              emissive={accent}
              emissiveIntensity={0.08}
              transparent
              opacity={0.25}
            />
          </mesh>
        ))}
        <mesh position={[-4, 5, -6]}>
          <sphereGeometry args={[0.8, 16, 16]} />
          <meshStandardMaterial
            color="#a0b0d0"
            emissive="#6080b0"
            emissiveIntensity={0.3}
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>
    );
  }

  if (config.geometry === 'underground') {
    return (
      <group ref={groupRef}>
        {[...Array(6)].map((_, i) => (
          <mesh key={i} position={[(i - 3) * 1.5, -1.5, -2 - (i % 2)]}>
            <boxGeometry args={[1, 0.5, 0.8]} />
            <meshStandardMaterial
              color={accent}
              emissive={accent}
              emissiveIntensity={0.1}
              transparent
              opacity={0.2}
              roughness={0.8}
            />
          </mesh>
        ))}
        <mesh position={[0, 2, -2]}>
          <sphereGeometry args={[0.15, 12, 12]} />
          <meshStandardMaterial
            color={accent2}
            emissive={accent2}
            emissiveIntensity={0.8}
            transparent
            opacity={0.6}
          />
        </mesh>
      </group>
    );
  }

  if (config.geometry === 'crackdown') {
    return (
      <group ref={groupRef}>
        {[...Array(7)].map((_, i) => (
          <mesh
            key={i}
            position={[(i - 3) * 1.8, (Math.random() - 0.5) * 2, -3 - Math.random() * 2]}
            rotation={[Math.random() * 0.3, Math.random() * 0.5, Math.random() * 0.2]}
          >
            <boxGeometry args={[0.2, 3 + Math.random() * 2, 0.2]} />
            <meshStandardMaterial
              color={accent}
              emissive={accent}
              emissiveIntensity={0.12}
              transparent
              opacity={0.2}
            />
          </mesh>
        ))}
      </group>
    );
  }

  if (config.geometry === 'negotiation') {
    return (
      <group ref={groupRef}>
        <mesh position={[0, -1, -3]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[2.5, 2.5, 0.1, 32]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={0.08}
            transparent
            opacity={0.15}
          />
        </mesh>
        {[...Array(6)].map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 2.5, 0, -3 + Math.sin(angle) * 2.5]}
              rotation={[0, -angle, 0]}
            >
              <boxGeometry args={[0.15, 3, 0.15]} />
              <meshStandardMaterial
                color={accent2}
                emissive={accent2}
                emissiveIntensity={0.06}
                transparent
                opacity={0.2}
              />
            </mesh>
          );
        })}
      </group>
    );
  }

  if (config.geometry === 'finale') {
    return (
      <group ref={groupRef}>
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 3, Math.sin(angle * 2) * 0.5, -4]}
              rotation={[0, 0, angle]}
            >
              <boxGeometry args={[0.1, 5, 0.1]} />
              <meshStandardMaterial
                color={i % 3 === 0 ? '#ff9933' : i % 3 === 1 ? '#ffffff' : '#138808'}
                emissive={i % 3 === 0 ? '#ff9933' : i % 3 === 1 ? '#ffffff' : '#138808'}
                emissiveIntensity={0.2}
                transparent
                opacity={0.2}
              />
            </mesh>
          );
        })}
        <mesh position={[0, 0, -5]}>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshStandardMaterial
            color="#ffcc66"
            emissive="#ff9933"
            emissiveIntensity={0.5}
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>
    );
  }

  // Default — floating abstract shapes
  return (
    <group ref={groupRef}>
      {[...Array(5)].map((_, i) => (
        <mesh
          key={i}
          position={[(i - 2) * 2, Math.sin(i) * 0.5, -3 - i * 0.5]}
          rotation={[Math.random(), Math.random(), Math.random()]}
        >
          <icosahedronGeometry args={[0.5 + i * 0.1, 0]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={0.08}
            transparent
            opacity={0.15}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

// ── Lights with smooth crossfade ──
function SceneLights({
  config,
  prevConfig,
  lerpProgress,
}: {
  config: SceneConfig;
  prevConfig: SceneConfig | null;
  lerpProgress: React.MutableRefObject<number>;
}) {
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const keyRef = useRef<THREE.DirectionalLight>(null);
  const rimRef = useRef<THREE.DirectionalLight>(null);

  useFrame(() => {
    const t = lerpProgress.current;
    if (!prevConfig || t >= 1) return;

    if (ambientRef.current) {
      const c = lerpColor(
        new THREE.Color(prevConfig.ambientColor),
        new THREE.Color(config.ambientColor),
        t
      );
      ambientRef.current.color.copy(c);
      ambientRef.current.intensity = THREE.MathUtils.lerp(
        prevConfig.ambientIntensity,
        config.ambientIntensity,
        t
      );
    }
    if (keyRef.current) {
      const c = lerpColor(
        new THREE.Color(prevConfig.keyLightColor),
        new THREE.Color(config.keyLightColor),
        t
      );
      keyRef.current.color.copy(c);
      keyRef.current.intensity = THREE.MathUtils.lerp(
        prevConfig.keyLightIntensity,
        config.keyLightIntensity,
        t
      );
    }
    if (rimRef.current) {
      const c = lerpColor(
        new THREE.Color(prevConfig.rimLightColor),
        new THREE.Color(config.rimLightColor),
        t
      );
      rimRef.current.color.copy(c);
      rimRef.current.intensity = THREE.MathUtils.lerp(
        prevConfig.rimLightIntensity,
        config.rimLightIntensity,
        t
      );
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={config.ambientIntensity} color={config.ambientColor} />
      <directionalLight
        ref={keyRef}
        position={config.keyLightPosition}
        intensity={config.keyLightIntensity}
        color={config.keyLightColor}
      />
      <directionalLight
        ref={rimRef}
        position={[-config.keyLightPosition[0], -config.keyLightPosition[1], -config.keyLightPosition[2]]}
        intensity={config.rimLightIntensity}
        color={config.rimLightColor}
      />
    </>
  );
}

// ── Camera drift ──
function CameraDrift({ config }: { config: SceneConfig }) {
  const { camera } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const drift = config.cameraDrift;
    camera.position.x = Math.sin(t * 0.15) * drift;
    camera.position.y = Math.cos(t * 0.1) * drift * 0.5;
    camera.position.z = 5 + Math.sin(t * 0.08) * drift * 0.3;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ── Fog manager ──
function FogManager({
  config,
  prevConfig,
  lerpProgress,
}: {
  config: SceneConfig;
  prevConfig: SceneConfig | null;
  lerpProgress: React.MutableRefObject<number>;
}) {
  const { scene } = useThree();

  useEffect(() => {
    scene.fog = new THREE.Fog(config.fogColor, config.fogNear, config.fogFar);
    return () => {
      scene.fog = null;
    };
  }, [scene]);

  useFrame(() => {
    if (!scene.fog || !prevConfig) return;
    const t = lerpProgress.current;
    if (t >= 1) return;
    const fog = scene.fog as THREE.Fog;
    const c = lerpColor(
      new THREE.Color(prevConfig.fogColor),
      new THREE.Color(config.fogColor),
      t
    );
    fog.color.copy(c);
    fog.near = THREE.MathUtils.lerp(prevConfig.fogNear, config.fogNear, t);
    fog.far = THREE.MathUtils.lerp(prevConfig.fogFar, config.fogFar, t);
  });

  return null;
}

// ── Main R3F Scene ──
function R3FScene({ config }: { config: SceneConfig }) {
  const prevConfigRef = useRef<SceneConfig | null>(null);
  const lerpProgress = useRef(0);

  useEffect(() => {
    lerpProgress.current = 0;
  }, [config.id]);

  useFrame((_, delta) => {
    if (lerpProgress.current < 1) {
      lerpProgress.current = Math.min(1, lerpProgress.current + delta * 0.8);
    }
  });

  const prevConfig = prevConfigRef.current;
  const activePrev = prevConfig && prevConfig.id !== config.id ? prevConfig : null;

  useEffect(() => {
    prevConfigRef.current = config;
  }, [config]);

  return (
    <>
      <FogManager config={config} prevConfig={activePrev} lerpProgress={lerpProgress} />
      <SceneLights config={config} prevConfig={activePrev} lerpProgress={lerpProgress} />
      <CameraDrift config={config} />
      <DustParticles config={config} />
      <SceneGeometry config={config} />
    </>
  );
}

// ── Exported component ──
export function CinematicBackground({ config }: CinematicBackgroundProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 55, near: 0.1, far: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <R3FScene config={config} />
      </Canvas>
    </div>
  );
}
