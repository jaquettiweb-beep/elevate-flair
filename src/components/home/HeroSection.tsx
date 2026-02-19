import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Phone, ChevronDown, Waves, Users, Trophy } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import heroGym from "@/assets/hero-gym.jpg";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flipper%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre...";

const STATS = [
  { icon: Users, value: "5.000+", label: "Alunos" },
  { icon: Trophy, value: "15+", label: "Anos" },
  { icon: Waves, value: "15+", label: "Modalidades" },
];

/* ─── Letter-by-letter blur-stagger ─── */
function MergulheWord() {
  const word = "Mergulhe";
  return (
    <motion.span
      className="block"
      style={{ paddingBottom: "0.35em" }} // prevents "g" descender clipping
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.055, delayChildren: 0.15 },
        },
      }}
      initial="hidden"
      animate="show"
    >
      {word.split("").map((char, i) => (
        <motion.span
          key={i}
          style={{
            display: "inline-block",
            background:
              "linear-gradient(135deg, hsl(185,80%,68%), hsl(195,90%,73%), hsl(170,70%,58%))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          variants={{
            hidden: { opacity: 0, filter: "blur(14px)", y: 10 },
            show: {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

interface HeroSectionProps {
  introComplete?: boolean;
}

export default function HeroSection({ introComplete = true }: HeroSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /* spring-smooth scroll value */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    restDelta: 0.001,
  });

  /* ─── Content: shifts left on scroll ─── */
  const contentX = useTransform(smoothProgress, [0, 0.55], ["0%", "-30%"]);
  const contentY = useTransform(smoothProgress, [0, 0.6], ["0%", "12%"]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const contentScale = useTransform(smoothProgress, [0, 0.5], [1, 0.94]);

  /* ─── Facade image: slides in from right ─── */
  const imageX = useTransform(smoothProgress, [0.08, 0.55], ["100%", "0%"]);
  const imageOpacity = useTransform(smoothProgress, [0.08, 0.4], [0, 1]);
  const imageScale = useTransform(smoothProgress, [0.08, 0.55], [1.08, 1]);

  /* ─── Scroll indicator ─── */
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  /* track if user has started scrolling to show header */
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      if (v > 0.05) setHasScrolled(true);
    });
    return unsub;
  }, [scrollYProgress]);

  /* expose scroll state for layout via custom event */
  useEffect(() => {
    const event = new CustomEvent("hero-scroll-state", { detail: { scrolled: hasScrolled } });
    window.dispatchEvent(event);
  }, [hasScrolled]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Apresentação"
      style={{
        background: `linear-gradient(to bottom, hsl(210, 85%, 8%) 0%, hsl(200, 80%, 12%) 50%, hsl(185, 70%, 92%) 100%)`,
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

      {/* ─── FACADE IMAGE (right side, appears on scroll) ─── */}
      <motion.div
        className="absolute top-0 right-0 h-full w-1/2 pointer-events-none z-[5]"
        style={{ x: imageX, opacity: imageOpacity }}
      >
        <motion.div className="relative h-full w-full" style={{ scale: imageScale }}>
          <img
            src={heroGym}
            alt="Fachada da Academia Flipper"
            className="w-full h-full object-cover"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 30%, black 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 30%, black 100%)",
            }}
          />
          {/* overlay to blend with page bg */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, hsl(210,85%,8%) 0%, transparent 35%), linear-gradient(to top, hsl(185,70%,92%) 0%, transparent 20%)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* ─── MAIN CONTENT (shifts left on scroll) ─── */}
      <motion.div
        className="relative z-10 container mx-auto px-6 py-32 flex flex-col items-center text-center"
        style={{
          x: contentX,
          y: contentY,
          opacity: contentOpacity,
          scale: contentScale,
        }}
      >
        {/* Badge */}
        <motion.div
          className="flex items-center gap-2 mb-10"
          initial={{ opacity: 0, y: -16 }}
          animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
          transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.2 }}
        >
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-white/40 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
            Academia Flipper • São Paulo
          </span>
        </motion.div>

        {/* Main heading */}
        <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.92] mb-7 tracking-tight max-w-4xl overflow-visible">
          <MergulheWord />
          <motion.span
            className="block text-white"
            initial={{ opacity: 0, y: 24 }}
            animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ type: "spring", stiffness: 50, damping: 14, delay: 0.75 }}
          >
            na sua melhor versão.
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl text-white/50 mb-12 max-w-xl leading-relaxed"
          initial={{ opacity: 0, y: 24 }}
          animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ type: "spring", stiffness: 50, damping: 14, delay: 0.55 }}
        >
          Natação, musculação, pilates, artes marciais e muito mais.{" "}
          <span className="text-white/75 font-medium">Tudo em um só lugar.</span>
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ type: "spring", stiffness: 50, damping: 14, delay: 0.7 }}
        >
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-full px-8 py-4 text-base font-bold flex items-center justify-center gap-3 text-white overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(185,80%,45%), hsl(195,75%,38%))",
              boxShadow: "0 8px 30px hsla(185,80%,45%,0.3)",
            }}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Phone size={18} />
            <span>Aula Experimental Grátis</span>
          </motion.a>

          <motion.a
            href="#modalidades"
            className="rounded-full px-8 py-4 text-base font-semibold text-white/70 border border-white/12 hover:border-white/25 hover:bg-white/[0.05] transition-all text-center backdrop-blur-sm"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Conheça as Modalidades
          </motion.a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 sm:gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 50, damping: 14, delay: 0.9 }}
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: "linear-gradient(135deg, hsl(185,80%,45%), hsl(195,75%,38%))",
                  boxShadow: "0 4px 12px hsla(185,80%,45%,0.25)",
                }}
              >
                <stat.icon size={16} className="text-white" />
              </div>
              <div className="text-left">
                <p className="text-xl font-display font-black text-white leading-none">{stat.value}</p>
                <p className="text-xs text-white/40 font-medium tracking-widest uppercase">{stat.label}</p>
              </div>
              {i < STATS.length - 1 && (
                <div className="hidden sm:block w-px h-8 bg-white/10 ml-4" />
              )}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{ opacity: indicatorOpacity }}
        initial={{ opacity: 0 }}
        animate={introComplete ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="text-[10px] tracking-[0.25em] uppercase text-white/25 font-medium">
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown size={24} className="text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
