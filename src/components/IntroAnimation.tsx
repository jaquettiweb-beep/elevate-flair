import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import {
  DumbbellIcon,
  SwimGoggleIcon,
  SwimCapIcon,
  WaterWaveIcon,
  KettlebellIcon,
  YogaPoseIcon,
  BoxingGloveIcon,
  JumpRopeIcon,
} from "@/components/GymDecorations";
import flipperLogo from "@/assets/flipper-logo-hd.jpg";

/** Dolphin SVG – Flipper's mascot */
function DolphinIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <path d="M10 50 C10 50 15 20 45 15 C60 12 75 18 85 30 C95 42 100 45 115 42 C112 48 105 52 95 50 C98 55 96 62 88 65 C80 68 65 66 55 60 C45 54 30 55 20 58 C15 60 10 55 10 50Z" />
      {/* Dorsal fin */}
      <path d="M55 18 C52 5 60 2 65 8 C68 12 65 18 62 20Z" />
      {/* Tail */}
      <path d="M10 50 C5 45 2 38 8 35 C12 33 15 38 15 42Z" />
      <path d="M10 50 C5 55 2 62 8 65 C12 67 15 62 15 58Z" />
      {/* Eye */}
      <circle cx="80" cy="28" r="2.5" fill="white" opacity="0.9" />
      {/* Smile */}
      <path d="M88 34 C92 36 96 35 100 33" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      {/* Pectoral fin */}
      <path d="M65 40 C60 48 55 52 50 48 C52 42 58 38 65 40Z" />
    </svg>
  );
}

