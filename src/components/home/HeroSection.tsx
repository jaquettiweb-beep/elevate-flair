import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Phone, ChevronDown, Waves, Users, Trophy, MapPin, Clock, Star, Shield, Calendar, ArrowRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fachadaFlipper from "@/assets/fachada-flipper.jpg";


const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flipper%20e%20gostaria%20de%20agendar%20uma%20aula%20experimental%20gr%C3%A1tis!";

const STATS = [
  { icon: Users, value: "5.000+", label: "Alunos" },
  { icon: Trophy, value: "50+", label: "Anos" },
  { icon: Waves, value: "14+", label: "Modalidades" },
];

const TRUST_BADGES = [
  { icon: Star, label: "4.6★ Google", sublabel: "230+ avaliações" },
  { icon: Users, label: "5.000+", sublabel: "Alunos ativos" },
  { icon: Calendar, label: "50 anos", sublabel: "Desde 1974" },
  { icon: Shield, label: "Única", sublabel: "Piscina Brooklin" },
];

/* ─────────────────────────────────────────────────────
   Letter-by-letter blur-stagger for "Transforme"
───────────────────────────────────────────────────── */
function AnimatedWord({ word }: { word: string }) {
  return (
    <motion.span
      className="inline-block"
      style={{ lineHeight: 1.2, overflow: "visible", paddingBottom: "0.1em" }}
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.045, delayChildren: 0.15 } },
      }}
      initial="hidden"
      animate="show"
    >
      {word.split("").map((char, i) => (
        <motion.span
          key={i}
          style={{
            display: "inline-block",
            paddingBottom: "0.2em",
            marginBottom: "-0.2em",
            background:
              "linear-gradient(135deg, #FF6B00 0%, #FF9E52 50%, #FF6B00 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          variants={{
            hidden: { opacity: 0, filter: "blur(14px)", y: 10 },
            show: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ─────────────────────────────────────────────────────
   Main HeroSection
───────────────────────────────────────────────────── */
interface HeroSectionProps {
  introComplete?: boolean;
}

export default function HeroSection({ introComplete = true }: HeroSectionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  /* Image opacity and position — responsive to initial scroll */
  const imageOpacity = useTransform(smooth, [0.02, 0.25], [0, 1]);
  const imageScale = useTransform(smooth, [0.02, 0.25], [1.08, 1]);
  const imageInnerY = useTransform(smooth, [0, 1], ["-2%", "2%"]);

  /* Full screen vignette tint overlay */
  const tintOpacity = useTransform(smooth, [0.02, 0.25], [0.22, 0.60]);

  /* Info cards appear after image arrives */
  const overlayOpacity = useTransform(smooth, [0.15, 0.35], [0, 1]);
  const overlayY = useTransform(smooth, [0.15, 0.35], ["18px", "0px"]);

  /* Inner content width: prevent shrinking to avoid unexpected text line breaks */
  const innerMaxWidth = useTransform(smooth, [0.02, 0.25], ["960px", "960px"]);

  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      window.dispatchEvent(
        new CustomEvent("hero-scroll-state", { detail: { scrolled: v > 0.04 } })
      );
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <div ref={wrapperRef} style={{ height: "100vh" }}>
      <section
        className="sticky top-0 h-screen overflow-hidden"
        aria-label="Apresentação"
        style={{
          background:
            "linear-gradient(to bottom, hsl(210,85%,8%) 0%, hsl(200,80%,12%) 60%, hsl(185,70%,92%) 100%)",
        }}
      >
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, hsla(185,80%,50%,0.08) 0%, transparent 70%)",
          }}
        />

        {/* ──── IMAGE COLUMN ──── */}
        <motion.div
          className="absolute top-0 right-0 h-full w-full z-[5] pointer-events-none"
          style={{ opacity: imageOpacity }}
        >
          {/* Gradient Overlay - Brand Legibility */}
          <div 
            className="absolute inset-0 z-15" 
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%)' }} 
          />

          {/* Photo */}
          <motion.div
            className="relative w-full h-full overflow-hidden"
            style={{ scale: imageScale }}
          >
            <motion.img
              src={fachadaFlipper}
              alt="Fachada da Academia Flipper no Brooklin, São Paulo - Piscina aquecida e musculação"
              className="absolute inset-0 w-full h-full object-cover object-center"
              style={{ y: imageInnerY, scale: 1.06 }}
            />
            {/* Top vignette */}
            <div
              className="absolute inset-0 z-10"
              style={{ background: "linear-gradient(to bottom, hsl(210,85%,8%) 0%, transparent 20%)" }}
            />
            {/* Bottom vignette */}
            <div
              className="absolute inset-0 z-10"
              style={{ background: "linear-gradient(to top, hsl(185,70%,88%) 0%, transparent 28%)" }}
            />
            {/* Cinematic tint */}
            <motion.div
              className="absolute inset-0 z-10"
              style={{ background: "hsla(200,80%,12%,1)", opacity: tintOpacity, mixBlendMode: "multiply" }}
            />

            {/* Info overlay */}
            <motion.div
              className="absolute inset-0 z-20 flex flex-col justify-between p-8 pointer-events-none"
              style={{ opacity: overlayOpacity, y: overlayY }}
            >
              <div className="flex justify-end">
                <span
                  className="text-white/70 text-[10px] tracking-[0.4em] uppercase font-semibold px-3 py-1 rounded-full"
                  style={{
                    background: "hsla(200,80%,20%,0.5)",
                    border: "1px solid hsla(185,80%,70%,0.18)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  Academia Flipper
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ──── CONTENT COLUMN ──── */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-full z-10 flex items-center justify-center"
        >
          <motion.div className="flex flex-col items-center text-center px-6 w-full" style={{ maxWidth: innerMaxWidth }}>
            {/* Badge */}
            <motion.div
              className="flex items-center gap-2 mb-8"
              initial={{ opacity: 0, y: -16 }}
              animate={introComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.2 }}
            >
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-white/40 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
                Academia Flipper • Brooklin, SP
              </span>
            </motion.div>

            {/* ── Main Headline ── */}
            <h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] mb-6 tracking-tighter w-full"
            >
              <motion.span
                className="block text-white"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.35 }}
              >
                Sua melhor versão
              </motion.span>
              <motion.span
                className="block text-white mt-1"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.5 }}
              >
                começa com o cuidado
              </motion.span>
              <motion.span
                className="block text-white mt-1"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.65 }}
              >
                que você escolhe ter
              </motion.span>
              <motion.span
                className="block mt-1"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.8 }}
              >
                <span
                  style={{
                    background: "linear-gradient(135deg, #FF6B00 0%, #FF9E52 50%, #FF6B00 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  com o seu corpo hoje.
                </span>
              </motion.span>
            </h1>

            {/* ── Subtitle with social proof ── */}
            <motion.p
              className="text-base sm:text-lg text-white/55 mb-8 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 24 }}
              animate={introComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 50, damping: 14, delay: 0.7 }}
            >
              Uma academia humanizada, feita para pessoas de todas as idades, focada em bem-estar, saúde e desenvolvimento pessoal.
            </motion.p>

            {/* ── CTAs ── */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto"
              initial={{ opacity: 0, y: 24 }}
              animate={introComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 50, damping: 14, delay: 0.8 }}
            >
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[12px] px-8 py-4 text-lg font-black flex items-center justify-center gap-3 text-white bg-[#FF6B00] shadow-xl shadow-orange-600/30 min-h-[56px] w-full sm:w-auto"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <Calendar size={20} />
                Agendar Aula Grátis
              </motion.a>
              <motion.div className="w-full sm:w-auto">
                <Link
                  to="/planos"
                  className="rounded-full px-7 py-3.5 text-sm font-semibold text-white/70 border border-white/12 hover:border-white/25 hover:bg-white/[0.05] transition-all text-center backdrop-blur-sm flex items-center justify-center gap-2 min-h-[56px] sm:min-h-0 w-full sm:w-auto"
                >
                  Ver Planos e Preços
                  <ArrowRight size={16} className="opacity-60" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust badges and stats removed per client request */}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
          style={{ opacity: indicatorOpacity }}
          initial={{ opacity: 0 }}
          animate={introComplete ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className="text-[10px] tracking-[0.25em] uppercase text-white/25 font-medium">Explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ChevronDown size={24} className="text-white/30" />
          </motion.div>
        </motion.div>

      </section>
    </div>
  );
}
