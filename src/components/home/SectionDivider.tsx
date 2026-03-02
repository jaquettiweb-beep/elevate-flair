import { motion } from "framer-motion";

interface SectionDividerProps {
  variant?: "wave" | "curved" | "slant";
  flip?: boolean;
  colorFrom?: string;
  colorTo?: string;
  className?: string;
}

export default function SectionDivider({
  variant = "wave",
  flip = false,
  colorFrom = "transparent",
  colorTo = "transparent",
  className = "",
}: SectionDividerProps) {
  const paths = {
    wave: "M0,64 C320,120 640,0 960,64 C1280,128 1600,0 1920,64 L1920,160 L0,160 Z",
    curved: "M0,128 Q960,0 1920,128 L1920,160 L0,160 Z",
    slant: "M0,160 L1920,40 L1920,160 L0,160 Z",
  };

  return (
    <div
      className={`relative w-full overflow-hidden pointer-events-none ${className}`}
      style={{
        height: 120,
        marginTop: -60,
        marginBottom: -60,
        zIndex: 8,
        transform: flip ? "scaleY(-1)" : undefined,
      }}
    >
      {/* Gradient fade overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${colorFrom} 0%, ${colorTo} 100%)`,
        }}
      />

      {/* Animated SVG wave */}
      <motion.svg
        viewBox="0 0 1920 160"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full"
        style={{ height: "100%" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <defs>
          <linearGradient id={`divGrad-${variant}-${flip}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsla(200, 70%, 50%, 0.08)" />
            <stop offset="100%" stopColor="hsla(210, 75%, 30%, 0.02)" />
          </linearGradient>
        </defs>
        <motion.path
          d={paths[variant]}
          fill={`url(#divGrad-${variant}-${flip})`}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.svg>

      {/* Soft light line */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 bottom-1/2"
        style={{
          width: "60%",
          height: 1,
          background: "linear-gradient(90deg, transparent 0%, hsla(185, 80%, 70%, 0.15) 30%, hsla(185, 80%, 70%, 0.25) 50%, hsla(185, 80%, 70%, 0.15) 70%, transparent 100%)",
          filter: "blur(0.5px)",
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </div>
  );
}
