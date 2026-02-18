import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * 3D bubble particles with parallax depth and wobble.
 */
export default function Bubbles3D({ count = 40 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const bubbles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 16,
      y: -5 + Math.random() * 2,
      z: (Math.random() - 0.5) * 10 - 2,
      speed: 0.3 + Math.random() * 0.7,
      wobbleSpeed: 1 + Math.random() * 2,
      wobbleAmount: 0.2 + Math.random() * 0.5,
      size: 0.03 + Math.random() * 0.08,
      phase: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    bubbles.forEach((b, i) => {
      const y = ((b.y + t * b.speed) % 14) - 5;
      const x = b.x + Math.sin(t * b.wobbleSpeed + b.phase) * b.wobbleAmount;
      const z = b.z + Math.cos(t * b.wobbleSpeed * 0.7 + b.phase) * b.wobbleAmount * 0.5;

      dummy.position.set(x, y, z);
      dummy.scale.setScalar(b.size * (1 + 0.2 * Math.sin(t * 2 + b.phase)));
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshStandardMaterial
        color="hsl(195, 100%, 85%)"
        transparent
        opacity={0.35}
        roughness={0.1}
        metalness={0.3}
        envMapIntensity={0.5}
      />
    </instancedMesh>
  );
}
