import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
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

// ─── FlipCard ────────────────────────────────────────────────────────────────
interface FlipCardProps {
  mod: (typeof MODALITIES)[number];
  index: number;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
  interactive: boolean;
  onHoverMod: (mod: (typeof MODALITIES)[number] | null) => void;
  isMobile: boolean;
}

function FlipCard({ mod, index, target, interactive, onHoverMod, isMobile }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  const handleInteractionStart = useCallback(() => {
    if (!interactive) return;
    setFlipped(true);
    onHoverMod(mod);
  }, [interactive, mod, onHoverMod]);

  const handleInteractionEnd = useCallback(() => {
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
      onHoverStart={!isMobile ? handleInteractionStart : undefined}
      onHoverEnd={!isMobile ? handleInteractionEnd : undefined}
      onTouchStart={isMobile ? handleInteractionStart : undefined}
      onTouchEnd={isMobile ? handleInteractionEnd : undefined}
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
          <img
            src={hoveredMod.img}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Info overlay */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <span className="text-5xl md:text-6xl mb-3">{hoveredMod.emoji}</span>
            <h3 className="font-display text-2xl md:text-4xl font-bold text-white mb-2">
              {hoveredMod.name}
            </h3>
            <p className="text-white/80 text-sm md:text-base max-w-md mb-4">
              {hoveredMod.desc}
            </p>
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
export default function Modalities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [animating, setAnimating] = useState(false);
  const [phase, setPhase] = useState(0); // 0=circle, 1+=rotating
  const [wheelAngle, setWheelAngle] = useState(0);
  const [hoveredMod, setHoveredMod] = useState<(typeof MODALITIES)[number] | null>(null);
  const animFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const isMobile = containerSize.width > 0 && containerSize.width < 768;

  // Container size observer
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

  // Random scatter positions (stable)
  const scatter = useMemo(() =>
    MODALITIES.map(() => ({
      x: (Math.random() - 0.5) * 1000,
      y: (Math.random() - 0.5) * 600,
      rotation: (Math.random() - 0.5) * 160,
      scale: 0.5,
      opacity: 0,
    })), []);

  // Animation loop
  useEffect(() => {
    if (!animating) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    lastTimeRef.current = performance.now();

    const tick = (now: number) => {
      const dt = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      setWheelAngle((prev) => prev + dt * 30); // 30 deg/sec
      setPhase((prev) => {
        if (prev < 1) return Math.min(prev + dt * 1.2, 1); // transition to circle in ~0.8s
        return prev;
      });

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [animating]);

  const handleStart = useCallback(() => {
    setAnimating(true);
    setPhase(0.01);
    setWheelAngle(0);
  }, []);

  const handleStop = useCallback(() => {
    setAnimating(false);
    setPhase(0);
    setWheelAngle(0);
    setHoveredMod(null);
  }, []);

  // Circle target helper
  function circleTarget(i: number, offsetDeg: number) {
    const minDim = Math.min(containerSize.width, containerSize.height);
    const circleR = Math.min(minDim * 0.32, isMobile ? 130 : 220);
    const cAngle = (i / TOTAL) * 360 + offsetDeg;
    const cRad = (cAngle * Math.PI) / 180;
    return {
      x: Math.cos(cRad) * circleR,
      y: Math.sin(cRad) * circleR,
      rotation: cAngle + 90,
      scale: 1,
      opacity: 1,
    };
  }

  const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;

  return (
    <section id="modalidades" className="relative">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{ height: isMobile ? "80vh" : "90vh", minHeight: 500 }}
      >
        {/* Deep ocean background */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: "linear-gradient(180deg, hsl(210,75%,18%) 0%, hsl(220,80%,10%) 60%, hsl(215,80%,7%) 100%)",
          }}
        />

        {/* Hovered modality background */}
        <BackgroundOverlay hoveredMod={hoveredMod} />

        {/* Caustic light streaks */}
        <div className="absolute inset-0 z-[3] pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0"
              style={{
                left: `${10 + i * 18}%`,
                width: 2,
                height: "55%",
                background: "linear-gradient(to bottom, hsla(185,80%,80%,0.07) 0%, transparent 100%)",
                transform: `rotate(${-6 + i * 3}deg)`,
                transformOrigin: "top center",
                filter: "blur(5px)",
              }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            />
          ))}
        </div>

        {/* Section title */}
        <motion.div
          className="absolute top-8 left-0 right-0 text-center z-10 pointer-events-none"
          animate={{ opacity: hoveredMod ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-2">
            Nossas{" "}
            <span style={{ color: "hsl(var(--primary-glow))" }}>Modalidades</span>
          </h2>
          <p className="text-white/50 text-sm">
            16 atividades para encontrar a sua favorita
          </p>
        </motion.div>

        {/* Card stage */}
        <div className="absolute inset-0 z-[5]">
          {containerSize.width > 0 &&
            MODALITIES.map((mod, i) => {
              let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

              if (!animating) {
                // Static circle formation
                target = circleTarget(i, 0);
              } else {
                // Animated: lerp from scatter to circle, then rotate
                const t = Math.min(phase, 1);
                const ct = circleTarget(i, wheelAngle);

                if (t < 1) {
                  // Transition in
                  target = {
                    x: lerp(scatter[i].x, ct.x, t),
                    y: lerp(scatter[i].y, ct.y, t),
                    rotation: lerp(scatter[i].rotation, ct.rotation, t),
                    scale: lerp(0.5, 1, t),
                    opacity: t,
                  };
                } else {
                  target = ct;
                }
              }

              return (
                <FlipCard
                  key={mod.name}
                  mod={mod}
                  index={i}
                  target={target}
                  interactive={animating && phase >= 1}
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
              onClick={animating ? handleStop : handleStart}
              className="relative px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-base text-white border border-white/30 bg-white/10 backdrop-blur-md shadow-lg shadow-black/20 hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              layout
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={animating ? "stop" : "start"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  {animating ? "Continuar Navegando" : "Ver Modalidades"}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
