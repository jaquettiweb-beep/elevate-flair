import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "left" | "right" | "zoom" | "flip";
  intensity?: "normal" | "high";
  className?: string;
}

export default function ScrollReveal({
  children,
  direction = "up",
  intensity = "normal",
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 100%", "start 60%"],
  });

  const mult = intensity === "high" ? 1.2 : 1;

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up" ? [60 * mult, 0] : [0, 0]
  );
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "left" ? [-60 * mult, 0] : direction === "right" ? [60 * mult, 0] : [0, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "zoom" ? [0.92, 1] : [1, 1]
  );
  const rotateX = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "flip" ? [12, 0] : direction === "up" ? [4 * mult, 0] : [0, 0]
  );
  const rotateY = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "left" ? [6, 0] : direction === "right" ? [-6, 0] : [0, 0]
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y,
        x,
        scale,
        rotateX,
        rotateY,
        perspective: 1200,
        willChange: "transform",
      }}
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
