import { motion, useTransform, MotionValue } from "framer-motion";

/**
 * Layered ocean gradient with turquoise-to-midnight-blue color morph on scroll.
 */
export default function OceanParallax({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const layer1Y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);

  // Color morph: turquoise at top → midnight blue as user scrolls
  const bgOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.6, 1]);

  return (
    <div className="absolute inset-0 z-[0] overflow-hidden">
      {/* Bright turquoise surface layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: layer3Y,
          background:
            "linear-gradient(180deg, hsl(185 75% 35%) 0%, hsl(195 80% 28%) 40%, hsl(210 85% 18%) 100%)",
        }}
      />

      {/* Deep ocean overlay that fades in on scroll */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: layer3Y,
          opacity: bgOpacity,
          background:
            "linear-gradient(180deg, hsl(220 85% 12%) 0%, hsl(230 80% 8%) 100%)",
        }}
      />

      {/* Caustic light pattern overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: layer2Y,
          background:
            "radial-gradient(ellipse at 40% 50%, hsla(180, 90%, 55%, 0.25) 0%, transparent 50%), radial-gradient(ellipse at 65% 40%, hsla(190, 85%, 50%, 0.2) 0%, transparent 45%)",
        }}
      />

      {/* Surface shimmer */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: layer1Y,
          background:
            "radial-gradient(ellipse at 25% 25%, hsla(175, 90%, 65%, 0.2) 0%, transparent 40%), radial-gradient(ellipse at 75% 35%, hsla(185, 80%, 60%, 0.15) 0%, transparent 35%)",
        }}
      />

      {/* Animated caustic light rays */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ y: layer1Y }}
        animate={{
          background: [
            "radial-gradient(ellipse at 15% 35%, hsla(175, 100%, 75%, 0.2) 0%, transparent 35%), radial-gradient(ellipse at 70% 50%, hsla(185, 100%, 70%, 0.15) 0%, transparent 30%)",
            "radial-gradient(ellipse at 55% 25%, hsla(175, 100%, 75%, 0.2) 0%, transparent 35%), radial-gradient(ellipse at 30% 55%, hsla(185, 100%, 70%, 0.15) 0%, transparent 30%)",
            "radial-gradient(ellipse at 40% 45%, hsla(175, 100%, 75%, 0.2) 0%, transparent 35%), radial-gradient(ellipse at 60% 30%, hsla(185, 100%, 70%, 0.15) 0%, transparent 30%)",
            "radial-gradient(ellipse at 15% 35%, hsla(175, 100%, 75%, 0.2) 0%, transparent 35%), radial-gradient(ellipse at 70% 50%, hsla(185, 100%, 70%, 0.15) 0%, transparent 30%)",
          ],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
