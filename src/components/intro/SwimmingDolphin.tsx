import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Procedural low-poly dolphin with swim animation.
 * Accepts a `phase` prop to control visibility/dissolve.
 */
export default function SwimmingDolphin({
  phase,
}: {
  phase: "swim" | "dissolve" | "gone";
}) {
  const groupRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Group>(null);
  const dissolveRef = useRef(0);

  // Body profile via LatheGeometry
  const bodyGeo = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    const segments = 20;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const r = Math.sin(t * Math.PI) * 0.35 * (1 - 0.3 * Math.pow(t - 0.4, 2));
      const y = (t - 0.5) * 3;
      pts.push(new THREE.Vector2(Math.max(r, 0.02), y));
    }
    return new THREE.LatheGeometry(pts, 12);
  }, []);

  const dorsalGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0.05, 0.4);
    shape.lineTo(0.25, 0.3);
    shape.lineTo(0.3, 0);
    return new THREE.ExtrudeGeometry(shape, { depth: 0.03, bevelEnabled: false });
  }, []);

  const tailGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(-0.4, 0.2);
    shape.lineTo(-0.3, 0);
    shape.lineTo(-0.4, -0.2);
    shape.lineTo(0, 0);
    return new THREE.ExtrudeGeometry(shape, { depth: 0.02, bevelEnabled: false });
  }, []);

  const sideFinGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0.3, -0.1);
    shape.lineTo(0.2, -0.2);
    shape.lineTo(0, -0.05);
    return new THREE.ExtrudeGeometry(shape, { depth: 0.015, bevelEnabled: false });
  }, []);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("hsl(200, 60%, 50%)"),
        roughness: 0.3,
        metalness: 0.1,
        flatShading: true,
        transparent: true,
      }),
    []
  );

  const bellyMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("hsl(200, 40%, 75%)"),
        roughness: 0.4,
        metalness: 0,
        flatShading: true,
        transparent: true,
      }),
    []
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    // Dissolve logic
    if (phase === "dissolve") {
      dissolveRef.current = Math.min(dissolveRef.current + 0.015, 1);
    } else if (phase === "gone") {
      dissolveRef.current = 1;
    }

    const opacity = 1 - dissolveRef.current;
    material.opacity = opacity;
    bellyMat.opacity = opacity;

    if (phase === "gone") {
      groupRef.current.visible = false;
      return;
    }

    groupRef.current.visible = true;

    // Swimming figure-8 path
    const swimSpeed = 0.6;
    const pathX = Math.sin(t * swimSpeed) * 3;
    const pathY = Math.sin(t * swimSpeed * 2) * 0.8 + 0.5;
    const pathZ = Math.cos(t * swimSpeed) * 1.5;

    groupRef.current.position.set(pathX, pathY, pathZ);

    // Face direction of movement
    const dx = Math.cos(t * swimSpeed) * 3 * swimSpeed;
    const dz = -Math.sin(t * swimSpeed) * 1.5 * swimSpeed;
    groupRef.current.rotation.y = Math.atan2(dx, dz);

    // Body undulation
    groupRef.current.rotation.z = Math.sin(t * 2) * 0.08;
    groupRef.current.rotation.x = Math.sin(t * swimSpeed * 2) * 0.15;

    // Tail wag
    if (tailRef.current) {
      tailRef.current.rotation.y = Math.sin(t * 4) * 0.4;
    }

    // Scale during dissolve
    const s = 0.9 + dissolveRef.current * 0.3;
    groupRef.current.scale.setScalar(s);
  });

  return (
    <group ref={groupRef} scale={0.9}>
      <mesh geometry={bodyGeo} material={material} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={bodyGeo} material={bellyMat} rotation={[Math.PI / 2, 0, 0]} scale={[0.98, 1, 0.6]} position={[0, -0.05, 0]} />
      <mesh geometry={dorsalGeo} material={material} position={[-0.015, 0.3, -0.2]} />
      <group ref={tailRef} position={[0, 0, 1.4]}>
        <mesh geometry={tailGeo} material={material} rotation={[Math.PI / 2, 0, 0]} />
      </group>
      <mesh geometry={sideFinGeo} material={material} position={[0.2, -0.1, -0.3]} rotation={[0.3, 0.5, 0]} />
      <mesh geometry={sideFinGeo} material={material} position={[-0.2, -0.1, -0.3]} rotation={[0.3, -0.5, Math.PI]} scale={[-1, 1, 1]} />
      <mesh position={[0.2, 0.1, -1.1]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#1a1a2e" transparent opacity={1 - dissolveRef.current} />
      </mesh>
      <mesh position={[-0.2, 0.1, -1.1]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#1a1a2e" transparent opacity={1 - dissolveRef.current} />
      </mesh>
    </group>
  );
}
