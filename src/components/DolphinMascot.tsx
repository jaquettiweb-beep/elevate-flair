import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

function DolphinIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 140" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <path d="M30 80 C30 65 40 40 70 30 C90 24 110 28 130 40 C145 50 155 55 170 52 C175 51 180 52 178 56 C175 60 168 63 158 60 C162 68 158 78 148 82 C138 86 120 84 105 76 C90 68 70 68 55 74 C45 78 35 80 30 80Z" />
      {/* Dorsal fin */}
      <path d="M85 30 C82 10 92 4 98 14 C102 20 98 28 94 32Z" />
      {/* Beak/rostrum - elongated snout */}
      <path d="M170 52 C180 48 192 46 198 48 C194 52 184 54 178 56Z" />
      {/* Tail flukes */}
      <path d="M30 80 C20 72 10 62 14 55 C18 50 26 56 28 64Z" />
      <path d="M30 80 C18 84 8 90 12 97 C16 102 26 96 28 88Z" />
      {/* Pectoral fin */}
      <path d="M120 60 C115 72 108 80 102 76 C100 70 108 62 118 58Z" />
      {/* Eye */}
      <circle cx="162" cy="46" r="3.5" fill="white" opacity="0.95" />
      <circle cx="162.5" cy="46" r="1.8" fill="hsl(221, 83%, 20%)" />
      {/* Mouth line */}
      <path d="M172 54 C180 52 188 50 194 49" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      {/* Belly highlight */}
      <path d="M60 75 C75 70 95 68 115 72 C105 78 85 80 60 75Z" fill="white" opacity="0.15" />
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
