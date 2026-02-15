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
  const smooth = useSpring(scrollYProgress, { stiffness: 40, damping: 28, mass: 0.8 });

  const configs: Record<string, {
    rotateX: [number, number];
    rotateY: [number, number];
    scale: [number, number];
    y: [number, number];
    originX: number;
    originY: number;
  }> = {
    foldUp: {
      rotateX: [4, 0],
      rotateY: [0, 0],
      scale: [0.97, 1],
      y: [40, 0],
      originX: 0.5,
      originY: 0.8,
    },
    foldLeft: {
      rotateX: [0, 0],
      rotateY: [-3, 0],
      scale: [0.97, 1],
      y: [35, 0],
      originX: 0.3,
      originY: 0.5,
    },
    foldRight: {
      rotateX: [0, 0],
      rotateY: [3, 0],
      scale: [0.97, 1],
      y: [35, 0],
      originX: 0.7,
      originY: 0.5,
    },
    flipIn: {
      rotateX: [5, 0],
      rotateY: [0, 0],
      scale: [0.96, 1],
      y: [45, 0],
      originX: 0.5,
      originY: 0.7,
    },
    swingDoor: {
      rotateX: [0, 0],
      rotateY: [-4, 0],
      scale: [0.97, 1],
      y: [30, 0],
      originX: 0.2,
      originY: 0.5,
    },
    cubeRotate: {
      rotateX: [3, 0],
      rotateY: [3, 0],
      scale: [0.96, 1],
      y: [35, 0],
      originX: 0.5,
      originY: 0.5,
    },
  };

  const c = configs[effect] || configs.foldUp;

  const rotateX = useTransform(smooth, [0, 1], c.rotateX);
  const rotateY = useTransform(smooth, [0, 1], c.rotateY);
  const scale = useTransform(smooth, [0, 1], c.scale);
  const y = useTransform(smooth, [0, 1], c.y);
  const opacity = useTransform(smooth, [0, 0.25, 1], [0.4, 0.85, 1]);

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
