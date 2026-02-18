import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "left" | "right" | "zoom" | "flip";
  intensity?: "normal" | "high";
  className?: string;
  delay?: number;
}

const buoyancyTransition = {
  type: "spring" as const,
  stiffness: 60,
  damping: 14,
  mass: 0.8,
};

const directionMap = {
  up: { y: 50, x: 0, scale: 1, rotateX: 4, rotateY: 0 },
  left: { y: 0, x: -60, scale: 1, rotateX: 0, rotateY: 6 },
  right: { y: 0, x: 60, scale: 1, rotateX: 0, rotateY: -6 },
  zoom: { y: 0, x: 0, scale: 0.9, rotateX: 0, rotateY: 0 },
  flip: { y: 0, x: 0, scale: 1, rotateX: 14, rotateY: 0 },
};

export default function ScrollReveal({
  children,
  direction = "up",
  intensity = "normal",
  className = "",
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const mult = intensity === "high" ? 1.3 : 1;
  const d = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        y: d.y * mult,
        x: d.x * mult,
        scale: d.scale,
        rotateX: d.rotateX * mult,
        rotateY: d.rotateY,
      }}
      animate={
        isInView
          ? { opacity: 1, y: 0, x: 0, scale: 1, rotateX: 0, rotateY: 0 }
          : undefined
      }
      transition={{ ...buoyancyTransition, delay }}
      style={{ perspective: 1200, willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

/** Parallax wrapper — content moves at a different rate than scroll */
export function ParallaxSection({
  children,
  speed = 0.15,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, `${-speed * 100}%`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.04]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y, scale }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
