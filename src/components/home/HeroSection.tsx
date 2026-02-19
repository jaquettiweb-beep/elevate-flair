import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, ChevronDown, Waves, Users, Trophy } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flipper%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre...";

const STATS = [
  { icon: Users, value: "5.000+", label: "Alunos" },
  { icon: Trophy, value: "15+", label: "Anos" },
  { icon: Waves, value: "15+", label: "Modalidades" },
];

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

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Apresentação"
      style={{
        background: `linear-gradient(to bottom, hsl(210, 85%, 8%) 0%, hsl(200, 80%, 12%) 50%, hsl(185, 70%, 92%) 100%)`,
      }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, hsla(185,80%,50%,0.08) 0%, transparent 70%)",
        }}
      />

      {/* ===== MAIN CONTENT ===== */}
      <motion.div
        className="relative z-10 container mx-auto px-6 py-32 flex flex-col items-center text-center"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Badge */}
        <motion.div
          className="flex items-center gap-2 mb-10"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.1 }}
        >
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-white/40 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
            Academia Flipper • São Paulo
          </span>
        </motion.div>

        {/* Main heading */}
        <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.92] mb-7 tracking-tight max-w-4xl">
          {/* "Mergulhe" with blurred stagger per letter */}
          <motion.span
            className="block pb-2"
            style={{
              background: "linear-gradient(135deg, hsl(185,80%,70%), hsl(195,90%,75%), hsl(170,70%,60%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.25 } },
            }}
            initial="hidden"
            animate="show"
          >
            {"Mergulhe".split("").map((char, i) => (
              <motion.span
                key={i}
                style={{ display: "inline-block" }}
                variants={{
                  hidden: { opacity: 0, filter: "blur(12px)", y: 8 },
                  show: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
          <motion.span
            className="block text-white"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 14, delay: 0.65 }}
          >
            na sua melhor versão.
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl text-white/50 mb-12 max-w-xl leading-relaxed"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 50, damping: 14, delay: 0.45 }}
        >
          Natação, musculação, pilates, artes marciais e muito mais.{" "}
          <span className="text-white/75 font-medium">Tudo em um só lugar.</span>
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 50, damping: 14, delay: 0.6 }}
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
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 50, damping: 14, delay: 0.8 }}
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
