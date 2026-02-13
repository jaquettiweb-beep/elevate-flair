import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface Section3DTransitionProps {
  children: ReactNode;
  /** Rotation axis emphasis */
  effect?: "foldUp" | "foldLeft" | "foldRight" | "flipIn" | "swingDoor" | "cubeRotate";
  className?: string;
}

export default function Section3DTransition({
  children,
  effect = "foldUp",
  className = "",
}: Section3DTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 40%"],
  });

  // Each effect maps scroll progress to different 3D transforms
  const configs: Record<string, {
    rotateX: [number, number];
    rotateY: [number, number];
    scale: [number, number];
    y: [number, number];
    originX: number;
    originY: number;
  }> = {
    foldUp: {
      rotateX: [45, 0],
      rotateY: [0, 0],
      scale: [0.85, 1],
      y: [80, 0],
      originX: 0.5,
      originY: 1,
    },
    foldLeft: {
      rotateX: [0, 0],
      rotateY: [-35, 0],
      scale: [0.88, 1],
      y: [40, 0],
      originX: 0,
      originY: 0.5,
    },
    foldRight: {
      rotateX: [0, 0],
      rotateY: [35, 0],
      scale: [0.88, 1],
      y: [40, 0],
      originX: 1,
      originY: 0.5,
    },
    flipIn: {
      rotateX: [60, 0],
      rotateY: [0, 0],
      scale: [0.7, 1],
      y: [100, 0],
      originX: 0.5,
      originY: 0.8,
    },
    swingDoor: {
      rotateX: [0, 0],
      rotateY: [-60, 0],
      scale: [0.9, 1],
      y: [30, 0],
      originX: 0,
      originY: 0.5,
    },
    cubeRotate: {
      rotateX: [25, 0],
      rotateY: [25, 0],
      scale: [0.8, 1],
      y: [60, 0],
      originX: 0.5,
      originY: 0.5,
    },
  };

  const c = configs[effect] || configs.foldUp;

  const rotateX = useTransform(scrollYProgress, [0, 1], c.rotateX);
  const rotateY = useTransform(scrollYProgress, [0, 1], c.rotateY);
  const scale = useTransform(scrollYProgress, [0, 1], c.scale);
  const y = useTransform(scrollYProgress, [0, 1], c.y);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.6, 1]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective: "1400px", perspectiveOrigin: "50% 50%" }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          y,
          opacity,
          transformOrigin: `${c.originX * 100}% ${c.originY * 100}%`,
          willChange: "transform, opacity",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
