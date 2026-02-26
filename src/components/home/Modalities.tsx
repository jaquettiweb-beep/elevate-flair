import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import swimmingImg from "@/assets/swimming.jpg";
import yogaImg from "@/assets/yoga.jpg";
import martialImg from "@/assets/martial-arts.jpg";
import pilatesImg from "@/assets/pilates.jpg";
import musculacaoImg from "@/assets/musculacao.jpg";

// ─── Data ────────────────────────────────────────────────────────────────────
const MODALITIES = [
  { name: "Natação", desc: "Adulto, infantil e bebê. Piscina aquecida semiolímpica.", img: swimmingImg, emoji: "🏊" },
  { name: "Musculação", desc: "Equipamentos de última geração com orientação profissional.", img: musculacaoImg, emoji: "💪" },
  { name: "Yoga", desc: "Equilíbrio entre corpo e mente com instrutores certificados.", img: yogaImg, emoji: "🧘" },
  { name: "Pilates Studio", desc: "Aparelhos de Pilates com acompanhamento individual.", img: pilatesImg, emoji: "🤸" },
  { name: "Pilates Solo", desc: "Fortalecimento e flexibilidade no solo para todos os níveis.", img: pilatesImg, emoji: "🤸" },
  { name: "Hidroginástica", desc: "Exercícios aquáticos de baixo impacto para todas as idades.", img: swimmingImg, emoji: "🌊" },
  { name: "Muay Thai", desc: "Arte marcial tailandesa — força, técnica e condicionamento.", img: martialImg, emoji: "🥊" },
  { name: "Jiu Jitsu", desc: "Técnicas de grappling e defesa pessoal no tatame.", img: martialImg, emoji: "🥋" },
  { name: "Judô (infantil)", desc: "Disciplina e coordenação motora para crianças.", img: martialImg, emoji: "🥋" },
  { name: "Kung Fu", desc: "Arte marcial chinesa milenar — equilíbrio e técnica.", img: martialImg, emoji: "🥋" },
  { name: "Krav Maga", desc: "Sistema de defesa pessoal prático e eficiente.", img: martialImg, emoji: "🛡️" },
  { name: "Aikidô", desc: "Arte marcial japonesa baseada em harmonia e força.", img: martialImg, emoji: "☯️" },
  { name: "Ballet (infantil)", desc: "Expressão artística, postura e ritmo para crianças.", img: pilatesImg, emoji: "🩰" },
  { name: "Ginástica", desc: "Coordenação, flexibilidade e condicionamento físico global.", img: musculacaoImg, emoji: "🤾" },
  { name: "Hidroterapia", desc: "Reabilitação e bem-estar por exercícios aquáticos terapêuticos.", img: swimmingImg, emoji: "💧" },
  { name: "Programa 60+ Saúde", desc: "Atividades físicas especialmente para a melhor idade.", img: swimmingImg, emoji: "❤️" },
];

const TOTAL = MODALITIES.length;
const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;
const CARD_W = 90;
const CARD_H = 124;

// ─── FlipCard ────────────────────────────────────────────────────────────────
interface FlipCardProps {
  mod: (typeof MODALITIES)[number];
  index: number;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
  interactive: boolean;
}

