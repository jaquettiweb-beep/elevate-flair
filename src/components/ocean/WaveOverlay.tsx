import { motion } from "framer-motion";

/**
 * Animated SVG wave overlay at the bottom of the hero section.
 */
export default function WaveOverlay() {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-[6] pointer-events-none">
      {/* Back wave */}
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full block absolute bottom-0"
        preserveAspectRatio="none"
        style={{ height: 100 }}
      >
        <motion.path
          d="M0 60C200 20 400 100 600 60C800 20 1000 100 1200 60C1400 20 1440 40 1440 40V120H0V60Z"
          fill="hsla(200, 70%, 30%, 0.4)"
          animate={{
            d: [
              "M0 60C200 20 400 100 600 60C800 20 1000 100 1200 60C1400 20 1440 40 1440 40V120H0V60Z",
              "M0 50C200 90 400 30 600 70C800 40 1000 80 1200 40C1400 60 1440 50 1440 50V120H0V50Z",
              "M0 60C200 20 400 100 600 60C800 20 1000 100 1200 60C1400 20 1440 40 1440 40V120H0V60Z",
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* Front wave */}
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full block absolute bottom-0"
        preserveAspectRatio="none"
        style={{ height: 80 }}
      >
        <motion.path
          d="M0 80C240 40 480 100 720 70C960 40 1200 90 1440 60V120H0V80Z"
          fill="hsl(var(--background))"
          animate={{
            d: [
              "M0 80C240 40 480 100 720 70C960 40 1200 90 1440 60V120H0V80Z",
              "M0 70C240 100 480 50 720 80C960 50 1200 100 1440 70V120H0V70Z",
              "M0 80C240 40 480 100 720 70C960 40 1200 90 1440 60V120H0V80Z",
            ],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </svg>
    </div>
  );
}
