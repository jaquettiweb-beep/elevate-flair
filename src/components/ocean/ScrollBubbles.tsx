import { motion } from "framer-motion";
import { useMemo } from "react";

/**
 * 2D parallax bubbles + bokeh light particles that rise as user scrolls.
 */
export default function ScrollBubbles({ scrollProgress }: { scrollProgress: number }) {
  const bubbles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 4 + Math.random() * 14,
        delay: Math.random() * 4,
        duration: 5 + Math.random() * 7,
        speed: 0.6 + Math.random() * 0.6, // parallax speed multiplier
      })),
    []
  );

  const bokeh = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i + 100,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 20 + Math.random() * 60,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 8,
        speed: 0.3 + Math.random() * 0.4,
      })),
    []
  );

  return (
    <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
      {/* Rising bubbles */}
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          className="absolute rounded-full"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            bottom: `${-10 + scrollProgress * 120 * b.speed}%`,
            background:
              "radial-gradient(circle at 30% 30%, hsla(180, 100%, 95%, 0.7), hsla(190, 80%, 65%, 0.15))",
            border: "1px solid hsla(180, 100%, 85%, 0.35)",
            boxShadow: "inset 0 -2px 4px hsla(190, 80%, 60%, 0.1)",
          }}
          animate={{
            y: [0, -(200 + b.size * 20), -(400 + b.size * 30)],
            x: [0, (Math.random() - 0.5) * 50, 0],
            opacity: [0, 0.75, 0],
            scale: [0.4, 1, 0.2],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Bokeh light particles (slower, blurred, different speed) */}
      {bokeh.map((b) => (
        <motion.div
          key={b.id}
          className="absolute rounded-full"
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            width: b.size,
            height: b.size,
            background:
              "radial-gradient(circle, hsla(185, 100%, 80%, 0.12), transparent 70%)",
            filter: "blur(8px)",
          }}
          animate={{
            y: [0, -(100 * b.speed), -(200 * b.speed)],
            x: [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 60, (Math.random() - 0.5) * 30],
            opacity: [0, 0.4, 0],
            scale: [0.8, 1.2, 0.6],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
