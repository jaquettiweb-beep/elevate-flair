import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import {
  DumbbellIcon,
  SwimGoggleIcon,
  SwimCapIcon,
  WaterWaveIcon,
  KettlebellIcon,
  YogaPoseIcon,
} from "@/components/GymDecorations";
import flipperLogo from "@/assets/flipper-logo-hd.jpg";

const INTRO_DURATION = 3400;

const iconItems = [
  { Icon: SwimGoggleIcon, x: "18%", y: "22%", size: 56, delay: 0.2 },
  { Icon: DumbbellIcon, x: "78%", y: "18%", size: 64, delay: 0.35 },
  { Icon: SwimCapIcon, x: "12%", y: "68%", size: 50, delay: 0.5 },
  { Icon: KettlebellIcon, x: "82%", y: "72%", size: 48, delay: 0.45 },
  { Icon: WaterWaveIcon, x: "50%", y: "82%", size: 72, delay: 0.6 },
  { Icon: YogaPoseIcon, x: "70%", y: "42%", size: 42, delay: 0.7 },
];

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"icons" | "logo" | "exit">("icons");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("logo"), 600);
    const t2 = setTimeout(() => setPhase("exit"), 2400);
    const t3 = setTimeout(onComplete, INTRO_DURATION);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, hsl(30,90%,50%) 0%, hsl(25,95%,45%) 50%, hsl(20,90%,40%) 100%)" }}
      initial={{ opacity: 1 }}
      animate={phase === "exit" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Water ripple rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`ripple-${i}`}
          className="absolute rounded-full border-2 border-white/10"
          style={{ width: 250 + i * 180, height: 250 + i * 180 }}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: [0, 1.8], opacity: [0.4, 0] }}
          transition={{ duration: 2.5, delay: 0.3 + i * 0.35, repeat: Infinity, ease: "easeOut" }}
        />
      ))}

      {/* Floating gym icons */}
      {iconItems.map(({ Icon, x, y, size, delay }, i) => (
        <motion.div
          key={i}
          className="absolute text-white/20"
          style={{ left: x, top: y, width: size, height: size }}
          initial={{ scale: 0, opacity: 0, rotate: -20 }}
          animate={
            phase === "exit"
              ? { scale: 0, opacity: 0, y: -50 }
              : { scale: 1, opacity: 1, rotate: 0 }
          }
          transition={{ delay: phase === "exit" ? 0 : delay, duration: 0.5, type: "spring", stiffness: 130 }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay }}
          >
            <Icon className="w-full h-full drop-shadow-[0_0_12px_hsla(0,0%,100%,0.2)]" />
          </motion.div>
        </motion.div>
      ))}

      {/* Center: Official Flipper logo */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-6"
        initial={{ scale: 0.3, opacity: 0, y: 30 }}
        animate={
          phase === "exit"
            ? { scale: 1.3, opacity: 0, y: -40 }
            : phase === "logo"
            ? { scale: 1, opacity: 1, y: 0 }
            : { scale: 0.3, opacity: 0, y: 30 }
        }
        transition={{ duration: 0.8, type: "spring", stiffness: 90, damping: 14 }}
      >
        {/* Glow behind logo */}
        <motion.div
          className="absolute w-72 h-72 rounded-full"
          style={{ background: "radial-gradient(circle, hsla(0,0%,100%,0.25) 0%, transparent 65%)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Logo image */}
        <motion.img
          src={flipperLogo}
          alt="Academia Flipper"
          className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl shadow-2xl"
          style={{ boxShadow: "0 0 60px hsla(0,0%,100%,0.3), 0 20px 40px hsla(0,0%,0%,0.3)" }}
          initial={{ rotate: -10 }}
          animate={phase === "logo" ? { rotate: 0 } : {}}
          transition={{ duration: 0.6, type: "spring" }}
        />

        {/* Tagline with staggered letters */}
        <motion.div className="flex gap-0.5 overflow-hidden mt-2">
          {"ACADEMIA & NATAÇÃO".split("").map((char, i) => (
            <motion.span
              key={i}
              className="text-white/80 text-xs sm:text-sm font-bold tracking-[0.25em]"
              initial={{ y: 24, opacity: 0 }}
              animate={phase !== "icons" ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
              transition={{ delay: 0.8 + i * 0.025, duration: 0.3 }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>

        {/* Loading bar */}
        <motion.div
          className="w-40 h-0.5 mt-2 rounded-full overflow-hidden bg-white/15"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase !== "icons" ? 1 : 0 }}
        >
          <motion.div
            className="h-full rounded-full origin-left"
            style={{ background: "linear-gradient(90deg, hsl(0,0%,100%), hsla(0,0%,100%,0.6))" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase !== "icons" ? 1 : 0 }}
            transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
          />
        </motion.div>
      </motion.div>

      {/* Bottom wave sweep */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 text-white/8"
        style={{ height: 70 }}
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1.2, ease: [0.42, 0, 0.58, 1], delay: 0.4 }}
      >
        <WaterWaveIcon className="w-full h-full" />
      </motion.div>
    </motion.div>
  );
}
