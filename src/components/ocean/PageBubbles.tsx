import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo } from "react";

/**
 * Page-wide bubble parallax that rises throughout the entire scroll journey.
 */
export default function PageBubbles() {
  const { scrollYProgress } = useScroll();

  const bubbles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: 5 + Math.random() * 90,
        size: 3 + Math.random() * 10,
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 8,
        speed: 0.4 + Math.random() * 0.6,
      })),
    []
  );

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          className="absolute rounded-full"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            background:
              "radial-gradient(circle at 30% 30%, hsla(180, 100%, 95%, 0.5), hsla(190, 80%, 65%, 0.1))",
            border: "1px solid hsla(180, 100%, 85%, 0.2)",
          }}
          animate={{
            y: [
              `${100 + b.speed * 20}vh`,
              `${-10 - b.speed * 10}vh`,
            ],
            x: [0, (Math.random() - 0.5) * 60, 0],
            opacity: [0, 0.5, 0],
            scale: [0.3, 1, 0.2],
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
