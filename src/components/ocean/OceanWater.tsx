import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Animated water plane with vertex displacement for waves.
 */
export default function OceanWater() {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color("hsl(200, 80%, 35%)") },
      uColor2: { value: new THREE.Color("hsl(210, 90%, 20%)") },
    }),
    []
  );

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.8, 0]}
    >
      <planeGeometry args={[30, 30, 64, 64]} />
      <shaderMaterial
        transparent
        uniforms={uniforms}
        vertexShader={`
          uniform float uTime;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            
            float wave1 = sin(pos.x * 2.0 + uTime * 1.5) * 0.15;
            float wave2 = sin(pos.y * 3.0 + uTime * 1.0) * 0.1;
            float wave3 = sin((pos.x + pos.y) * 1.5 + uTime * 2.0) * 0.08;
            
            pos.z += wave1 + wave2 + wave3;
            vElevation = pos.z;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform float uTime;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            float mixVal = (vElevation + 0.3) * 1.5;
            vec3 color = mix(uColor2, uColor1, clamp(mixVal, 0.0, 1.0));
            
            // Specular highlights
            float spec = pow(max(vElevation, 0.0) * 3.0, 3.0);
            color += vec3(spec * 0.4);
            
            // Foam on peaks
            float foam = smoothstep(0.15, 0.25, vElevation);
            color = mix(color, vec3(0.9, 0.95, 1.0), foam * 0.3);
            
            float alpha = 0.85 - smoothstep(0.3, 0.5, length(vUv - 0.5));
            gl_FragColor = vec4(color, clamp(alpha, 0.4, 0.85));
          }
        `}
      />
    </mesh>
  );
}
