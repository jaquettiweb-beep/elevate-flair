import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Particle system that appears during the dolphin-to-logo dissolve.
 * Particles burst outward, then converge to center forming a glow.
 */
export default function DissolveParticles({
  active,
  converge,
}: {
  active: boolean;
  converge: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 200;

  const { positions, velocities, phases } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const ph = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Start at center
      pos[i * 3] = 0;
      pos[i * 3 + 1] = 0.5;
      pos[i * 3 + 2] = 0;
      // Random burst velocity
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const speed = 1 + Math.random() * 3;
      vel[i * 3] = Math.sin(phi) * Math.cos(theta) * speed;
      vel[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * speed;
      vel[i * 3 + 2] = Math.cos(phi) * speed;
      ph[i] = Math.random() * Math.PI * 2;
    }
    return { positions: pos, velocities: vel, phases: ph };
  }, []);

  const progressRef = useRef(0);

  useFrame(({ clock }) => {
    if (!pointsRef.current || !active) {
      if (pointsRef.current) pointsRef.current.visible = false;
      return;
    }

    pointsRef.current.visible = true;
    const t = clock.getElapsedTime();
    progressRef.current = Math.min(progressRef.current + 0.012, 1);
    const p = progressRef.current;

    const geo = pointsRef.current.geometry;
    const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;

    for (let i = 0; i < count; i++) {
      if (converge) {
        // Converge to center
        const convergeFactor = Math.min(p * 2, 1);
        posAttr.array[i * 3] = velocities[i * 3] * (1 - convergeFactor) * 0.8 + Math.sin(t * 2 + phases[i]) * 0.1 * (1 - convergeFactor);
        posAttr.array[i * 3 + 1] = 0.5 + velocities[i * 3 + 1] * (1 - convergeFactor) * 0.8;
        posAttr.array[i * 3 + 2] = velocities[i * 3 + 2] * (1 - convergeFactor) * 0.8;
      } else {
        // Burst outward
        const burstProgress = Math.min(p * 1.5, 1);
        posAttr.array[i * 3] = velocities[i * 3] * burstProgress * 0.8 + Math.sin(t * 3 + phases[i]) * 0.05;
        posAttr.array[i * 3 + 1] = 0.5 + velocities[i * 3 + 1] * burstProgress * 0.8;
        posAttr.array[i * 3 + 2] = velocities[i * 3 + 2] * burstProgress * 0.8;
      }
    }

    posAttr.needsUpdate = true;

    // Fade
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = converge ? Math.max(0, 1 - p * 1.5) : Math.min(1, p * 3);
  });

  return (
    <points ref={pointsRef} visible={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="hsl(195, 100%, 75%)"
        size={0.06}
        transparent
        opacity={0}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
