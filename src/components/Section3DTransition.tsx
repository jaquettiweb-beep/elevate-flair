import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, ReactNode } from "react";

interface Section3DTransitionProps {
  children: ReactNode;
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
    offset: ["start 100%", "start 30%"],
  });

  // Spring-smooth the raw scroll progress for buttery feel
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.5 });

  const configs: Record<string, {
    rotateX: [number, number];
    rotateY: [number, number];
    scale: [number, number];
    y: [number, number];
    originX: number;
    originY: number;
  }> = {
    foldUp: {
      rotateX: [18, 0],
      rotateY: [0, 0],
      scale: [0.92, 1],
      y: [50, 0],
      originX: 0.5,
      originY: 0.8,
    },
    foldLeft: {
      rotateX: [0, 0],
      rotateY: [-14, 0],
      scale: [0.93, 1],
      y: [30, 0],
      originX: 0,
      originY: 0.5,
    },
    foldRight: {
      rotateX: [0, 0],
      rotateY: [14, 0],
      scale: [0.93, 1],
      y: [30, 0],
      originX: 1,
      originY: 0.5,
    },
    flipIn: {
      rotateX: [22, 0],
      rotateY: [0, 0],
      scale: [0.88, 1],
      y: [60, 0],
      originX: 0.5,
      originY: 0.7,
    },
    swingDoor: {
      rotateX: [0, 0],
      rotateY: [-20, 0],
      scale: [0.94, 1],
      y: [25, 0],
      originX: 0,
      originY: 0.5,
    },
    cubeRotate: {
      rotateX: [12, 0],
      rotateY: [12, 0],
      scale: [0.9, 1],
      y: [40, 0],
      originX: 0.5,
      originY: 0.5,
    },
  };

  const c = configs[effect] || configs.foldUp;

  const rotateX = useTransform(smooth, [0, 1], c.rotateX);
  const rotateY = useTransform(smooth, [0, 1], c.rotateY);
  const scale = useTransform(smooth, [0, 1], c.scale);
  const y = useTransform(smooth, [0, 1], c.y);
  const opacity = useTransform(smooth, [0, 0.15, 1], [0.2, 0.7, 1]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective: "1200px", perspectiveOrigin: "50% 60%" }}
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
