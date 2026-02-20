import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import swimmingImg from "@/assets/swimming.jpg";
import yogaImg from "@/assets/yoga.jpg";
import martialImg from "@/assets/martial-arts.jpg";
import pilatesImg from "@/assets/pilates.jpg";
import musculacaoImg from "@/assets/musculacao.jpg";

// ─── Data ───────────────────────────────────────────────────────────────────
const MODALITIES = [
  { name: "Natação", desc: "Adulto, infantil e bebê. Piscina aquecida semiolímpica.", img: swimmingImg, category: "Aquática" },
  { name: "Musculação", desc: "Equipamentos de última geração com orientação profissional.", img: musculacaoImg, category: "Fitness" },
  { name: "Yoga", desc: "Equilíbrio entre corpo e mente com instrutores certificados.", img: yogaImg, category: "Bem-estar" },
  { name: "Pilates Studio", desc: "Aparelhos de Pilates com acompanhamento individual.", img: pilatesImg, category: "Bem-estar" },
  { name: "Pilates Solo", desc: "Fortalecimento e flexibilidade no solo para todos os níveis.", img: pilatesImg, category: "Bem-estar" },
  { name: "Hidroginástica", desc: "Exercícios aquáticos de baixo impacto para todas as idades.", img: swimmingImg, category: "Aquática" },
  { name: "Muay Thai", desc: "Arte marcial tailandesa que combina força, técnica e condicionamento.", img: martialImg, category: "Artes Marciais" },
  { name: "Jiu Jitsu", desc: "Técnicas de grappling e defesa pessoal no tatame.", img: martialImg, category: "Artes Marciais" },
  { name: "Judô", desc: "Disciplina e coordenação motora para crianças.", img: martialImg, category: "Infantil" },
  { name: "Kung Fu", desc: "Arte marcial chinesa milenar com foco em equilíbrio e técnica.", img: martialImg, category: "Artes Marciais" },
  { name: "Krav Maga", desc: "Sistema de defesa pessoal prático e eficiente.", img: martialImg, category: "Artes Marciais" },
  { name: "Aikidô", desc: "Arte marcial japonesa baseada em harmonia e redirecionamento de força.", img: martialImg, category: "Artes Marciais" },
  { name: "Ballet", desc: "Expressão artística, postura e ritmo para crianças.", img: pilatesImg, category: "Infantil" },
  { name: "Ginástica", desc: "Coordenação, flexibilidade e condicionamento físico global.", img: musculacaoImg, category: "Fitness" },
  { name: "Hidroterapia", desc: "Reabilitação e bem-estar através de exercícios aquáticos terapêuticos.", img: swimmingImg, category: "Aquática" },
  { name: "Prog. 60+ Saúde", desc: "Atividades físicas especialmente desenvolvidas para a melhor idade.", img: swimmingImg, category: "Bem-estar" },
];

const TOTAL = MODALITIES.length; // 16
const MAX_SCROLL = 3200;

type Phase = "scatter" | "line" | "circle";

// ─── Linear interpolation ────────────────────────────────────────────────────
const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;

// ─── Category color map ──────────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  "Aquática":       "hsl(199 89% 48%)",
  "Fitness":        "hsl(24 95% 53%)",
  "Bem-estar":      "hsl(142 69% 42%)",
  "Artes Marciais": "hsl(0 72% 51%)",
  "Infantil":       "hsl(270 70% 60%)",
};

// ─── FlipCard ────────────────────────────────────────────────────────────────
const IMG_W = 72;
const IMG_H = 100;

interface CardTarget {
  x: number; y: number; rotation: number; scale: number; opacity: number;
}

