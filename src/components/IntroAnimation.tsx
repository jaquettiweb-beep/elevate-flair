import { motion } from "framer-motion";
import { useState, useEffect, useMemo, useCallback, useRef, lazy, Suspense } from "react";
import flipperLogo from "@/assets/flipper-logo-hd.jpg";

const IntroScene = lazy(() => import("@/components/intro/IntroScene"));

/* ─── Smooth easing curves ─── */
const smoothEase = [0.4, 0, 0.2, 1] as const;
const buoyantSpring = { type: "spring" as const, stiffness: 50, damping: 14, mass: 0.8 };

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

/* ─── Phase timeline ─── */
type Phase =
  | "swim"        // 0-3s: Dolphin swims through 3D underwater scene
  | "dissolve"    // 3-4.5s: Dolphin dissolves into particles
  | "converge"    // 4.5-5.5s: Particles converge, logo appears
  | "logo-center" // 5.5-6.5s: Logo fully visible at center
  | "fly"         // 6.5-7.5s: Logo flies to header
  | "curtain";    // 7.5-8.2s: Fade out

/* ─── 2D ambient bubbles overlay ─── */
function AmbientBubbles() {
  const bubbles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: 5 + Math.random() * 90,
        y: 80 + Math.random() * 20,
        size: 2 + Math.random() * 6,
        delay: Math.random() * 3,
        duration: 4 + Math.random() * 4,
      })),
    []
  );

  return (
    <>
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          className="absolute rounded-full border border-white/10 pointer-events-none z-[5]"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: b.size,
            height: b.size,
            background: "radial-gradient(circle at 30% 30%, hsla(0,0%,100%,0.15), transparent)",
          }}
          animate={{
            opacity: [0, 0.4, 0],
            y: [0, -(200 + b.y * 3)],
            x: [0, (b.id % 2 ? 15 : -15)],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>("swim");
  const playSplash = useSplashSound();
  const splashPlayed = useRef(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("dissolve"), 3000),
      setTimeout(() => setPhase("converge"), 4500),
      setTimeout(() => setPhase("logo-center"), 5500),
      setTimeout(() => setPhase("fly"), 6500),
      setTimeout(() => setPhase("curtain"), 7500),
      setTimeout(onComplete, 8200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // Play splash during dissolve
  useEffect(() => {
    if (phase === "dissolve" && !splashPlayed.current) {
      splashPlayed.current = true;
      playSplash();
      const t = setTimeout(playSplash, 600);
      return () => clearTimeout(t);
    }
  }, [phase, playSplash]);

  const isFlyingOrLater = phase === "fly" || phase === "curtain";
  const dolphinPhase =
    phase === "swim"
      ? "swim"
      : phase === "dissolve"
      ? "dissolve"
      : ("gone" as const);

  const showParticles = phase === "dissolve" || phase === "converge";
  const dissolveConverge = phase === "converge";
  const showLogo = phase === "converge" || phase === "logo-center" || isFlyingOrLater;

  return (
    <motion.div
      className="fixed inset-0 z-[99999] overflow-hidden"
      initial={{ opacity: 1 }}
      animate={phase === "curtain" ? { opacity: 0 } : { opacity: 1 }}
      transition={phase === "curtain" ? { duration: 0.7, ease: [0.65, 0, 0.35, 1] } : {}}
      style={{ pointerEvents: phase === "curtain" ? "none" : "auto" }}
    >
      {/* ─── DEEP OCEAN BACKGROUND ─── */}
      <motion.div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, hsl(200,80%,18%) 0%, hsl(210,90%,12%) 40%, hsl(220,85%,8%) 100%)",
        }}
        animate={{
          background: [
            "linear-gradient(180deg, hsl(200,80%,18%) 0%, hsl(210,90%,12%) 40%, hsl(220,85%,8%) 100%)",
            "linear-gradient(180deg, hsl(195,75%,22%) 0%, hsl(205,85%,14%) 40%, hsl(215,80%,10%) 100%)",
            "linear-gradient(180deg, hsl(200,80%,18%) 0%, hsl(210,90%,12%) 40%, hsl(220,85%,8%) 100%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ─── THREE.JS UNDERWATER SCENE ─── */}
      <Suspense fallback={null}>
        <IntroScene
          dolphinPhase={dolphinPhase}
          dissolveConverge={dissolveConverge}
          showParticles={showParticles}
        />
      </Suspense>

      {/* ─── 2D AMBIENT BUBBLES ─── */}
      <AmbientBubbles />

      {/* ─── VIGNETTE ─── */}
      <div
        className="absolute inset-0 z-[6] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, hsla(210,90%,6%,0.5) 100%)",
        }}
      />

      {/* ─── LOGO: Emerges from dissolve → center → flies to header ─── */}
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
            : showLogo
            ? {
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
                scale: 1,
                opacity: 1,
              }
            : {
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
                scale: 0,
                opacity: 0,
              }
        }
        transition={
          isFlyingOrLater
            ? {
                duration: 1,
                ease: [0.65, 0, 0.35, 1],
                opacity: { duration: 0.4, delay: 0.5 },
              }
            : showLogo
            ? { duration: 0.8, ...buoyantSpring }
            : { duration: 0.5 }
        }
      >
        {/* Central glow */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full -z-10"
          style={{
            background:
              "radial-gradient(circle, hsla(195,100%,70%,0.25) 0%, transparent 60%)",
          }}
          animate={
            isFlyingOrLater
              ? { scale: 0, opacity: 0 }
              : showLogo
              ? { scale: [0.8, 1.2, 1], opacity: [0, 0.6, 0.4] }
              : { scale: 0, opacity: 0 }
          }
          transition={
            isFlyingOrLater
              ? { duration: 0.5 }
              : { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }
        />

        {/* Logo image */}
        <motion.img
          src={flipperLogo}
          alt="Academia Flipper"
          className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-3xl"
          style={{
            boxShadow:
              "0 0 80px hsla(195,100%,60%,0.35), 0 0 160px hsla(200,100%,50%,0.15), 0 20px 40px hsla(0,0%,0%,0.4)",
          }}
          initial={{ rotateY: 180, scale: 0.5 }}
          animate={
            isFlyingOrLater
              ? { rotateY: 0, scale: 1, borderRadius: "12px" }
              : showLogo
              ? { rotateY: 0, scale: 1 }
              : { rotateY: 180, scale: 0.5 }
          }
          transition={
            isFlyingOrLater
              ? { duration: 0.8, ease: smoothEase }
              : { duration: 1, ...buoyantSpring }
          }
        />

        {/* Tagline */}
        <motion.div
          className="flex gap-0.5 mt-6 overflow-hidden"
          animate={isFlyingOrLater ? { opacity: 0, y: -15 } : showLogo ? {} : { opacity: 0 }}
          transition={{ duration: 0.4, ease: smoothEase }}
        >
          {"ACADEMIA & NATAÇÃO".split("").map((char, idx) => (
            <motion.span
              key={idx}
              className="text-white/90 text-sm sm:text-base font-bold tracking-[0.3em]"
              initial={{ y: 25, opacity: 0 }}
              animate={
                showLogo && !isFlyingOrLater
                  ? { y: 0, opacity: 1 }
                  : { y: 25, opacity: 0 }
              }
              transition={{ delay: 0.3 + idx * 0.025, duration: 0.4, ease: smoothEase }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>

        {/* Loading bar */}
        <motion.div
          className="w-48 h-0.5 mt-5 rounded-full overflow-hidden bg-white/10"
          animate={
            isFlyingOrLater
              ? { opacity: 0, y: -8 }
              : { opacity: showLogo ? 1 : 0 }
          }
          transition={{ duration: 0.4, ease: smoothEase }}
        >
          <motion.div
            className="h-full rounded-full origin-left"
            style={{
              background:
                "linear-gradient(90deg, hsla(195,100%,80%,0.8), hsla(195,100%,60%,0.4))",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: showLogo ? 1 : 0 }}
            transition={{
              duration: 2,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.2,
            }}
          />
        </motion.div>
      </motion.div>

      {/* ─── "DIVE IN" text during swim phase ─── */}
      <motion.div
        className="absolute z-[15] bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0, y: 20 }}
        animate={
          phase === "swim"
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: -20 }
        }
        transition={buoyantSpring}
      >
        <motion.span
          className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-medium"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Mergulhe...
        </motion.span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
          animate={{ scaleY: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}
