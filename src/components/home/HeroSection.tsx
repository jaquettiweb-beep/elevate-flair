import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, ChevronDown, Waves, Droplets, Users, Trophy } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import ScrollBubbles from "@/components/ocean/ScrollBubbles";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flipper%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre...";

const FLOATING_STATS = [
  { icon: Users, value: "5.000+", label: "Alunos", delay: 0.8 },
  { icon: Trophy, value: "15+", label: "Anos", delay: 1.1 },
  { icon: Waves, value: "15+", label: "Modalidades", delay: 1.4 },
];

const letterVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring" as const,
      stiffness: 50,
      damping: 12,
      mass: 0.8,
      delay: 0.3 + i * 0.04,
    },
  }),
};

const TITLE_WORDS = ["Mergulhe", "na", "sua", "melhor", "versão."];

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [scrollVal, setScrollVal] = useState(0);
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => setScrollVal(v));
    return unsub;
  }, [scrollYProgress]);

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const statsY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const decorScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.3]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Apresentação"
      style={{
        background: `linear-gradient(to bottom, hsl(200, 80%, 12%) 0%, hsl(195, 75%, 15%) 60%, hsl(185, 70%, 92%) 100%)`,
      }}
    >
      {/* 2D scroll bubbles */}
      <ScrollBubbles scrollProgress={scrollVal} />

      {/* Floating decorative rings */}
      <motion.div
        className="absolute top-[15%] right-[10%] w-48 h-48 rounded-full border border-white/[0.06] z-[2] hidden lg:block"
        style={{ scale: decorScale }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-[25%] left-[5%] w-32 h-32 rounded-full border border-white/[0.04] z-[2] hidden lg:block"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* ===== MAIN CONTENT ===== */}
      <motion.div
        className="relative z-10 container mx-auto px-4 py-32 min-h-screen flex flex-col justify-center"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">
          {/* LEFT — Typography */}
          <div className="max-w-2xl">
            {/* Accent line */}
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.1 }}
            >
              <Droplets size={18} className="text-secondary" />
              <span className="text-sm font-semibold tracking-[0.2em] uppercase text-white/50">
                Academia Flipper • São Paulo
              </span>
            </motion.div>

            {/* Main heading — word-by-word spring reveal */}
            <h1
              className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-900 leading-[0.95] mb-8 tracking-tight"
              style={{ perspective: "600px" }}
            >
              {TITLE_WORDS.map((word, wi) => (
                <span key={wi} className="inline-block mr-[0.3em]">
                  {word.split("").map((char, ci) => (
                    <motion.span
                      key={`${wi}-${ci}`}
                      className={`inline-block ${
                        wi === 0
                          ? "bg-gradient-to-r from-[hsl(185,80%,65%)] via-[hsl(195,90%,70%)] to-[hsl(170,70%,55%)] bg-clip-text text-transparent drop-shadow-[0_2px_20px_hsla(185,100%,60%,0.3)]"
                          : "text-white"
                      }`}
                      custom={wi * 5 + ci}
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg sm:text-xl text-white/60 mb-10 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 50, damping: 14, delay: 1.2 }}
            >
              Natação, musculação, pilates, artes marciais e muito mais.
              <span className="text-white/80 font-medium"> Tudo em um só lugar.</span>
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 50, damping: 14, delay: 1.5 }}
            >
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-full px-8 py-4 text-lg font-bold flex items-center justify-center gap-3 overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, hsl(185,80%,45%), hsl(195,75%,40%))",
                  boxShadow: "0 8px 30px hsla(185,80%,45%,0.3), inset 0 1px 0 hsla(0,0%,100%,0.2)",
                }}
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                  animate={{ translateX: ["−100%", "200%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                />
                <Phone size={20} className="text-white relative z-10" />
                <span className="text-white relative z-10">Aula Experimental Grátis</span>
              </motion.a>

              <motion.a
                href="#modalidades"
                className="rounded-full px-8 py-4 text-lg font-semibold text-white/80 border border-white/15 hover:border-white/30 hover:bg-white/[0.06] transition-all text-center backdrop-blur-md"
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                Conheça as Modalidades
              </motion.a>
            </motion.div>
          </div>

          {/* RIGHT — Floating glass stat bubbles */}
          <motion.div
            className="hidden lg:flex flex-col gap-5 items-end"
            style={{ y: statsY }}
          >
            {FLOATING_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex items-center gap-4 rounded-2xl px-6 py-4 backdrop-blur-xl border border-white/[0.12] cursor-default"
                style={{
                  background: "hsla(190, 60%, 95%, 0.08)",
                  boxShadow: "0 8px 32px hsla(190,80%,40%,0.08), inset 0 1px 0 hsla(0,0%,100%,0.08)",
                  marginRight: i === 1 ? "40px" : i === 2 ? "20px" : "0",
                }}
                initial={{ opacity: 0, x: 60, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 50,
                  damping: 14,
                  delay: stat.delay,
                }}
                whileHover={{
                  scale: 1.08,
                  y: -4,
                  boxShadow: "0 12px 40px hsla(185,80%,50%,0.15), inset 0 1px 0 hsla(0,0%,100%,0.15)",
                  transition: { duration: 0.3 },
                }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-[hsl(185,80%,50%)] to-[hsl(195,75%,40%)]"
                  style={{ boxShadow: "0 4px 12px hsla(185,80%,45%,0.3)" }}
                >
                  <stat.icon size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-2xl font-display font-900 text-white leading-none">{stat.value}</p>
                  <p className="text-xs text-white/50 font-medium tracking-wider uppercase">{stat.label}</p>
                </div>
              </motion.div>
            ))}

            {/* Decorative glass orb */}
            <motion.div
              className="w-20 h-20 rounded-full mt-4 mr-10"
              style={{
                background: "radial-gradient(circle at 30% 30%, hsla(185,90%,70%,0.15), hsla(195,80%,50%,0.05))",
                border: "1px solid hsla(185,70%,70%,0.1)",
                boxShadow: "inset 0 -10px 20px hsla(185,80%,60%,0.05)",
              }}
              animate={{
                y: [0, -12, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* No wave overlay — clean gradient blend */}

      {/* Scroll indicator — water drop */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{ opacity: indicatorOpacity }}
      >
        <motion.span className="text-[10px] tracking-[0.25em] uppercase text-white/30 font-medium">
          Explore
        </motion.span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown size={28} className="text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
