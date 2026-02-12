import { motion } from "framer-motion";

interface SectionWaveProps {
  position: "top" | "bottom";
  color?: string;
  flip?: boolean;
}

export default function SectionWave({ position, color = "hsl(var(--background))", flip = false }: SectionWaveProps) {
  return (
    <div
      className={`absolute left-0 right-0 z-[1] pointer-events-none ${
        position === "top" ? "top-0 -translate-y-[98%]" : "bottom-0 translate-y-[98%]"
      }`}
      style={{ transform: flip ? "rotate(180deg)" : undefined }}
    >
      <svg
        viewBox="0 0 1440 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-[60px] block"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0 30C240 0 480 60 720 30C960 0 1200 60 1440 30V60H0V30Z"
          fill={color}
          initial={{ d: "M0 30C240 0 480 60 720 30C960 0 1200 60 1440 30V60H0V30Z" }}
          animate={{
            d: [
              "M0 30C240 0 480 60 720 30C960 0 1200 60 1440 30V60H0V30Z",
              "M0 20C240 50 480 10 720 40C960 10 1200 50 1440 20V60H0V20Z",
              "M0 30C240 0 480 60 720 30C960 0 1200 60 1440 30V60H0V30Z",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
