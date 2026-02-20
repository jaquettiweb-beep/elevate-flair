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

// Virtual scroll budget:
// Phase 1 — morph circle → arc:  0  → 700  px
// Phase 2 — arc loops 360°:      700 → 4300 px  (3600 = full spin to show all 16)
const MORPH_START = 0;
const MORPH_END   = 700;
const LOOP_START  = MORPH_END;
const LOOP_END    = MORPH_END + 3600; // full 360° loop
const MAX_SCROLL  = LOOP_END;

const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;
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
  // "done" = all 16 shown, arc collapsed back to circle, auto-spinning
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Virtual scroll raw value
  const virtualScroll = useMotionValue(0);
  const scrollRef = useRef(0);
  // Smooth spring on top of virtual scroll
  const smoothScroll = useSpring(virtualScroll, { stiffness: 42, damping: 20 });
  const [scrollV, setScrollV] = useState(0);

  // Auto-rotation (after done)
  const autoAngle = useRef(0);
  const [autoRotateDeg, setAutoRotateDeg] = useState(0);
  const rafRef = useRef<number>(0);

  // Container size
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([e]) =>
      setSize({ w: e.contentRect.width, h: e.contentRect.height })
    );
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

  // Subscribe to smooth scroll
  useEffect(() => {
    const u = smoothScroll.on("change", setScrollV);
    return u;
  }, [smoothScroll]);

  // Wheel / touch — locked while not done
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    if (done) return;
    const next = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
    scrollRef.current = next;
    virtualScroll.set(next);
    if (next >= MAX_SCROLL) setDone(true);
  }, [done, virtualScroll]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let ty = 0;
    const onTouchStart = (e: TouchEvent) => { ty = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      if (done) return;
      const dy = ty - e.touches[0].clientY;
      ty = e.touches[0].clientY;
      const next = Math.min(Math.max(scrollRef.current + dy, 0), MAX_SCROLL);
      scrollRef.current = next;
      virtualScroll.set(next);
      if (next >= MAX_SCROLL) setDone(true);
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: false });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, [handleWheel, done, virtualScroll]);

  // Auto-rotation RAF — starts when done
  useEffect(() => {
    if (!done) return;
    const tick = () => {
      autoAngle.current += 0.35;
      setAutoRotateDeg(autoAngle.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [done]);

  // Stable scatter positions
  const scatter = useMemo(() => MODALITIES.map(() => ({
    x: (Math.random() - 0.5) * 1400,
    y: (Math.random() - 0.5) * 900,
    rotation: (Math.random() - 0.5) * 160,
    scale: 0.5,
    opacity: 0,
  })), []);

  // ── Geometry helpers ──────────────────────────────────────────────
  const isMobile = size.w < 768;

  // Circle (resting state)
  const circleR = Math.min(Math.min(size.w, size.h) * 0.32, 260);

  // Arc (fan shape, same as original)
  const baseR   = Math.min(size.w, size.h * 1.5);
  const arcR    = baseR * (isMobile ? 1.35 : 1.05);
  const apexY   = size.h * (isMobile ? 0.3 : 0.22);
  const arcCenterY = apexY + arcR;
  const spread  = isMobile ? 95 : 125;          // visible fan angle
  const startAngle = -90 - spread / 2;
  const step    = spread / (TOTAL - 1);          // degrees between cards on arc

  // ── Progress values ───────────────────────────────────────────────
  // morphV: 0 = circle, 1 = arc fully open
  const morphRaw = Math.min(Math.max((scrollV - MORPH_START) / (MORPH_END - MORPH_START), 0), 1);

  // After done, morph collapses back to circle (0)
  const morphV = done ? 0 : morphRaw;

  // loopRot: 0 → 360° during LOOP_START → LOOP_END
  const loopRaw = Math.min(Math.max((scrollV - LOOP_START) / (LOOP_END - LOOP_START), 0), 1);
  // Convert to degrees: rotate the entire arc so all 16 cards pass the apex (-90°)
  // Cards are spread over `spread` degrees. To cycle all 16 through center, rotate 360°.
  const loopDeg = loopRaw * 360;

  // Overall loop progress (0 → 1) for the progress ring
  const loopProgress = loopRaw;

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 28, damping: 18 });
  const [parallaxV, setParallaxV] = useState(0);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mouseX.set(((e.clientX - r.left) / r.width * 2 - 1) * 60);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mouseX]);
  useEffect(() => {
    const u = smoothMouseX.on("change", setParallaxV);
    return u;
  }, [smoothMouseX]);

  // ── Per-card targets ──────────────────────────────────────────────
  const targets: CardTarget[] = MODALITIES.map((_, i) => {
    if (phase === "scatter") return scatter[i];

    if (phase === "line") {
      const spacing = 72;
      const total = TOTAL * spacing;
      return { x: i * spacing - total / 2 + spacing / 2, y: 0, rotation: 0, scale: 1, opacity: 1 };
    }

    // ── Circle position (resting) ──
    const cAngle = (i / TOTAL) * 360 + (done ? autoRotateDeg : 0);
    const cRad = (cAngle * Math.PI) / 180;
    const circlePos = {
      x: Math.cos(cRad) * circleR,
      y: Math.sin(cRad) * circleR,
      rotation: cAngle + 90,
      scale: done ? 1.1 : 1.0,
    };

    // ── Arc position (fan open) ──
    // Each card is equally spaced on the fan, then the whole fan rotates by loopDeg
    const cardAngle = startAngle + i * step + loopDeg;
    const aRad = (cardAngle * Math.PI) / 180;
    const arcPos = {
      x: Math.cos(aRad) * arcR + parallaxV,
      y: Math.sin(aRad) * arcR + arcCenterY,
      rotation: cardAngle + 90,
      scale: isMobile ? 1.35 : 1.7,
    };

    // ── Lerp circle → arc via morphV ──
    return {
      x:        lerp(circlePos.x,        arcPos.x,        morphV),
      y:        lerp(circlePos.y,        arcPos.y,        morphV),
      rotation: lerp(circlePos.rotation, arcPos.rotation, morphV),
      scale:    lerp(circlePos.scale,    arcPos.scale,    morphV),
      opacity: 1,
    };
  });

  // UI helpers
  const arcOpen     = morphV > 0.5;
  const showHint    = phase === "circle" && !done && scrollV < 40;
  const inLoop      = phase === "circle" && morphRaw >= 0.9 && !done;

  return (
    <section
      id="modalidades"
      className="relative overflow-hidden"
      style={{
        height: "100svh",
        minHeight: 600,
        touchAction: done ? "auto" : "none",
      }}
    >
      {/* Header */}
      <motion.div
        className="absolute top-8 left-0 right-0 z-10 text-center px-4 pointer-events-none"
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-2">
          Nossas <span className="gradient-text">Modalidades</span>
        </h2>
        <motion.p
          className="text-muted-foreground text-base lg:text-lg"
          animate={{ opacity: 1 }}
        >
          {done
            ? "Passe o mouse sobre os cards para ver detalhes"
            : inLoop
            ? `${Math.round(loopProgress * 100)}% — continue rolando`
            : "16 modalidades — role para explorar"}
        </motion.p>
      </motion.div>

      {/* Scroll hint */}
      {showHint && (
        <motion.div
          className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-2 z-10 pointer-events-none"
          initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 1 }}
        >
          <span className="text-muted-foreground text-xs tracking-widest uppercase">Role para abrir</span>
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

      {/* Progress ring — visible while looping */}
      {inLoop && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <svg width={52} height={52} viewBox="0 0 52 52">
            <circle cx={26} cy={26} r={22} fill="none" stroke="hsl(var(--muted-foreground) / 0.15)" strokeWidth={3} />
            <circle
              cx={26} cy={26} r={22}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              strokeDasharray={`${2 * Math.PI * 22}`}
              strokeDashoffset={`${2 * Math.PI * 22 * (1 - loopProgress)}`}
              strokeLinecap="round"
              transform="rotate(-90 26 26)"
              style={{ transition: "stroke-dashoffset 0.08s linear" }}
            />
            <text
              x={26} y={30}
              textAnchor="middle"
              fontSize={9}
              fill="hsl(var(--primary))"
              fontWeight={700}
            >
              {Math.round(loopProgress * 16)}/16
            </text>
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
