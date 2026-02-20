"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import swimmingImg from "@/assets/swimming.jpg";
import yogaImg from "@/assets/yoga.jpg";
import martialImg from "@/assets/martial-arts.jpg";
import pilatesImg from "@/assets/pilates.jpg";
import musculacaoImg from "@/assets/musculacao.jpg";

// ─── Data ──────────────────────────────────────────────────────────
const MODALITIES = [
  { name: "Natação",           desc: "Adulto, infantil e bebê. Piscina aquecida semiolímpica.",                 img: swimmingImg },
  { name: "Hidroginástica",    desc: "Exercícios aquáticos de baixo impacto para todas as idades.",            img: swimmingImg },
  { name: "Hidroterapia",      desc: "Reabilitação e bem-estar através de exercícios aquáticos terapêuticos.", img: swimmingImg },
  { name: "Prog. 60+ Saúde",   desc: "Atividades físicas especialmente desenvolvidas para a melhor idade.",    img: swimmingImg },
  { name: "Musculação",        desc: "Equipamentos de última geração com orientação profissional.",             img: musculacaoImg },
  { name: "Ginástica",         desc: "Coordenação, flexibilidade e condicionamento físico global.",             img: musculacaoImg },
  { name: "Yoga",              desc: "Equilíbrio entre corpo e mente com instrutores certificados.",            img: yogaImg },
  { name: "Pilates Studio",    desc: "Aparelhos de Pilates com acompanhamento individual.",                    img: pilatesImg },
  { name: "Pilates Solo",      desc: "Fortalecimento e flexibilidade no solo para todos os níveis.",           img: pilatesImg },
  { name: "Ballet (infantil)", desc: "Expressão artística, postura e ritmo para crianças.",                    img: pilatesImg },
  { name: "Muay Thai",         desc: "Arte marcial tailandesa que combina força, técnica e condicionamento.",  img: martialImg },
  { name: "Jiu Jitsu",         desc: "Técnicas de grappling e defesa pessoal no tatame.",                     img: martialImg },
  { name: "Judô (infantil)",   desc: "Disciplina e coordenação motora para crianças.",                         img: martialImg },
  { name: "Kung Fu",           desc: "Arte marcial chinesa milenar com foco em equilíbrio e técnica.",         img: martialImg },
  { name: "Krav Maga",         desc: "Sistema de defesa pessoal prático e eficiente.",                         img: martialImg },
  { name: "Aikidô",            desc: "Arte marcial japonesa baseada em harmonia e redirecionamento de força.", img: martialImg },
];

const TOTAL = MODALITIES.length; // 16
const CARD_W = 80;
const CARD_H = 112;
// One full 360° of virtual scroll to show all cards
const SCROLL_TO_COMPLETE = 2400;

type Phase = "scatter" | "line" | "circle";

// ─── FlipCard ──────────────────────────────────────────────────────
interface CardTarget { x: number; y: number; rotation: number; scale: number; opacity: number }

