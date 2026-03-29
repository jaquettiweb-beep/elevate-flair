import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Phone, ChevronDown, Waves, Users, Trophy, MapPin, Clock } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import fachadaFlipper from "@/assets/fachada-flipper.jpg";
import SectionWave from "../SectionWave";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flipper%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre...";

const STATS = [
  { icon: Users, value: "5.000+", label: "Alunos" },
  { icon: Trophy, value: "50+", label: "Anos" },
  { icon: Waves, value: "15+", label: "Modalidades" },
];

/* ─────────────────────────────────────────────────────
   Letter-by-letter blur-stagger for "Mergulhe"
───────────────────────────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as any } },
};

function MergulheWord() {
  return (
    <motion.span
      className="block"
      style={{ lineHeight: 1.05, overflow: "visible", paddingBottom: "0.22em" }}
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.055, delayChildren: 0.15 } },
      }}
      initial="hidden"
      animate="show"
    >
      {"Mergulhe".split("").map((char, i) => (
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
    <div ref={wrapperRef} style={{ height: "125vh" }}>
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
          {/* New Requested Gradient Overlay - Brand Legibility */}
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
              alt="Academia Flipper"
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

              <div className="flex flex-col sm:flex-row gap-3">
                {[
                  { icon: Clock, title: "Seg – Sex: 6h às 22h", sub: "Sáb: 7h às 16h" },
                  { icon: MapPin, title: "Av. Ver. José Diniz, 2583", sub: "Brooklin, SP" },
                ].map(({ icon: Icon, title, sub }) => (
                  <div
                    key={title}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl w-fit"
                    style={{
                      background: "hsla(200,80%,12%,0.6)",
                      border: "1px solid hsla(185,80%,70%,0.12)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "linear-gradient(135deg, hsl(185,80%,45%), hsl(195,75%,38%))" }}
                    >
                      <Icon size={13} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white/90 text-xs font-semibold leading-tight">{title}</p>
                      <p className="text-white/40 text-[10px] tracking-wide">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* â•â•â•â• CONTENT COLUMN â•â•â•â• */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-full z-10 flex items-center justify-center"
        >
          <motion.div className="flex flex-col items-center text-center px-6 w-full" style={{ maxWidth: innerMaxWidth }}>
            {/* Badge */}
            <motion.div
              className="flex items-center gap-2 mb-10"
              initial={{ opacity: 0, y: -16 }}
              animate={introComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.2 }}
            >
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-white/40 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
                Academia Flipper • São Paulo
              </span>
            </motion.div>

            <h1
              className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.95] mb-8 tracking-tighter w-full"
              style={{ lg: { letterSpacing: '-0.04em' } } as any}
            >
              <MergulheWord />
              <motion.span
                className="block text-white mt-2"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.5 }}
              >
                na sua melhor versão.
              </motion.span>
            </h1>

            <motion.p
              className="text-base sm:text-lg text-white/50 mb-10 max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 24 }}
              animate={introComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 50, damping: 14, delay: 0.55 }}
            >
              Natação, musculação, pilates, artes marciais e muito mais.{" "}
              <span className="text-white/75 font-medium">Tudo em um só lugar.</span>
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 mb-14"
              initial={{ opacity: 0, y: 24 }}
              animate={introComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 50, damping: 14, delay: 0.7 }}
            >
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[12px] px-10 py-4 text-lg font-black flex items-center justify-center gap-3 text-white bg-[#FF6B00] shadow-xl shadow-orange-600/30"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <Phone size={20} fill="white" />
                Matricule-se Agora
              </motion.a>
              <motion.a
                href="#modalidades"
                className="rounded-full px-7 py-3.5 text-sm font-semibold text-white/70 border border-white/12 hover:border-white/25 hover:bg-white/[0.05] transition-all text-center backdrop-blur-sm"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Ver Modalidades
              </motion.a>
            </motion.div>

            <motion.div
              className="flex flex-row gap-6 sm:gap-10 mb-16 lg:mb-24"
              initial={{ opacity: 0, y: 20 }}
              animate={introComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 50, damping: 14, delay: 0.9 }}
            >
              {STATS.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: "linear-gradient(135deg, hsl(185,80%,45%), hsl(195,75%,38%))",
                      boxShadow: "0 4px 12px hsla(185,80%,45%,0.25)",
                    }}
                  >
                    <stat.icon size={14} className="text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-display font-black text-white leading-none">{stat.value}</p>
                    <p className="text-[10px] text-white/40 font-medium tracking-widest uppercase">{stat.label}</p>
                  </div>
                  {i < STATS.length - 1 && (
                    <div className="hidden sm:block w-px h-7 bg-white/10 ml-2" />
                  )}
                </div>
              ))}
            </motion.div>
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

        {/* Wave Divider to next section */}
        <SectionWave position="bottom" color="hsl(185, 70%, 92%)" />
      </section>
    </div>
  );
}
