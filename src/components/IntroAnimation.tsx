import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
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
import dolphinImg from "@/assets/dolphin-mascot.png";

/* ─── Smooth easing curves ─── */
const smoothEase = [0.4, 0, 0.2, 1] as const;
const gentleSpring = { type: "spring" as const, stiffness: 60, damping: 18, mass: 0.8 };

/* ─── Splash sound via Web Audio API ─── */
function useSplashSound() {
  const ctxRef = useRef<AudioContext | null>(null);

  const play = useCallback(() => {
    try {
      if (!ctxRef.current) ctxRef.current = new AudioContext();
      const ctx = ctxRef.current;
      const duration = 0.25;
      const sampleRate = ctx.sampleRate;
      const len = sampleRate * duration;
      const buffer = ctx.createBuffer(1, len, sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < len; i++) {
        const env = Math.exp(-i / (sampleRate * 0.04));
        data[i] = (Math.random() * 2 - 1) * env * 0.3;
      }
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 2000;
      filter.Q.value = 0.8;
      const gain = ctx.createGain();
      gain.gain.value = 0.12;
      src.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      src.start();
    } catch {
      // silently ignore
    }
  }, []);

  return play;
}

/* ─── Bubble particles ─── */
function generateBubbles(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 5 + Math.random() * 90,
    y: 60 + Math.random() * 40,
    size: 3 + Math.random() * 8,
    delay: Math.random() * 2.5,
    duration: 3.5 + Math.random() * 3,
  }));
}

const iconItems = [
  { Icon: SwimGoggleIcon, x: "12%", y: "18%", size: 50, delay: 0.5 },
  { Icon: DumbbellIcon, x: "82%", y: "12%", size: 55, delay: 0.7 },
  { Icon: SwimCapIcon, x: "8%", y: "72%", size: 42, delay: 0.9 },
  { Icon: KettlebellIcon, x: "88%", y: "78%", size: 40, delay: 0.8 },
  { Icon: YogaPoseIcon, x: "75%", y: "42%", size: 36, delay: 1.0 },
  { Icon: BoxingGloveIcon, x: "22%", y: "82%", size: 38, delay: 0.6 },
  { Icon: JumpRopeIcon, x: "90%", y: "42%", size: 34, delay: 1.1 },
];

