import { motion } from "framer-motion";
import { useState, useCallback, ReactNode, useRef } from "react";

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
  liquidHover?: boolean;
}

export default function TiltCard({
  children,
  className = "",
  intensity = 8,
  style,
  hoverShadow = "0 20px 40px -10px hsla(185, 80%, 45%, 0.2)",
  custom,
  variants,
  initial,
  whileInView,
  viewport,
  liquidHover = false,
}: TiltCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0, hovering: false });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (nx - 0.5) * intensity, y: -(ny - 0.5) * intensity, hovering: true });
    setMousePos({ x: nx * 100, y: ny * 100 });
  }, [intensity]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0, hovering: false });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      custom={custom}
      variants={variants}
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      className={`${className} relative overflow-hidden`}
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
      {/* Liquid wave overlay */}
      {liquidHover && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-[1]"
          animate={{
            opacity: tilt.hovering ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: `
              radial-gradient(
                ellipse 120px 80px at ${mousePos.x}% ${mousePos.y}%,
                hsla(185, 90%, 70%, 0.18),
                transparent 70%
              ),
              radial-gradient(
                ellipse 200px 120px at ${mousePos.x}% ${mousePos.y + 15}%,
                hsla(195, 80%, 55%, 0.08),
                transparent 70%
              )
            `,
          }}
        />
      )}
      {/* Liquid wave line that follows cursor */}
      {liquidHover && tilt.hovering && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <motion.path
            d={`M 0 ${mousePos.y} Q ${mousePos.x - 15} ${mousePos.y - 8} ${mousePos.x} ${mousePos.y - 4} Q ${mousePos.x + 15} ${mousePos.y} ${mousePos.x + 30} ${mousePos.y + 3} Q ${mousePos.x + 45} ${mousePos.y + 6} 100 ${mousePos.y}`}
            fill="none"
            stroke="hsla(185, 90%, 70%, 0.25)"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
          <motion.path
            d={`M 0 ${mousePos.y + 6} Q ${mousePos.x - 20} ${mousePos.y - 2} ${mousePos.x} ${mousePos.y + 2} Q ${mousePos.x + 20} ${mousePos.y + 6} ${mousePos.x + 40} ${mousePos.y + 8} Q ${mousePos.x + 50} ${mousePos.y + 10} 100 ${mousePos.y + 5}`}
            fill="none"
            stroke="hsla(190, 80%, 60%, 0.15)"
            strokeWidth="0.4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
        </svg>
      )}
      <div className="relative z-[2]">{children}</div>
    </motion.div>
  );
}
