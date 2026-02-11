import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "left" | "right" | "zoom";
  className?: string;
}

export default function ScrollReveal({
  children,
  direction = "up",
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 45%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up" ? [70, 0] : [0, 0]
  );
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "left" ? [-70, 0] : direction === "right" ? [70, 0] : [0, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "zoom" ? [0.88, 1] : [1, 1]
  );
  const rotateX = useTransform(scrollYProgress, [0, 1], [6, 0]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        opacity,
        y,
        x,
        scale,
        rotateX,
        willChange: "transform, opacity",
        perspective: 1200,
      }}
    >
      {children}
    </motion.div>
  );
}
