import React, { useState, useEffect, useMemo, useRef } from "react";
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
const MAX_SCROLL = 3200;
const IMG_W = 120;
const IMG_H = 160;

const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;

// --- Flip Card ---
interface FlipCardProps {
  modality: Modality;
  index: number;
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
        perspective: 800,
        zIndex: flipped ? 20 : 1,
      }}
      transition={{ type: "spring", stiffness: 55, damping: 18 }}
      onHoverStart={() => setFlipped(true)}
      onHoverEnd={() => setFlipped(false)}
      className="cursor-pointer"
    >
      {/* Inner flip container */}
      <motion.div
        style={{ width: "100%", height: "100%", transformStyle: "preserve-3d", position: "relative" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
      >
        {/* Front */}
        <div
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl border border-white/10"
        >
          <img
            src={modality.img}
            alt={modality.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <span className="absolute bottom-2 left-2 right-2 text-white text-xs font-bold text-center leading-tight drop-shadow">
            {modality.name}
          </span>
          <span className="absolute top-2 right-2 bg-primary/80 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-full">
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
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl flex flex-col items-center justify-center gap-2 p-4 text-center"
        >
          <span className="text-white font-display font-bold text-sm leading-tight">{modality.name}</span>
          <span className="text-white/80 text-[11px] leading-snug">{modality.desc}</span>
          <span className="mt-1 px-2 py-0.5 rounded-full bg-white/20 text-white text-[9px] font-semibold">{modality.tag}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// --- Main Component ---
export default function ModalitiesScrollMorph() {
  const [introPhase, setIntroPhase] = useState<IntroPhase>("scatter");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Container sizing
  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver((entries) => {
      for (const e of entries) {
        setContainerSize({ width: e.contentRect.width, height: e.contentRect.height });
      }
    });
    obs.observe(containerRef.current);
    setContainerSize({ width: containerRef.current.offsetWidth, height: containerRef.current.offsetHeight });
    return () => obs.disconnect();
  }, []);

  // Virtual scroll
  const virtualScroll = useMotionValue(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const next = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
      scrollRef.current = next;
      virtualScroll.set(next);
    };

    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      const delta = touchY - e.touches[0].clientY;
      touchY = e.touches[0].clientY;
      const next = Math.min(Math.max(scrollRef.current + delta, 0), MAX_SCROLL);
      scrollRef.current = next;
      virtualScroll.set(next);
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

  // Morph: 0 = circle, 1 = arc
  const morphProgress = useTransform(virtualScroll, [0, 700], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

  // Scroll rotation of arc
  const scrollRotate = useTransform(virtualScroll, [700, MAX_SCROLL], [0, 360]);
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const norm = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseX.set(norm * 80);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mouseX]);

  // Intro sequence
  useEffect(() => {
    const t1 = setTimeout(() => setIntroPhase("line"), 400);
    const t2 = setTimeout(() => setIntroPhase("circle"), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Random scatter positions (stable)
  const scatter = useMemo(() =>
    MODALITIES.map(() => ({
      x: (Math.random() - 0.5) * 1400,
      y: (Math.random() - 0.5) * 900,
      rotation: (Math.random() - 0.5) * 180,
      scale: 0.5,
      opacity: 0,
    })), []);

  // Live values for render
  const [morph, setMorph] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [parallax, setParallax] = useState(0);

  useEffect(() => {
    const u1 = smoothMorph.on("change", setMorph);
    const u2 = smoothScrollRotate.on("change", setRotate);
    const u3 = smoothMouseX.on("change", setParallax);
    return () => { u1(); u2(); u3(); };
  }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

  // Content fade-in after arc forms
  const contentOpacity = useTransform(smoothMorph, [0.75, 1], [0, 1]);
  const contentY = useTransform(smoothMorph, [0.75, 1], [24, 0]);

  // Scroll hint opacity
  const hintOpacity = useTransform(virtualScroll, [0, 200], [1, 0]);

  return (
    <section id="modalidades" className="relative" style={{ height: "100vh" }}>
      {/* Section title – visible above the interactive zone */}
      <motion.div
        className="absolute top-8 left-0 right-0 z-30 text-center pointer-events-none px-4"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-2">
          Nossas <span className="gradient-text">Modalidades</span>
        </h2>
        <p className="text-muted-foreground text-base lg:text-lg">
          16 atividades — passe o mouse sobre a carta para conhecer
        </p>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 z-30 flex flex-col items-center gap-2 pointer-events-none"
        style={{ opacity: hintOpacity }}
      >
        <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase">
          {introPhase === "circle" ? "Role para explorar" : "Preparando…"}
        </p>
        <motion.div
          className="w-5 h-8 rounded-full border-2 border-primary/50 flex items-start justify-center pt-1.5"
          animate={introPhase === "circle" ? { opacity: [1, 0.3, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-1 h-2 rounded-full bg-primary" />
        </motion.div>
      </motion.div>

      {/* Interactive canvas */}
      <div
        ref={containerRef}
        className="w-full h-full relative overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ touchAction: "none" }}
      >
        {/* Center anchor for cards */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 0,
            height: 0,
          }}
        >
          {MODALITIES.map((mod, i) => {
            let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

            if (introPhase === "scatter") {
              target = scatter[i];
            } else if (introPhase === "line") {
              const spacing = 82;
              const total = TOTAL * spacing;
              target = { x: i * spacing - total / 2, y: 0, rotation: 0, scale: 0.8, opacity: 1 };
            } else {
              // Circle
              const minDim = Math.min(containerSize.width || 800, containerSize.height || 600);
              const circleR = Math.min(minDim * 0.32, 280);
              const cAngle = (i / TOTAL) * 360;
              const cRad = (cAngle * Math.PI) / 180;
              const circlePos = {
                x: Math.cos(cRad) * circleR,
                y: Math.sin(cRad) * circleR,
                rotation: cAngle + 90,
              };

              // Arc (rainbow arch above center)
              const isMobile = (containerSize.width || 800) < 768;
              const baseR = Math.min(containerSize.width || 800, (containerSize.height || 600) * 1.5);
              const arcR = baseR * (isMobile ? 1.5 : 1.15);
              const apexY = (containerSize.height || 600) * (isMobile ? 0.4 : 0.22);
              const arcCenterY = apexY + arcR;
              const spread = isMobile ? 90 : 130;
              const startAngle = -90 - spread / 2;
              const step = spread / (TOTAL - 1);

              const scrollProg = Math.min(Math.max(rotate / 360, 0), 1);
              const maxRot = spread * 0.75;
              const boundedRot = -scrollProg * maxRot;

              const arcAngle = startAngle + i * step + boundedRot;
              const arcRad = (arcAngle * Math.PI) / 180;
              const arcPos = {
                x: Math.cos(arcRad) * arcR + parallax - (containerSize.width || 800) / 2,
                y: Math.sin(arcRad) * arcR + arcCenterY - (containerSize.height || 600) / 2,
                rotation: arcAngle + 90,
                scale: isMobile ? 1.2 : 1.5,
              };

              target = {
                x: lerp(circlePos.x, arcPos.x, morph),
                y: lerp(circlePos.y, arcPos.y, morph),
                rotation: lerp(circlePos.rotation, arcPos.rotation, morph),
                scale: lerp(0.9, arcPos.scale, morph),
                opacity: 1,
              };
            }

            return <FlipCard key={mod.name} modality={mod} index={i} target={target} />;
          })}
        </div>
      </div>
    </section>
  );
}