/*
  Phases:
  1. "appear"   – Logo fades in large + centered (0→1s)
  2. "hold"     – Logo stays big, tagline + icons + particles appear (1→3.5s)
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
  { Icon: BoxingGloveIcon, x: "25%", y: "80%", size: 46, delay: 0.5 },
  { Icon: JumpRopeIcon, x: "88%", y: "45%", size: 42, delay: 1.1 },
  { Icon: DumbbellIcon, x: "35%", y: "12%", size: 38, delay: 0.7 },
  { Icon: SwimGoggleIcon, x: "65%", y: "78%", size: 48, delay: 0.9 },
];

// Floating particles for depth
function generateParticles(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 4,
    drift: -30 + Math.random() * 60,
  }));
}

type Phase = "appear" | "hold" | "fly" | "curtain";

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>("appear");
  const particles = useMemo(() => generateParticles(24), []);

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

      {/* Ambient light orbs for depth */}
      {[
        { x: "20%", y: "30%", size: 300, color: "hsla(30,100%,70%,0.08)", delay: 0 },
        { x: "75%", y: "60%", size: 250, color: "hsla(200,80%,60%,0.06)", delay: 0.5 },
        { x: "50%", y: "80%", size: 350, color: "hsla(20,90%,50%,0.05)", delay: 1 },
      ].map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isFlyingOrLater
              ? { scale: 3, opacity: 0 }
              : showElements
              ? { scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }
              : { scale: 0, opacity: 0 }
          }
          transition={
            isFlyingOrLater
              ? { duration: 0.5 }
              : { duration: 4, delay: orb.delay, repeat: Infinity, ease: "easeInOut" }
          }
        />
      ))}

      {/* Floating sparkle particles */}
      {particles.map((p) => (
        <motion.div
          key={`particle-${p.id}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={
            isFlyingOrLater
              ? { opacity: 0, scale: 0, y: -100 }
              : showElements
              ? {
                  opacity: [0, 0.6, 0],
                  scale: [0, 1, 0],
                  y: [0, p.drift, p.drift * 2],
                  x: [0, p.drift * 0.5],
                }
              : { opacity: 0, scale: 0 }
          }
          transition={
            isFlyingOrLater
              ? { duration: 0.3 }
              : {
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        />
      ))}

      {/* Ripple rings behind logo */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={`ripple-${i}`}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8"
          style={{ width: 160 + i * 130, height: 160 + i * 130 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isFlyingOrLater
              ? { scale: 2, opacity: 0 }
              : { scale: [0, 1.5, 0], opacity: [0, 0.25, 0] }
          }
          transition={
            isFlyingOrLater
              ? { duration: 0.5 }
              : { duration: 3, delay: 0.4 + i * 0.35, repeat: Infinity, ease: "easeOut" }
          }
        />
      ))}

      {/* Rotating orbit ring */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/6"
        style={{ width: 500, height: 500 }}
        initial={{ scale: 0, opacity: 0, rotate: 0 }}
        animate={
          isFlyingOrLater
            ? { scale: 2, opacity: 0 }
            : showElements
            ? { scale: 1, opacity: 1, rotate: 360 }
            : { scale: 0, opacity: 0 }
        }
        transition={
          isFlyingOrLater
            ? { duration: 0.5 }
            : { scale: { duration: 0.8 }, opacity: { duration: 0.8 }, rotate: { duration: 20, repeat: Infinity, ease: "linear" } }
        }
      >
        {/* Orbiting dots */}
        {[0, 90, 180, 270].map((angle) => (
          <motion.div
            key={`orbit-dot-${angle}`}
            className="absolute w-2 h-2 rounded-full bg-white/30"
            style={{
              left: `${50 + 50 * Math.cos((angle * Math.PI) / 180)}%`,
              top: `${50 + 50 * Math.sin((angle * Math.PI) / 180)}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </motion.div>

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
            animate={{ y: [0, -10, 0], rotate: [0, i % 2 === 0 ? 5 : -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
          >
            <Icon className="w-full h-full drop-shadow-[0_0_15px_hsla(0,0%,100%,0.15)]" />
          </motion.div>
        </motion.div>
      ))}

      {/* ─── DOLPHIN MASCOT ─── */}
      {/* Main dolphin – jumps in an arc across the screen */}
      <motion.div
        className="absolute z-30 text-white/40"
        style={{ width: 100, height: 70 }}
        initial={{ left: "-10%", top: "70%", rotate: -30, opacity: 0 }}
        animate={
          isFlyingOrLater
            ? { left: "110%", top: "80%", rotate: 15, opacity: 0 }
            : showElements
            ? {
                left: ["-10%", "25%", "50%", "75%", "110%"],
                top: ["70%", "25%", "15%", "25%", "70%"],
                rotate: [-30, -50, 0, 50, 30],
                opacity: [0, 1, 1, 1, 0],
                scaleX: [1, 1, 1, 1, 1],
              }
            : { left: "-10%", top: "70%", opacity: 0 }
        }
        transition={
          isFlyingOrLater
            ? { duration: 0.4 }
            : { duration: 3.5, delay: 0.8, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }
        }
      >
        <DolphinIcon className="w-full h-full drop-shadow-[0_0_20px_hsla(200,100%,70%,0.4)]" />
      </motion.div>

      {/* Second smaller dolphin – follows behind */}
      <motion.div
        className="absolute z-30 text-white/25"
        style={{ width: 65, height: 45 }}
        initial={{ left: "-15%", top: "75%", rotate: -30, opacity: 0 }}
        animate={
          isFlyingOrLater
            ? { left: "115%", top: "85%", rotate: 15, opacity: 0 }
            : showElements
            ? {
                left: ["-15%", "20%", "45%", "70%", "115%"],
                top: ["75%", "35%", "22%", "35%", "75%"],
                rotate: [-25, -45, 5, 45, 25],
                opacity: [0, 0.8, 0.8, 0.8, 0],
              }
            : { left: "-15%", top: "75%", opacity: 0 }
        }
        transition={
          isFlyingOrLater
            ? { duration: 0.4 }
            : { duration: 3.5, delay: 1.2, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }
        }
      >
        <DolphinIcon className="w-full h-full drop-shadow-[0_0_15px_hsla(200,100%,70%,0.3)]" />
      </motion.div>

      {/* Water splash particles – triggered with dolphin jump */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={`splash-${i}`}
          className="absolute z-25 rounded-full"
          style={{
            width: 4 + i * 2,
            height: 4 + i * 2,
            background: `hsla(200, 100%, ${70 + i * 5}%, ${0.4 - i * 0.05})`,
          }}
          initial={{ left: "50%", top: "45%", opacity: 0, scale: 0 }}
          animate={
            isFlyingOrLater
              ? { opacity: 0, scale: 0 }
              : showElements
              ? {
                  left: `${45 + (i - 2.5) * 4}%`,
                  top: [`45%`, `${30 - i * 3}%`, `55%`],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.5, 0],
                }
              : { opacity: 0, scale: 0 }
          }
          transition={
            isFlyingOrLater
              ? { duration: 0.3 }
              : { duration: 1.2, delay: 2.2 + i * 0.08, repeat: Infinity, repeatDelay: 3.8, ease: "easeOut" }
          }
        />
      ))}

      {/* ─── LOGO ─── */}
      <motion.div
        className="absolute z-20 flex flex-col items-center"
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
                top: "10px",
                left: "24px",
                x: "0%",
                y: "0%",
                scale: 0.15,
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

        {/* Secondary outer glow */}
        <motion.div
          className="absolute w-[550px] h-[550px] rounded-full -z-10"
          style={{
            background: "radial-gradient(circle, hsla(30,100%,70%,0.12) 0%, transparent 70%)",
          }}
          animate={
            isFlyingOrLater
              ? { scale: 0, opacity: 0 }
              : { scale: [1.1, 1.5, 1.1], opacity: [0.2, 0.4, 0.2] }
          }
          transition={
            isFlyingOrLater
              ? { duration: 0.4 }
              : { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
          }
        />

        {/* Logo image with 3D perspective */}
        <motion.img
          src={flipperLogo}
          alt="Academia Flipper"
          className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-3xl"
          style={{
            boxShadow: "0 0 80px hsla(0,0%,100%,0.35), 0 25px 50px hsla(0,0%,0%,0.4), 0 0 120px hsla(30,90%,50%,0.2)",
          }}
          initial={{ rotate: -8, rotateY: 15 }}
          animate={
            isFlyingOrLater
              ? { rotate: 0, rotateY: 0, borderRadius: "12px" }
              : phase !== "appear"
              ? { rotate: [0, 1, -1, 0], rotateY: [0, 3, -3, 0] }
              : { rotate: -8, rotateY: 15 }
          }
          transition={
            isFlyingOrLater
              ? { duration: 0.6, type: "spring" }
              : phase !== "appear"
              ? { duration: 6, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.6, type: "spring" }
          }
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

      {/* Diagonal light streak */}
      <motion.div
        className="absolute -z-0"
        style={{
          width: "200%",
          height: 2,
          background: "linear-gradient(90deg, transparent, hsla(0,0%,100%,0.15), transparent)",
          top: "40%",
          left: "-50%",
          transform: "rotate(-35deg)",
          transformOrigin: "center",
        }}
        initial={{ x: "-100%", opacity: 0 }}
        animate={
          isFlyingOrLater
            ? { x: "100%", opacity: 0 }
            : showElements
            ? { x: ["−100%", "100%"], opacity: [0, 1, 0] }
            : { x: "-100%", opacity: 0 }
        }
        transition={
          isFlyingOrLater
            ? { duration: 0.3 }
            : { duration: 3, delay: 1.5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }
        }
      />

      {/* Bottom wave decoration - doubled */}
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

      <motion.div
        className="absolute bottom-12 left-0 right-0 text-white/4"
        style={{ height: 60 }}
        initial={{ x: "100%" }}
        animate={isFlyingOrLater ? { x: "-100%", opacity: 0 } : { x: "0%" }}
        transition={
          isFlyingOrLater
            ? { duration: 0.5, ease: "easeIn" }
            : { duration: 2, ease: [0.42, 0, 0.58, 1], delay: 0.8 }
        }
      >
        <WaterWaveIcon className="w-full h-full" />
      </motion.div>
    </motion.div>
  );
}
