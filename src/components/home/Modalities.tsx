import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import swimmingImg from "@/assets/swimming.jpg";
import yogaImg from "@/assets/yoga.jpg";
import martialImg from "@/assets/martial-arts.jpg";
import pilatesImg from "@/assets/pilates.jpg";
import musculacaoImg from "@/assets/musculacao.jpg";

const MODALITIES = [
  { name: "Natação",           desc: "Adulto, infantil e bebê. Piscina aquecida semiolímpica.",                img: swimmingImg },
  { name: "Hidroginástica",    desc: "Exercícios aquáticos de baixo impacto para todas as idades.",           img: swimmingImg },
  { name: "Hidroterapia",      desc: "Reabilitação e bem-estar através de exercícios aquáticos terapêuticos.",img: swimmingImg },
  { name: "Prog. 60+ Saúde",   desc: "Atividades desenvolvidas especialmente para a melhor idade.",           img: swimmingImg },
  { name: "Musculação",        desc: "Equipamentos de última geração com orientação profissional.",            img: musculacaoImg },
  { name: "Ginástica",         desc: "Coordenação, flexibilidade e condicionamento físico global.",            img: musculacaoImg },
  { name: "Yoga",              desc: "Equilíbrio entre corpo e mente com instrutores certificados.",           img: yogaImg },
  { name: "Pilates Studio",    desc: "Aparelhos de Pilates com acompanhamento individual.",                   img: pilatesImg },
  { name: "Pilates Solo",      desc: "Fortalecimento e flexibilidade no solo para todos os níveis.",          img: pilatesImg },
  { name: "Ballet (infantil)", desc: "Expressão artística, postura e ritmo para crianças.",                   img: pilatesImg },
  { name: "Muay Thai",         desc: "Arte marcial tailandesa que combina força, técnica e condicionamento.", img: martialImg },
  { name: "Jiu Jitsu",         desc: "Técnicas de grappling e defesa pessoal no tatame.",                    img: martialImg },
  { name: "Judô (infantil)",   desc: "Disciplina e coordenação motora para crianças.",                        img: martialImg },
  { name: "Kung Fu",           desc: "Arte marcial chinesa milenar com foco em equilíbrio e técnica.",        img: martialImg },
  { name: "Krav Maga",         desc: "Sistema de defesa pessoal prático e eficiente.",                        img: martialImg },
  { name: "Aikidô",            desc: "Arte marcial japonesa baseada em harmonia e redirecionamento de força.",img: martialImg },
];

const TOTAL = MODALITIES.length;
type Phase = "scatter" | "line" | "circle" | "spinning" | "released";

// ─── Card faces ────────────────────────────────────────────────────
function CardFront({ src, name }: { src: string; name: string }) {
  return (
    <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.45)" }}>
      <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 58%)" }} />
      <span style={{ position: "absolute", bottom: 7, left: 0, right: 0, textAlign: "center", color: "#fff", fontSize: 9, fontWeight: 700, letterSpacing: "0.04em", textShadow: "0 1px 4px rgba(0,0,0,0.9)", padding: "0 4px" }}>
        {name}
      </span>
    </div>
  );
}

function CardBack({ name, desc }: { name: string; desc: string }) {
  return (
    <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)", borderRadius: 12, background: "hsl(221 83% 20%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 10, gap: 5, boxShadow: "0 4px 24px rgba(0,0,0,0.55)" }}>
      <span style={{ color: "hsl(185 80% 72%)", fontSize: 8, fontWeight: 800, textAlign: "center", letterSpacing: "0.06em", textTransform: "uppercase" }}>{name}</span>
      <span style={{ color: "rgba(255,255,255,0.78)", fontSize: 7, textAlign: "center", lineHeight: 1.45 }}>{desc}</span>
    </div>
  );
}

// ─── Entry card (scatter → line → circle) ─────────────────────────
interface EntryTarget { x: number; y: number; rotation: number; scale: number; opacity: number }

