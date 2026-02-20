import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";
import swimmingImg from "@/assets/swimming.jpg";
import yogaImg from "@/assets/yoga.jpg";
import martialImg from "@/assets/martial-arts.jpg";
import pilatesImg from "@/assets/pilates.jpg";
import musculacaoImg from "@/assets/musculacao.jpg";

// ─── Data ───────────────────────────────────────────────────────────────────
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

// ─── Card sizes ──────────────────────────────────────────────────────────────
const CARD_W = 90;
const CARD_H = 124;

// ─── FlipCard ────────────────────────────────────────────────────────────────
interface FlipCardProps {
  mod: (typeof MODALITIES)[number];
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
  phase: string;
}

function FlipCard({ mod, target, phase }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const isInteractive = phase === "circle" || phase === "arc";

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
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{ type: "spring", stiffness: 55, damping: 18 }}
      onHoverStart={() => isInteractive && setFlipped(true)}
      onHoverEnd={() => setFlipped(false)}
      onClick={() => isInteractive && setFlipped((f) => !f)}
    >
      {/* Inner flipper */}
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
          <img
            src={mod.img}
            alt={mod.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
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

// ─── Main Modalities Component ────────────────────────────────────────────────
export default function Modalities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [introPhase, setIntroPhase] = useState<"scatter" | "line" | "circle">("scatter");

  // Observe container size
  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver((entries) => {
      const e = entries[0];
      setContainerSize({ width: e.contentRect.width, height: e.contentRect.height });
    });
    obs.observe(containerRef.current);
    setContainerSize({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    });
    return () => obs.disconnect();
  }, []);

  // Intro sequence: scatter → line → circle
  useEffect(() => {
    const t1 = setTimeout(() => setIntroPhase("line"), 600);
    const t2 = setTimeout(() => setIntroPhase("circle"), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Virtual scroll (wheel captures inside this section)
  const virtualScroll = useMotionValue(0);
  const scrollRef = useRef(0);
  const MAX_SCROLL = 2800;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // Only capture if we're in "circle" phase
      if (introPhase !== "circle") return;
      const next = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
      scrollRef.current = next;
      virtualScroll.set(next);
      // Prevent page scroll while exploring the wheel
      if (next > 0 && next < MAX_SCROLL) e.preventDefault();
    };

    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      if (introPhase !== "circle") return;
      const delta = touchY - e.touches[0].clientY;
      touchY = e.touches[0].clientY;
      const next = Math.min(Math.max(scrollRef.current + delta, 0), MAX_SCROLL);
      scrollRef.current = next;
      virtualScroll.set(next);
      if (next > 0 && next < MAX_SCROLL) e.preventDefault();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: false });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, [introPhase, virtualScroll]);

  // Morph: 0 = full circle, 1 = arc
  const morphRaw = useTransform(virtualScroll, [0, 700], [0, 1]);
  const morph = useSpring(morphRaw, { stiffness: 40, damping: 20 });

  // Rotation for arc scroll
  const rotateRaw = useTransform(virtualScroll, [700, MAX_SCROLL], [0, 360]);
  const rotate = useSpring(rotateRaw, { stiffness: 40, damping: 20 });

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set(((e.clientX - rect.left) / rect.width * 2 - 1) * 80);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mouseX]);

  // Rendered values
  const [morphVal, setMorphVal] = useState(0);
  const [rotateVal, setRotateVal] = useState(0);
  const [parallax, setParallax] = useState(0);

  useEffect(() => {
    const u1 = morph.on("change", setMorphVal);
    const u2 = rotate.on("change", setRotateVal);
    const u3 = smoothMouseX.on("change", setParallax);
    return () => { u1(); u2(); u3(); };
  }, [morph, rotate, smoothMouseX]);

  // Random scatter
  const scatter = useMemo(() =>
    MODALITIES.map(() => ({
      x: (Math.random() - 0.5) * 1400,
      y: (Math.random() - 0.5) * 800,
      rotation: (Math.random() - 0.5) * 160,
      scale: 0.5,
      opacity: 0,
    })), []);

  // Arc content fade-in
  const arcContentOpacity = useTransform(morph, [0.75, 1], [0, 1]);
  const arcContentY = useTransform(morph, [0.75, 1], [20, 0]);
  const [arcOpacity, setArcOpacity] = useState(0);
  const [arcY, setArcY] = useState(20);
  useEffect(() => {
    const u1 = arcContentOpacity.on("change", setArcOpacity);
    const u2 = arcContentY.on("change", setArcY);
    return () => { u1(); u2(); };
  }, [arcContentOpacity, arcContentY]);

  // Scroll hint opacity
  const hintOpacity = useTransform(morph, [0, 0.1], [1, 0]);
  const [hintOp, setHintOp] = useState(1);
  useEffect(() => hintOpacity.on("change", setHintOp), [hintOpacity]);

  return (
    <section
      id="modalidades"
      className="relative overflow-hidden"
      style={{
        height: "100svh",
        minHeight: 600,
      }}
    >
      {/* Deep ocean BG */}
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
            background: `linear-gradient(to bottom, hsla(185,80%,80%,0.07) 0%, transparent 100%)`,
            transform: `rotate(${-6 + i * 3}deg)`,
            transformOrigin: "top center",
            filter: "blur(5px)",
          }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        />
      ))}

      {/* Section title — fades out as arc forms */}
      <motion.div
        className="absolute top-8 left-0 right-0 text-center z-10 pointer-events-none"
        style={{ opacity: 1 - morphVal }}
      >
        <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-2">
          Nossas <span className="text-primary-glow" style={{ color: "hsl(var(--primary-glow))" }}>Modalidades</span>
        </h2>
        <p className="text-white/50 text-sm">16 atividades para encontrar a sua favorita</p>
      </motion.div>

      {/* Scroll hint — visible at circle phase before scroll */}
      {introPhase === "circle" && (
        <motion.div
          className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-1 z-10 pointer-events-none"
          style={{ opacity: hintOp }}
        >
          <motion.div
            className="w-px h-8 rounded-full"
            style={{ background: "hsla(185,80%,70%,0.5)" }}
            animate={{ scaleY: [0.5, 1, 0.5] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          <p className="text-white/35 text-[10px] tracking-[0.3em] uppercase font-medium">
            role para explorar
          </p>
        </motion.div>
      )}

      {/* Arc overlay text (fades in after morph) */}
      <div
        className="absolute top-8 left-0 right-0 text-center z-10 pointer-events-none"
        style={{ opacity: arcOpacity, transform: `translateY(${arcY}px)` }}
      >
        <h2 className="font-display text-2xl lg:text-4xl font-bold text-white mb-1">
          Escolha sua <span style={{ color: "hsl(var(--primary-glow))" }}>modalidade</span>
        </h2>
        <p className="text-white/40 text-xs tracking-widest uppercase">
          passe o mouse sobre os cards para ver detalhes
        </p>
      </div>

      {/* Card stage */}
      <div
        ref={containerRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        style={{ touchAction: "none" }}
      >
        {containerSize.width > 0 && MODALITIES.map((mod, i) => {
          let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

          if (introPhase === "scatter") {
            target = scatter[i];
          } else if (introPhase === "line") {
            const spacing = 68;
            const totalW = TOTAL * spacing;
            target = {
              x: i * spacing - totalW / 2,
              y: 0,
              rotation: 0,
              scale: 1,
              opacity: 1,
            };
          } else {
            // Circle phase + morph to arc
            const isMobile = containerSize.width < 768;
            const minDim = Math.min(containerSize.width, containerSize.height);

            // Circle
            const circleR = Math.min(minDim * 0.32, 280);
            const cAngle = (i / TOTAL) * 360;
            const cRad = (cAngle * Math.PI) / 180;
            const circlePos = {
              x: Math.cos(cRad) * circleR,
              y: Math.sin(cRad) * circleR,
              rotation: cAngle + 90,
            };

            // Arc (rainbow / convex-up)
            const baseR = Math.min(containerSize.width, containerSize.height * 1.5);
            const arcR = baseR * (isMobile ? 1.5 : 1.15);
            const apexY = containerSize.height * (isMobile ? 0.32 : 0.22);
            const arcCenterY = apexY + arcR;
            const spread = isMobile ? 95 : 120;
            const startAng = -90 - spread / 2;
            const step = spread / (TOTAL - 1);
            const scrollProg = Math.min(Math.max(rotateVal / 360, 0), 1);
            const boundedRot = -scrollProg * spread * 0.85;
            const curAng = startAng + i * step + boundedRot;
            const curRad = (curAng * Math.PI) / 180;
            const arcPos = {
              x: Math.cos(curRad) * arcR + parallax,
              y: Math.sin(curRad) * arcR + arcCenterY,
              rotation: curAng + 90,
              scale: isMobile ? 1.5 : 1.9,
            };

            target = {
              x: lerp(circlePos.x, arcPos.x, morphVal),
              y: lerp(circlePos.y, arcPos.y, morphVal),
              rotation: lerp(circlePos.rotation, arcPos.rotation, morphVal),
              scale: lerp(1, arcPos.scale, morphVal),
              opacity: 1,
            };
          }

          return (
            <FlipCard
              key={mod.name}
              mod={mod}
              target={target}
              phase={introPhase === "circle" ? (morphVal > 0.5 ? "arc" : "circle") : introPhase}
            />
          );
        })}
      </div>
    </section>
  );
}