type Phase = "appear" | "hold" | "fly" | "curtain";

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>("appear");
  const bubbles = useMemo(() => generateBubbles(16), []);
  const playSplash = useSplashSound();
  const splashPlayed = useRef(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("hold"), 600),
      setTimeout(() => setPhase("fly"), 3400),
      setTimeout(() => setPhase("curtain"), 4400),
      setTimeout(onComplete, 5200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  useEffect(() => {
    if (phase === "hold" && !splashPlayed.current) {
      splashPlayed.current = true;
      const t1 = setTimeout(playSplash, 1000);
      const t2 = setTimeout(playSplash, 2200);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [phase, playSplash]);

  const isFlyingOrLater = phase === "fly" || phase === "curtain";
  const showElements = phase === "hold";

  // Shared fade-out transition for exiting elements
  const fadeOutTransition = { duration: 0.6, ease: smoothEase };

  return (
    <motion.div
      className="fixed inset-0 z-[99999] overflow-hidden"
      initial={{ opacity: 1 }}
      animate={phase === "curtain" ? { opacity: 0 } : { opacity: 1 }}
      transition={phase === "curtain" ? { duration: 0.8, ease: [0.65, 0, 0.35, 1] } : {}}
      style={{ pointerEvents: phase === "curtain" ? "none" : "auto" }}
    >
      {/* ─── OCEAN BACKGROUND ─── */}
      <motion.div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, hsl(200,80%,25%) 0%, hsl(210,90%,15%) 50%, hsl(220,85%,10%) 100%)" }}
        animate={{
          background: [
            "linear-gradient(180deg, hsl(200,80%,25%) 0%, hsl(210,90%,15%) 50%, hsl(220,85%,10%) 100%)",
            "linear-gradient(180deg, hsl(195,75%,30%) 0%, hsl(205,85%,18%) 50%, hsl(215,80%,12%) 100%)",
            "linear-gradient(180deg, hsl(200,80%,25%) 0%, hsl(210,90%,15%) 50%, hsl(220,85%,10%) 100%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Light caustics */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80px 40px at 20% 30%, hsla(190,100%,70%,0.04) 0%, transparent 100%),
            radial-gradient(ellipse 60px 30px at 50% 50%, hsla(200,100%,75%,0.03) 0%, transparent 100%),
            radial-gradient(ellipse 90px 45px at 80% 40%, hsla(195,100%,65%,0.04) 0%, transparent 100%)
          `,
        }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.03, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Light shafts */}
      {[
        { x: "25%", w: 80, angle: -15, delay: 0 },
        { x: "55%", w: 60, angle: -8, delay: 1.2 },
        { x: "80%", w: 70, angle: -20, delay: 0.6 },
      ].map((shaft, i) => (
        <motion.div
          key={`shaft-${i}`}
          className="absolute top-0 pointer-events-none"
          style={{
            left: shaft.x,
            width: shaft.w,
            height: "100%",
            background: "linear-gradient(180deg, hsla(195,100%,80%,0.05) 0%, transparent 70%)",
            transform: `rotate(${shaft.angle}deg)`,
            transformOrigin: "top center",
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, delay: shaft.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* ─── BUBBLES ─── */}
      {bubbles.map((b) => (
        <motion.div
          key={`bubble-${b.id}`}
          className="absolute rounded-full border border-white/15"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: b.size,
            height: b.size,
            background: "radial-gradient(circle at 30% 30%, hsla(0,0%,100%,0.2), transparent)",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={
            isFlyingOrLater
              ? { opacity: 0, scale: 0, y: -100 }
              : showElements
              ? {
                  opacity: [0, 0.5, 0],
                  scale: [0, 1, 0.7],
                  y: [0, -(80 + b.y * 2)],
                  x: [0, (b.id % 2 ? 10 : -10)],
                }
              : { opacity: 0, scale: 0 }
          }
          transition={
            isFlyingOrLater
              ? fadeOutTransition
              : { duration: b.duration, delay: b.delay, repeat: Infinity, ease: "easeInOut" }
          }
        />
      ))}

      {/* Ripple rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`ripple-${i}`}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
          style={{ width: 220 + i * 160, height: 220 + i * 160 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isFlyingOrLater
              ? { scale: 1.5, opacity: 0 }
              : { scale: [0.5, 1.2, 0.5], opacity: [0, 0.15, 0] }
          }
          transition={
            isFlyingOrLater
              ? fadeOutTransition
              : { duration: 4, delay: 0.8 + i * 0.5, repeat: Infinity, ease: "easeInOut" }
          }
        />
      ))}

      {/* Gym icons */}
      {iconItems.map(({ Icon, x, y, size, delay }, i) => (
        <motion.div
          key={i}
          className="absolute text-white/8"
          style={{ left: x, top: y, width: size, height: size }}
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isFlyingOrLater
              ? { scale: 0, opacity: 0, y: -40 }
              : showElements
              ? { scale: 1, opacity: 1 }
              : { scale: 0, opacity: 0 }
          }
          transition={
            isFlyingOrLater
              ? fadeOutTransition
              : { delay, duration: 0.8, ...gentleSpring }
          }
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
          >
            <Icon className="w-full h-full" />
          </motion.div>
        </motion.div>
      ))}

      {/* ═══════════════════════════════════════
          ─── DOLPHINS ───
          ═══════════════════════════════════════ */}

      {/* HERO DOLPHIN – smooth parabolic arc */}
      <motion.div
        className="absolute z-40"
        style={{ width: 160, height: 160 }}
        initial={{ left: "-12%", top: "70%", rotate: -30, opacity: 0, scale: 0.7 }}
        animate={
          isFlyingOrLater
            ? { left: "105%", top: "25%", rotate: 15, opacity: 0, scale: 0.4 }
            : showElements
            ? {
                left: ["-12%", "18%", "42%", "68%", "105%"],
                top: ["70%", "18%", "8%", "18%", "70%"],
                rotate: [-30, -45, 0, 45, 30],
                opacity: [0, 1, 1, 1, 0],
                scale: [0.7, 1, 1.1, 1, 0.7],
              }
            : { left: "-12%", top: "70%", opacity: 0 }
        }
        transition={
          isFlyingOrLater
            ? { duration: 0.8, ease: smoothEase }
            : { duration: 3.5, delay: 0.4, repeat: Infinity, repeatDelay: 1.5, ease: [0.45, 0, 0.55, 1] }
        }
      >
        <img src={dolphinImg} alt="Flipper" className="w-full h-full object-contain drop-shadow-[0_0_30px_hsla(200,100%,70%,0.5)]" />
        <motion.div
          className="absolute -inset-6 rounded-full -z-10"
          style={{ background: "radial-gradient(circle, hsla(200,100%,70%,0.15) 0%, transparent 70%)" }}
        />
      </motion.div>

      {/* SECOND DOLPHIN – follows with natural offset */}
      <motion.div
        className="absolute z-40"
        style={{ width: 115, height: 115, opacity: 0.85 }}
        initial={{ left: "-18%", top: "75%", rotate: -25, opacity: 0, scale: 0.6 }}
        animate={
          isFlyingOrLater
            ? { left: "110%", top: "30%", rotate: 15, opacity: 0, scale: 0.3 }
            : showElements
            ? {
                left: ["-18%", "12%", "36%", "62%", "110%"],
                top: ["75%", "26%", "14%", "26%", "75%"],
                rotate: [-25, -40, 5, 40, 25],
                opacity: [0, 0.85, 0.85, 0.85, 0],
                scale: [0.6, 0.9, 0.95, 0.9, 0.6],
              }
            : { left: "-18%", top: "75%", opacity: 0 }
        }
        transition={
          isFlyingOrLater
            ? { duration: 0.8, ease: smoothEase }
            : { duration: 3.5, delay: 0.8, repeat: Infinity, repeatDelay: 1.5, ease: [0.45, 0, 0.55, 1] }
        }
      >
        <img src={dolphinImg} alt="Flipper" className="w-full h-full object-contain drop-shadow-[0_0_20px_hsla(200,100%,70%,0.4)]" />
      </motion.div>

      {/* THIRD DOLPHIN – baby */}
      <motion.div
        className="absolute z-40"
        style={{ width: 70, height: 70, opacity: 0.7 }}
        initial={{ left: "-22%", top: "78%", rotate: -20, opacity: 0, scale: 0.5 }}
        animate={
          isFlyingOrLater
            ? { left: "115%", top: "35%", rotate: 10, opacity: 0, scale: 0.25 }
            : showElements
            ? {
                left: ["-22%", "10%", "34%", "58%", "115%"],
                top: ["78%", "34%", "22%", "34%", "78%"],
                rotate: [-20, -35, 5, 35, 20],
                opacity: [0, 0.7, 0.7, 0.7, 0],
                scale: [0.5, 0.8, 0.85, 0.8, 0.5],
              }
            : { left: "-22%", top: "78%", opacity: 0 }
        }
        transition={
          isFlyingOrLater
            ? { duration: 0.8, ease: smoothEase }
            : { duration: 3.5, delay: 1.2, repeat: Infinity, repeatDelay: 1.5, ease: [0.45, 0, 0.55, 1] }
        }
      >
        <img src={dolphinImg} alt="Flipper" className="w-full h-full object-contain drop-shadow-[0_0_15px_hsla(200,100%,70%,0.3)]" />
      </motion.div>

      {/* ─── WATER SPLASH particles (unified, fewer for cleanliness) ─── */}
      {showElements && !isFlyingOrLater && [...Array(8)].map((_, i) => (
        <motion.div
          key={`splash-${i}`}
          className="absolute z-35 rounded-full"
          style={{
            width: 3 + i * 0.8,
            height: 3 + i * 0.8,
            background: `hsla(${195 + i * 3}, 100%, ${78 + i * 2}%, 0.6)`,
          }}
          initial={{ left: "42%", top: "8%", opacity: 0, scale: 0 }}
          animate={{
            left: `${36 + (i - 4) * 3}%`,
            top: [`8%`, `${-2 + Math.abs(i - 4) * 2}%`, `18%`],
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{ duration: 1.2, delay: 1.8 + i * 0.04, repeat: Infinity, repeatDelay: 3.8, ease: "easeOut" }}
        />
      ))}

      {/* ─── WATER SURFACE LINE ─── */}
      <motion.div
        className="absolute z-30 left-0 right-0"
        style={{ bottom: "22%", height: 3 }}
      >
        <svg width="100%" height="100%" viewBox="0 0 1440 3" preserveAspectRatio="none">
          <motion.path
            d="M0 1.5 C240 0 480 3 720 1.5 C960 0 1200 3 1440 1.5"
            stroke="hsla(200,100%,80%,0.12)"
            strokeWidth="1.5"
            fill="none"
            animate={{
              d: [
                "M0 1.5 C240 0 480 3 720 1.5 C960 0 1200 3 1440 1.5",
                "M0 1.5 C240 3 480 0 720 1.5 C960 3 1200 0 1440 1.5",
                "M0 1.5 C240 0 480 3 720 1.5 C960 0 1200 3 1440 1.5",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

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
                duration: 1,
                ease: [0.65, 0, 0.35, 1],
                opacity: { duration: 0.4, delay: 0.5 },
              }
            : {
                duration: 0.9,
                ...gentleSpring,
              }
        }
      >
        {/* Glow */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full -z-10"
          style={{
            background: "radial-gradient(circle, hsla(200,100%,80%,0.2) 0%, transparent 60%)",
          }}
          animate={
            isFlyingOrLater
              ? { scale: 0, opacity: 0 }
              : { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }
          }
          transition={
            isFlyingOrLater
              ? fadeOutTransition
              : { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }
        />

        {/* Outer glow */}
        <motion.div
          className="absolute w-[520px] h-[520px] rounded-full -z-10"
          style={{
            background: "radial-gradient(circle, hsla(200,90%,60%,0.08) 0%, transparent 70%)",
          }}
          animate={
            isFlyingOrLater
              ? { scale: 0, opacity: 0 }
              : { scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }
          }
          transition={
            isFlyingOrLater
              ? fadeOutTransition
              : { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
          }
        />

        {/* Logo image */}
        <motion.img
          src={flipperLogo}
          alt="Academia Flipper"
          className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-3xl"
          style={{
            boxShadow: "0 0 60px hsla(200,100%,70%,0.25), 0 20px 40px hsla(0,0%,0%,0.35)",
          }}
          initial={{ rotate: -5, rotateY: 10 }}
          animate={
            isFlyingOrLater
              ? { rotate: 0, rotateY: 0, borderRadius: "12px" }
              : phase !== "appear"
              ? { rotate: [0, 0.5, -0.5, 0], rotateY: [0, 2, -2, 0] }
              : { rotate: -5, rotateY: 10 }
          }
          transition={
            isFlyingOrLater
              ? { duration: 0.8, ease: smoothEase }
              : phase !== "appear"
              ? { duration: 8, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.8, ease: smoothEase }
          }
        />

        {/* Tagline */}
        <motion.div
          className="flex gap-0.5 mt-6 overflow-hidden"
          animate={isFlyingOrLater ? { opacity: 0, y: -15 } : {}}
          transition={{ duration: 0.4, ease: smoothEase }}
        >
          {"ACADEMIA & NATAÇÃO".split("").map((char, idx) => (
            <motion.span
              key={idx}
              className="text-white/90 text-sm sm:text-base font-bold tracking-[0.3em]"
              initial={{ y: 25, opacity: 0 }}
              animate={
                showElements || isFlyingOrLater
                  ? { y: 0, opacity: isFlyingOrLater ? 0 : 1 }
                  : { y: 25, opacity: 0 }
              }
              transition={{ delay: 1 + idx * 0.025, duration: 0.4, ease: smoothEase }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>

        {/* Loading bar */}
        <motion.div
          className="w-48 h-0.5 mt-5 rounded-full overflow-hidden bg-white/10"
          animate={isFlyingOrLater ? { opacity: 0, y: -8 } : { opacity: showElements ? 1 : 0 }}
          transition={{ duration: 0.4, ease: smoothEase }}
        >
          <motion.div
            className="h-full rounded-full origin-left"
            style={{
              background: "linear-gradient(90deg, hsla(200,100%,80%,0.8), hsla(200,100%,60%,0.4))",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: showElements ? 1 : 0 }}
            transition={{ duration: 2.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
          />
        </motion.div>
      </motion.div>

      {/* ─── BOTTOM WAVES ─── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 text-white/6"
        style={{ height: 80 }}
        initial={{ x: "-100%" }}
        animate={isFlyingOrLater ? { x: "100%", opacity: 0 } : { x: "0%" }}
        transition={
          isFlyingOrLater
            ? { duration: 0.7, ease: smoothEase }
            : { duration: 1.8, ease: [0.42, 0, 0.58, 1], delay: 0.2 }
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
            ? { duration: 0.7, ease: smoothEase }
            : { duration: 2.2, ease: [0.42, 0, 0.58, 1], delay: 0.4 }
        }
      >
        <WaterWaveIcon className="w-full h-full" />
      </motion.div>
    </motion.div>
  );
}
