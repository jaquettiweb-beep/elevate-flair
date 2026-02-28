import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import swimmingImg from "@/assets/swimming.jpg";
import yogaImg from "@/assets/yoga.jpg";
import martialImg from "@/assets/martial-arts.jpg";
import pilatesImg from "@/assets/pilates.jpg";
import musculacaoImg from "@/assets/musculacao.jpg";

// ─── Data ────────────────────────────────────────────────────────────────────
const MODALITIES = [
  { name: "Natação", desc: "Adulto, infantil e bebê. Piscina aquecida semiolímpica.", img: swimmingImg, emoji: "🏊", cta: "Agende uma aula experimental" },
  { name: "Musculação", desc: "Equipamentos de última geração com orientação profissional.", img: musculacaoImg, emoji: "💪", cta: "Conheça nosso espaço" },
  { name: "Yoga", desc: "Equilíbrio entre corpo e mente com instrutores certificados.", img: yogaImg, emoji: "🧘", cta: "Experimente uma aula" },
  { name: "Pilates Studio", desc: "Aparelhos de Pilates com acompanhamento individual.", img: pilatesImg, emoji: "🤸", cta: "Reserve sua vaga" },
  { name: "Pilates Solo", desc: "Fortalecimento e flexibilidade no solo para todos os níveis.", img: pilatesImg, emoji: "🤸", cta: "Venha praticar" },
  { name: "Hidroginástica", desc: "Exercícios aquáticos de baixo impacto para todas as idades.", img: swimmingImg, emoji: "🌊", cta: "Saiba mais" },
  { name: "Muay Thai", desc: "Arte marcial tailandesa — força, técnica e condicionamento.", img: martialImg, emoji: "🥊", cta: "Faça uma aula grátis" },
  { name: "Jiu Jitsu", desc: "Técnicas de grappling e defesa pessoal no tatame.", img: martialImg, emoji: "🥋", cta: "Comece agora" },
  { name: "Judô (infantil)", desc: "Disciplina e coordenação motora para crianças.", img: martialImg, emoji: "🥋", cta: "Matricule seu filho" },
  { name: "Kung Fu", desc: "Arte marcial chinesa milenar — equilíbrio e técnica.", img: martialImg, emoji: "🥋", cta: "Agende um treino" },
  { name: "Krav Maga", desc: "Sistema de defesa pessoal prático e eficiente.", img: martialImg, emoji: "🛡️", cta: "Experimente" },
  { name: "Aikidô", desc: "Arte marcial japonesa baseada em harmonia e força.", img: martialImg, emoji: "☯️", cta: "Conheça a arte" },
  { name: "Ballet (infantil)", desc: "Expressão artística, postura e ritmo para crianças.", img: pilatesImg, emoji: "🩰", cta: "Inscreva-se" },
  { name: "Ginástica", desc: "Coordenação, flexibilidade e condicionamento físico global.", img: musculacaoImg, emoji: "🤾", cta: "Venha treinar" },
  { name: "Hidroterapia", desc: "Reabilitação e bem-estar por exercícios aquáticos terapêuticos.", img: swimmingImg, emoji: "💧", cta: "Agende sua sessão" },
  { name: "Programa 60+ Saúde", desc: "Atividades físicas especialmente para a melhor idade.", img: swimmingImg, emoji: "❤️", cta: "Saiba mais" },
];

const TOTAL = MODALITIES.length;
const CARD_W = 90;
const CARD_H = 124;
const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;

// Entry animation durations
const PHASE_LINE = 1.2;
const PHASE_CIRCLE = 1.0;
const PHASE_WHEEL = 3.0;
const PHASE_MORPH_ARC = 1.5;
const ENTRY_DURATION = PHASE_LINE + PHASE_CIRCLE + PHASE_WHEEL + PHASE_MORPH_ARC;

// ─── FlipCard ────────────────────────────────────────────────────────────────
interface FlipCardProps {
  mod: (typeof MODALITIES)[number];
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
  interactive: boolean;
  onHoverMod: (mod: (typeof MODALITIES)[number] | null) => void;
  isMobile: boolean;
}

