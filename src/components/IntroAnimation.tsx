import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  DumbbellIcon,
  SwimGoggleIcon,
  SwimCapIcon,
  WaterWaveIcon,
  KettlebellIcon,
  YogaPoseIcon,
} from "@/components/GymDecorations";

const INTRO_DURATION = 3200; // ms total

const iconItems = [
  { Icon: SwimGoggleIcon, x: "20%", y: "25%", size: 60, delay: 0.3 },
  { Icon: DumbbellIcon, x: "75%", y: "20%", size: 70, delay: 0.5 },
  { Icon: SwimCapIcon, x: "15%", y: "65%", size: 55, delay: 0.7 },
  { Icon: KettlebellIcon, x: "80%", y: "70%", size: 50, delay: 0.6 },
  { Icon: WaterWaveIcon, x: "50%", y: "80%", size: 80, delay: 0.8 },
  { Icon: YogaPoseIcon, x: "65%", y: "40%", size: 45, delay: 0.9 },
];

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"icons" | "logo" | "exit">("icons");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("logo"), 800);
    const t2 = setTimeout(() => setPhase("exit"), 2200);
    const t3 = setTimeout(onComplete, INTRO_DURATION);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? null : null}
      <motion.div
        className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(221,83%,12%) 0%, hsl(221,83%,8%) 50%, hsl(250,60%,10%) 100%)" }}
        initial={{ opacity: 1 }}
        animate={phase === "exit" ? { opacity: 0 } : { opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        onAnimationComplete={() => { if (phase === "exit") onComplete(); }}
      >
        {/* Animated water ripple rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`ripple-${i}`}
            className="absolute rounded-full border border-white/5"
            style={{ width: 300 + i * 200, height: 300 + i * 200 }}
            initial={{ scale: 0, opacity: 0.4 }}
            animate={{ scale: [0, 1.5], opacity: [0.3, 0] }}
            transition={{
              duration: 2,
              delay: 0.4 + i * 0.3,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Floating gym icons that fly in */}
        {iconItems.map(({ Icon, x, y, size, delay }, i) => (
          <motion.div
            key={i}
            className="absolute text-white/20"
            style={{ left: x, top: y, width: size, height: size }}
            initial={{ scale: 0, opacity: 0, rotate: -30 }}
            animate={
              phase === "exit"
                ? { scale: 0, opacity: 0, y: -60 }
                : { scale: 1, opacity: 1, rotate: 0 }
            }
            transition={{
              delay: phase === "exit" ? 0 : delay,
              duration: 0.6,
              type: "spring",
              stiffness: 120,
            }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
            >
              <Icon className="w-full h-full drop-shadow-[0_0_15px_hsla(200,100%,70%,0.3)]" />
            </motion.div>
          </motion.div>
        ))}

        {/* Center logo / brand */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-4"
          initial={{ scale: 0.5, opacity: 0, y: 20 }}
          animate={
            phase === "exit"
              ? { scale: 1.2, opacity: 0, y: -30 }
              : phase === "logo"
              ? { scale: 1, opacity: 1, y: 0 }
              : { scale: 0.5, opacity: 0, y: 20 }
          }
          transition={{ duration: 0.7, type: "spring", stiffness: 100, damping: 15 }}
        >
          {/* Glow behind logo */}
          <motion.div
            className="absolute w-64 h-64 rounded-full"
            style={{
              background: "radial-gradient(circle, hsla(221,83%,53%,0.3) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Flipper text */}
          <motion.h1
            className="font-display text-6xl sm:text-7xl font-black tracking-tight"
            style={{
              background: "linear-gradient(135deg, hsl(221,83%,53%), hsl(200,100%,60%), hsl(24,95%,53%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            FLIPPER
          </motion.h1>

          {/* Tagline with staggered letters */}
          <motion.div className="flex gap-1 overflow-hidden">
            {"ACADEMIA & NATAÇÃO".split("").map((char, i) => (
              <motion.span
                key={i}
                className="text-white/60 text-sm sm:text-base font-semibold tracking-[0.3em]"
                initial={{ y: 20, opacity: 0 }}
                animate={
                  phase !== "icons"
                    ? { y: 0, opacity: 1 }
                    : { y: 20, opacity: 0 }
                }
                transition={{ delay: 0.9 + i * 0.03, duration: 0.3 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>

          {/* Loading bar */}
          <motion.div
            className="w-48 h-0.5 mt-4 rounded-full overflow-hidden bg-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase !== "icons" ? 1 : 0 }}
          >
            <motion.div
              className="h-full rounded-full origin-left"
              style={{
                background: "linear-gradient(90deg, hsl(221,83%,53%), hsl(24,95%,53%))",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: phase !== "icons" ? 1 : 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
            />
          </motion.div>
        </motion.div>

        {/* Wave sweep at bottom */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 text-primary/10"
          style={{ height: 80 }}
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 1.5, ease: [0.42, 0, 0.58, 1], delay: 0.5 }}
        >
          <WaterWaveIcon className="w-full h-full" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
