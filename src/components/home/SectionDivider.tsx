import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SectionDividerProps {
  variant?: "wave" | "curved" | "slant";
  flip?: boolean;
  className?: string;
}

export default function SectionDivider({
  variant = "wave",
  flip = false,
  className = "",
}: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  const paths = {
    wave: [
      "M0,80 C240,140 480,20 720,80 C960,140 1200,20 1440,80 C1680,140 1920,60 1920,80 L1920,200 L0,200 Z",
      "M0,100 C320,40 640,140 960,90 C1280,40 1600,130 1920,100 L1920,200 L0,200 Z",
      "M0,120 C480,70 960,150 1440,100 C1680,80 1920,110 1920,120 L1920,200 L0,200 Z",
    ],
    curved: [
      "M0,140 Q480,40 960,100 Q1440,160 1920,140 L1920,200 L0,200 Z",
      "M0,150 Q960,60 1920,150 L1920,200 L0,200 Z",
    ],
    slant: [
      "M0,180 L1920,60 L1920,200 L0,200 Z",
      "M0,190 L1920,80 L1920,200 L0,200 Z",
    ],
  };

  const layerColors = [
    "hsla(200, 70%, 50%, 0.06)",
    "hsla(205, 65%, 40%, 0.04)",
    "hsla(210, 60%, 35%, 0.03)",
  ];

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden pointer-events-none ${className}`}
      style={{
        height: 160,
        marginTop: -80,
        marginBottom: -80,
        zIndex: 8,
        transform: flip ? "scaleY(-1)" : undefined,
      }}
    >
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        {/* Layered SVG waves */}
        <svg
          viewBox="0 0 1920 200"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 w-full h-full"
        >
          {paths[variant].map((d, i) => (
            <motion.path
              key={i}
              d={d}
              fill={layerColors[i] || layerColors[0]}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{
                duration: 5 + i * 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.8,
              }}
            />
          ))}
        </svg>

        {/* Soft light line */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-1/2"
          style={{
            width: "70%",
            height: 1,
            background:
              "linear-gradient(90deg, transparent 0%, hsla(185, 80%, 70%, 0.12) 20%, hsla(185, 80%, 70%, 0.2) 50%, hsla(185, 80%, 70%, 0.12) 80%, transparent 100%)",
            filter: "blur(0.5px)",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      </motion.div>
    </div>
  );
}