function FlipCard({ mod, target, interactive, onHoverMod, isMobile }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  const handleStart = useCallback(() => {
    if (!interactive) return;
    setFlipped(true);
    onHoverMod(mod);
  }, [interactive, mod, onHoverMod]);

  const handleEnd = useCallback(() => {
    if (!interactive) return;
    setFlipped(false);
    onHoverMod(null);
  }, [interactive, onHoverMod]);

  return (
    <motion.div
      className="absolute"
      style={{
        width: CARD_W,
        height: CARD_H,
        left: "50%",
        top: "50%",
        marginLeft: -CARD_W / 2,
        marginTop: -CARD_H / 2,
        perspective: 900,
        zIndex: flipped ? 20 : 1,
      }}
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{ type: "spring", stiffness: 55, damping: 18 }}
      onHoverStart={!isMobile ? handleStart : undefined}
      onHoverEnd={!isMobile ? handleEnd : undefined}
      onTouchStart={isMobile ? handleStart : undefined}
      onTouchEnd={isMobile ? handleEnd : undefined}
    >
      <motion.div
        style={{ width: "100%", height: "100%", transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Front */}
        <div
          style={{ backfaceVisibility: "hidden" }}
          className="absolute inset-0 rounded-xl overflow-hidden border border-white/20 shadow-lg"
        >
          <img src={mod.img} alt={mod.name} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <p className="absolute bottom-2 left-0 right-0 text-center text-white text-[9px] font-bold tracking-wide leading-tight px-1">
            {mod.name}
          </p>
        </div>
        {/* Back */}
        <div
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(135deg, hsl(221, 83%, 53%), hsl(250, 70%, 50%))",
          }}
          className="absolute inset-0 rounded-xl flex flex-col items-center justify-center gap-1 p-2 text-center"
        >
          <span className="text-xl">{mod.emoji}</span>
          <p className="text-white text-[8px] font-bold leading-tight">{mod.name}</p>
          <p className="text-white/80 text-[7px] leading-tight">{mod.desc}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Background Overlay ──────────────────────────────────────────────────────
