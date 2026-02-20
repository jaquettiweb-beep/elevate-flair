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
const CARD_W = 84;
const CARD_H = 116;

// ─── Phase type ──────────────────────────────────────────────────────────────
type Phase =
  | "scatter"       // cards scattered off-screen
  | "line"          // cards align in a horizontal row
  | "circle"        // cards form a ring
  | "loop"          // ring auto-rotates 360°
  | "settle"        // ring settles back
  | "spin"          // each card spins on its own axis
  | "unlocked"      // user scroll: circle→arc→ring→ring-rotate
  | "spinning_final"; // ring back to circle, continuous auto-spin

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
  const isInteractive = phase === "spinning_final";

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
      <motion.div
        style={{ width: "100%", height: "100%", transformStyle: "preserve-3d" }}
        animate={
          spinning
            ? { rotateY: [0, 360] }
            : { rotateY: flipped ? 180 : 0 }
        }
        transition={
          spinning
            ? { duration: 0.7, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }
            : { duration: 0.5, ease: [0.23, 1, 0.32, 1] }
        }
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

// ─── Main ────────────────────────────────────────────────────────────────────
export default function Modalities() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [phase, setPhase] = useState<Phase>("scatter");

  const sequenceStarted = useRef(false);
  const finaleTriggered = useRef(false);
  const phaseRef = useRef<Phase>("scatter");

  // Loop rotation (entry animation)
  const loopMV = useMotionValue(0);
  const [loopOffset, setLoopOffset] = useState(0);

  // Final continuous spin
  const finalSpinMV = useMotionValue(0);
  const [finalSpinVal, setFinalSpinVal] = useState(0);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const lockScroll = () => { document.body.style.overflow = "hidden"; };
  const unlockScroll = () => { document.body.style.overflow = ""; };

  // ── Container size ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver((entries) => {
      const e = entries[0];
      setContainerSize({ width: e.contentRect.width, height: e.contentRect.height });
    });
    obs.observe(containerRef.current);
    setContainerSize({ width: containerRef.current.offsetWidth, height: containerRef.current.offsetHeight });
    return () => obs.disconnect();
  }, []);

  // ── Sequence (starts when section is centred) ──────────────────────────────
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
    return () => timers.forEach(clearTimeout);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.intersectionRatio >= 0.75) startSequence(); },
      { threshold: 0.75 },
    );
    obs.observe(section);
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => unlockScroll(), []);
  useEffect(() => { phaseRef.current = phase; }, [phase]);
  useEffect(() => loopMV.on("change", setLoopOffset), [loopMV]);
  useEffect(() => finalSpinMV.on("change", (v) => setFinalSpinVal(v % 360)), [finalSpinMV]);

  // Start continuous spin for spinning_final
  useEffect(() => {
    if (phase !== "spinning_final") return;
    const ctrl = animate(finalSpinMV, 360, {
      duration: 10,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });
    return () => ctrl.stop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // ── Virtual scroll ─────────────────────────────────────────────────────────
  const virtualScroll = useMotionValue(0);
  const scrollRef = useRef(0);
  const MAX_SCROLL = 3200;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (phaseRef.current !== "unlocked") return;
      if (finaleTriggered.current) return;

      const next = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
      scrollRef.current = next;
      virtualScroll.set(next);

      if (next >= MAX_SCROLL) {
        finaleTriggered.current = true;
        // Short pause then release scroll and start spinning_final
        setTimeout(() => {
          setPhase("spinning_final");
          setTimeout(unlockScroll, 400);
        }, 900);
        return;
      }
      if (next > 0) e.preventDefault();
    };

    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      if (phaseRef.current !== "unlocked" || finaleTriggered.current) return;
      const delta = touchY - e.touches[0].clientY;
      touchY = e.touches[0].clientY;
      const next = Math.min(Math.max(scrollRef.current + delta, 0), MAX_SCROLL);
      scrollRef.current = next;
      virtualScroll.set(next);
      if (next >= MAX_SCROLL) { finaleTriggered.current = true; return; }
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

  // ── Scroll-driven transforms ───────────────────────────────────────────────
  // Phase 1: circle → arc   (scroll 0 → 500)
  const morphRaw     = useTransform(virtualScroll, [0,   500],  [0, 1]);
  // Phase 2: arc → full ring (scroll 500 → 1300)
  const arcToRingRaw = useTransform(virtualScroll, [500, 1300], [0, 1]);
  // Phase 3: ring rotation   (scroll 1300 → 3100)
  const ringRotateRaw = useTransform(virtualScroll, [1300, 3100], [0, 360]);

  const morph      = useSpring(morphRaw,      { stiffness: 40, damping: 20 });
  const arcToRing  = useSpring(arcToRingRaw,  { stiffness: 40, damping: 20 });
  const ringRotate = useSpring(ringRotateRaw, { stiffness: 40, damping: 20 });

  const [morphVal,      setMorphVal]      = useState(0);
  const [arcToRingVal,  setArcToRingVal]  = useState(0);
  const [ringRotateVal, setRingRotateVal] = useState(0);
  const [parallax,      setParallax]      = useState(0);

  useEffect(() => {
    const u1 = morph.on("change",      setMorphVal);
    const u2 = arcToRing.on("change",  setArcToRingVal);
    const u3 = ringRotate.on("change", setRingRotateVal);
    return () => { u1(); u2(); u3(); };
  }, [morph, arcToRing, ringRotate]);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set(((e.clientX - rect.left) / rect.width * 2 - 1) * 70);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mouseX]);
  useEffect(() => smoothMouseX.on("change", setParallax), [smoothMouseX]);

  // Scroll hint (fades when arc starts)
  const hintOpacity = useTransform(morph, [0, 0.15], [1, 0]);
  const [hintOp, setHintOp] = useState(1);
  useEffect(() => hintOpacity.on("change", setHintOp), [hintOpacity]);

  // ── Stable scatter positions ───────────────────────────────────────────────
  const scatter = useMemo(() =>
    MODALITIES.map(() => ({
      x: (Math.random() - 0.5) * 1400,
      y: (Math.random() - 0.5) * 800,
      rotation: (Math.random() - 0.5) * 160,
      scale: 0.5,
      opacity: 0,
    })), []);

  // ── Circle geometry ────────────────────────────────────────────────────────
  function circlePos(i: number, offsetDeg: number) {
    const minDim = Math.min(containerSize.width, containerSize.height);
    const r = Math.min(minDim * 0.34, 250);
    const ang = (i / TOTAL) * 360 + offsetDeg;
    const rad = (ang * Math.PI) / 180;
    return { x: Math.cos(rad) * r, y: Math.sin(rad) * r, rotation: ang + 90, r };
  }

  // ── Label states ───────────────────────────────────────────────────────────
  const showRingHint = arcToRingVal > 0.5 && ringRotateVal < 10;
  const showRotateHint = ringRotateVal > 5 && ringRotateVal < 350;

  return (
    <section
      ref={sectionRef}
      id="modalidades"
      className="relative overflow-hidden"
      style={{ height: "88vh", minHeight: 560 }}
    >
      {/* Ocean background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, hsl(210,75%,18%) 0%, hsl(220,80%,10%) 60%, hsl(215,80%,7%) 100%)",
        }}
      />

      {/* Caustic rays */}
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

      {/* Section title — fades out as arc forms */}
      <motion.div
        className="absolute top-6 left-0 right-0 text-center z-10 pointer-events-none"
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
      <motion.p
        className="absolute top-6 left-0 right-0 text-center z-20 pointer-events-none text-white/40 text-[10px] tracking-[0.4em] uppercase font-medium mt-20 lg:mt-28"
        animate={{ opacity: phase === "loop" || phase === "settle" ? 0.7 : 0 }}
        transition={{ duration: 0.4 }}
      >
        todas as modalidades
      </motion.p>

      {/* Scroll cue — unlocked, before arc */}
      {phase === "unlocked" && (
        <motion.div
          className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-1 z-10 pointer-events-none"
          style={{ opacity: hintOp }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-px h-7 rounded-full"
            style={{ background: "hsla(185,80%,70%,0.5)" }}
            animate={{ scaleY: [0.5, 1, 0.5] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          <p className="text-white/35 text-[10px] tracking-[0.3em] uppercase font-medium">
            role para explorar
          </p>
        </motion.div>
      )}

      {/* Ring hint — expand to ring */}
      <motion.p
        className="absolute bottom-6 left-0 right-0 text-center z-10 pointer-events-none text-white/35 text-[10px] tracking-[0.3em] uppercase font-medium"
        animate={{ opacity: showRingHint ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        continue rolando
      </motion.p>

      {/* Rotate hint */}
      <motion.p
        className="absolute bottom-6 left-0 right-0 text-center z-10 pointer-events-none text-white/35 text-[10px] tracking-[0.3em] uppercase font-medium"
        animate={{ opacity: showRotateHint ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        gire para ver todas
      </motion.p>

      {/* Spinning final label */}
      <motion.div
        className="absolute top-6 left-0 right-0 text-center z-10 pointer-events-none"
        animate={{ opacity: phase === "spinning_final" ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-display text-2xl lg:text-4xl font-bold text-white mb-1">
          Escolha sua{" "}
          <span style={{ color: "hsl(var(--primary-glow))" }}>modalidade</span>
        </h2>
        <p className="text-white/40 text-xs tracking-widest uppercase mt-1">
          passe o mouse sobre os cards para ver detalhes
        </p>
      </motion.div>

      {/* Card stage */}
      <div
        ref={containerRef}
        className="absolute inset-0"
        style={{ touchAction: "none", cursor: phase === "spinning_final" ? "pointer" : "default" }}
      >
        {containerSize.width > 0 &&
          MODALITIES.map((mod, i) => {
            const isMobile = containerSize.width < 768;
            let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

            if (phase === "scatter") {
              target = scatter[i];

            } else if (phase === "line") {
              const spacing = 66;
              target = { x: i * spacing - (TOTAL * spacing) / 2, y: 0, rotation: 0, scale: 1, opacity: 1 };

            } else if (phase === "circle" || phase === "spin") {
              const cp = circlePos(i, 0);
              target = { x: cp.x, y: cp.y, rotation: cp.rotation, scale: 1, opacity: 1 };

            } else if (phase === "loop" || phase === "settle") {
              const cp = circlePos(i, loopOffset);
              target = { x: cp.x, y: cp.y, rotation: cp.rotation, scale: 1, opacity: 1 };

            } else if (phase === "spinning_final") {
              const cp = circlePos(i, finalSpinVal);
              target = { x: cp.x, y: cp.y, rotation: cp.rotation, scale: 1, opacity: 1 };

            } else {
              // "unlocked" — three scroll sub-phases:
              // 1. morph: circle → arc  (morphVal 0→1)
              // 2. arcToRing: arc → full 360° ring  (arcToRingVal 0→1)
              // 3. ringRotate: ring spins 360° (ringRotateVal 0→360)

              const cp = circlePos(i, 0);
              const base = { x: cp.x, y: cp.y, rotation: cp.rotation };

              // ── Arc position ────────────────────────────────────────────────
              const arcBaseR = Math.min(containerSize.width * 0.8, containerSize.height * 1.2, 820);
              const arcR = arcBaseR * (isMobile ? 1.4 : 1.1);
              const apexY = containerSize.height * (isMobile ? 0.30 : 0.20);
              const arcCenterY = apexY + arcR;
              const ARC_SPREAD = 112;
              const arcStartAng = -90 - ARC_SPREAD / 2;
              const arcStep = ARC_SPREAD / (TOTAL - 1);
              const arcAng = arcStartAng + i * arcStep;
              const arcRad = (arcAng * Math.PI) / 180;
              const arcScale = isMobile ? 1.4 : 1.7;
              const arcPos = {
                x: Math.cos(arcRad) * arcR + parallax,
                y: Math.sin(arcRad) * arcR + arcCenterY,
                rotation: arcAng + 90,
                scale: arcScale,
              };

              // ── Ring position (full 360° centered circle with rotation) ────
              const ringAng = (i / TOTAL) * 360 + ringRotateVal;
              const ringRad = (ringAng * Math.PI) / 180;
              const ringPos = {
                x: Math.cos(ringRad) * cp.r,
                y: Math.sin(ringRad) * cp.r,
                rotation: ringAng + 90,
                scale: 1,
              };

              // ── Combine: circle→arc then arc→ring ────────────────────────
              const afterMorph = {
                x: lerp(base.x, arcPos.x, morphVal),
                y: lerp(base.y, arcPos.y, morphVal),
                rotation: lerp(base.rotation, arcPos.rotation, morphVal),
                scale: lerp(1, arcScale, morphVal),
              };

              target = {
                x: lerp(afterMorph.x, ringPos.x, arcToRingVal),
                y: lerp(afterMorph.y, ringPos.y, arcToRingVal),
                rotation: lerp(afterMorph.rotation, ringPos.rotation, arcToRingVal),
                scale: lerp(afterMorph.scale, ringPos.scale, arcToRingVal),
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
