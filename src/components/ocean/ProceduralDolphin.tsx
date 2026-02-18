import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Procedural low-poly dolphin built from LatheGeometry + fins.
 * Animates a swim cycle (tail wag + body undulation).
 */
export default function ProceduralDolphin({
  scrollProgress = 0,
}: {
  scrollProgress?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Group>(null);

  // Body profile via LatheGeometry
  const bodyGeo = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    const segments = 20;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      // Dolphin silhouette: tapered snout → thick body → thin tail
      const r =
        Math.sin(t * Math.PI) * 0.35 * (1 - 0.3 * Math.pow(t - 0.4, 2));
      const y = (t - 0.5) * 3; // length 3 units
      pts.push(new THREE.Vector2(Math.max(r, 0.02), y));
    }
    return new THREE.LatheGeometry(pts, 12);
  }, []);

  // Dorsal fin
  const dorsalGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0.05, 0.4);
    shape.lineTo(0.25, 0.3);
    shape.lineTo(0.3, 0);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.03,
      bevelEnabled: false,
    });
    return geo;
  }, []);

  // Tail fluke
  const tailGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(-0.4, 0.2);
    shape.lineTo(-0.3, 0);
    shape.lineTo(-0.4, -0.2);
    shape.lineTo(0, 0);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.02,
      bevelEnabled: false,
    });
    return geo;
  }, []);

  // Side fin
  const sideFinGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0.3, -0.1);
    shape.lineTo(0.2, -0.2);
    shape.lineTo(0, -0.05);
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.015,
      bevelEnabled: false,
    });
  }, []);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("hsl(200, 60%, 50%)"),
        roughness: 0.3,
        metalness: 0.1,
        flatShading: true,
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
      }),
    []
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    // Swim undulation
    groupRef.current.rotation.z = Math.sin(t * 2) * 0.08;
    groupRef.current.position.y = Math.sin(t * 1.5) * 0.15;

    // Scroll-driven dive: dolphin dives down and rotates
    const dive = scrollProgress * 4;
    groupRef.current.position.y -= dive;
    groupRef.current.rotation.x = -scrollProgress * 0.8;
    groupRef.current.position.x = Math.sin(scrollProgress * Math.PI * 2) * 2;

    // Tail wag
    if (tailRef.current) {
      tailRef.current.rotation.y = Math.sin(t * 4) * 0.4;
    }
  });

  return (
    <group ref={groupRef} rotation={[0, Math.PI / 2, 0]} scale={0.8}>
      {/* Body */}
      <mesh geometry={bodyGeo} material={material} rotation={[Math.PI / 2, 0, 0]} />

      {/* Belly highlight - slightly larger, offset down */}
      <mesh
        geometry={bodyGeo}
        material={bellyMat}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.98, 1, 0.6]}
        position={[0, -0.05, 0]}
      />

      {/* Dorsal fin */}
      <mesh
        geometry={dorsalGeo}
        material={material}
        position={[-0.015, 0.3, -0.2]}
        rotation={[0, 0, 0]}
      />

      {/* Tail fluke */}
      <group ref={tailRef} position={[0, 0, 1.4]}>
        <mesh
          geometry={tailGeo}
          material={material}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>

      {/* Side fins */}
      <mesh
        geometry={sideFinGeo}
        material={material}
        position={[0.2, -0.1, -0.3]}
        rotation={[0.3, 0.5, 0]}
      />
      <mesh
        geometry={sideFinGeo}
        material={material}
        position={[-0.2, -0.1, -0.3]}
        rotation={[0.3, -0.5, Math.PI]}
        scale={[-1, 1, 1]}
      />

      {/* Eye (right) */}
      <mesh position={[0.2, 0.1, -1.1]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      {/* Eye (left) */}
      <mesh position={[-0.2, 0.1, -1.1]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
    </group>
  );
}
