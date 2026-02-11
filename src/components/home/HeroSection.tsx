import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Phone, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-gym.jpg";
import swimmingImg from "@/assets/swimming.jpg";
import martialImg from "@/assets/martial-arts.jpg";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flipper%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre...";

// Fallback images when banner has no image_url
const FALLBACK_IMAGES = [heroImage, swimmingImg, martialImg];

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  cta_text: string;
  cta_link: string;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
}

const AUTOPLAY_MS = 6000;

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

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

  const { data: banners } = useQuery<Banner[]>({
    queryKey: ["hero-banners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hero_banners")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const slides = banners?.length
    ? banners
    : [
        {
          id: "fallback",
          title: "Transforme Seu Corpo na Melhor Academia de São Paulo",
          subtitle: "Natação, musculação, pilates, artes marciais e muito mais em um só lugar.",
          cta_text: "Agende sua Aula Experimental Grátis",
          cta_link: WHATSAPP_URL,
          image_url: null,
          is_active: true,
          sort_order: 0,
        },
      ];

  const slideCount = slides.length;

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((p) => (p + 1) % slideCount);
  }, [slideCount]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((p) => (p - 1 + slideCount) % slideCount);
  }, [slideCount]);

  // Autoplay
  useEffect(() => {
    if (slideCount <= 1) return;
    const timer = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [next, slideCount]);

  const slide = slides[current];
  const bgImage = slide.image_url || FALLBACK_IMAGES[current % FALLBACK_IMAGES.length];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.1,
    }),
    center: {
      x: "0%",
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.95,
    }),
  };

  const textVariants = {
    enter: { opacity: 0, y: 40, filter: "blur(10px)" },
    center: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -20, filter: "blur(6px)" },
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Apresentação"
    >
      {/* Parallax carousel background */}
      <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.img
            key={slide.id}
            src={bgImage}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
          />
        </AnimatePresence>
      </motion.div>

      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0 hero-gradient"
        style={{ opacity: overlayOpacity }}
      />

      {/* Floating orbs */}
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

      {/* Carousel content */}
      <motion.div
        className="relative z-10 container mx-auto px-4 py-32"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-900 text-primary-foreground leading-tight mb-6">
                {slide.title}
              </h1>

              <p className="text-lg sm:text-xl text-primary-foreground/80 mb-10 max-w-xl leading-relaxed">
                {slide.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href={slide.cta_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cta rounded-full px-8 py-4 text-lg font-bold flex items-center justify-center gap-2 animate-pulse-glow"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Phone size={20} />
                  {slide.cta_text}
                </motion.a>
                <motion.a
                  href="#modalidades"
                  className="rounded-full px-8 py-4 text-lg font-semibold text-primary-foreground border-2 border-primary-foreground/30 hover:border-primary-foreground/60 transition-colors text-center"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Conheça Nossas Modalidades
                </motion.a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel controls */}
          {slideCount > 1 && (
            <div className="flex items-center gap-4 mt-10">
              {/* Dots */}
              <div className="flex gap-2">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => goTo(i)}
                    aria-label={`Ir para slide ${i + 1}`}
                    className="relative w-10 h-1.5 rounded-full overflow-hidden bg-primary-foreground/20 transition-all"
                  >
                    {i === current && (
                      <motion.div
                        className="absolute inset-0 bg-secondary rounded-full"
                        layoutId="hero-dot"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    {i === current && (
                      <motion.div
                        className="absolute inset-0 bg-primary-foreground rounded-full origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                        key={`progress-${current}`}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Arrows */}
              <div className="flex gap-2 ml-auto">
                <motion.button
                  onClick={prev}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center text-primary-foreground/70 hover:border-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  aria-label="Slide anterior"
                >
                  <ChevronLeft size={18} />
                </motion.button>
                <motion.button
                  onClick={next}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center text-primary-foreground/70 hover:border-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  aria-label="Próximo slide"
                >
                  <ChevronRight size={18} />
                </motion.button>
              </div>
            </div>
          )}
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
