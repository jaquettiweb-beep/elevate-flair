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
    offset: ["start 100%", "start 20%"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 35, damping: 24, mass: 1 });

  const configs: Record<string, {
    rotateX: [number, number];
    rotateY: [number, number];
    scale: [number, number];
    y: [number, number];
    originX: number;
    originY: number;
    blur: [number, number];
  }> = {
    foldUp: {
      rotateX: [8, 0],
      rotateY: [0, 0],
      scale: [0.92, 1],
      y: [80, 0],
      originX: 0.5,
      originY: 1,
      blur: [6, 0],
    },
    foldLeft: {
      rotateX: [0, 0],
      rotateY: [-8, 0],
      scale: [0.93, 1],
      y: [60, 0],
      originX: 0,
      originY: 0.5,
      blur: [5, 0],
    },
    foldRight: {
      rotateX: [0, 0],
      rotateY: [8, 0],
      scale: [0.93, 1],
      y: [60, 0],
      originX: 1,
      originY: 0.5,
      blur: [5, 0],
    },
    flipIn: {
      rotateX: [12, 0],
      rotateY: [0, 0],
      scale: [0.88, 1],
      y: [100, 0],
      originX: 0.5,
      originY: 0.6,
      blur: [8, 0],
    },
    swingDoor: {
      rotateX: [2, 0],
      rotateY: [-10, 0],
      scale: [0.9, 1],
      y: [50, 0],
      originX: 0,
      originY: 0.5,
      blur: [4, 0],
    },
    cubeRotate: {
      rotateX: [6, 0],
      rotateY: [6, 0],
      scale: [0.9, 1],
      y: [70, 0],
      originX: 0.5,
      originY: 0.5,
      blur: [6, 0],
    },
  };

  const c = configs[effect] || configs.foldUp;

  const rotateX = useTransform(smooth, [0, 1], c.rotateX);
  const rotateY = useTransform(smooth, [0, 1], c.rotateY);
  const scale = useTransform(smooth, [0, 1], c.scale);
  const y = useTransform(smooth, [0, 1], c.y);
  const opacity = useTransform(smooth, [0, 0.15, 1], [0, 0.7, 1]);
  const blur = useTransform(smooth, [0, 0.4, 1], [c.blur[0], c.blur[0] * 0.3, c.blur[1]]);
  const filterBlur = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective: "1000px", perspectiveOrigin: "50% 60%" }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          y,
          opacity,
          filter: filterBlur,
          transformOrigin: `${c.originX * 100}% ${c.originY * 100}%`,
          willChange: "transform, opacity, filter",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