function EntryCard({ src, name, desc, target, cw, ch }: { src: string; name: string; desc: string; target: EntryTarget; cw: number; ch: number }) {
  return (
    <motion.div
      className="absolute"
      style={{ width: cw, height: ch }}
      animate={{ x: target.x - cw / 2, y: target.y - ch / 2, rotate: target.rotation, scale: target.scale, opacity: target.opacity }}
      transition={{ type: "spring", stiffness: 55, damping: 18 }}
    >
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <CardFront src={src} name={name} />
        <CardBack name={name} desc={desc} />
      </div>
    </motion.div>
  );
}

// ─── Wheel card (spinning / released) — counter-rotates to stay upright ─
function WheelCard({ src, name, desc, x, y, cw, ch, containerRot }: {
  src: string; name: string; desc: string;
  x: number; y: number; cw: number; ch: number;
  containerRot: ReturnType<typeof useMotionValue<number>>;
}) {
  const [flipped, setFlipped] = useState(false);
  const counterRot = useTransform(containerRot, (v: number) => -v);

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ width: cw, height: ch, x: x - cw / 2, y: y - ch / 2, rotate: counterRot, perspective: 900, zIndex: flipped ? 20 : 1 }}
      onHoverStart={() => setFlipped(true)}
      onHoverEnd={() => setFlipped(false)}
    >
      <div style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d", transition: "transform 0.48s cubic-bezier(.4,0,.2,1)", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>
        <CardFront src={src} name={name} />
        <CardBack name={name} desc={desc} />
      </div>
    </motion.div>
  );
}

// ─── Progress ring SVG ─────────────────────────────────────────────
function ProgressRing({ progress }: { progress: number }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const dash = circ * Math.min(progress, 1);
  return (
    <svg width={120} height={120} style={{ position: "absolute", top: -60, left: -60, pointerEvents: "none", zIndex: 21 }}>
      <circle cx={60} cy={60} r={r} fill="none" stroke="hsl(var(--primary) / 0.15)" strokeWidth={2} />
      <circle cx={60} cy={60} r={r} fill="none" stroke="hsl(var(--primary))" strokeWidth={2.5}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        transform="rotate(-90 60 60)" style={{ transition: "stroke-dasharray 0.1s linear" }} />
    </svg>
  );
}