function BackgroundOverlay({ hoveredMod }: { hoveredMod: (typeof MODALITIES)[number] | null }) {
  return (
    <AnimatePresence>
      {hoveredMod && (
        <motion.div
          key={hoveredMod.name}
          className="absolute inset-0 z-[2]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <img src={hoveredMod.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <span className="text-5xl md:text-6xl mb-3">{hoveredMod.emoji}</span>
            <h3 className="font-display text-2xl md:text-4xl font-bold text-white mb-2">{hoveredMod.name}</h3>
            <p className="text-white/80 text-sm md:text-base max-w-md mb-4">{hoveredMod.desc}</p>
            <motion.a
              href="#contato"
              className="inline-block px-6 py-2.5 rounded-full text-sm font-semibold text-white border border-white/40 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              {hoveredMod.cta}
            </motion.a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
type Phase = "idle" | "entering" | "arc" | "exiting";

export default function Modalities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [phase, setPhase] = useState<Phase>("idle");
  const [entryProgress, setEntryProgress] = useState(0);
  const [manualRotation, setManualRotation] = useState(0); // degrees, user-controlled
  const [hoveredMod, setHoveredMod] = useState<(typeof MODALITIES)[number] | null>(null);
  const animFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const dragStartRef = useRef<number>(0);
  const dragRotStartRef = useRef<number>(0);
  const isMobile = containerSize.width > 0 && containerSize.width < 768;

  // Exit animation progress
  const [exitProgress, setExitProgress] = useState(0);
  const EXIT_DURATION = 1.2;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      const e = entries[0];
      setContainerSize({ width: e.contentRect.width, height: e.contentRect.height });
    });
    obs.observe(el);
    setContainerSize({ width: el.offsetWidth, height: el.offsetHeight });
    return () => obs.disconnect();
  }, []);

  const scatter = useMemo(() =>
    MODALITIES.map(() => ({
      x: (Math.random() - 0.5) * 1400,
      y: (Math.random() - 0.5) * 800,
      rotation: (Math.random() - 0.5) * 160,
      scale: 0.5,
      opacity: 0,
    })), []);

  // Lock page scroll during arc/entering/exiting phases
  useEffect(() => {
    if (phase === "arc" || phase === "entering" || phase === "exiting") {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [phase]);

  // Entry animation
  useEffect(() => {
    if (phase !== "entering") {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }
    lastTimeRef.current = performance.now();
    const tick = (now: number) => {
      const dt = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;
      setEntryProgress((prev) => {
        const next = prev + dt;
        if (next >= ENTRY_DURATION) {
          setPhase("arc");
          return ENTRY_DURATION;
        }
        return next;
      });
      animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);
    return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
  }, [phase]);

  // Exit animation
  useEffect(() => {
    if (phase !== "exiting") return;
    lastTimeRef.current = performance.now();
    const tick = (now: number) => {
      const dt = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;
      setExitProgress((prev) => {
        const next = prev + dt;
        if (next >= EXIT_DURATION) {
          setPhase("idle");
          setEntryProgress(0);
          setExitProgress(0);
          setManualRotation(0);
          return 0;
        }
        return next;
      });
      animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);
    return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
  }, [phase]);

  // Manual scroll/drag for arc rotation
  useEffect(() => {
    if (phase !== "arc") return;
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setManualRotation((prev) => prev + e.deltaY * 0.15);
    };

    // Touch drag
    let touchStartX = 0;
    let rotAtStart = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      rotAtStart = 0; // we'll use a ref
    };
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const dx = e.touches[0].clientX - touchStartX;
      setManualRotation((prev) => prev - dx * 0.3);
      touchStartX = e.touches[0].clientX;
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
    };
  }, [phase]);

  const handleStart = useCallback(() => {
    setPhase("entering");
    setEntryProgress(0);
    setManualRotation(0);
  }, []);

  const handleStop = useCallback(() => {
    setPhase("exiting");
    setExitProgress(0);
    setHoveredMod(null);
  }, []);

  // Circle helper
  function circleTarget(i: number, offsetDeg: number) {
    const minDim = Math.min(containerSize.width, containerSize.height);
    const circleR = Math.min(minDim * 0.32, isMobile ? 130 : 220);
    const cAngle = (i / TOTAL) * 360 + offsetDeg;
    const cRad = (cAngle * Math.PI) / 180;
    return { x: Math.cos(cRad) * circleR, y: Math.sin(cRad) * circleR, rotation: cAngle + 90, scale: 1, opacity: 1 };
  }

  // Arc position helper
  function arcTarget(i: number, rotationOffset: number) {
    const baseR = Math.min(containerSize.width, containerSize.height * 1.5);
    const arcR = baseR * (isMobile ? 1.5 : 1.15);
    const apexY = containerSize.height * (isMobile ? 0.32 : 0.22);
    const arcCenterY = apexY + arcR;
    const spread = isMobile ? 95 : 120;
    const startAng = -90 - spread / 2;
    const step = spread / (TOTAL - 1);

    const curAng = startAng + i * step + rotationOffset;
    const curRad = (curAng * Math.PI) / 180;
    return {
      x: Math.cos(curRad) * arcR,
      y: Math.sin(curRad) * arcR + arcCenterY,
      rotation: curAng + 90,
      scale: isMobile ? 1.5 : 1.9,
      opacity: 1,
    };
  }

  // Phase boundaries for entry
  const T1 = PHASE_LINE;
  const T2 = T1 + PHASE_CIRCLE;
  const T3 = T2 + PHASE_WHEEL;
  // T4 = ENTRY_DURATION (morph complete)

  const isInteractive = phase === "arc";

  // Arc text visibility
  const arcTextOpacity =
    phase === "entering" && entryProgress >= T3
      ? Math.min((entryProgress - T3) / (PHASE_MORPH_ARC * 0.6), 1)
      : phase === "arc" ? 1
      : phase === "exiting" ? 1 - Math.min(exitProgress / (EXIT_DURATION * 0.4), 1)
      : 0;

  return (
    <section id="modalidades" className="relative">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{ height: isMobile ? "80vh" : "90vh", minHeight: 500, cursor: phase === "arc" ? "grab" : "default" }}
      >
        {/* Deep ocean bg */}
        <div className="absolute inset-0 z-[1]" style={{ background: "linear-gradient(180deg, hsl(210,75%,18%) 0%, hsl(220,80%,10%) 60%, hsl(215,80%,7%) 100%)" }} />

        {/* Hovered bg */}
        <BackgroundOverlay hoveredMod={hoveredMod} />

        {/* Caustics */}
        <div className="absolute inset-0 z-[3] pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0"
              style={{
                left: `${10 + i * 18}%`, width: 2, height: "55%",
                background: "linear-gradient(to bottom, hsla(185,80%,80%,0.07) 0%, transparent 100%)",
                transform: `rotate(${-6 + i * 3}deg)`, transformOrigin: "top center", filter: "blur(5px)",
              }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            />
          ))}
        </div>

        {/* Section title */}
        <motion.div
          className="absolute top-8 left-0 right-0 text-center z-10 pointer-events-none"
          animate={{ opacity: (hoveredMod ? 0 : 1) * (1 - arcTextOpacity) }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-2">
            Nossas <span style={{ color: "hsl(var(--primary-glow))" }}>Modalidades</span>
          </h2>
          <p className="text-white/50 text-sm">16 atividades para encontrar a sua favorita</p>
        </motion.div>

        {/* Arc overlay text */}
        <motion.div
          className="absolute top-8 left-0 right-0 text-center z-10 pointer-events-none"
          animate={{ opacity: arcTextOpacity * (hoveredMod ? 0 : 1) }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="font-display text-2xl lg:text-4xl font-bold text-white mb-1">
            Escolha sua <span style={{ color: "hsl(var(--primary-glow))" }}>modalidade</span>
          </h2>
          <p className="text-white/40 text-xs tracking-widest uppercase">
            {isMobile ? "deslize para navegar • toque para ver detalhes" : "scroll para navegar • passe o mouse para ver detalhes"}
          </p>
        </motion.div>

        {/* Card stage */}
        <div className="absolute inset-0 z-[5]">
          {containerSize.width > 0 &&
            MODALITIES.map((mod, i) => {
              let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

              if (phase === "idle") {
                target = circleTarget(i, 0);
              } else if (phase === "entering") {
                if (entryProgress < T1) {
                  // Scatter → Line
                  const t = entryProgress / T1;
                  const spacing = 68;
                  const totalW = TOTAL * spacing;
                  const lineX = i * spacing - totalW / 2;
                  target = {
                    x: lerp(scatter[i].x, lineX, t),
                    y: lerp(scatter[i].y, 0, t),
                    rotation: lerp(scatter[i].rotation, 0, t),
                    scale: lerp(0.5, 1, t),
                    opacity: t,
                  };
                } else if (entryProgress < T2) {
                  // Line → Circle
                  const t = (entryProgress - T1) / PHASE_CIRCLE;
                  const spacing = 68;
                  const totalW = TOTAL * spacing;
                  const lineX = i * spacing - totalW / 2;
                  const ct = circleTarget(i, 0);
                  target = {
                    x: lerp(lineX, ct.x, t),
                    y: lerp(0, ct.y, t),
                    rotation: lerp(0, ct.rotation, t),
                    scale: 1,
                    opacity: 1,
                  };
                } else if (entryProgress < T3) {
                  // Wheel rotation 360°
                  const wheelAngle = ((entryProgress - T2) / PHASE_WHEEL) * 360;
                  target = circleTarget(i, wheelAngle);
                } else {
                  // Morph circle → arc
                  const t = Math.min((entryProgress - T3) / PHASE_MORPH_ARC, 1);
                  const ct = circleTarget(i, 0);
                  const at = arcTarget(i, 0);
                  target = {
                    x: lerp(ct.x, at.x, t),
                    y: lerp(ct.y, at.y, t),
                    rotation: lerp(ct.rotation, at.rotation, t),
                    scale: lerp(1, at.scale, t),
                    opacity: 1,
                  };
                }
              } else if (phase === "arc") {
                // Static arc with manual rotation
                target = arcTarget(i, manualRotation);
              } else if (phase === "exiting") {
                // Arc → circle
                const t = Math.min(exitProgress / EXIT_DURATION, 1);
                const at = arcTarget(i, manualRotation * (1 - t));
                const ct = circleTarget(i, 0);
                target = {
                  x: lerp(at.x, ct.x, t),
                  y: lerp(at.y, ct.y, t),
                  rotation: lerp(at.rotation, ct.rotation, t),
                  scale: lerp(at.scale, 1, t),
                  opacity: 1,
                };
              }

              return (
                <FlipCard
                  key={mod.name}
                  mod={mod}
                  target={target}
                  interactive={isInteractive}
                  onHoverMod={setHoveredMod}
                  isMobile={isMobile}
                />
              );
            })}
        </div>

        {/* Center button */}
        <div className="absolute inset-0 z-[6] flex items-center justify-center pointer-events-none">
          <motion.div
            className="pointer-events-auto"
            animate={{ opacity: hoveredMod ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              onClick={phase === "idle" ? handleStart : phase === "arc" ? handleStop : undefined}
              className="relative px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-base text-white border border-white/30 bg-white/10 backdrop-blur-md shadow-lg shadow-black/20 hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              layout
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={phase === "arc" ? "stop" : "start"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  {phase === "arc" ? "Continuar Navegando" : phase === "entering" ? "..." : "Ver Modalidades"}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
