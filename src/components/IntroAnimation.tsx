import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import flipperLogo from "@/assets/logo-flipper-animated.png";

/* ─── Phase timeline ─── */
type Phase =
  | "logo-reveal"   // 0–1.8s: logo fades + scales in
  | "logo-hold"     // 1.8–3.2s: logo stays visible
  | "logo-exit"     // 3.2–4.2s: logo shrinks and fades, ocean rises
  | "done";         // 4.2s+: intro done

/* ─── Splash sound ─── */
function useSplashSound() {
  const ctxRef = useRef<AudioContext | null>(null);
  return useCallback(() => {
    try {
      if (!ctxRef.current) ctxRef.current = new AudioContext();
      const ctx = ctxRef.current;
      const len = ctx.sampleRate * 0.3;
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) {
        d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.05)) * 0.25;
      }
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const filt = ctx.createBiquadFilter();
      filt.type = "bandpass";
      filt.frequency.value = 1800;
      const gain = ctx.createGain();
      gain.gain.value = 0.1;
      src.connect(filt);
      filt.connect(gain);
      gain.connect(ctx.destination);
      src.start();
    } catch { /* silent */ }
  }, []);
}

/* ─── Floating bubbles ─── */
const BUBBLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: 5 + Math.random() * 90,
  size: 3 + Math.random() * 7,
  delay: Math.random() * 2,
  dur: 3.5 + Math.random() * 3,
}));

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>("logo-reveal");
  const playSplash = useSplashSound();

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("logo-hold"), 1800),
      setTimeout(() => { setPhase("logo-exit"); playSplash(); }, 3200),
      setTimeout(() => setPhase("done"), 4400),
      setTimeout(onComplete, 4500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete, playSplash]);

  const isDone = phase === "done";

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[99999] overflow-hidden flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          animate={phase === "logo-exit" ? { opacity: 0 } : { opacity: 1 }}
          transition={phase === "logo-exit" ? { duration: 1.2, ease: [0.65, 0, 0.35, 1] } : {}}
        >
          {/* Background */}
          <motion.div
            className="absolute inset-0 bg-[#F9F7F4]"
            animate={
              phase === "logo-exit"
                ? { opacity: 0 }
                : { opacity: 1 }
            }
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {/* Radial glow behind logo */}
          <motion.div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: 500,
              height: 500,
              background: "radial-gradient(circle, rgba(238,98,0,0.06) 0%, transparent 65%)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={
              phase === "logo-reveal" || phase === "logo-hold"
                ? { scale: [1, 1.15, 1], opacity: [0.6, 0.8, 0.6] }
                : { scale: 0, opacity: 0 }
            }
            transition={
              phase === "logo-reveal"
                ? { duration: 2, ease: "easeOut" }
                : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
            }
          />

          {/* LOGO */}
          <motion.div
            className="relative flex flex-col items-center z-10"
            initial={{ scale: 0.6, opacity: 0, y: 20 }}
            animate={
              phase === "logo-reveal" || phase === "logo-hold"
                ? { scale: 1, opacity: 1, y: 0 }
                : { scale: 1.4, opacity: 0, y: -30 }
            }
            transition={
              phase === "logo-reveal"
                ? { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
                : phase === "logo-exit"
                ? { duration: 1.0, ease: [0.65, 0, 0.35, 1] }
                : {}
            }
          >
            {/* Logo image */}
            <motion.img
              src={flipperLogo}
              alt="Academia Flipper"
              className="w-[92vw] sm:w-[42rem] max-w-[48rem] h-auto object-contain drop-shadow-[0_8px_32px_rgba(238,98,0,0.15)]"
              style={{ imageRendering: "auto", WebkitFontSmoothing: "antialiased" }}
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />

            {/* Tagline */}
            <motion.p
              className="mt-6 text-[#1A2335] text-xs tracking-[0.4em] uppercase font-bold"
              initial={{ opacity: 0, y: 12 }}
              animate={
                phase === "logo-reveal" || phase === "logo-hold"
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: -8 }
              }
              transition={{ duration: 0.6, delay: phase === "logo-reveal" ? 0.8 : 0, ease: "easeOut" }}
            >
              Natação & Esportes
            </motion.p>

            {/* Loading bar */}
            <motion.div
              className="w-40 h-[3px] mt-6 rounded-full overflow-hidden"
              style={{ background: "rgba(238,98,0,0.15)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "logo-reveal" || phase === "logo-hold" ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #EE6200, #FF8533)",
                }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: phase === "logo-reveal" || phase === "logo-hold" ? 1 : 0 }}
                transition={{ duration: 2.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}
              />
            </motion.div>
          </motion.div>

          {/* Bottom hint */}
          <motion.p
            className="absolute bottom-10 text-[#8A95A8] text-[10px] tracking-[0.35em] uppercase font-bold pointer-events-none"
            initial={{ opacity: 0 }}
            animate={phase === "logo-hold" ? { opacity: [0, 1, 0.5] } : { opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            Mergulhe na sua melhor versão
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