// ─── Main ──────────────────────────────────────────────────────────
export default function Modalities() {
  const [phase, setPhase] = useState<Phase>("scatter");
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [spinProgress, setSpinProgress] = useState(0); // 0–1 during spinning

  const sectionRef  = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const phaseRef     = useRef<Phase>("scatter");
  const mouseIn      = useRef(false);
  const done         = useRef(!!localStorage.getItem("flipper-modalities-seen"));
  const startRot     = useRef(0);
  const rafRef       = useRef<number | null>(null);
  const containerRot = useMotionValue(0);

  useEffect(() => { phaseRef.current = phase; }, [phase]);

  // Size
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(containerRef.current);
    setSize({ w: containerRef.current.offsetWidth, h: containerRef.current.offsetHeight });
    return () => ro.disconnect();
  }, []);

  // Entry sequence
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("line"),   500);
    const t2 = setTimeout(() => setPhase("circle"), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Auto-rotate
  const startAutoRotate = useCallback(() => {
    if (rafRef.current) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      containerRot.set(containerRot.get() + dt * 0.007); // ~0.42°/frame
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [containerRot]);

  const stopAutoRotate = useCallback(() => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
  }, []);

  // Wheel / touch event handler
  useEffect(() => {
    const apply = (delta: number) => {
      const p = phaseRef.current;
      if (p === "scatter" || p === "line") return;

      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect || rect.bottom < 0 || rect.top > window.innerHeight) return;

      const firstVisit = !done.current;
      if (!firstVisit && !mouseIn.current) return;

      if (p === "circle") {
        startRot.current = containerRot.get();
        setPhase("spinning");
        phaseRef.current = "spinning";
        stopAutoRotate();
      }

      if (p === "spinning") {
        const next = containerRot.get() + delta * 0.13;
        containerRot.set(next);
        const acc = Math.max(0, next - startRot.current);
        const prog = Math.min(acc / 360, 1);
        setSpinProgress(prog);
        if (acc >= 360) {
          done.current = true;
          localStorage.setItem("flipper-modalities-seen", "true");
          setPhase("released");
          phaseRef.current = "released";
          setSpinProgress(1);
          startAutoRotate();
        }
      } else if (p === "released") {
        containerRot.set(containerRot.get() + delta * 0.13);
      }
    };

    const onWheel = (e: WheelEvent) => {
      const p = phaseRef.current;
      if ((p === "circle" || p === "spinning") && (!done.current || mouseIn.current)) {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (rect && rect.bottom >= 0 && rect.top <= window.innerHeight) e.preventDefault();
      } else if (p === "released" && mouseIn.current) {
        e.preventDefault();
      }
      apply(e.deltaY);
    };

    let ty = 0;
    const onTouchStart = (e: TouchEvent) => { ty = e.touches[0].clientY; };
    const onTouchMove  = (e: TouchEvent) => {
      const dy = ty - e.touches[0].clientY;
      ty = e.touches[0].clientY;
      apply(dy * 2);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [containerRot, startAutoRotate, stopAutoRotate]);

  useEffect(() => () => stopAutoRotate(), [stopAutoRotate]);

  // Layout values
  const cardW  = size.w < 768 ? 58 : 80;
  const cardH  = size.w < 768 ? 82 : 112;
  const radius = size.w > 0 ? Math.min(size.w * 0.43, size.h * 0.40, 295) : 240;

  // Stable scatter positions
  const scatter = useMemo<EntryTarget[]>(() => MODALITIES.map(() => ({
    x:        (Math.random() - 0.5) * 1400,
    y:        (Math.random() - 0.5) * 900,
    rotation: (Math.random() - 0.5) * 160,
    scale:    0.5,
    opacity:  0,
  })), []);

  // Circle positions (recompute when radius changes)
  const circlePts = useMemo(() => MODALITIES.map((_, i) => {
    const rad = ((i / TOTAL) * 360 * Math.PI) / 180;
    return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius };
  }), [radius]);

  // Entry targets per phase
  const entryTargets: EntryTarget[] = MODALITIES.map((_, i) => {
    if (phase === "scatter") return scatter[i];
    if (phase === "line") {
      const sp = 72;
      return { x: i * sp - TOTAL * sp / 2 + sp / 2, y: 0, rotation: 0, scale: 1, opacity: 1 };
    }
    return { x: circlePts[i].x, y: circlePts[i].y, rotation: 0, scale: 1, opacity: 1 };
  });

  const isWheelMode = phase === "spinning" || phase === "released";

  return (
    <section
      ref={sectionRef}
      id="modalidades"
      className="relative overflow-hidden"
      style={{ height: "100svh", minHeight: 600 }}
      onMouseEnter={() => { mouseIn.current = true; }}
      onMouseLeave={() => { mouseIn.current = false; }}
    >
      {/* ── Header ── */}
      <motion.div
        className="absolute top-8 left-0 right-0 z-10 text-center px-4 pointer-events-none"
        animate={{ opacity: isWheelMode ? 0.38 : 1, y: isWheelMode ? -8 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-1">
          Nossas <span className="gradient-text">Modalidades</span>
        </h2>
        <AnimatePresence>
          {!isWheelMode && (
            <motion.p
              className="text-muted-foreground text-base mt-1"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              16 modalidades — role para explorar
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Canvas ── */}
      <div ref={containerRef} className="absolute inset-0" style={{ userSelect: "none" }}>
        {size.w > 0 && (
          <>
            {/* Inner circle label — visible only during 'circle' phase */}
            <AnimatePresence>
              {phase === "circle" && (
                <motion.div
                  className="absolute z-20 pointer-events-none flex flex-col items-center justify-center text-center gap-1"
                  style={{ left: size.w / 2 - 68, top: size.h / 2 - 68, width: 136, height: 136 }}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.55, transition: { duration: 0.45 } }}
                  transition={{ duration: 0.55, delay: 0.2 }}
                >
                  <span className="font-display font-bold text-foreground text-sm leading-snug">
                    Nossas<br />Modalidades
                  </span>
                  <motion.span
                    className="text-muted-foreground text-[10px] tracking-widest uppercase mt-0.5 block"
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  >
                    ↓ role
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress ring during spin */}
            <AnimatePresence>
              {phase === "spinning" && (
                <motion.div
                  className="absolute z-20 pointer-events-none"
                  style={{ left: size.w / 2, top: size.h / 2 }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                >
                  <ProgressRing progress={spinProgress} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Subtle hub dot in wheel mode */}
            {isWheelMode && (
              <div
                className="absolute z-10 pointer-events-none rounded-full"
                style={{
                  left: size.w / 2 - 5, top: size.h / 2 - 5, width: 10, height: 10,
                  background: "hsl(var(--primary) / 0.5)",
                  boxShadow: "0 0 12px 4px hsl(var(--primary) / 0.2)",
                }}
              />
            )}

            {/* Entry cards (scatter → line → circle) */}
            {!isWheelMode && (
              <div style={{ position: "absolute", left: size.w / 2, top: size.h / 2, width: 0, height: 0 }}>
                {MODALITIES.map((m, i) => (
                  <EntryCard key={m.name} src={m.img} name={m.name} desc={m.desc}
                    target={entryTargets[i]} cw={cardW} ch={cardH} />
                ))}
              </div>
            )}

            {/* Wheel (spinning + released) — container rotates, cards counter-rotate */}
            {isWheelMode && (
              <motion.div style={{
                position: "absolute", left: size.w / 2, top: size.h / 2,
                width: 0, height: 0, rotate: containerRot,
              }}>
                {MODALITIES.map((m, i) => (
                  <WheelCard key={m.name} src={m.img} name={m.name} desc={m.desc}
                    x={circlePts[i].x} y={circlePts[i].y} cw={cardW} ch={cardH}
                    containerRot={containerRot} />
                ))}
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* ── Scroll hint ── */}
      <AnimatePresence>
        {phase === "circle" && (
          <motion.div
            className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2 z-10 pointer-events-none"
            initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} exit={{ opacity: 0 }}
            transition={{ delay: 1.2 }}
          >
            <span className="text-muted-foreground text-xs tracking-widest uppercase">Role para girar a roda</span>
            <motion.div className="w-4 h-7 border-2 rounded-full flex justify-center pt-1"
              style={{ borderColor: "hsl(var(--muted-foreground))" }}>
              <motion.div className="w-1 h-2 rounded-full" style={{ background: "hsl(var(--primary))" }}
                animate={{ y: [0, 8, 0] }} transition={{ duration: 1.4, repeat: Infinity }} />
            </motion.div>
          </motion.div>
        )}
        {phase === "spinning" && (
          <motion.div
            className="absolute bottom-6 left-0 right-0 flex justify-center z-10 pointer-events-none"
            initial={{ opacity: 0 }} animate={{ opacity: 0.65 }} exit={{ opacity: 0 }}
          >
            <span className="text-muted-foreground text-xs tracking-widest uppercase">
              {Math.round(spinProgress * 100)}% — continue rolando
            </span>
          </motion.div>
        )}
        {phase === "released" && (
          <motion.div
            className="absolute bottom-6 left-0 right-0 flex justify-center z-10 pointer-events-none"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 0.7, y: 0 }} exit={{ opacity: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-muted-foreground text-xs tracking-widest uppercase">
              ↓ Continue explorando
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
