import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

function DolphinIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M10 50 C10 50 15 20 45 15 C60 12 75 18 85 30 C95 42 100 45 115 42 C112 48 105 52 95 50 C98 55 96 62 88 65 C80 68 65 66 55 60 C45 54 30 55 20 58 C15 60 10 55 10 50Z" />
      <path d="M55 18 C52 5 60 2 65 8 C68 12 65 18 62 20Z" />
      <path d="M10 50 C5 45 2 38 8 35 C12 33 15 38 15 42Z" />
      <path d="M10 50 C5 55 2 62 8 65 C12 67 15 62 15 58Z" />
      <circle cx="80" cy="28" r="2.5" fill="white" opacity="0.9" />
      <path d="M88 34 C92 36 96 35 100 33" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      <path d="M65 40 C60 48 55 52 50 48 C52 42 58 38 65 40Z" />
    </svg>
  );
}

export default function DolphinMascot() {
  const { scrollYProgress } = useScroll();
  const [hovered, setHovered] = useState(false);

  // React to scroll: dolphin rotates and bobs
  const rotate = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, -15, 5, -10, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, -12, 6, -8]);
  const scaleX = useTransform(scrollYProgress, [0, 0.5, 0.501, 1], [1, 1, -1, -1]);

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-50 cursor-pointer select-none"
      style={{ width: 72, height: 50 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title="🐬 Flipper!"
    >
      {/* Subtle glow behind */}
      <motion.div
        className="absolute -inset-3 rounded-full -z-10"
        style={{ background: "radial-gradient(circle, hsla(200,100%,65%,0.15) 0%, transparent 70%)" }}
        animate={hovered ? { scale: 1.6, opacity: 1 } : { scale: 1, opacity: 0.5 }}
        transition={{ duration: 0.3 }}
      />

      {/* Water ripple on hover */}
      {hovered && (
        <>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 bottom-0 -translate-x-1/2 rounded-full border border-primary/20"
              initial={{ width: 20, height: 10, opacity: 0.6 }}
              animate={{ width: 60 + i * 20, height: 20 + i * 8, opacity: 0 }}
              transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
            />
          ))}
        </>
      )}

      {/* Dolphin */}
      <motion.div
        className="text-primary"
        style={{ rotate, y, scaleX }}
        animate={
          hovered
            ? { y: [0, -20, 0], rotate: [0, -30, 15, 0], scale: [1, 1.2, 1] }
            : undefined
        }
        transition={hovered ? { duration: 0.8, ease: "easeInOut" } : undefined}
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <DolphinIcon className="w-full h-full drop-shadow-[0_2px_8px_hsla(200,100%,50%,0.3)]" />
        </motion.div>
      </motion.div>

      {/* Splash droplets on hover */}
      {hovered &&
        [0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={`drop-${i}`}
            className="absolute rounded-full bg-primary/40"
            style={{ width: 3 + i, height: 3 + i, left: 30 + (i - 2) * 10, bottom: 20 }}
            initial={{ opacity: 0, y: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, -25 - i * 5, 5],
              scale: [0, 1, 0],
            }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
          />
        ))}
    </motion.div>
  );
}
