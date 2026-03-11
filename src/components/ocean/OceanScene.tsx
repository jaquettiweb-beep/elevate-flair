import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import OceanWater from "./OceanWater";
import BubbleParticles from "./BubbleParticles";

interface OceanSceneProps {
  scrollProgress: number;
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} color="hsl(190, 70%, 80%)" />
      <directionalLight
        position={[5, 10, 3]}
        intensity={1.4}
        color="hsl(45, 80%, 95%)"
        castShadow
      />
      <pointLight
        position={[-4, 3, -3]}
        intensity={0.6}
        color="hsl(190, 100%, 65%)"
      />
      {/* Caustic light from below */}
      <pointLight
        position={[0, -2, 0]}
        intensity={0.4}
        color="hsl(175, 90%, 65%)"
      />
      {/* Warm surface light */}
      <pointLight
        position={[3, 5, 2]}
        intensity={0.3}
        color="hsl(40, 90%, 80%)"
      />
    </>
  );
}

export default function OceanScene({ scrollProgress }: OceanSceneProps) {
  return (
    <div className="absolute inset-0 z-[2]" style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 2, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: "auto" }}
      >
        <Suspense fallback={null}>
          <Lights />
          <OceanWater />
          <BubbleParticles scrollProgress={scrollProgress} />
          <Environment preset="sunset" />
          <fog attach="fog" args={["hsl(195, 80%, 20%)", 6, 25]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
