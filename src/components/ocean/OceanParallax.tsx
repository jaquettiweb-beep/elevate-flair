import { motion, useTransform, MotionValue } from "framer-motion";

/**
 * Layered ocean gradient background with parallax depth effect.
 */
export default function OceanParallax({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const layer1Y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);

  return (
    <div className="absolute inset-0 z-[0] overflow-hidden">
      {/* Deep ocean layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: layer3Y,
          background:
            "linear-gradient(180deg, hsl(210 90% 8%) 0%, hsl(220 85% 12%) 100%)",
        }}
      />

      {/* Mid ocean layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: layer2Y,
          background:
            "radial-gradient(ellipse at 50% 80%, hsla(200, 80%, 25%, 0.6) 0%, transparent 60%)",
        }}
      />

      {/* Surface light layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: layer1Y,
          background:
            "radial-gradient(ellipse at 30% 20%, hsla(190, 90%, 40%, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, hsla(200, 80%, 50%, 0.2) 0%, transparent 40%)",
        }}
      />

      {/* Light rays (caustics simulation) */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ y: layer1Y }}
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 40%, hsla(180, 100%, 70%, 0.15) 0%, transparent 40%)",
            "radial-gradient(ellipse at 60% 30%, hsla(180, 100%, 70%, 0.15) 0%, transparent 40%)",
            "radial-gradient(ellipse at 40% 50%, hsla(180, 100%, 70%, 0.15) 0%, transparent 40%)",
            "radial-gradient(ellipse at 20% 40%, hsla(180, 100%, 70%, 0.15) 0%, transparent 40%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