function FlipCard({ mod, index, target, interactive }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

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
      }}
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{ type: "spring", stiffness: 55, damping: 18 }}
      onHoverStart={() => interactive && setFlipped(true)}
      onHoverEnd={() => interactive && setFlipped(false)}
      onClick={() => interactive && setFlipped((f) => !f)}
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

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Modalities() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Scroll progress through the tall section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 25 });
  const [progress, setProgress] = useState(0);
  useMotionValueEvent(smoothProgress, "change", setProgress);

  // Container size observer
  useEffect(() => {
    const el = stickyRef.current;
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
      x: (Math.random() - 0.5) * 1400,
      y: (Math.random() - 0.5) * 800,
      rotation: (Math.random() - 0.5) * 160,
      scale: 0.5,
      opacity: 0,
    })), []);

  // ── Scroll-driven phases ──────────────────────────────────────────────────
  // 0.00 - 0.05: scatter (invisible)
  // 0.05 - 0.15: line formation
  // 0.15 - 0.30: circle formation
  // 0.30 - 0.50: wheel auto-rotation (360°)
  // 0.50 - 0.75: morph circle → arc + rotate arc
  // 0.75 - 1.00: morph arc → circle + fade

  function circleTarget(i: number, offsetDeg: number) {
    const isMobile = containerSize.width < 768;
    const minDim = Math.min(containerSize.width, containerSize.height);
    const circleR = Math.min(minDim * 0.32, 280);
    const cAngle = (i / TOTAL) * 360 + offsetDeg;
    const cRad = (cAngle * Math.PI) / 180;
    return {
      x: Math.cos(cRad) * circleR,
      y: Math.sin(cRad) * circleR,
      rotation: cAngle + 90,
      scale: 1,
      opacity: 1,
      isMobile,
    };
  }

  // Derived values from progress
  const titleOpacity = progress < 0.05 ? 0 : progress < 0.12 ? (progress - 0.05) / 0.07 : progress > 0.70 ? Math.max(0, 1 - (progress - 0.70) / 0.10) : 1;

  // Wheel rotation during 0.30-0.50
  const wheelRotation = progress < 0.30 ? 0 : progress > 0.50 ? 360 : ((progress - 0.30) / 0.20) * 360;

  // Morph progress (circle → arc) during 0.50-0.65
  const morphVal = progress < 0.50 ? 0 : progress > 0.65 ? 1 : (progress - 0.50) / 0.15;

  // Arc rotation during 0.55-0.80
  const arcRotation = progress < 0.55 ? 0 : progress > 0.80 ? 360 : ((progress - 0.55) / 0.25) * 360;

  // Morph back (arc → circle) during 0.80-0.92
  const morphBack = progress < 0.80 ? 0 : progress > 0.92 ? 1 : (progress - 0.80) / 0.12;

  const effectiveMorph = morphVal * (1 - morphBack);

  // Arc overlay text opacity
  const arcTextOpacity = effectiveMorph > 0.7 ? 1 : effectiveMorph > 0.5 ? (effectiveMorph - 0.5) / 0.2 : 0;

  const isInteractive = effectiveMorph > 0.5;

  return (
    <section
      ref={sectionRef}
      id="modalidades"
      className="relative"
      style={{ height: "400vh" }}
    >
      {/* Sticky viewport */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden"
        style={{ minHeight: 600 }}
      >
        {/* Deep ocean background */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, hsl(210,75%,18%) 0%, hsl(220,80%,10%) 60%, hsl(215,80%,7%) 100%)",
          }}
        />

        {/* Caustic light streaks */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 pointer-events-none"
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

        {/* Section title */}
        <div
          className="absolute top-8 left-0 right-0 text-center z-10 pointer-events-none"
          style={{ opacity: titleOpacity * (1 - arcTextOpacity) }}
        >
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-2">
            Nossas{" "}
            <span style={{ color: "hsl(var(--primary-glow))" }}>Modalidades</span>
          </h2>
          <p className="text-white/50 text-sm">
            16 atividades para encontrar a sua favorita
          </p>
        </div>

        {/* Arc overlay text */}
        <div
          className="absolute top-8 left-0 right-0 text-center z-10 pointer-events-none"
          style={{ opacity: arcTextOpacity, transform: `translateY(${(1 - arcTextOpacity) * 20}px)` }}
        >
          <h2 className="font-display text-2xl lg:text-4xl font-bold text-white mb-1">
            Escolha sua{" "}
            <span style={{ color: "hsl(var(--primary-glow))" }}>modalidade</span>
          </h2>
          <p className="text-white/40 text-xs tracking-widest uppercase">
            passe o mouse sobre os cards para ver detalhes
          </p>
        </div>

        {/* Card stage */}
        <div className="absolute inset-0">
          {containerSize.width > 0 &&
            MODALITIES.map((mod, i) => {
              const isMobile = containerSize.width < 768;
              let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

              if (progress < 0.05) {
                // Scatter
                target = scatter[i];

              } else if (progress < 0.15) {
                // Line formation
                const t = (progress - 0.05) / 0.10;
                const spacing = 68;
                const totalW = TOTAL * spacing;
                const lineTarget = {
                  x: i * spacing - totalW / 2,
                  y: 0,
                  rotation: 0,
                  scale: 1,
                  opacity: 1,
                };
                target = {
                  x: lerp(scatter[i].x, lineTarget.x, t),
                  y: lerp(scatter[i].y, lineTarget.y, t),
                  rotation: lerp(scatter[i].rotation, 0, t),
                  scale: lerp(0.5, 1, t),
                  opacity: t,
                };

              } else if (progress < 0.30) {
                // Circle formation (no wheel rotation yet)
                const t = Math.min((progress - 0.15) / 0.10, 1);
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

              } else if (progress < 0.50) {
                // Wheel auto-rotation
                const ct = circleTarget(i, wheelRotation);
                target = { x: ct.x, y: ct.y, rotation: ct.rotation, scale: 1, opacity: 1 };

              } else {
                // Morph circle ↔ arc
                const ct = circleTarget(i, 0);
                const circlePos = { x: ct.x, y: ct.y, rotation: ct.rotation };

                const baseR = Math.min(containerSize.width, containerSize.height * 1.5);
                const arcR = baseR * (isMobile ? 1.5 : 1.15);
                const apexY = containerSize.height * (isMobile ? 0.32 : 0.22);
                const arcCenterY = apexY + arcR;
                const spread = isMobile ? 95 : 120;
                const startAng = -90 - spread / 2;
                const step = spread / (TOTAL - 1);
                const scrollProg = Math.min(Math.max(arcRotation / 360, 0), 1);
                const totalRot = spread + step * (TOTAL - 1);
                const boundedRot = -scrollProg * totalRot;
                let curAng = startAng + i * step + boundedRot;
                const arcSpan = TOTAL * step;
                const arcMin = startAng - step;
                while (curAng < arcMin) curAng += arcSpan;
                while (curAng > arcMin + arcSpan) curAng -= arcSpan;
                const curRad = (curAng * Math.PI) / 180;
                const arcPos = {
                  x: Math.cos(curRad) * arcR,
                  y: Math.sin(curRad) * arcR + arcCenterY,
                  rotation: curAng + 90,
                  scale: isMobile ? 1.5 : 1.9,
                };

                target = {
                  x: lerp(circlePos.x, arcPos.x, effectiveMorph),
                  y: lerp(circlePos.y, arcPos.y, effectiveMorph),
                  rotation: lerp(circlePos.rotation, arcPos.rotation, effectiveMorph),
                  scale: lerp(1, arcPos.scale, effectiveMorph),
                  opacity: 1,
                };
              }

              return (
                <FlipCard
                  key={mod.name}
                  mod={mod}
                  index={i}
                  target={target}
                  interactive={isInteractive}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
}
