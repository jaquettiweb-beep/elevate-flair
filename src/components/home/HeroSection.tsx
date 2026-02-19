import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Phone, ChevronDown, Waves, Users, Trophy } from "lucide-react";
import { useRef, useEffect } from "react";
import heroGym from "@/assets/hero-gym.jpg";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flipper%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre...";

const STATS = [
  { icon: Users, value: "5.000+", label: "Alunos" },
  { icon: Trophy, value: "15+", label: "Anos" },
  { icon: Waves, value: "15+", label: "Modalidades" },
];

/* ─── Letter-by-letter blur-stagger for "Mergulhe" ─── */
function MergulheWord() {
  const word = "Mergulhe";
  return (
    <motion.span
      className="block"
      style={{
        lineHeight: 1.05,
        overflow: "visible",
        /* Extra space so the "g" descender is never clipped */
        paddingBottom: "0.25em",
      }}
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.055, delayChildren: 0.15 } },
      }}
      initial="hidden"
      animate="show"
    >
      {word.split("").map((char, i) => (
        <motion.span
          key={i}
          style={{
            display: "inline-block",
            /* The pb/mb trick gives the background-clip enough paint area */
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

interface HeroSectionProps {
  introComplete?: boolean;
}

export default function HeroSection({ introComplete = true }: HeroSectionProps) {
  /* ── Tall wrapper for scroll-locked animation ── */
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  /* ─────────────────────────────────────────────────────────
     Content: slides LEFT and stays fully visible (no fade)
  ───────────────────────────────────────────────────────── */
  const contentX = useTransform(smooth, [0, 0.65], ["0%", "-24%"]);

  /* ─────────────────────────────────────────────────────────
     Image: slides in from RIGHT
  ───────────────────────────────────────────────────────── */
  const imageX       = useTransform(smooth, [0.1, 0.72], ["105%", "0%"]);
  const imageOpacity = useTransform(smooth, [0.1, 0.45], [0, 1]);
  const imageScale   = useTransform(smooth, [0.1, 0.72], [1.06, 1]);
  const imageInnerY  = useTransform(smooth, [0, 1], ["-6%", "6%"]);

  /* Scroll indicator */
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  /* Header visibility */
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      window.dispatchEvent(
        new CustomEvent("hero-scroll-state", { detail: { scrolled: v > 0.04 } })
      );
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    /*
     * 300vh wrapper — the sticky inner section is 100vh.
     * Extra height provides scroll "travel" to drive animations
     * before the page continues past the hero.
     */
    <div ref={wrapperRef} style={{ height: "300vh" }}>
      <section
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
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

        {/* ════════════════ FACADE IMAGE ════════════════ */}
        <motion.div
          className="absolute top-0 right-0 h-full pointer-events-none z-[5]"
          style={{ x: imageX, opacity: imageOpacity, width: "52%" }}
        >
          <motion.div className="relative w-full h-full overflow-hidden" style={{ scale: imageScale }}>
            <motion.img
              src={heroGym}
              alt="Fachada da Academia Flipper"
              className="absolute inset-0 w-full h-full object-cover object-center"
              style={{ y: imageInnerY }}
            />
            {/* Left blend */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, hsl(210,85%,8%) 0%, hsla(210,85%,8%,0.5) 18%, transparent 44%)",
              }}
            />
            {/* Bottom blend */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, hsl(185,70%,92%) 0%, transparent 22%)",
              }}
            />
            {/* Top blend */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to bottom, hsl(210,85%,8%) 0%, transparent 18%)",
              }}
            />
            {/* Badge */}
            <motion.div
              className="absolute bottom-10 left-1/2 -translate-x-1/2"
              style={{ opacity: imageOpacity }}
            >
              <span
                className="text-white/80 text-xs tracking-[0.35em] uppercase font-semibold backdrop-blur-sm px-4 py-1.5 rounded-full"
                style={{
                  background: "hsla(200,80%,20%,0.55)",
                  border: "1px solid hsla(185,80%,70%,0.2)",
                }}
              >
                Nossa Estrutura
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ════════════════ MAIN CONTENT ════════════════ */}
        <motion.div
          className="relative z-10 w-full max-w-5xl mx-auto px-6 py-32 flex flex-col items-center text-center"
          style={{ x: contentX }}
        >
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
            className="font-display text-5xl sm:text-7xl lg:text-8xl font-black leading-[1] mb-7 tracking-tight max-w-4xl"
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
            className="text-lg sm:text-xl text-white/50 mb-12 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 24 }}
            animate={introComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 50, damping: 14, delay: 0.55 }}
          >
            Natação, musculação, pilates, artes marciais e muito mais.{" "}
            <span className="text-white/75 font-medium">Tudo em um só lugar.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-20"
            initial={{ opacity: 0, y: 24 }}
            animate={introComplete ? { opacity: 1, y: 0 } : {}}
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

          {/* Stats */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 sm:gap-12"
            initial={{ opacity: 0, y: 20 }}
            animate={introComplete ? { opacity: 1, y: 0 } : {}}
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
                  <p className="text-xl font-display font-black text-white leading-none">
                    {stat.value}
                  </p>
                  <p className="text-xs text-white/40 font-medium tracking-widest uppercase">
                    {stat.label}
                  </p>
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
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
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
    </div>
  );
}
