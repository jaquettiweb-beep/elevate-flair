import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import CausticsPlane from "./CausticsPlane";
import GodRays from "./GodRays";
import Bubbles3D from "./Bubbles3D";
import SwimmingDolphin from "./SwimmingDolphin";
import DissolveParticles from "./DissolveParticles";

type DolphinPhase = "swim" | "dissolve" | "gone";

interface IntroSceneProps {
  dolphinPhase: DolphinPhase;
  dissolveConverge: boolean;
  showParticles: boolean;
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} color="hsl(195, 70%, 70%)" />
      <directionalLight
        position={[3, 10, 5]}
        intensity={1.2}
        color="hsl(45, 80%, 95%)"
      />
      <pointLight position={[-4, 3, -3]} intensity={0.5} color="hsl(195, 100%, 65%)" />
      <pointLight position={[0, -3, 0]} intensity={0.3} color="hsl(175, 90%, 65%)" />
      <pointLight position={[2, 6, 2]} intensity={0.2} color="hsl(40, 90%, 80%)" />
    </>
  );
}

export default function IntroScene({
  dolphinPhase,
  dissolveConverge,
  showParticles,
}: IntroSceneProps) {
  return (
    <div className="absolute inset-0 z-[2]">
      <Canvas
        camera={{ position: [0, 1, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Lights />
          <CausticsPlane />
          <GodRays />
          <Bubbles3D count={50} />
          <SwimmingDolphin phase={dolphinPhase} />
          <DissolveParticles active={showParticles} converge={dissolveConverge} />
          <fog attach="fog" args={["hsl(200, 80%, 12%)", 5, 20]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
