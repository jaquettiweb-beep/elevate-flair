import { useRef, useMemo, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Crystal-clear pool water with caustic light patterns and mouse-follow ripples.
 */
export default function OceanWater() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColor1: { value: new THREE.Color("hsl(180, 70%, 55%)") },
      uColor2: { value: new THREE.Color("hsl(200, 80%, 35%)") },
      uColorDeep: { value: new THREE.Color("hsl(215, 85%, 18%)") },
    }),
    []
  );

  const onPointerMove = useCallback(
    (e: THREE.Event) => {
      const event = e as unknown as { point: THREE.Vector3 };
      if (event.point) {
        mouseRef.current.set(event.point.x, event.point.z);
      }
    },
    []
  );

  useFrame(({ clock, pointer }) => {
    uniforms.uTime.value = clock.getElapsedTime();
    // Map NDC pointer to world-ish coordinates for the shader
    const mx = pointer.x * viewport.width * 0.5;
    const my = pointer.y * viewport.height * 0.5;
    uniforms.uMouse.value.lerp(new THREE.Vector2(mx, my), 0.08);
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.6, 0]}
    >
      <planeGeometry args={[40, 40, 128, 128]} />
      <shaderMaterial
        transparent
        uniforms={uniforms}
        vertexShader={`
          uniform float uTime;
          uniform vec2 uMouse;
          varying vec2 vUv;
          varying float vElevation;
          varying vec3 vWorldPos;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            
            // Main wave system
            float wave1 = sin(pos.x * 1.8 + uTime * 1.2) * 0.12;
            float wave2 = sin(pos.y * 2.5 + uTime * 0.8) * 0.08;
            float wave3 = sin((pos.x + pos.y) * 1.2 + uTime * 1.6) * 0.06;
            float wave4 = sin(pos.x * 4.0 - uTime * 2.0) * 0.03;
            float wave5 = cos(pos.y * 3.5 + uTime * 1.4) * 0.04;
            
            // Mouse ripple effect
            vec2 worldXY = pos.xy;
            float dist = length(worldXY - uMouse);
            float ripple = sin(dist * 8.0 - uTime * 6.0) * exp(-dist * 0.4) * 0.15;
            
            pos.z += wave1 + wave2 + wave3 + wave4 + wave5 + ripple;
            vElevation = pos.z;
            vWorldPos = pos;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform vec3 uColorDeep;
          uniform float uTime;
          uniform vec2 uMouse;
          varying vec2 vUv;
          varying float vElevation;
          varying vec3 vWorldPos;
          
          // Caustic pattern function
          float caustic(vec2 p, float t) {
            float c = 0.0;
            // Layer 1
            c += sin(p.x * 3.7 + t * 1.1) * sin(p.y * 4.3 - t * 0.9) * 0.5;
            // Layer 2
            c += sin(p.x * 5.1 - t * 1.5 + p.y * 2.0) * sin(p.y * 6.2 + t * 1.2) * 0.3;
            // Layer 3 (high frequency detail)
            c += sin(p.x * 8.5 + t * 2.0) * cos(p.y * 7.8 - t * 1.8) * 0.15;
            // Layer 4 (very fine)
            c += sin((p.x + p.y) * 12.0 + t * 3.0) * 0.08;
            return c;
          }
          
          void main() {
            // Base color gradient based on depth/UV
            float depthMix = smoothstep(0.2, 0.8, vUv.y);
            vec3 baseColor = mix(uColor1, uColor2, depthMix);
            
            // Caustic light patterns
            float c = caustic(vWorldPos.xy * 0.6, uTime);
            float causticIntensity = smoothstep(-0.2, 0.8, c);
            vec3 causticColor = vec3(0.7, 0.95, 1.0) * causticIntensity * 0.5;
            
            // Second caustic layer (offset) for complexity
            float c2 = caustic(vWorldPos.xy * 0.4 + vec2(3.0, 2.0), uTime * 0.7);
            float caustic2 = smoothstep(-0.1, 0.7, c2);
            causticColor += vec3(0.5, 0.85, 0.95) * caustic2 * 0.3;
            
            // Combine
            vec3 color = baseColor + causticColor;
            
            // Specular highlights on wave peaks
            float spec = pow(max(vElevation + 0.1, 0.0) * 4.0, 3.0);
            color += vec3(1.0, 1.0, 1.0) * spec * 0.35;
            
            // Foam on highest peaks
            float foam = smoothstep(0.12, 0.22, vElevation);
            color = mix(color, vec3(0.92, 0.97, 1.0), foam * 0.25);
            
            // Mouse proximity glow
            float mouseDist = length(vWorldPos.xy - uMouse);
            float mouseGlow = exp(-mouseDist * 0.3) * 0.15;
            color += vec3(0.6, 0.9, 1.0) * mouseGlow;
            
            // Edge fade for seamless blending
            float edgeFade = 1.0 - smoothstep(0.3, 0.5, length(vUv - 0.5));
            float alpha = clamp(0.75 * edgeFade, 0.0, 0.8);
            
            gl_FragColor = vec4(color, alpha);
          }
        `}
      />
    </mesh>
  );
}
