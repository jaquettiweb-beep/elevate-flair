import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import ProceduralDolphin from "./ProceduralDolphin";
import OceanWater from "./OceanWater";
import BubbleParticles from "./BubbleParticles";

interface OceanSceneProps {
  scrollProgress: number;
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} color="hsl(200, 60%, 70%)" />
      <directionalLight
        position={[5, 8, 3]}
        intensity={1.2}
        color="hsl(40, 80%, 90%)"
        castShadow
      />
      <pointLight
        position={[-3, 2, -2]}
        intensity={0.5}
        color="hsl(200, 100%, 60%)"
      />
      {/* Caustic-like light from below */}
      <pointLight
        position={[0, -3, 0]}
        intensity={0.3}
        color="hsl(180, 80%, 60%)"
      />
    </>
  );
}

export default function OceanScene({ scrollProgress }: OceanSceneProps) {
  return (
    <div className="absolute inset-0 z-[2]" style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 1.5, 5], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: "none" }}
      >
        <Suspense fallback={null}>
          <Lights />
          <ProceduralDolphin scrollProgress={scrollProgress} />
          <OceanWater />
          <BubbleParticles scrollProgress={scrollProgress} />
          <Environment preset="sunset" />
          {/* Fog for depth */}
          <fog attach="fog" args={["hsl(210, 80%, 15%)", 5, 20]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
