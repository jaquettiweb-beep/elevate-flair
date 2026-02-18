import { motion } from "framer-motion";

/**
 * Multi-layered animated SVG wave overlay – seamless liquid transition
 * from the hero into the first content section.
 */
export default function WaveOverlay() {
  // Must match WhyFlipper's top gradient color for seamless blending
  const nextSectionColor = "hsl(185, 70%, 92%)";

  return (
    <div className="absolute bottom-0 left-0 right-0 z-[6] pointer-events-none">
      {/* Layer 1 – Deep translucent wave (furthest back) */}
      <svg
        viewBox="0 0 1440 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full block absolute bottom-0"
        preserveAspectRatio="none"
        style={{ height: 160 }}
      >
        <motion.path
          d="M0 100C180 50 360 140 540 90C720 40 900 130 1080 80C1260 30 1380 70 1440 60V200H0V100Z"
          fill="hsla(190, 70%, 40%, 0.2)"
          animate={{
            d: [
              "M0 100C180 50 360 140 540 90C720 40 900 130 1080 80C1260 30 1380 70 1440 60V200H0V100Z",
              "M0 80C180 130 360 50 540 100C720 60 900 120 1080 70C1260 110 1380 50 1440 80V200H0V80Z",
              "M0 100C180 50 360 140 540 90C720 40 900 130 1080 80C1260 30 1380 70 1440 60V200H0V100Z",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* Layer 2 – Mid translucent turquoise wave */}
      <svg
        viewBox="0 0 1440 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full block absolute bottom-0"
        preserveAspectRatio="none"
        style={{ height: 130 }}
      >
        <motion.path
          d="M0 90C240 40 480 120 720 80C960 40 1200 110 1440 70V200H0V90Z"
          fill="hsla(185, 65%, 80%, 0.4)"
          animate={{
            d: [
              "M0 90C240 40 480 120 720 80C960 40 1200 110 1440 70V200H0V90Z",
              "M0 70C240 110 480 50 720 90C960 60 1200 100 1440 80V200H0V70Z",
              "M0 90C240 40 480 120 720 80C960 40 1200 110 1440 70V200H0V90Z",
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />
      </svg>

      {/* Layer 3 – Front opaque wave matching next section */}
      <svg
        viewBox="0 0 1440 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full block absolute bottom-0"
        preserveAspectRatio="none"
        style={{ height: 100 }}
      >
        <motion.path
          d="M0 110C240 60 480 140 720 100C960 60 1200 130 1440 90V200H0V110Z"
          fill={nextSectionColor}
          animate={{
            d: [
              "M0 110C240 60 480 140 720 100C960 60 1200 130 1440 90V200H0V110Z",
              "M0 90C240 130 480 70 720 110C960 70 1200 120 1440 100V200H0V90Z",
              "M0 110C240 60 480 140 720 100C960 60 1200 130 1440 90V200H0V110Z",
            ],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        />
      </svg>
    </div>
  );
}
