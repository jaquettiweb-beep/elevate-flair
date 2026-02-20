import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue, animate } from "framer-motion";
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

// ─── Phase type ──────────────────────────────────────────────────────────────
type Phase = "scatter" | "line" | "circle" | "loop" | "settle" | "spin" | "unlocked";

// Phase timing (ms):
// 0       scatter  – cards scattered, invisible
// 600     line     – cards align horizontally
// 2200    circle   – cards form the ring
// 3600    loop     – wheel auto-rotates 360° (takes ~2.6s)
// 6200    settle   – wheel back to rest, brief pause
// 6700    spin     – each card flips on its own axis (stagger ~1.5s total)
// 8200    unlocked – user scroll enabled, morph begins

// ─── FlipCard ────────────────────────────────────────────────────────────────
interface FlipCardProps {
  mod: (typeof MODALITIES)[number];
  index: number;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
  phase: Phase;
  spinning: boolean;
}

function FlipCard({ mod, index, target, phase, spinning }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const isInteractive = phase === "unlocked";

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
      onHoverStart={() => isInteractive && setFlipped(true)}
      onHoverEnd={() => isInteractive && setFlipped(false)}
      onClick={() => isInteractive && setFlipped((f) => !f)}
    >
      {/* Inner flipper – handles both hover-flip and self-spin */}
      <motion.div
        style={{ width: "100%", height: "100%", transformStyle: "preserve-3d" }}
        animate={
          spinning
            ? { rotateY: [0, 360] }
            : { rotateY: flipped ? 180 : 0 }
        }
        transition={
          spinning
            ? {
                duration: 0.7,
                delay: index * 0.05,
                ease: [0.23, 1, 0.32, 1],
                times: [0, 1],
              }
            : { duration: 0.5, ease: [0.23, 1, 0.32, 1] }
        }
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

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Modalities() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [phase, setPhase] = useState<Phase>("scatter");

  // Whether the section has been centred and the sequence triggered (once only)
  const sequenceStarted = useRef(false);

  // loopOffset: 0→360 during loop phase, stays at 360 (=0) after
  const loopMV = useMotionValue(0);
  const [loopOffset, setLoopOffset] = useState(0);

  // Container size observer
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

  // Lock body scroll while the section owns the interaction
  const lockScroll = () => { document.body.style.overflow = "hidden"; };
  const unlockScroll = () => { document.body.style.overflow = ""; };

  // Start the full phase sequence and lock scroll – called once when centred
  const startSequence = () => {
    if (sequenceStarted.current) return;
    sequenceStarted.current = true;
    lockScroll();

    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase("line"),     600));
    timers.push(setTimeout(() => setPhase("circle"),   2200));
    timers.push(setTimeout(() => {
      setPhase("loop");
      animate(loopMV, 360, { duration: 2.5, ease: [0.4, 0, 0.2, 1] });
    }, 3600));
    timers.push(setTimeout(() => setPhase("settle"),   6200));
    timers.push(setTimeout(() => setPhase("spin"),     6700));
    timers.push(setTimeout(() => setPhase("unlocked"), 8300));

    // Safety cleanup
    return () => timers.forEach(clearTimeout);
  };

  // IntersectionObserver: trigger when section is ≥ 75% visible (i.e. centred)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.75) startSequence();
      },
      { threshold: 0.75 },
    );
    obs.observe(section);
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cleanup body overflow on unmount
  useEffect(() => () => unlockScroll(), []);

  useEffect(() => loopMV.on("change", setLoopOffset), [loopMV]);

  // Virtual scroll – only active when unlocked
  const virtualScroll = useMotionValue(0);
  const scrollRef = useRef(0);
  const phaseRef = useRef<Phase>("scatter");
  const MAX_SCROLL = 2800;

  useEffect(() => { phaseRef.current = phase; }, [phase]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (phaseRef.current !== "unlocked") return;
      const next = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
      scrollRef.current = next;
      virtualScroll.set(next);
      if (next >= MAX_SCROLL) {
        // User scrolled all the way through — release page scroll
        unlockScroll();
        return;
      }
      if (next > 0) e.preventDefault();
    };

    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      if (phaseRef.current !== "unlocked") return;
      const delta = touchY - e.touches[0].clientY;
      touchY = e.touches[0].clientY;
      const next = Math.min(Math.max(scrollRef.current + delta, 0), MAX_SCROLL);
      scrollRef.current = next;
      virtualScroll.set(next);
      if (next >= MAX_SCROLL) { unlockScroll(); return; }
      if (next > 0) e.preventDefault();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: false });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, [virtualScroll]);

  // Morph: circle → arc
  const morphRaw = useTransform(virtualScroll, [0, 700], [0, 1]);
  const morph = useSpring(morphRaw, { stiffness: 40, damping: 20 });
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

  // Rendered motion values
  const [morphVal, setMorphVal] = useState(0);
  const [rotateVal, setRotateVal] = useState(0);
  const [parallax, setParallax] = useState(0);
  useEffect(() => {
    const u1 = morph.on("change", setMorphVal);
    const u2 = rotate.on("change", setRotateVal);
    const u3 = smoothMouseX.on("change", setParallax);
    return () => { u1(); u2(); u3(); };
  }, [morph, rotate, smoothMouseX]);

  // Random scatter positions (stable across renders)
  const scatter = useMemo(() =>
    MODALITIES.map(() => ({
      x: (Math.random() - 0.5) * 1400,
      y: (Math.random() - 0.5) * 800,
      rotation: (Math.random() - 0.5) * 160,
      scale: 0.5,
      opacity: 0,
    })), []);

  // Arc content opacity
  const arcContentOpacity = useTransform(morph, [0.75, 1], [0, 1]);
  const arcContentY = useTransform(morph, [0.75, 1], [20, 0]);
  const [arcOpacity, setArcOpacity] = useState(0);
  const [arcY, setArcY] = useState(20);
  useEffect(() => {
    const u1 = arcContentOpacity.on("change", setArcOpacity);
    const u2 = arcContentY.on("change", setArcY);
    return () => { u1(); u2(); };
  }, [arcContentOpacity, arcContentY]);

  // Scroll hint fades once morph starts
  const hintOpacity = useTransform(morph, [0, 0.1], [1, 0]);
  const [hintOp, setHintOp] = useState(1);
  useEffect(() => hintOpacity.on("change", setHintOp), [hintOpacity]);

  // ── Circle geometry helper ────────────────────────────────────────────────
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

  return (
    <section
      ref={sectionRef}
      id="modalidades"
      className="relative overflow-hidden"
      style={{ height: "100svh", minHeight: 600 }}
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

      {/* Section title – fades out when arc forms */}
      <motion.div
        className="absolute top-8 left-0 right-0 text-center z-10 pointer-events-none"
        style={{ opacity: 1 - morphVal }}
      >
        <motion.h2
          className="font-display text-3xl lg:text-5xl font-bold text-white mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={phase !== "scatter" ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Nossas{" "}
          <span style={{ color: "hsl(var(--primary-glow))" }}>Modalidades</span>
        </motion.h2>
        <motion.p
          className="text-white/50 text-sm"
          initial={{ opacity: 0 }}
          animate={phase !== "scatter" ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          16 atividades para encontrar a sua favorita
        </motion.p>
      </motion.div>

      {/* Loop phase label */}
      <motion.div
        className="absolute top-8 left-0 right-0 text-center z-20 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "loop" || phase === "settle" ? 0.6 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-white/50 text-[10px] tracking-[0.4em] uppercase font-medium mt-24 lg:mt-32">
          todas as modalidades
        </p>
      </motion.div>

      {/* Scroll hint – visible only when unlocked and morph not started */}
      {phase === "unlocked" && (
        <motion.div
          className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-1 z-10 pointer-events-none"
          style={{ opacity: hintOp }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
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
          Escolha sua{" "}
          <span style={{ color: "hsl(var(--primary-glow))" }}>modalidade</span>
        </h2>
        <p className="text-white/40 text-xs tracking-widest uppercase">
          passe o mouse sobre os cards para ver detalhes
        </p>
      </div>

      {/* Card stage */}
      <div
        ref={containerRef}
        className="absolute inset-0"
        style={{
          touchAction: "none",
          cursor: phase === "unlocked" ? "grab" : "default",
        }}
      >
        {containerSize.width > 0 &&
          MODALITIES.map((mod, i) => {
            const isMobile = containerSize.width < 768;
            let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

            if (phase === "scatter") {
              target = scatter[i];

            } else if (phase === "line") {
              const spacing = 68;
              const totalW = TOTAL * spacing;
              target = {
                x: i * spacing - totalW / 2,
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
              };

            } else if (phase === "circle" || phase === "spin") {
              // Static circle – no loop offset
              const ct = circleTarget(i, 0);
              target = { x: ct.x, y: ct.y, rotation: ct.rotation, scale: 1, opacity: 1 };

            } else if (phase === "loop" || phase === "settle") {
              // Spinning circle – add loopOffset to each card's angle
              const ct = circleTarget(i, loopOffset);
              target = { x: ct.x, y: ct.y, rotation: ct.rotation, scale: 1, opacity: 1 };

            } else {
              // "unlocked" – morph circle → arc
              const ct = circleTarget(i, 0);
              const circlePos = { x: ct.x, y: ct.y, rotation: ct.rotation };

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
                index={i}
                target={target}
                phase={phase}
                spinning={phase === "spin"}
              />
            );
          })}
      </div>
    </section>
  );
}
