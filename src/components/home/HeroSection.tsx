import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, ChevronDown } from "lucide-react";
import { useRef } from "react";
import heroImage from "@/assets/hero-gym.jpg";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flipper%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre...";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.85, 1]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Apresentação"
    >
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
        <img
          src={heroImage}
          alt="Interior moderno da Academia Flipper com equipamentos de musculação"
          className="w-full h-full object-cover"
          loading="eager"
          width={1920}
          height={1080}
        />
      </motion.div>

      {/* Gradient overlay with parallax opacity */}
      <motion.div
        className="absolute inset-0 hero-gradient"
        style={{ opacity: overlayOpacity }}
      />

      {/* Floating orbs for depth */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full"
        style={{
          background: "radial-gradient(circle, hsla(221,83%,53%,0.15) 0%, transparent 70%)",
          y: useTransform(scrollYProgress, [0, 1], ["0px", "100px"]),
        }}
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 left-[10%] w-48 h-48 rounded-full"
        style={{
          background: "radial-gradient(circle, hsla(24,95%,53%,0.1) 0%, transparent 70%)",
          y: useTransform(scrollYProgress, [0, 1], ["0px", "60px"]),
        }}
        animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content with parallax */}
      <motion.div
        className="relative z-10 container mx-auto px-4 py-32"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-900 text-primary-foreground leading-tight mb-6"
          >
            Transforme Seu Corpo na{" "}
            <motion.span
              className="text-secondary inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 200 }}
            >
              Melhor Academia
            </motion.span>{" "}
            de São Paulo
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-primary-foreground/80 mb-10 max-w-xl leading-relaxed"
          >
            Natação, musculação, pilates, artes marciais e muito mais em um só lugar.
            Infraestrutura completa e professores qualificados para todos os níveis.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta rounded-full px-8 py-4 text-lg font-bold flex items-center justify-center gap-2 animate-pulse-glow"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Phone size={20} />
              Agende sua Aula Experimental Grátis
            </motion.a>
            <motion.a
              href="#modalidades"
              className="rounded-full px-8 py-4 text-lg font-semibold text-primary-foreground border-2 border-primary-foreground/30 hover:border-primary-foreground/60 transition-colors text-center"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Conheça Nossas Modalidades
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        style={{ opacity: indicatorOpacity }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={32} className="text-primary-foreground/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
