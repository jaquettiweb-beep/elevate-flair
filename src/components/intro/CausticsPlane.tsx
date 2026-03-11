import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Full-screen caustics plane using a custom GLSL shader.
 * Renders animated pool-light caustic patterns.
 */
export default function CausticsPlane() {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color("hsl(195, 100%, 70%)") },
      uColor2: { value: new THREE.Color("hsl(200, 80%, 25%)") },
    }),
    []
  );

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime() * 0.4;
  });

  return (
    <mesh ref={meshRef} position={[0, -3, -5]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[40, 40, 1, 1]} />
      <shaderMaterial
        transparent
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          varying vec2 vUv;

          // Simplex-like hash
          vec2 hash(vec2 p) {
            p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
            return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
          }

          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(
              mix(dot(hash(i), f), dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
              mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)), dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
              u.y
            );
          }

          float caustics(vec2 uv, float time) {
            float c = 0.0;
            // Layer 1
            vec2 p1 = uv * 4.0 + vec2(time * 0.3, time * 0.2);
            c += abs(noise(p1)) * 0.5;
            // Layer 2 — rotated
            vec2 p2 = uv * 6.0 + vec2(-time * 0.2, time * 0.35);
            p2 = mat2(0.8, -0.6, 0.6, 0.8) * p2;
            c += abs(noise(p2)) * 0.35;
            // Layer 3 — fine detail
            vec2 p3 = uv * 10.0 + vec2(time * 0.15, -time * 0.25);
            c += abs(noise(p3)) * 0.15;
            return c;
          }

          void main() {
            float c = caustics(vUv, uTime);
            // Brighten the peaks
            c = pow(c, 1.5) * 2.0;
            vec3 color = mix(uColor2, uColor1, c);
            float alpha = c * 0.35;
            gl_FragColor = vec4(color, alpha);
          }
        `}
      />
    </mesh>
  );
}