function FlipCard({ src, name, desc, target }: {
  src: string; name: string; desc: string; target: CardTarget;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className="absolute"
      style={{
        width: CARD_W,
        height: CARD_H,
        transformOrigin: "center center",
        perspective: 800,
        zIndex: flipped ? 20 : 1,
      }}
      animate={{
        x: target.x - CARD_W / 2,
        y: target.y - CARD_H / 2,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{ type: "spring", stiffness: 55, damping: 18 }}
      onHoverStart={() => setFlipped(true)}
      onHoverEnd={() => setFlipped(false)}
    >
      <div style={{
        position: "relative", width: "100%", height: "100%",
        transformStyle: "preserve-3d",
        transition: "transform 0.5s",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
      }}>
        {/* Front */}
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>
          <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)" }} />
          <span style={{ position: "absolute", bottom: 6, left: 0, right: 0, textAlign: "center", color: "#fff", fontSize: 9, fontWeight: 700, letterSpacing: "0.04em", padding: "0 4px", textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
            {name}
          </span>
        </div>
        {/* Back */}
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)", borderRadius: 12, background: "hsl(221 83% 18%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 8, gap: 6, boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
          <span style={{ color: "hsl(185 80% 70%)", fontSize: 8, fontWeight: 800, textAlign: "center", letterSpacing: "0.05em", textTransform: "uppercase" }}>{name}</span>
          <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 7, textAlign: "center", lineHeight: 1.4 }}>{desc}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────
export default function Modalities() {
  const [phase, setPhase] = useState<Phase>("scatter");
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [scrollDone, setScrollDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Auto-rotation angle (degrees), starts after scroll is done
  const autoAngle = useRef(0);
  const [autoRotateDeg, setAutoRotateDeg] = useState(0);
  const rafRef = useRef<number>(0);

  // Container size
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(containerRef.current);
    setSize({ w: containerRef.current.offsetWidth, h: containerRef.current.offsetHeight });
    return () => ro.disconnect();
  }, []);

  // Intro phases: scatter → line → circle
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("line"), 400);
    const t2 = setTimeout(() => setPhase("circle"), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Virtual scroll offset (0 → SCROLL_TO_COMPLETE)
  const virtualScroll = useMotionValue(0);
  const scrollRef = useRef(0);
  const smoothScroll = useSpring(virtualScroll, { stiffness: 40, damping: 18 });
  const [scrollV, setScrollV] = useState(0);

  useEffect(() => {
    const u = smoothScroll.on("change", setScrollV);
    return u;
  }, [smoothScroll]);

  // Wheel / touch handler — only active while scroll NOT done
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    if (scrollDone) return;
    const next = Math.min(scrollRef.current + e.deltaY, SCROLL_TO_COMPLETE);
    scrollRef.current = Math.max(next, 0);
    virtualScroll.set(scrollRef.current);
    if (scrollRef.current >= SCROLL_TO_COMPLETE) {
      setScrollDone(true);
    }
  }, [scrollDone, virtualScroll]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let ty = 0;
    const onTouchStart = (e: TouchEvent) => { ty = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      if (scrollDone) return;
      const dy = ty - e.touches[0].clientY;
      ty = e.touches[0].clientY;
      const next = Math.min(scrollRef.current + dy, SCROLL_TO_COMPLETE);
      scrollRef.current = Math.max(next, 0);
      virtualScroll.set(scrollRef.current);
      if (scrollRef.current >= SCROLL_TO_COMPLETE) setScrollDone(true);
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: false });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, [handleWheel, scrollDone, virtualScroll]);

  // Auto-rotation RAF — starts when scroll is done
  useEffect(() => {
    if (!scrollDone) return;
    const tick = () => {
      autoAngle.current += 0.4; // degrees per frame
      setAutoRotateDeg(autoAngle.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [scrollDone]);

  // Circle radius
  const circleR = size.w > 0
    ? Math.min(Math.min(size.w, size.h) * 0.32, 240)
    : 200;

  // Scatter positions
  const scatter = useMemo(() => MODALITIES.map(() => ({
    x: (Math.random() - 0.5) * 1400,
    y: (Math.random() - 0.5) * 900,
    rotation: (Math.random() - 0.5) * 160,
    scale: 0.5,
    opacity: 0,
  })), []);

  // Scroll progress: 0 → 1 over SCROLL_TO_COMPLETE (full 360°)
  const scrollProgress = Math.min(scrollV / SCROLL_TO_COMPLETE, 1);
  // Circle rotates 360° total as user scrolls
  const circleDegFromScroll = scrollProgress * 360;

  // Per-card targets
  const targets: CardTarget[] = MODALITIES.map((_, i) => {
    if (phase === "scatter") return scatter[i];

    if (phase === "line") {
      const spacing = 72;
      const total = TOTAL * spacing;
      return { x: i * spacing - total / 2 + spacing / 2, y: 0, rotation: 0, scale: 1, opacity: 1 };
    }

    // Circle: each card at its natural angle + the global rotation
    const baseAngle = (i / TOTAL) * 360;
    // Use auto-rotation after done, scroll-driven rotation while scrolling
    const globalRot = scrollDone ? autoAngle.current : circleDegFromScroll;
    const angle = baseAngle + globalRot;
    const rad = (angle * Math.PI) / 180;
    const scale = scrollDone ? 1.1 : 1.0;

    return {
      x: Math.cos(rad) * circleR,
      y: Math.sin(rad) * circleR,
      rotation: angle + 90,
      scale,
      opacity: 1,
    };
  });

  // Hint: show scroll prompt when circle is visible and not done
  const showHint = phase === "circle" && !scrollDone && scrollV < 40;
  // Show "done" label briefly when scroll completes
  const showDoneLabel = scrollDone;

  return (
    <section
      ref={sectionRef}
      id="modalidades"
      className="relative overflow-hidden"
      style={{
        height: "100svh",
        minHeight: 600,
        touchAction: scrollDone ? "auto" : "none",
        // Lock page scroll while the animation isn't done
        overflowY: scrollDone ? "visible" : "hidden",
      }}
    >
      {/* Section header */}
      <motion.div
        className="absolute top-8 left-0 right-0 z-10 text-center px-4 pointer-events-none"
        animate={{ opacity: showDoneLabel ? 0.5 : 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-2">
          Nossas <span className="gradient-text">Modalidades</span>
        </h2>
        <p className="text-muted-foreground text-base lg:text-lg">
          {scrollDone
            ? "Passe o mouse sobre os cards para ver detalhes"
            : `${Math.round(scrollProgress * 100)}% — role para ver todas`}
        </p>
      </motion.div>

      {/* Scroll hint */}
      {showHint && (
        <motion.div
          className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-2 z-10 pointer-events-none"
          initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 1 }}
        >
          <span className="text-muted-foreground text-xs tracking-widest uppercase">Role para girar</span>
          <motion.div
            className="w-4 h-7 border-2 rounded-full flex justify-center pt-1"
            style={{ borderColor: "hsl(var(--muted-foreground))" }}
          >
            <motion.div
              className="w-1 h-2 rounded-full"
              style={{ background: "hsl(var(--primary))" }}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      )}

      {/* Progress ring */}
      {phase === "circle" && !scrollDone && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <svg width={48} height={48} viewBox="0 0 48 48">
            <circle cx={24} cy={24} r={20} fill="none" stroke="hsl(var(--muted-foreground) / 0.2)" strokeWidth={3} />
            <circle
              cx={24} cy={24} r={20}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              strokeDasharray={`${2 * Math.PI * 20}`}
              strokeDashoffset={`${2 * Math.PI * 20 * (1 - scrollProgress)}`}
              strokeLinecap="round"
              transform="rotate(-90 24 24)"
              style={{ transition: "stroke-dashoffset 0.1s linear" }}
            />
          </svg>
        </div>
      )}

      {/* Canvas */}
      <div
        ref={containerRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        style={{ userSelect: "none" }}
      >
        {size.w > 0 && (
          <div
            style={{
              position: "absolute",
              left: size.w / 2,
              top: size.h / 2,
              width: 0,
              height: 0,
            }}
          >
            {MODALITIES.map((m, i) => (
              <FlipCard
                key={m.name}
                src={m.img}
                name={m.name}
                desc={m.desc}
                target={targets[i]}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