function FlipCard({ mod, target, zIndex }: { mod: typeof MODALITIES[0]; target: CardTarget; zIndex?: number }) {
  const [flipped, setFlipped] = useState(false);
  const accent = CATEGORY_COLORS[mod.category] ?? "hsl(var(--primary))";

  return (
    <motion.div
      className="absolute"
      style={{ width: IMG_W, height: IMG_H, zIndex: zIndex ?? 1 }}
      animate={{
        x: target.x - IMG_W / 2,
        y: target.y - IMG_H / 2,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{ type: "spring", stiffness: 48, damping: 18 }}
    >
      {/* Flip wrapper */}
      <div
        className="relative w-full h-full cursor-pointer select-none"
        style={{ perspective: "800px" }}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
      >
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 rounded-xl overflow-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            <img
              src={mod.img}
              alt={mod.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)" }}
            />
            <span
              className="absolute bottom-2 left-0 right-0 text-center text-white font-display font-bold leading-tight px-1"
              style={{ fontSize: 9 }}
            >
              {mod.name}
            </span>
            {/* Category dot */}
            <span
              className="absolute top-2 right-2 rounded-full"
              style={{ width: 7, height: 7, background: accent }}
            />
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-xl flex flex-col items-center justify-center p-2 gap-1"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: `linear-gradient(135deg, hsl(215 80% 14%), hsl(210 75% 22%))`,
              border: `1px solid ${accent}55`,
            }}
          >
            <span
              className="font-display font-black text-white text-center leading-tight"
              style={{ fontSize: 8 }}
            >
              {mod.name}
            </span>
            <span
              className="text-white/60 text-center leading-snug"
              style={{ fontSize: 6.5 }}
            >
              {mod.desc}
            </span>
            <span
              className="rounded-full px-1.5 py-0.5 font-bold uppercase tracking-wide mt-0.5"
              style={{ fontSize: 5.5, background: accent + "33", color: accent }}
            >
            {mod.category}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function Modalities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const [containerSize, setContainerSize] = useState({ width: 800, height: 600 });
  const [phase, setPhase] = useState<Phase>("scatter");
  const [scrollLocked, setScrollLocked] = useState(true);
  const hasSeenRef = useRef(false);

  // Virtual scroll motion value
  const virtualScroll = useMotionValue(0);

  // Morph: circle → arc (0→1 in scroll 0–800)
  const morphProgress = useTransform(virtualScroll, [0, 800], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 45, damping: 22 });

  // Arc rotation: scroll 800–3200 → 0–360
  const scrollRotate = useTransform(virtualScroll, [800, 3200], [0, 360]);
  const smoothRotate = useSpring(scrollRotate, { stiffness: 45, damping: 22 });

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 22 });

  const [morphVal, setMorphVal] = useState(0);
  const [rotateVal, setRotateVal] = useState(0);
  const [parallaxVal, setParallaxVal] = useState(0);

  // Check localStorage – skip animation if already seen
  useEffect(() => {
    if (typeof window !== "undefined") {
      hasSeenRef.current = !!localStorage.getItem("flipper-modalities-seen");
      if (hasSeenRef.current) {
        setPhase("circle");
        setScrollLocked(false);
      }
    }
  }, []);

  // Subscribe to motion values
  useEffect(() => {
    const u1 = smoothMorph.on("change", setMorphVal);
    const u2 = smoothRotate.on("change", setRotateVal);
    const u3 = smoothMouseX.on("change", setParallaxVal);
    return () => { u1(); u2(); u3(); };
  }, [smoothMorph, smoothRotate, smoothMouseX]);

  // Resize observer
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const e = entries[0];
      setContainerSize({ width: e.contentRect.width, height: e.contentRect.height });
    });
    ro.observe(el);
    setContainerSize({ width: el.offsetWidth, height: el.offsetHeight });
    return () => ro.disconnect();
  }, []);

  // Intro sequence (only first visit)
  useEffect(() => {
    if (hasSeenRef.current) return;
    const t1 = setTimeout(() => setPhase("line"), 600);
    const t2 = setTimeout(() => setPhase("circle"), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Virtual scroll handler (locked phase)
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!scrollLocked) return;
    e.preventDefault();
    e.stopPropagation();
    const next = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
    scrollRef.current = next;
    virtualScroll.set(next);

    // Unlock when user has fully rotated the arc (≥360°)
    if (next >= MAX_SCROLL) {
      setScrollLocked(false);
      localStorage.setItem("flipper-modalities-seen", "1");
    }
  }, [scrollLocked, virtualScroll]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  // Mouse move parallax
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseX.set(nx * 80);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mouseX]);

  // Random scatter positions (stable per render)
  const scatterPositions = useMemo<CardTarget[]>(() =>
    MODALITIES.map(() => ({
      x: (Math.random() - 0.5) * Math.max(containerSize.width, 600) * 1.2,
      y: (Math.random() - 0.5) * Math.max(containerSize.height, 400) * 1.0,
      rotation: (Math.random() - 0.5) * 200,
      scale: 0.5,
      opacity: 0,
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , []); // intentionally stable

  // Compute card targets
  const targets = useMemo<CardTarget[]>(() => {
    const { width, height } = containerSize;
    const cx = width / 2;
    const cy = height / 2;
    const isMobile = width < 768;

    return MODALITIES.map((_, i) => {
      // ── Scatter ──
      if (phase === "scatter") return scatterPositions[i];

      // ── Line ──
      if (phase === "line") {
        const spacing = IMG_W + 8;
        const totalW = TOTAL * spacing;
        const lx = cx + (i * spacing - totalW / 2) + spacing / 2;
        return { x: lx, y: cy, rotation: 0, scale: 0.85, opacity: 1 };
      }

      // ── Circle → Arc (morphed) ──
      const minDim = Math.min(width, height);
      const circleR = Math.min(minDim * 0.32, 220);
      const circleAngle = (i / TOTAL) * 360;
      const circleRad = (circleAngle * Math.PI) / 180;
      const circleX = cx + Math.cos(circleRad) * circleR;
      const circleY = cy + Math.sin(circleRad) * circleR;
      const circleRotation = circleAngle + 90;

      // Arc (bottom rainbow)
      const arcRadius = Math.min(width, height * 1.6) * (isMobile ? 1.3 : 1.05);
      const arcApexY = height * (isMobile ? 0.38 : 0.28);
      const arcCenterY = arcApexY + arcRadius;
      const spread = isMobile ? 90 : 120;
      const startAngle = -90 - spread / 2;
      const step = spread / (TOTAL - 1);

      const scrollProg = Math.min(Math.max(rotateVal / 360, 0), 1);
      const maxRot = spread * 0.85;
      const bounded = scrollProg * maxRot;

      const arcAngle = startAngle + i * step - bounded;
      const arcRad = (arcAngle * Math.PI) / 180;
      const arcX = cx + Math.cos(arcRad) * arcRadius + parallaxVal;
      const arcY = arcCenterY + Math.sin(arcRad) * arcRadius;
      const arcRotation = arcAngle + 90;
      const arcScale = isMobile ? 1.6 : 2.0;

      return {
        x: lerp(circleX, arcX, morphVal),
        y: lerp(circleY, arcY, morphVal),
        rotation: lerp(circleRotation, arcRotation, morphVal),
        scale: lerp(1, arcScale, morphVal),
        opacity: 1,
      };
    });
  }, [phase, containerSize, morphVal, rotateVal, parallaxVal, scatterPositions]);

  // Scroll progress indicator (only when locked)
  const scrollPct = Math.min((scrollRef.current / MAX_SCROLL) * 100, 100);

  return (
    <section
      id="modalidades"
      className="relative overflow-hidden"
      style={{ height: "100vh", minHeight: 600 }}
    >
      {/* Ocean-depth background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsl(210 75% 18%) 0%, hsl(215 80% 12%) 60%, hsl(220 85% 8%) 100%)",
        }}
      />

      {/* Caustic light rays */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 pointer-events-none"
          style={{
            left: `${15 + i * 16}%`,
            width: 2,
            height: "55%",
            background: `linear-gradient(to bottom, hsla(185,80%,80%,${0.04 + (i % 3) * 0.015}) 0%, transparent 100%)`,
            transform: `rotate(${-6 + i * 3}deg)`,
            transformOrigin: "top center",
            filter: "blur(5px)",
          }}
          animate={{ opacity: [0.3, 0.7, 0.3], scaleY: [0.95, 1.05, 0.95] }}
          transition={{ duration: 3.5 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        />
      ))}

      {/* Section heading */}
      <motion.div
        className="absolute top-10 left-0 right-0 text-center z-20 pointer-events-none"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-2">
          Nossas{" "}
          <span style={{ color: "hsl(var(--neon-blue))" }}>Modalidades</span>
        </h2>
        <p className="text-white/50 text-sm tracking-widest uppercase">
          {scrollLocked ? "Role para explorar as 16 atividades" : "16 modalidades para a sua melhor versão"}
        </p>
      </motion.div>

      {/* Scroll lock hint */}
      <AnimatePresence>
        {scrollLocked && (
          <motion.div
            className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-2 z-20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Progress bar */}
            <div className="w-40 h-[2px] rounded-full overflow-hidden" style={{ background: "hsla(185,80%,60%,0.15)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, hsl(185,80%,70%), hsl(var(--primary)))",
                  width: `${scrollPct}%`,
                }}
                animate={{ width: `${scrollPct}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <motion.p
              className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-medium"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              ↓ Continue rolando
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip button (first visit only) */}
      <AnimatePresence>
        {scrollLocked && (
          <motion.button
            className="absolute top-10 right-6 z-30 text-white/30 hover:text-white/70 text-xs tracking-widest uppercase transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 3 } }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setScrollLocked(false);
              setPhase("circle");
              localStorage.setItem("flipper-modalities-seen", "1");
              virtualScroll.set(0);
              scrollRef.current = 0;
            }}
          >
            Pular →
          </motion.button>
        )}
      </AnimatePresence>

      {/* Card canvas */}
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden"
        style={{ touchAction: scrollLocked ? "none" : "auto" }}
      >
        {targets.map((target, i) => (
          <FlipCard
            key={MODALITIES[i].name}
            mod={MODALITIES[i]}
            target={target}
            zIndex={i === 0 ? 10 : 1}
          />
        ))}
      </div>

      {/* Center label when arc is fully morphed */}
      <AnimatePresence>
        {!scrollLocked && morphVal > 0.8 && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none"
            style={{ bottom: "12%" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-white/40 text-[10px] tracking-[0.35em] uppercase">
              Passe o mouse para ver detalhes
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
