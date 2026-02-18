import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Rising bubble particles that respond to scroll.
 */
export default function BubbleParticles({
  count = 60,
  scrollProgress = 0,
}: {
  count?: number;
  scrollProgress?: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, speeds, offsets } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const off = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = Math.random() * 8 - 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      spd[i] = 0.3 + Math.random() * 0.7;
      off[i] = Math.random() * Math.PI * 2;
    }

    return { positions: pos, speeds: spd, offsets: off };
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const posArr = pointsRef.current.geometry.attributes.position
      .array as Float32Array;
    const t = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      // Rise speed increases with scroll
      posArr[i * 3 + 1] += speeds[i] * 0.02 * (1 + scrollProgress * 3);

      // Wobble horizontally
      posArr[i * 3] += Math.sin(t * 2 + offsets[i]) * 0.003;

      // Reset when too high
      if (posArr[i * 3 + 1] > 5) {
        posArr[i * 3 + 1] = -4;
        posArr[i * 3] = (Math.random() - 0.5) * 12;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.08}
        color={new THREE.Color("hsl(200, 100%, 80%)")}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
