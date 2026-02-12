import { motion } from "framer-motion";

interface FloatingParticlesProps {
  count?: number;
  color?: string;
  className?: string;
}

export default function FloatingParticles({ count = 12, color = "hsl(var(--primary))", className = "" }: FloatingParticlesProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: count }).map((_, i) => {
        const size = 2 + Math.random() * 4;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = 6 + Math.random() * 8;
        const delay = Math.random() * 4;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              background: color,
            }}
            animate={{
              y: [0, -(20 + Math.random() * 40), 0],
              x: [0, (Math.random() - 0.5) * 30, 0],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
          />
        );
      })}
    </div>
  );
}
