import { motion } from "framer-motion";

/**
 * Smooth liquid wave overlay – seamless transition from hero to content.
 */
export default function WaveOverlay() {
  const nextColor = "hsl(185, 70%, 92%)";

  return (
    <div className="absolute bottom-0 left-0 right-0 z-[6] pointer-events-none">
      {/* Translucent back wave */}
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full block absolute bottom-0"
        preserveAspectRatio="none"
        style={{ height: 100 }}
      >
        <motion.path
          d="M0 70C240 30 480 90 720 60C960 30 1200 80 1440 50V120H0V70Z"
          fill="hsla(185, 65%, 85%, 0.5)"
          animate={{
            d: [
              "M0 70C240 30 480 90 720 60C960 30 1200 80 1440 50V120H0V70Z",
              "M0 55C240 85 480 40 720 70C960 45 1200 75 1440 60V120H0V55Z",
              "M0 70C240 30 480 90 720 60C960 30 1200 80 1440 50V120H0V70Z",
            ],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* Opaque front wave */}
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full block absolute bottom-0"
        preserveAspectRatio="none"
        style={{ height: 70 }}
      >
        <motion.path
          d="M0 80C240 50 480 100 720 75C960 50 1200 90 1440 65V120H0V80Z"
          fill={nextColor}
          animate={{
            d: [
              "M0 80C240 50 480 100 720 75C960 50 1200 90 1440 65V120H0V80Z",
              "M0 70C240 95 480 55 720 80C960 55 1200 85 1440 75V120H0V70Z",
              "M0 80C240 50 480 100 720 75C960 50 1200 90 1440 65V120H0V80Z",
            ],
          }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
      </svg>
    </div>
  );
}
