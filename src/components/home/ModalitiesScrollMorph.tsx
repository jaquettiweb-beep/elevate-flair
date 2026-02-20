import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";
import swimmingImg from "@/assets/swimming.jpg";
import yogaImg from "@/assets/yoga.jpg";
import martialImg from "@/assets/martial-arts.jpg";
import pilatesImg from "@/assets/pilates.jpg";
import musculacaoImg from "@/assets/musculacao.jpg";

// --- Types ---
type IntroPhase = "scatter" | "line" | "circle";

interface Modality {
  name: string;
  desc: string;
  img: string;
  tag: string;
}

const MODALITIES: Modality[] = [
  { name: "Natação", desc: "Adulto, infantil e bebê. Piscina aquecida semiolímpica.", img: swimmingImg, tag: "Aquático" },
  { name: "Hidroginástica", desc: "Exercícios aquáticos de baixo impacto para todas as idades.", img: swimmingImg, tag: "Aquático" },
  { name: "Hidroterapia", desc: "Reabilitação e bem-estar através de exercícios aquáticos terapêuticos.", img: swimmingImg, tag: "Aquático" },
  { name: "Musculação", desc: "Equipamentos de última geração com orientação profissional.", img: musculacaoImg, tag: "Fitness" },
  { name: "Ginástica", desc: "Coordenação, flexibilidade e condicionamento físico global.", img: musculacaoImg, tag: "Fitness" },
  { name: "Yoga", desc: "Equilíbrio entre corpo e mente com instrutores certificados.", img: yogaImg, tag: "Bem-estar" },
  { name: "Pilates Studio", desc: "Aparelhos de Pilates com acompanhamento individual.", img: pilatesImg, tag: "Bem-estar" },
  { name: "Pilates Solo", desc: "Fortalecimento e flexibilidade no solo para todos os níveis.", img: pilatesImg, tag: "Bem-estar" },
  { name: "Ballet (infantil)", desc: "Expressão artística, postura e ritmo para crianças.", img: pilatesImg, tag: "Infantil" },
  { name: "Muay Thai", desc: "Arte marcial tailandesa: força, técnica e condicionamento.", img: martialImg, tag: "Artes Marciais" },
  { name: "Jiu Jitsu", desc: "Técnicas de grappling e defesa pessoal no tatame.", img: martialImg, tag: "Artes Marciais" },
  { name: "Judô (infantil)", desc: "Disciplina e coordenação motora para crianças.", img: martialImg, tag: "Artes Marciais" },
  { name: "Kung Fu", desc: "Arte marcial chinesa milenar com foco em equilíbrio e técnica.", img: martialImg, tag: "Artes Marciais" },
  { name: "Krav Maga", desc: "Sistema de defesa pessoal prático e eficiente.", img: martialImg, tag: "Artes Marciais" },
  { name: "Aikidô", desc: "Arte marcial japonesa baseada em harmonia e redirecionamento de força.", img: martialImg, tag: "Artes Marciais" },
  { name: "Programa 60+ Saúde", desc: "Atividades físicas especialmente desenvolvidas para a melhor idade.", img: swimmingImg, tag: "Saúde" },
];

const TOTAL = MODALITIES.length;
// Virtual scroll budget — maps to the full arc sweep
// Full loop: enough scroll budget so all 16 cards pass through center once
const MAX_VIRTUAL = 5400;
// Card dimensions (larger spacing)
const IMG_W = 140;
const IMG_H = 188;

const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;
const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

// --- Flip Card ---
interface FlipCardProps {
  modality: Modality;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

function FlipCard({ modality, target }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      style={{
        position: "absolute",
        width: IMG_W,
        height: IMG_H,
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
        translateX: "-50%",
        translateY: "-50%",
        perspective: 900,
        zIndex: flipped ? 30 : 1,
      }}
      transition={{ type: "spring", stiffness: 50, damping: 18 }}
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
          <span className="absolute bottom-3 left-2 right-2 text-white text-xs font-bold text-center leading-tight drop-shadow-lg">
            {modality.name}
          </span>
          <span className="absolute top-2 right-2 bg-primary/85 text-white text-[9px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm">
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
          className="absolute inset-0 rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-2.5 p-4 text-center"
        >
          <span className="text-white font-display font-bold text-sm leading-tight">{modality.name}</span>
          <div className="w-8 h-0.5 bg-white/40 rounded-full" />
          <span className="text-white/85 text-[11px] leading-snug">{modality.desc}</span>
          <span className="mt-1 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[9px] font-semibold tracking-wide uppercase">
            {modality.tag}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// --- Progress Bar ---
function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-32 h-1 bg-white/15 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-primary rounded-full"
        style={{ width: `${clamp(value * 100, 0, 100)}%` }}
        transition={{ ease: "linear", duration: 0.05 }}
      />
    </div>
  );
}

