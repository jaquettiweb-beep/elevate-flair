import { motion } from "framer-motion";
import { useState, useCallback, ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  style?: React.CSSProperties;
  hoverShadow?: string;
  custom?: number;
  variants?: any;
  initial?: string;
  whileInView?: string;
  viewport?: any;
}

export default function TiltCard({
  children,
  className = "",
  intensity = 8,
  style,
  hoverShadow = "0 20px 40px -10px hsla(221, 83%, 53%, 0.2)",
  custom,
  variants,
  initial,
  whileInView,
  viewport,
}: TiltCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0, hovering: false });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * intensity, y: -y * intensity, hovering: true });
  }, [intensity]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0, hovering: false });
  }, []);

  return (
    <motion.div
      custom={custom}
      variants={variants}
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      className={className}
      style={{
        ...style,
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateY: tilt.x,
        rotateX: tilt.y,
        y: tilt.hovering ? -8 : 0,
        scale: tilt.hovering ? 1.03 : 1,
        boxShadow: tilt.hovering ? hoverShadow : "0 0 0 0 transparent",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
