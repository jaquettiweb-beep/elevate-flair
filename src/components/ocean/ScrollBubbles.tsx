import { motion } from "framer-motion";
import { useMemo } from "react";

/**
 * 2D bubble particles that rise as user scrolls (CSS overlay, not Three.js).
 */
export default function ScrollBubbles({ scrollProgress }: { scrollProgress: number }) {
  const bubbles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 4 + Math.random() * 12,
        delay: Math.random() * 3,
        duration: 4 + Math.random() * 6,
      })),
    []
  );

  return (
    <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          className="absolute rounded-full"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            bottom: `${-10 + scrollProgress * 120}%`,
            background:
              "radial-gradient(circle at 30% 30%, hsla(200, 100%, 90%, 0.6), hsla(200, 80%, 60%, 0.2))",
            border: "1px solid hsla(200, 100%, 80%, 0.3)",
          }}
          animate={{
            y: [0, -(200 + b.size * 20), -(400 + b.size * 30)],
            x: [0, (Math.random() - 0.5) * 40, 0],
            opacity: [0, 0.7, 0],
            scale: [0.5, 1, 0.3],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
