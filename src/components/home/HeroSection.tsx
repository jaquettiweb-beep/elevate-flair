import { motion, useScroll, useTransform, useSpring, animate, useMotionValue } from "framer-motion";
import { Phone, ChevronDown, Waves, Users, Trophy, MapPin, Clock } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import heroGym from "@/assets/hero-gym.jpg";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flipper%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre...";

const STATS = [
  { icon: Users, value: "5.000+", label: "Alunos" },
  { icon: Trophy, value: "15+", label: "Anos" },
  { icon: Waves, value: "15+", label: "Modalidades" },
];

/* ─────────────────────────────────────────────────────
   Water Divider — animated liquid edge between columns
───────────────────────────────────────────────────── */
const WAVE_A =
  "M 50 0 C 30 80 70 160 45 240 C 20 320 65 400 40 480 C 15 560 60 640 42 720 C 24 800 58 880 50 960 L 50 1000 L 100 1000 L 100 0 Z";
const WAVE_B =
  "M 50 0 C 68 80 32 160 55 240 C 78 320 35 400 58 480 C 81 560 38 640 60 720 C 82 800 42 880 50 960 L 50 1000 L 100 1000 L 100 0 Z";

const WAVE_LINE_A =
  "M 50 0 C 30 80 70 160 45 240 C 20 320 65 400 40 480 C 15 560 60 640 42 720 C 24 800 58 880 50 960 L 50 1000";
const WAVE_LINE_B =
  "M 50 0 C 68 80 32 160 55 240 C 78 320 35 400 58 480 C 81 560 38 640 60 720 C 82 800 42 880 50 960 L 50 1000";

function WaterDivider({ opacity }: { opacity: ReturnType<typeof useTransform> }) {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setToggle((t) => !t), 2800);
    return () => clearInterval(interval);
  }, []);

  const fillPath = toggle ? WAVE_B : WAVE_A;
  const linePath = toggle ? WAVE_LINE_B : WAVE_LINE_A;

  return (
    <motion.div
      className="absolute top-0 z-30 h-full pointer-events-none"
      style={{
        left: "calc(50% - 60px)",
        width: "120px",
        opacity,
      }}
    >
      <svg
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        className="w-full h-full"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Glow filter for the wave edge */}
          <filter id="waterGlow" x="-50%" y="-10%" width="200%" height="120%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Shimmer gradient along the wave */}
          <linearGradient id="waveShimmer" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="hsl(185,90%,70%)" stopOpacity="0.0" />
            <stop offset="20%"  stopColor="hsl(190,85%,75%)" stopOpacity="0.7" />
            <stop offset="45%"  stopColor="hsl(185,90%,80%)" stopOpacity="0.9" />
            <stop offset="70%"  stopColor="hsl(195,80%,70%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(185,90%,70%)" stopOpacity="0.0" />
          </linearGradient>

          {/* Fill gradient — translucent water body */}
          <linearGradient id="waveFill" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"  stopColor="hsl(200,80%,30%)" stopOpacity="0.0" />
            <stop offset="60%" stopColor="hsl(185,85%,50%)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="hsl(185,85%,50%)" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Translucent water body fill */}
        <motion.path
          d={fillPath}
          fill="url(#waveFill)"
          animate={{ d: fillPath }}
          transition={{ duration: 2.8, ease: [0.45, 0, 0.55, 1] }}
        />

        {/* Glowing wave edge line */}
        <motion.path
          d={linePath}
          fill="none"
          stroke="url(#waveShimmer)"
          strokeWidth="1.8"
          filter="url(#waterGlow)"
          animate={{ d: linePath }}
          transition={{ duration: 2.8, ease: [0.45, 0, 0.55, 1] }}
        />

        {/* Secondary thinner shimmer line — offset for depth */}
        <motion.path
          d={toggle ? WAVE_A : WAVE_B}
          fill="none"
          stroke="hsl(185,90%,80%)"
          strokeWidth="0.6"
          strokeOpacity="0.25"
          animate={{ d: toggle ? WAVE_A : WAVE_B }}
          transition={{ duration: 2.8, ease: [0.45, 0, 0.55, 1] }}
        />
      </svg>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   Letter-by-letter blur-stagger for "Mergulhe"