// --- Main Component ---
export default function ModalitiesScrollMorph() {
  const [introPhase, setIntroPhase] = useState<IntroPhase>("scatter");
  const [containerSize, setContainerSize] = useState({ width: 800, height: 600 });
  const [virtualVal, setVirtualVal] = useState(0);
  const [morphVal, setMorphVal] = useState(0);
  const [rotateVal, setRotateVal] = useState(0);
  const [parallaxVal, setParallaxVal] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const isLockedRef = useRef(true); // start locked until user scrolls to fill

  // MotionValues
  const virtualScroll = useMotionValue(0);
  const mouseX = useMotionValue(0);

  // Springs / transforms
  const morphProgress = useTransform(virtualScroll, [0, 800], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 38, damping: 20 });
  const scrollRotate = useTransform(virtualScroll, [800, MAX_VIRTUAL], [0, 360]);
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 38, damping: 20 });
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

  // Sync motion values to state for render
  useEffect(() => {
    const u1 = virtualScroll.on("change", setVirtualVal);
    const u2 = smoothMorph.on("change", setMorphVal);
    const u3 = smoothScrollRotate.on("change", setRotateVal);
    const u4 = smoothMouseX.on("change", setParallaxVal);
    return () => { u1(); u2(); u3(); u4(); };
  }, [virtualScroll, smoothMorph, smoothScrollRotate, smoothMouseX]);

  // Container resize
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

  // Wheel handler — locked until virtual scroll is saturated, then allows page scroll
  const handleWheel = useCallback((e: WheelEvent) => {
    const current = scrollRef.current;
    const next = clamp(current + e.deltaY, 0, MAX_VIRTUAL);

    if (isLockedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      scrollRef.current = next;
      virtualScroll.set(next);

      // Unlock only after the full loop is complete (all 16 cards seen)
      if (next >= MAX_VIRTUAL && e.deltaY > 0) {
        isLockedRef.current = false;
      }
    }
  }, [virtualScroll]);

  // Re-lock when section comes back into view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isLockedRef.current = true;
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Attach wheel listener to canvas
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      const delta = touchY - e.touches[0].clientY;
      touchY = e.touches[0].clientY;
      const next = clamp(scrollRef.current + delta * 1.5, 0, MAX_VIRTUAL);
      scrollRef.current = next;
      virtualScroll.set(next);
      if (next < MAX_VIRTUAL && next > 0) e.preventDefault();
    };
    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const norm = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseX.set(norm * 100);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("mousemove", onMouseMove);
    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("mousemove", onMouseMove);
    };
  }, [handleWheel, mouseX, virtualScroll]);

  // Intro sequence
  useEffect(() => {
    const t1 = setTimeout(() => setIntroPhase("line"), 500);
    const t2 = setTimeout(() => setIntroPhase("circle"), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Stable scatter positions
  const scatter = useMemo(() =>
    MODALITIES.map(() => ({
      x: (Math.random() - 0.5) * 1600,
      y: (Math.random() - 0.5) * 1000,
      rotation: (Math.random() - 0.5) * 200,
      scale: 0.4,
      opacity: 0,
    })), []);

  // Derived display values
  const scrollProg = clamp(virtualVal / MAX_VIRTUAL, 0, 1);
  const contentVisible = morphVal > 0.6;

  // Card target positions
  function getTarget(i: number) {
    if (introPhase === "scatter") return scatter[i];

    if (introPhase === "line") {
      const spacing = 100; // wider spacing in line phase
      const totalW = TOTAL * spacing;
      return { x: i * spacing - totalW / 2, y: 0, rotation: 0, scale: 0.75, opacity: 1 };
    }

    // Circle
    const { width: W, height: H } = containerSize;
    const minDim = Math.min(W, H);
    const circleR = Math.min(minDim * 0.46, 420);
    const cAngle = (i / TOTAL) * 360;
    const cRad = (cAngle * Math.PI) / 180;
    const circlePos = {
      x: Math.cos(cRad) * circleR,
      y: Math.sin(cRad) * circleR,
      rotation: cAngle + 90,
    };

    // Arc
    const isMobile = W < 768;
    const baseR = Math.min(W, H * 1.6);
    const arcR = baseR * (isMobile ? 1.6 : 1.2);      // larger radius = more spread
    const apexY = H * (isMobile ? 0.38 : 0.20);
    const arcCenterY = apexY + arcR;
    const spread = isMobile ? 85 : 140;               // wider spread angle
    const startAngle = -90 - spread / 2;
    const step = spread / (TOTAL - 1);

    // Full 360° rotation so every card cycles through the top/center once
    const scrollP = clamp(rotateVal / 360, 0, 1);
    const maxRot = 360;
    const boundedRot = -scrollP * maxRot;

    const arcAngle = startAngle + i * step + boundedRot;
    const arcRad = (arcAngle * Math.PI) / 180;
    const arcPos = {
      x: Math.cos(arcRad) * arcR + parallaxVal - W / 2,
      y: Math.sin(arcRad) * arcR + arcCenterY - H / 2,
      rotation: arcAngle + 90,
      scale: isMobile ? 1.1 : 1.4,
    };

    return {
      x: lerp(circlePos.x, arcPos.x, morphVal),
      y: lerp(circlePos.y, arcPos.y, morphVal),
      rotation: lerp(circlePos.rotation, arcPos.rotation, morphVal),
      scale: lerp(0.85, arcPos.scale, morphVal),
      opacity: 1,
    };
  }

  return (
    /* Outer section: 200vh tall so the page has "room" to scroll through */
    <section
      ref={sectionRef}
      id="modalidades"
      style={{ height: "200vh" }}
      className="relative"
    >
      {/* Sticky viewport — stays fixed while the user scrolls through the 200vh */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Section header — fades in as arc forms */}
        <motion.div
          className="absolute top-8 left-0 right-0 z-30 text-center pointer-events-none px-4"
          animate={{ opacity: contentVisible ? 1 : 0, y: contentVisible ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-1">
            Nossas <span className="gradient-text">Modalidades</span>
          </h2>
          <p className="text-muted-foreground text-base lg:text-lg">
            16 atividades — passe o mouse sobre a carta para conhecer
          </p>
        </motion.div>

        {/* Bottom HUD: scroll hint + progress */}
        <motion.div
          className="absolute bottom-7 left-0 right-0 z-30 flex flex-col items-center gap-2.5 pointer-events-none"
          animate={{ opacity: scrollProg >= 1 ? 0 : 1 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
            {introPhase !== "circle"
              ? "Preparando…"
              : scrollProg < 0.02
              ? "Role para explorar"
              : "Explorando modalidades"}
          </p>
          <ProgressBar value={scrollProg} />
          {/* Mouse wheel icon */}
          <motion.div
            className="w-5 h-8 rounded-full border-2 border-primary/40 flex items-start justify-center pt-1.5"
            animate={introPhase === "circle" ? { opacity: [0.8, 0.2, 0.8] } : { opacity: 0 }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          >
            <div className="w-1 h-2 rounded-full bg-primary" />
          </motion.div>
        </motion.div>

        {/* "Continue scrolling" cue when arc fully explored */}
        <motion.div
          className="absolute bottom-7 left-0 right-0 z-30 flex flex-col items-center gap-1 pointer-events-none"
          animate={{ opacity: scrollProg >= 0.98 ? 1 : 0, y: scrollProg >= 0.98 ? 0 : 10 }}
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

        {/* Interactive canvas */}
        <div
          ref={canvasRef}
          className="w-full h-full relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
          style={{ touchAction: "none" }}
        >
          {/* Center anchor */}
          <div style={{ position: "absolute", left: "50%", top: "50%", width: 0, height: 0 }}>
            {MODALITIES.map((mod, i) => (
              <FlipCard key={mod.name} modality={mod} target={getTarget(i)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
