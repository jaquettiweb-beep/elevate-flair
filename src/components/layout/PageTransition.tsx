import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Wave overlay that wipes across the screen */}
      <motion.div
        className="fixed inset-0 z-[9999] pointer-events-none"
        initial={{ clipPath: "inset(0 0 0 0%)" }}
        animate={{ clipPath: "inset(0 0 0 100%)" }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
      >
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(221, 83%, 53%)" />
              <stop offset="50%" stopColor="hsl(250, 70%, 50%)" />
              <stop offset="100%" stopColor="hsl(221, 83%, 40%)" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" fill="url(#waveGrad)" />
        </svg>
      </motion.div>

      {/* Second wave layer offset */}
      <motion.div
        className="fixed inset-0 z-[9998] pointer-events-none"
        initial={{ clipPath: "inset(0 0 0 0%)" }}
        animate={{ clipPath: "inset(0 0 0 100%)" }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      >
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <rect width="100" height="100" fill="hsl(221, 83%, 30%)" />
        </svg>
      </motion.div>

      {/* Page content fades in */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
      >
        {children}
      </motion.div>
    </>
  );
}
