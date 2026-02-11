import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  DumbbellIcon,
  SwimGoggleIcon,
  SwimCapIcon,
  WaterWaveIcon,
  KettlebellIcon,
  YogaPoseIcon,
} from "@/components/GymDecorations";
import flipperLogo from "@/assets/flipper-logo-hd.jpg";

/*
  Phases:
  1. "appear"   – Logo fades in large + centered (0→1s)
  2. "hold"     – Logo stays big, tagline + icons appear (1→3.5s)
  3. "fly"      – Logo shrinks & flies to header top-left (3.5→4.5s)
  4. "curtain"  – Background wipes away revealing site (4.5→5.2s)
  5. done       – onComplete called
*/

const iconItems = [
  { Icon: SwimGoggleIcon, x: "15%", y: "20%", size: 60, delay: 0.4 },
  { Icon: DumbbellIcon, x: "80%", y: "15%", size: 68, delay: 0.6 },
  { Icon: SwimCapIcon, x: "10%", y: "70%", size: 52, delay: 0.8 },
  { Icon: KettlebellIcon, x: "85%", y: "75%", size: 50, delay: 0.7 },
  { Icon: WaterWaveIcon, x: "50%", y: "85%", size: 76, delay: 1.0 },
  { Icon: YogaPoseIcon, x: "72%", y: "45%", size: 44, delay: 0.9 },
];

type Phase = "appear" | "hold" | "fly" | "curtain";

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>("appear");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("hold"), 800),
      setTimeout(() => setPhase("fly"), 3200),
      setTimeout(() => setPhase("curtain"), 4200),
      setTimeout(onComplete, 5000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const isFlyingOrLater = phase === "fly" || phase === "curtain";
  const showElements = phase === "hold";

  return (
    <motion.div
      className="fixed inset-0 z-[99999] overflow-hidden"
      initial={{ opacity: 1 }}
      animate={phase === "curtain" ? { opacity: 0 } : { opacity: 1 }}
      transition={phase === "curtain" ? { duration: 0.7, ease: [0.76, 0, 0.24, 1] } : {}}
      style={{ pointerEvents: phase === "curtain" ? "none" : "auto" }}
    >
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, hsl(30,90%,50%) 0%, hsl(25,95%,45%) 40%, hsl(20,90%,38%) 100%)",
        }}
      />

      {/* Ripple rings behind logo */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={`ripple-${i}`}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8"
          style={{ width: 200 + i * 160, height: 200 + i * 160 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isFlyingOrLater
              ? { scale: 2, opacity: 0 }
              : { scale: [0, 1.5, 0], opacity: [0, 0.3, 0] }
          }
          transition={
            isFlyingOrLater
              ? { duration: 0.5 }
              : { duration: 3, delay: 0.6 + i * 0.4, repeat: Infinity, ease: "easeOut" }
          }
        />
      ))}

      {/* Floating gym icons */}
      {iconItems.map(({ Icon, x, y, size, delay }, i) => (
        <motion.div
          key={i}
          className="absolute text-white/15"
          style={{ left: x, top: y, width: size, height: size }}
          initial={{ scale: 0, opacity: 0, rotate: -25 }}
          animate={
            isFlyingOrLater
              ? { scale: 0, opacity: 0, y: -80, rotate: 15 }
              : showElements
              ? { scale: 1, opacity: 1, rotate: 0 }
              : { scale: 0, opacity: 0 }
          }
          transition={
            isFlyingOrLater
              ? { duration: 0.4, ease: "easeIn" }
              : { delay, duration: 0.6, type: "spring", stiffness: 120 }
          }
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
          >
            <Icon className="w-full h-full drop-shadow-[0_0_15px_hsla(0,0%,100%,0.15)]" />
          </motion.div>
        </motion.div>
      ))}

      {/* ─── LOGO ─── */}
      <motion.div
        className="absolute z-20 flex flex-col items-center"
        /* Start centered on screen */
        initial={{
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          scale: 0,
          opacity: 0,
        }}
        animate={
          isFlyingOrLater
            ? {
                /* Fly to header top-left position */
                top: "8px",
                left: "24px",
                x: "0%",
                y: "0%",
                scale: 0.2,
                opacity: phase === "curtain" ? 0 : 1,
              }
            : {
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
                scale: 1,
                opacity: 1,
              }
        }
        transition={
          isFlyingOrLater
            ? {
                duration: 0.9,
                ease: [0.65, 0, 0.35, 1],
                opacity: { duration: 0.3, delay: 0.6 },
              }
            : {
                duration: 0.8,
                type: "spring",
                stiffness: 80,
                damping: 15,
              }
        }
      >
        {/* Glow */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full -z-10"
          style={{
            background: "radial-gradient(circle, hsla(0,0%,100%,0.3) 0%, transparent 60%)",
          }}
          animate={
            isFlyingOrLater
              ? { scale: 0, opacity: 0 }
              : { scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }
          }
          transition={
            isFlyingOrLater
              ? { duration: 0.4 }
              : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
          }
        />

        {/* Logo image */}
        <motion.img
          src={flipperLogo}
          alt="Academia Flipper"
          className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-3xl"
          style={{
            boxShadow: "0 0 80px hsla(0,0%,100%,0.35), 0 25px 50px hsla(0,0%,0%,0.4)",
          }}
          initial={{ rotate: -8 }}
          animate={
            isFlyingOrLater
              ? { rotate: 0, borderRadius: "12px" }
              : phase !== "appear"
              ? { rotate: 0 }
              : { rotate: -8 }
          }
          transition={{ duration: 0.6, type: "spring" }}
        />

        {/* Tagline */}
        <motion.div
          className="flex gap-0.5 mt-6 overflow-hidden"
          animate={isFlyingOrLater ? { opacity: 0, y: -20 } : {}}
          transition={{ duration: 0.3 }}
        >
          {"ACADEMIA & NATAÇÃO".split("").map((char, idx) => (
            <motion.span
              key={idx}
              className="text-white/90 text-sm sm:text-base font-bold tracking-[0.3em]"
              initial={{ y: 30, opacity: 0 }}
              animate={
                showElements || isFlyingOrLater
                  ? { y: 0, opacity: isFlyingOrLater ? 0 : 1 }
                  : { y: 30, opacity: 0 }
              }
              transition={{ delay: 1.2 + idx * 0.03, duration: 0.35 }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>

        {/* Loading bar */}
        <motion.div
          className="w-48 h-1 mt-5 rounded-full overflow-hidden bg-white/15"
          animate={isFlyingOrLater ? { opacity: 0, y: -10 } : { opacity: showElements ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="h-full rounded-full origin-left"
            style={{
              background: "linear-gradient(90deg, hsl(0,0%,100%), hsla(0,0%,100%,0.5))",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: showElements ? 1 : 0 }}
            transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }}
          />
        </motion.div>
      </motion.div>

      {/* Bottom wave decoration */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 text-white/6"
        style={{ height: 80 }}
        initial={{ x: "-100%" }}
        animate={isFlyingOrLater ? { x: "100%", opacity: 0 } : { x: "0%" }}
        transition={
          isFlyingOrLater
            ? { duration: 0.5, ease: "easeIn" }
            : { duration: 1.5, ease: [0.42, 0, 0.58, 1], delay: 0.5 }
        }
      >
        <WaterWaveIcon className="w-full h-full" />
      </motion.div>
    </motion.div>
  );
}
