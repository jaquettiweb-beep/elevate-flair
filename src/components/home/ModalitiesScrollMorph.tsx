import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import swimmingImg from "@/assets/swimming.jpg";
import yogaImg from "@/assets/yoga.jpg";
import martialImg from "@/assets/martial-arts.jpg";
import pilatesImg from "@/assets/pilates.jpg";
import musculacaoImg from "@/assets/musculacao.jpg";

// ─── Types ───────────────────────────────────────────────────────────────────

type Phase =
  | "scatter"   // cards fly in randomly
  | "line"      // cards align horizontally
  | "circle"    // cards form the circle (idle / auto-rotate)
  | "wheel"     // scroll-driven arc
  | "returning" // returning from wheel back to circle
  | "auto-rotate"; // circle slowly spins by itself

interface Modality {
  name: string;
  desc: string;
  img: string;
  tag: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const MODALITIES: Modality[] = [
  { name: "Natação",            desc: "Adulto, infantil e bebê. Piscina aquecida semiolímpica.",           img: swimmingImg,  tag: "Aquático" },
  { name: "Hidroginástica",     desc: "Exercícios aquáticos de baixo impacto para todas as idades.",        img: swimmingImg,  tag: "Aquático" },
  { name: "Hidroterapia",       desc: "Reabilitação e bem-estar através de exercícios aquáticos.",          img: swimmingImg,  tag: "Aquático" },
  { name: "Musculação",         desc: "Equipamentos de última geração com orientação profissional.",         img: musculacaoImg, tag: "Fitness" },
  { name: "Ginástica",          desc: "Coordenação, flexibilidade e condicionamento físico global.",        img: musculacaoImg, tag: "Fitness" },
  { name: "Yoga",               desc: "Equilíbrio entre corpo e mente com instrutores certificados.",       img: yogaImg,      tag: "Bem-estar" },
  { name: "Pilates Studio",     desc: "Aparelhos de Pilates com acompanhamento individual.",                img: pilatesImg,   tag: "Bem-estar" },
  { name: "Pilates Solo",       desc: "Fortalecimento e flexibilidade no solo para todos os níveis.",       img: pilatesImg,   tag: "Bem-estar" },
  { name: "Ballet (infantil)",  desc: "Expressão artística, postura e ritmo para crianças.",                img: pilatesImg,   tag: "Infantil" },
  { name: "Muay Thai",          desc: "Arte marcial tailandesa: força, técnica e condicionamento.",         img: martialImg,   tag: "Artes Marciais" },
  { name: "Jiu Jitsu",         desc: "Técnicas de grappling e defesa pessoal no tatame.",                  img: martialImg,   tag: "Artes Marciais" },
  { name: "Judô (infantil)",    desc: "Disciplina e coordenação motora para crianças.",                     img: martialImg,   tag: "Artes Marciais" },
  { name: "Kung Fu",            desc: "Arte marcial chinesa milenar com foco em equilíbrio e técnica.",    img: martialImg,   tag: "Artes Marciais" },
  { name: "Krav Maga",          desc: "Sistema de defesa pessoal prático e eficiente.",                    img: martialImg,   tag: "Artes Marciais" },
  { name: "Aikidô",             desc: "Arte marcial japonesa baseada em harmonia e redirecionamento.",      img: martialImg,   tag: "Artes Marciais" },
  { name: "Programa 60+ Saúde", desc: "Atividades físicas especialmente desenvolvidas para a melhor idade.", img: swimmingImg, tag: "Saúde" },
];

const TOTAL = MODALITIES.length;
const LS_KEY = "flipper-modalities-seen";

// Scroll budget for one full wheel loop
const MAX_VIRTUAL = 4800;

// Card dimensions (portrait)
const CARD_W = 110;
const CARD_H = 156;

// ─── Helpers ─────────────────────────────────────────────────────────────────

const lerp  = (a: number, b: number, t: number) => a * (1 - t) + b * t;
const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

// ─── FlipCard ────────────────────────────────────────────────────────────────

interface FlipCardProps {
  modality: Modality;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
  transition?: object;
}

function FlipCard({ modality, x, y, rotation, scale, opacity, transition }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      style={{
        position: "absolute",
        width: CARD_W,
        height: CARD_H,
        x,
        y,
        rotate: rotation,
        scale,
        opacity,
        translateX: "-50%",
        translateY: "-50%",
        perspective: 900,
        zIndex: flipped ? 30 : 1,
      }}
      transition={transition ?? { type: "spring", stiffness: 45, damping: 16 }}
      onHoverStart={() => setFlipped(true)}
      onHoverEnd={() => setFlipped(false)}
      className="cursor-pointer"
    >
      <motion.div
        style={{ width: "100%", height: "100%", transformStyle: "preserve-3d", position: "relative" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Front */}
        <div
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border border-white/15"
        >
          <img src={modality.img} alt={modality.name} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
          <span className="absolute bottom-3 left-2 right-2 text-white text-[10px] font-bold text-center leading-tight drop-shadow-lg">
            {modality.name}
          </span>
          <span className="absolute top-2 right-2 bg-primary/85 text-white text-[8px] font-semibold px-1.5 py-0.5 rounded-full backdrop-blur-sm">
            {modality.tag}
          </span>
        </div>

        {/* Back */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "hsl(var(--primary))",
          }}
          className="absolute inset-0 rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-2 p-3 text-center"
        >
          <span className="text-white font-display font-bold text-xs leading-tight">{modality.name}</span>
          <div className="w-6 h-0.5 bg-white/40 rounded-full" />
          <span className="text-white/85 text-[10px] leading-snug">{modality.desc}</span>
          <span className="mt-1 px-2 py-0.5 rounded-full bg-white/20 text-white text-[8px] font-semibold tracking-wide uppercase">
            {modality.tag}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── ProgressBar ─────────────────────────────────────────────────────────────

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-28 h-1 bg-white/15 rounded-full overflow-hidden">
      <div
        className="h-full bg-primary rounded-full transition-all"
        style={{ width: `${clamp(value * 100, 0, 100)}%` }}
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ModalitiesScrollMorph() {
  const [phase, setPhase]                   = useState<Phase>("scatter");
  const [containerSize, setContainerSize]   = useState({ width: 800, height: 600 });
  const [virtualVal, setVirtualVal]         = useState(0);   // 0 → MAX_VIRTUAL (scroll progress)
  const [morphVal, setMorphVal]             = useState(0);   // 0 → 1 (circle → wheel)
  const [rotateVal, setRotateVal]           = useState(0);   // 0 → 360 (wheel rotation degrees)
  const [autoAngle, setAutoAngle]           = useState(0);   // auto-rotate offset
  const [returningT, setReturningT]         = useState(0);   // 0 → 1 for returning animation

  const sectionRef  = useRef<HTMLDivElement>(null);
  const canvasRef   = useRef<HTMLDivElement>(null);
  const virtualRef  = useRef(0);
  const isLockedRef = useRef(false);
  const rafRef      = useRef<number | null>(null);
  const returnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Derived values ──────────────────────────────────────────────────────────
  const scrollProg = clamp(virtualVal / MAX_VIRTUAL, 0, 1);
  const inWheel    = phase === "wheel";
  const inCircle   = phase === "circle" || phase === "auto-rotate";
  const inReturning = phase === "returning";
  const showHUD    = inWheel;
  const showLabel  = inCircle;

  // ── Stable scatter positions ────────────────────────────────────────────────
  const scatter = useMemo(() =>
    MODALITIES.map(() => ({
      x:        (Math.random() - 0.5) * 1400,
      y:        (Math.random() - 0.5) * 900,
      rotation: (Math.random() - 0.5) * 180,
    })), []);

  // ── Container resize ────────────────────────────────────────────────────────
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([e]) => {
      setContainerSize({ width: e.contentRect.width, height: e.contentRect.height });
    });
    obs.observe(el);
    setContainerSize({ width: el.offsetWidth, height: el.offsetHeight });
    return () => obs.disconnect();
  }, []);

  // ── Intro sequence ──────────────────────────────────────────────────────────
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("line"),   450);
    const t2 = setTimeout(() => setPhase("circle"), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // ── Auto-rotate loop ────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "auto-rotate") return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      setAutoAngle(a => a + dt * 0.012); // ~0.72°/frame@60fps
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [phase]);

  // ── Returning animation (tween returningT 0→1 over 1.4s) ──────────────────
  useEffect(() => {
    if (phase !== "returning") return;
    setReturningT(0);
    const start = performance.now();
    const DURATION = 1400;
    const tick = (now: number) => {
      const t = clamp((now - start) / DURATION, 0, 1);
      // Ease in-out cubic
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setReturningT(eased);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setPhase("auto-rotate");
        // Mark as seen so scroll never locks again
        localStorage.setItem(LS_KEY, "1");
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [phase]);

  // ── Smooth virtual scroll / morph / rotate derived from virtualVal ──────────
  useEffect(() => {
    // Smooth morph: 0→800 maps to 0→1
    const m = clamp(virtualVal / 800, 0, 1);
    setMorphVal(m);
    // Rotation: 800→MAX_VIRTUAL maps to 0→360
    const r = clamp(((virtualVal - 800) / (MAX_VIRTUAL - 800)) * 360, 0, 360);
    setRotateVal(r);
  }, [virtualVal]);

  // ── Wheel/touch handler ─────────────────────────────────────────────────────
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!isLockedRef.current) return;
    e.preventDefault();
    e.stopPropagation();

    const next = clamp(virtualRef.current + e.deltaY, 0, MAX_VIRTUAL);
    virtualRef.current = next;

    // Smooth virtual value toward target
    setVirtualVal(prev => {
      // Instant set for responsiveness
      return next;
    });

    // When scroll phase begins, switch to wheel
    if (next > 50 && phase === "circle") {
      setPhase("wheel");
    }

    // When full loop done → unlock and return to circle
    if (next >= MAX_VIRTUAL) {
      isLockedRef.current = false;
      returnTimerRef.current = setTimeout(() => {
        setVirtualVal(0);
        virtualRef.current = 0;
        setPhase("returning");
      }, 600);
    }
  }, [phase]);

  // ── Touch handler ───────────────────────────────────────────────────────────
  const touchYRef = useRef(0);
  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchYRef.current = e.touches[0].clientY;
  }, []);
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isLockedRef.current) return;
    const delta = touchYRef.current - e.touches[0].clientY;
    touchYRef.current = e.touches[0].clientY;
    const next = clamp(virtualRef.current + delta * 1.5, 0, MAX_VIRTUAL);
    virtualRef.current = next;
    setVirtualVal(next);
    if (next > 0 && next < MAX_VIRTUAL) e.preventDefault();
    if (next > 50 && phase === "circle") setPhase("wheel");
    if (next >= MAX_VIRTUAL) {
      isLockedRef.current = false;
      returnTimerRef.current = setTimeout(() => {
        setVirtualVal(0);
        virtualRef.current = 0;
        setPhase("returning");
      }, 600);
    }
  }, [phase]);

  // ── Attach events ───────────────────────────────────────────────────────────
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleWheel, handleTouchStart, handleTouchMove]);

  // ── IntersectionObserver: lock on enter (only if not seen before) ───────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const alreadySeen = localStorage.getItem(LS_KEY) === "1";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !alreadySeen && phase === "circle") {
          isLockedRef.current = true;
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [phase]);

  // ── Cleanup on unmount ──────────────────────────────────────────────────────
  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (returnTimerRef.current) clearTimeout(returnTimerRef.current);
  }, []);

  // ── Card target positions ───────────────────────────────────────────────────
  const { width: W, height: H } = containerSize;
  const isMobile = W < 768;

  // Circle geometry — fits inside viewport
  const minDim  = Math.min(W, H);
  const circleR = Math.min(minDim * 0.38, 240);

  function getCirclePos(i: number, angleOffset = 0) {
    const angle = ((i / TOTAL) * 360 + angleOffset) * (Math.PI / 180);
    return {
      x:        Math.cos(angle - Math.PI / 2) * circleR,
      y:        Math.sin(angle - Math.PI / 2) * circleR,
      rotation: 0,
    };
  }

  // Wheel arc geometry
  const arcR       = isMobile ? H * 1.05 : Math.min(W * 0.85, H * 1.0);
  const arcCenterY = H * 0.52 + arcR * 0.78;

  function getWheelPos(i: number) {
    const angleStep    = 360 / TOTAL;
    const baseAngle    = i * angleStep;
    const rotationOff  = clamp(rotateVal / 360, 0, 1) * 360;
    const rawAngle     = (baseAngle + rotationOff) % 360;
    const signedAngle  = rawAngle > 180 ? rawAngle - 360 : rawAngle;
    const absFromTop   = Math.abs(signedAngle);

    const fadeStart = 50;
    const fadeEnd   = 75;
    let opacity     = 1;
    let scl         = isMobile ? 0.90 : 1.25;

    if (absFromTop >= fadeEnd) {
      opacity = 0;
      scl     = 0.55;
    } else if (absFromTop > fadeStart) {
      const t = (absFromTop - fadeStart) / (fadeEnd - fadeStart);
      opacity = 1 - t;
      scl     = lerp(isMobile ? 0.90 : 1.25, 0.55, t);
    } else {
      const centerness = 1 - absFromTop / fadeStart;
      scl = lerp(isMobile ? 0.90 : 1.25, isMobile ? 1.1 : 1.45, centerness * 0.5);
    }

    const wheelRad = ((rawAngle - 90) * Math.PI) / 180;
    const x = Math.cos(wheelRad) * arcR - W / 2;
    const y = Math.sin(wheelRad) * arcR + arcCenterY - H / 2;

    return { x, y, rotation: 0, scale: scl, opacity }; // portrait: rotation always 0
  }

  function getTarget(i: number): { x: number; y: number; rotation: number; scale: number; opacity: number } {
    // ── Scatter ──
    if (phase === "scatter") {
      return { x: scatter[i].x, y: scatter[i].y, rotation: scatter[i].rotation, scale: 0.4, opacity: 0 };
    }

    // ── Line ──
    if (phase === "line") {
      const spacing = 85;
      const totalW  = TOTAL * spacing;
      return { x: i * spacing - totalW / 2, y: 0, rotation: 0, scale: 0.65, opacity: 1 };
    }

    // ── Circle (idle / auto-rotate) ──
    if (phase === "circle" || phase === "auto-rotate") {
      const cp = getCirclePos(i, autoAngle);
      return { x: cp.x, y: cp.y, rotation: 0, scale: 0.65, opacity: 1 };
    }

    // ── Returning (wheel → circle tween) ──
    if (phase === "returning") {
      const circleP = getCirclePos(i, 0);
      const wheelP  = getWheelPos(i);
      const t       = returningT; // 0 = wheel, 1 = circle
      return {
        x:        lerp(wheelP.x, circleP.x, t),
        y:        lerp(wheelP.y, circleP.y, t),
        rotation: lerp(wheelP.rotation, 0, t),
        scale:    lerp(wheelP.scale, 0.65, t),
        opacity:  lerp(wheelP.opacity, 1, t),
      };
    }

    // ── Wheel (scroll-driven) ──
    const circleP = getCirclePos(i);
    const wheelP  = getWheelPos(i);
    return {
      x:        lerp(circleP.x, wheelP.x, morphVal),
      y:        lerp(circleP.y, wheelP.y, morphVal),
      rotation: 0,
      scale:    lerp(0.65, wheelP.scale, morphVal),
      opacity:  lerp(1, wheelP.opacity, morphVal),
    };
  }

  return (
    /* 200vh gives scroll budget while content is sticky */
    <section
      ref={sectionRef}
      id="modalidades"
      style={{ height: "200vh" }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── Section header (above canvas) ── */}
        <motion.div
          className="absolute top-8 left-0 right-0 z-30 text-center pointer-events-none px-4"
          animate={{
            opacity: morphVal > 0.4 ? 1 : (phase === "circle" || phase === "auto-rotate" ? 1 : 0),
            y:       morphVal > 0.4 ? 0  : (phase === "circle" || phase === "auto-rotate" ? 0  : 20),
          }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-1">
            Nossas <span className="gradient-text">Modalidades</span>
          </h2>
          <p className="text-muted-foreground text-base lg:text-lg">
            16 atividades — passe o mouse sobre a carta para conhecer
          </p>
        </motion.div>

        {/* ── HUD: scroll progress (wheel phase only) ── */}
        <AnimatePresence>
          {showHUD && (
            <motion.div
              key="hud"
              className="absolute bottom-7 left-0 right-0 z-30 flex flex-col items-center gap-2.5 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: scrollProg >= 1 ? 0 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
                {scrollProg < 0.02 ? "Role para explorar" : "Explorando modalidades"}
              </p>
              <ProgressBar value={scrollProg} />
              <motion.div
                className="w-5 h-8 rounded-full border-2 border-primary/40 flex items-start justify-center pt-1.5"
                animate={{ opacity: [0.8, 0.2, 0.8] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
              >
                <div className="w-1 h-2 rounded-full bg-primary" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── "Continue scrolling" cue ── */}
        <AnimatePresence>
          {scrollProg >= 0.98 && phase === "wheel" && (
            <motion.div
              key="continue"
              className="absolute bottom-7 left-0 right-0 z-30 flex flex-col items-center gap-1 pointer-events-none"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
                Continue rolando
              </p>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="text-primary/60 text-lg"
              >
                ↓
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Interactive canvas ── */}
        <div
          ref={canvasRef}
          className="w-full h-full relative overflow-hidden select-none"
          style={{ touchAction: "none", cursor: inWheel ? "grab" : "default" }}
        >
          {/* Center anchor for cards */}
          <div style={{ position: "absolute", left: "50%", top: "50%", width: 0, height: 0 }}>

            {/* ── Circle label (fades out as wheel opens) ── */}
            <AnimatePresence>
              {showLabel && (
                <motion.div
                  key="circle-label"
                  style={{
                    position: "absolute",
                    translateX: "-50%",
                    translateY: "-50%",
                    pointerEvents: "none",
                    textAlign: "center",
                    width: circleR * 1.1,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="font-display font-bold text-foreground text-base lg:text-xl leading-tight">
                    Nossas
                  </p>
                  <p className="font-display font-bold text-lg lg:text-2xl gradient-text leading-tight">
                    Modalidades
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cards */}
            {MODALITIES.map((mod, i) => {
              const t = getTarget(i);
              return (
                <FlipCard
                  key={mod.name}
                  modality={mod}
                  x={t.x}
                  y={t.y}
                  rotation={t.rotation}
                  scale={t.scale}
                  opacity={t.opacity}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
