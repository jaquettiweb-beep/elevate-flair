import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Volumetric god rays — light shafts coming from above.
 */
export default function GodRays() {
  const groupRef = useRef<THREE.Group>(null);

  const rays = useMemo(() => {
    return [
      { x: -3, z: -2, width: 1.5, angle: -0.15, speed: 0.3, opacity: 0.08 },
      { x: 1, z: -3, width: 2, angle: 0.1, speed: 0.2, opacity: 0.06 },
      { x: 4, z: -1, width: 1.2, angle: -0.2, speed: 0.25, opacity: 0.07 },
      { x: -1, z: -4, width: 1.8, angle: 0.05, speed: 0.35, opacity: 0.05 },
    ];
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const ray = rays[i];
      if (ray && child instanceof THREE.Mesh) {
        const mat = child.material as THREE.ShaderMaterial;
        mat.uniforms.uTime.value = t;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {rays.map((ray, i) => (
        <mesh
          key={i}
          position={[ray.x, 4, ray.z]}
          rotation={[0, 0, ray.angle]}
        >
          <planeGeometry args={[ray.width, 14]} />
          <shaderMaterial
            transparent
            side={THREE.DoubleSide}
            depthWrite={false}
            uniforms={{
              uTime: { value: 0 },
              uSpeed: { value: ray.speed },
              uOpacity: { value: ray.opacity },
            }}
            vertexShader={`
              varying vec2 vUv;
              void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `}
            fragmentShader={`
              uniform float uTime;
              uniform float uSpeed;
              uniform float uOpacity;
              varying vec2 vUv;

              void main() {
                // Fade from top (bright) to bottom (transparent)
                float fade = smoothstep(1.0, 0.0, vUv.y);
                // Horizontal fade from center
                float hFade = 1.0 - abs(vUv.x - 0.5) * 2.0;
                hFade = pow(hFade, 2.0);
                // Shimmer
                float shimmer = 0.7 + 0.3 * sin(uTime * uSpeed * 3.0 + vUv.y * 5.0);
                float alpha = fade * hFade * shimmer * uOpacity;
                vec3 color = vec3(0.7, 0.9, 1.0);
                gl_FragColor = vec4(color, alpha);
              }
            `}
          />
        </mesh>
      ))}
    </group>
  );
}
