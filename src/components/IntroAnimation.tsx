import { motion } from "framer-motion";
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

/* ─── Splash sound via Web Audio API ─── */
function useSplashSound() {
  const ctxRef = useRef<AudioContext | null>(null);

  const play = useCallback(() => {
    try {
      if (!ctxRef.current) ctxRef.current = new AudioContext();
      const ctx = ctxRef.current;

      // White noise burst = water splash
      const duration = 0.25;
      const sampleRate = ctx.sampleRate;
      const len = sampleRate * duration;
      const buffer = ctx.createBuffer(1, len, sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < len; i++) {
        // Envelope: quick attack, fast decay
        const env = Math.exp(-i / (sampleRate * 0.04));
        data[i] = (Math.random() * 2 - 1) * env * 0.3;
      }

      const src = ctx.createBufferSource();
      src.buffer = buffer;

      // Bandpass filter to sound more watery
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 2000;
      filter.Q.value = 0.8;

      const gain = ctx.createGain();
      gain.gain.value = 0.15;

      src.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      src.start();
    } catch {
      // Audio not available, silently ignore
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
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 3,
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
  const bubbles = useMemo(() => generateBubbles(20), []);
  const playSplash = useSplashSound();
  const splashPlayed = useRef(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("hold"), 800),
      setTimeout(() => setPhase("fly"), 3600),
      setTimeout(() => setPhase("curtain"), 4600),
      setTimeout(onComplete, 5400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // Play splash when dolphins are in hold phase
  useEffect(() => {
    if (phase === "hold" && !splashPlayed.current) {
      splashPlayed.current = true;
      // First splash when main dolphin emerges
      const t1 = setTimeout(playSplash, 1200);
      // Second splash at apex
      const t2 = setTimeout(playSplash, 2600);
      // Third splash for second dolphin
      const t3 = setTimeout(playSplash, 1600);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
  }, [phase, playSplash]);

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
      {/* ─── OCEAN BACKGROUND ─── */}
      <motion.div
        className="absolute inset-0"
        initial={{ background: "linear-gradient(180deg, hsl(200,80%,25%) 0%, hsl(210,90%,15%) 50%, hsl(220,85%,10%) 100%)" }}
        animate={{
          background: [
            "linear-gradient(180deg, hsl(200,80%,25%) 0%, hsl(210,90%,15%) 50%, hsl(220,85%,10%) 100%)",
            "linear-gradient(180deg, hsl(195,75%,30%) 0%, hsl(205,85%,18%) 50%, hsl(215,80%,12%) 100%)",
            "linear-gradient(180deg, hsl(200,80%,25%) 0%, hsl(210,90%,15%) 50%, hsl(220,85%,10%) 100%)",
          ],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Water surface light caustics */}
      <motion.div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80px 40px at 20% 30%, hsla(190,100%,70%,0.5) 0%, transparent 100%),
            radial-gradient(ellipse 60px 30px at 50% 50%, hsla(200,100%,75%,0.4) 0%, transparent 100%),
            radial-gradient(ellipse 90px 45px at 80% 40%, hsla(195,100%,65%,0.5) 0%, transparent 100%),
            radial-gradient(ellipse 70px 35px at 35% 70%, hsla(205,100%,70%,0.3) 0%, transparent 100%)
          `,
        }}
        animate={{ opacity: [0.04, 0.08, 0.04], scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Ambient underwater light shafts */}
      {[
        { x: "25%", w: 80, angle: -15, delay: 0 },
        { x: "55%", w: 60, angle: -8, delay: 1 },
        { x: "80%", w: 70, angle: -20, delay: 0.5 },
      ].map((shaft, i) => (
        <motion.div
          key={`shaft-${i}`}
          className="absolute top-0 pointer-events-none"
          style={{
            left: shaft.x,
            width: shaft.w,
            height: "100%",
            background: "linear-gradient(180deg, hsla(195,100%,80%,0.06) 0%, transparent 70%)",
            transform: `rotate(${shaft.angle}deg)`,
            transformOrigin: "top center",
          }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, delay: shaft.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* ─── BUBBLES ─── */}
      {bubbles.map((b) => (
        <motion.div
          key={`bubble-${b.id}`}
          className="absolute rounded-full border border-white/20"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: b.size,
            height: b.size,
            background: "radial-gradient(circle at 30% 30%, hsla(0,0%,100%,0.25), transparent)",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={
            isFlyingOrLater
              ? { opacity: 0, scale: 0, y: -200 }
              : showElements
              ? {
                  opacity: [0, 0.6, 0],
                  scale: [0, 1, 0.8],
                  y: [0, -(100 + b.y * 3)],
                  x: [0, (b.id % 2 ? 15 : -15)],
                }
              : { opacity: 0, scale: 0 }
          }
          transition={
            isFlyingOrLater
              ? { duration: 0.3 }
              : { duration: b.duration, delay: b.delay, repeat: Infinity, ease: "easeOut" }
          }
        />
      ))}

      {/* Ripple rings behind logo */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={`ripple-${i}`}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/6"
          style={{ width: 200 + i * 140, height: 200 + i * 140 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isFlyingOrLater
              ? { scale: 2, opacity: 0 }
              : { scale: [0, 1.3, 0], opacity: [0, 0.2, 0] }
          }
          transition={
            isFlyingOrLater
              ? { duration: 0.5 }
              : { duration: 3, delay: 0.5 + i * 0.4, repeat: Infinity, ease: "easeOut" }
          }
        />
      ))}

      {/* Floating gym icons (smaller, background) */}
      {iconItems.map(({ Icon, x, y, size, delay }, i) => (
        <motion.div
          key={i}
          className="absolute text-white/10"
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
            animate={{ y: [0, -8, 0], rotate: [0, i % 2 === 0 ? 4 : -4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
          >
            <Icon className="w-full h-full drop-shadow-[0_0_10px_hsla(0,0%,100%,0.1)]" />
          </motion.div>
        </motion.div>
      ))}

      {/* ═══════════════════════════════════════════════
          ─── DOLPHINS – Main visual element ───
          ═══════════════════════════════════════════════ */}

      {/* HERO DOLPHIN – Large, jumps in a dramatic arc */}
      <motion.div
        className="absolute z-40 text-white"
        style={{ width: 180, height: 120 }}
        initial={{ left: "-15%", top: "75%", rotate: -35, opacity: 0, scale: 0.8 }}
        animate={
          isFlyingOrLater
            ? { left: "110%", top: "20%", rotate: 20, opacity: 0, scale: 0.5 }
            : showElements
            ? {
                left: ["-15%", "15%", "40%", "65%", "110%"],
                top: ["75%", "15%", "5%", "15%", "75%"],
                rotate: [-35, -55, 0, 55, 35],
                opacity: [0, 1, 1, 1, 0],
                scale: [0.8, 1.1, 1.2, 1.1, 0.8],
              }
            : { left: "-15%", top: "75%", opacity: 0 }
        }
        transition={
          isFlyingOrLater
            ? { duration: 0.5 }
            : { duration: 3, delay: 0.6, repeat: Infinity, repeatDelay: 2, ease: [0.37, 0, 0.63, 1] }
        }
      >
        <img src={dolphinImg} alt="Flipper" className="w-full h-full drop-shadow-[0_0_40px_hsla(200,100%,70%,0.6)] brightness-110 object-contain" />
        {/* Glow aura around dolphin */}
        <motion.div
          className="absolute -inset-8 rounded-full -z-10"
          style={{ background: "radial-gradient(circle, hsla(200,100%,70%,0.2) 0%, transparent 70%)" }}
        />
      </motion.div>

      {/* SECOND DOLPHIN – Medium, follows with offset */}
      <motion.div
        className="absolute z-40 text-white/80"
        style={{ width: 130, height: 87 }}
        initial={{ left: "-20%", top: "80%", rotate: -30, opacity: 0, scale: 0.7 }}
        animate={
          isFlyingOrLater
            ? { left: "115%", top: "30%", rotate: 20, opacity: 0, scale: 0.4 }
            : showElements
            ? {
                left: ["-20%", "10%", "35%", "60%", "115%"],
                top: ["80%", "25%", "12%", "25%", "80%"],
                rotate: [-30, -50, 5, 50, 30],
                opacity: [0, 0.9, 0.9, 0.9, 0],
                scale: [0.7, 1, 1.05, 1, 0.7],
              }
            : { left: "-20%", top: "80%", opacity: 0 }
        }
        transition={
          isFlyingOrLater
            ? { duration: 0.5 }
            : { duration: 3, delay: 1.0, repeat: Infinity, repeatDelay: 2, ease: [0.37, 0, 0.63, 1] }
        }
      >
        <img src={dolphinImg} alt="Flipper" className="w-full h-full drop-shadow-[0_0_30px_hsla(200,100%,70%,0.5)] object-contain" />
      </motion.div>

      {/* THIRD DOLPHIN – Small baby dolphin, cute trailing */}
      <motion.div
        className="absolute z-40 text-white/60"
        style={{ width: 80, height: 53 }}
        initial={{ left: "-25%", top: "82%", rotate: -25, opacity: 0, scale: 0.6 }}
        animate={
          isFlyingOrLater
            ? { left: "120%", top: "35%", rotate: 15, opacity: 0, scale: 0.3 }
            : showElements
            ? {
                left: ["-25%", "8%", "32%", "56%", "120%"],
                top: ["82%", "32%", "18%", "32%", "82%"],
                rotate: [-25, -45, 8, 45, 25],
                opacity: [0, 0.7, 0.7, 0.7, 0],
                scale: [0.6, 0.9, 0.95, 0.9, 0.6],
              }
            : { left: "-25%", top: "82%", opacity: 0 }
        }
        transition={
          isFlyingOrLater
            ? { duration: 0.5 }
            : { duration: 3, delay: 1.4, repeat: Infinity, repeatDelay: 2, ease: [0.37, 0, 0.63, 1] }
        }
      >
        <img src={dolphinImg} alt="Flipper" className="w-full h-full drop-shadow-[0_0_20px_hsla(200,100%,70%,0.4)] object-contain" />
      </motion.div>

      {/* ─── WATER SPLASH at entry point (left) ─── */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`splash-entry-${i}`}
          className="absolute z-35 rounded-full"
          style={{
            width: 3 + Math.random() * 8,
            height: 3 + Math.random() * 8,
            background: `hsla(${190 + i * 3}, 100%, ${75 + i * 2}%, ${0.6 - i * 0.04})`,
          }}
          initial={{ left: "5%", top: "75%", opacity: 0, scale: 0 }}
          animate={
            isFlyingOrLater
              ? { opacity: 0, scale: 0 }
              : showElements
              ? {
                  left: `${2 + i * 2.5}%`,
                  top: [`75%`, `${55 - i * 4}%`, `80%`],
                  opacity: [0, 0.9, 0],
                  scale: [0, 1.8, 0],
                }
              : { opacity: 0, scale: 0 }
          }
          transition={
            isFlyingOrLater
              ? { duration: 0.2 }
              : { duration: 0.8, delay: 0.8 + i * 0.04, repeat: Infinity, repeatDelay: 4.2, ease: "easeOut" }
          }
        />
      ))}

      {/* ─── WATER SPLASH at apex (center) ─── */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`splash-apex-${i}`}
          className="absolute z-35 rounded-full"
          style={{
            width: 4 + Math.random() * 10,
            height: 4 + Math.random() * 10,
            background: `hsla(${195 + i * 2}, 100%, ${80 + i}%, ${0.7 - i * 0.04})`,
          }}
          initial={{ left: "40%", top: "10%", opacity: 0, scale: 0 }}
          animate={
            isFlyingOrLater
              ? { opacity: 0, scale: 0 }
              : showElements
              ? {
                  left: `${35 + (i - 5) * 3}%`,
                  top: [`10%`, `${-5 + Math.abs(i - 5) * 3}%`, `25%`],
                  opacity: [0, 1, 0],
                  scale: [0, 2, 0],
                  rotate: [0, (i - 5) * 30, (i - 5) * 60],
                }
              : { opacity: 0, scale: 0 }
          }
          transition={
            isFlyingOrLater
              ? { duration: 0.2 }
              : { duration: 1, delay: 2.0 + i * 0.03, repeat: Infinity, repeatDelay: 4, ease: "easeOut" }
          }
        />
      ))}

      {/* ─── WATER SPLASH at exit (right) ─── */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`splash-exit-${i}`}
          className="absolute z-35 rounded-full"
          style={{
            width: 3 + Math.random() * 7,
            height: 3 + Math.random() * 7,
            background: `hsla(${192 + i * 2}, 100%, ${72 + i * 3}%, ${0.5 - i * 0.04})`,
          }}
          initial={{ left: "90%", top: "75%", opacity: 0, scale: 0 }}
          animate={
            isFlyingOrLater
              ? { opacity: 0, scale: 0 }
              : showElements
              ? {
                  left: `${85 + i * 2}%`,
                  top: [`75%`, `${58 - i * 3}%`, `82%`],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.5, 0],
                }
              : { opacity: 0, scale: 0 }
          }
          transition={
            isFlyingOrLater
              ? { duration: 0.2 }
              : { duration: 0.7, delay: 3.2 + i * 0.04, repeat: Infinity, repeatDelay: 4.3, ease: "easeOut" }
          }
        />
      ))}

      {/* ─── WATER SURFACE LINE ─── animated across bottom */}
      <motion.div
        className="absolute z-30 left-0 right-0"
        style={{ bottom: "22%", height: 3 }}
      >
        <svg width="100%" height="100%" viewBox="0 0 1440 3" preserveAspectRatio="none">
          <motion.path
            d="M0 1.5 C240 0 480 3 720 1.5 C960 0 1200 3 1440 1.5"
            stroke="hsla(200,100%,80%,0.15)"
            strokeWidth="1.5"
            fill="none"
            animate={{
              d: [
                "M0 1.5 C240 0 480 3 720 1.5 C960 0 1200 3 1440 1.5",
                "M0 1.5 C240 3 480 0 720 1.5 C960 3 1200 0 1440 1.5",
                "M0 1.5 C240 0 480 3 720 1.5 C960 0 1200 3 1440 1.5",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
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
            background: "radial-gradient(circle, hsla(200,100%,80%,0.25) 0%, transparent 60%)",
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

        {/* Secondary outer glow – ocean blue */}
        <motion.div
          className="absolute w-[550px] h-[550px] rounded-full -z-10"
          style={{
            background: "radial-gradient(circle, hsla(200,90%,60%,0.1) 0%, transparent 70%)",
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

        {/* Logo image */}
        <motion.img
          src={flipperLogo}
          alt="Academia Flipper"
          className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-3xl"
          style={{
            boxShadow: "0 0 80px hsla(200,100%,70%,0.3), 0 25px 50px hsla(0,0%,0%,0.4), 0 0 120px hsla(200,80%,50%,0.15)",
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
              background: "linear-gradient(90deg, hsla(200,100%,80%,1), hsla(200,100%,60%,0.5))",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: showElements ? 1 : 0 }}
            transition={{ duration: 2.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }}
          />
        </motion.div>
      </motion.div>

      {/* ─── BOTTOM WAVES ─── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 text-white/8"
        style={{ height: 90 }}
        initial={{ x: "-100%" }}
        animate={isFlyingOrLater ? { x: "100%", opacity: 0 } : { x: "0%" }}
        transition={
          isFlyingOrLater
            ? { duration: 0.5, ease: "easeIn" }
            : { duration: 1.5, ease: [0.42, 0, 0.58, 1], delay: 0.3 }
        }
      >
        <WaterWaveIcon className="w-full h-full" />
      </motion.div>

      <motion.div
        className="absolute bottom-14 left-0 right-0 text-white/5"
        style={{ height: 70 }}
        initial={{ x: "100%" }}
        animate={isFlyingOrLater ? { x: "-100%", opacity: 0 } : { x: "0%" }}
        transition={
          isFlyingOrLater
            ? { duration: 0.5, ease: "easeIn" }
            : { duration: 2, ease: [0.42, 0, 0.58, 1], delay: 0.6 }
        }
      >
        <WaterWaveIcon className="w-full h-full" />
      </motion.div>
    </motion.div>
  );
}