───────────────────────────────────────────────────── */
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
              "linear-gradient(135deg, hsl(185,80%,68%), hsl(195,90%,73%), hsl(170,70%,58%))",
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

  /* Content column — right boundary shrinks to give space to image */
  const contentRight = useTransform(smooth, [0.08, 0.70], ["0%", "50%"]);

  /* Image */
  const imageX       = useTransform(smooth, [0.08, 0.70], ["100%", "0%"]);
  const imageOpacity = useTransform(smooth, [0.08, 0.40], [0, 1]);
  const imageScale   = useTransform(smooth, [0.08, 0.70], [1.08, 1]);
  const imageInnerY  = useTransform(smooth, [0, 1], ["-5%", "5%"]);

  /* Info cards on image */
  const overlayOpacity = useTransform(smooth, [0.42, 0.75], [0, 1]);
  const overlayY       = useTransform(smooth, [0.42, 0.75], ["18px", "0px"]);

  /* Scroll indicator */
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  /* Header */
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      window.dispatchEvent(
        new CustomEvent("hero-scroll-state", { detail: { scrolled: v > 0.04 } })
      );
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <div ref={wrapperRef} style={{ height: "300vh" }}>
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

        {/* ══════════════ IMAGE COLUMN ══════════════ */}
        <motion.div
          className="absolute top-0 right-0 h-full z-[5] pointer-events-none"
          style={{ width: "50%", x: imageX, opacity: imageOpacity }}
        >
          <motion.div
            className="relative w-full h-full overflow-hidden"
            style={{ scale: imageScale }}
          >
            <motion.img
              src={heroGym}
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
            {/* Subtle tint */}
            <div
              className="absolute inset-0 z-10"
              style={{ background: "hsla(200,80%,12%,0.22)", mixBlendMode: "multiply" }}
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

              <div className="flex flex-col gap-3">
                {[
                  { icon: MapPin, title: "Tatuapé, São Paulo", sub: "R. Domingos Cassetari, 176" },
                  { icon: Clock, title: "Seg – Sex: 6h às 22h", sub: "Sáb: 7h às 16h" },
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

        {/* ══════════════ WATER DIVIDER ══════════════ */}
        <WaterDivider opacity={imageOpacity} />

        {/* ══════════════ CONTENT COLUMN ══════════════ */}
        <motion.div
          className="absolute top-0 left-0 h-full z-10 flex items-center justify-center"
          style={{ right: contentRight }}
        >
          <div className="flex flex-col items-center text-center px-6 max-w-2xl w-full">
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

            {/* Heading */}
            <h1
              className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1] mb-7 tracking-tight w-full"
              style={{ overflow: "visible" }}
            >
              <MergulheWord />
              <motion.span
                className="block text-white mt-1"
                initial={{ opacity: 0, y: 24 }}
                animate={introComplete ? { opacity: 1, y: 0 } : {}}
                transition={{ type: "spring", stiffness: 50, damping: 14, delay: 0.75 }}
              >
                na sua melhor versão.
              </motion.span>
            </h1>

            {/* Subtitle */}
            <motion.p
              className="text-base sm:text-lg text-white/50 mb-10 max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 24 }}
              animate={introComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 50, damping: 14, delay: 0.55 }}
            >
              Natação, musculação, pilates, artes marciais e muito mais.{" "}
              <span className="text-white/75 font-medium">Tudo em um só lugar.</span>
            </motion.p>

            {/* CTAs */}
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
                className="rounded-full px-7 py-3.5 text-sm font-bold flex items-center justify-center gap-2.5 text-white"
                style={{
                  background: "linear-gradient(135deg, hsl(185,80%,45%), hsl(195,75%,38%))",
                  boxShadow: "0 8px 30px hsla(185,80%,45%,0.3)",
                }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Phone size={16} />
                Aula Experimental Grátis
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

            {/* Stats */}
            <motion.div
              className="flex flex-row gap-6 sm:gap-10"
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
          </div>
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
