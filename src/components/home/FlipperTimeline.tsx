import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Waves, Dumbbell, Award, Heart, Users, Clock } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

import swimmingImg from "@/assets/swimming.jpg";
import musculacaoImg from "@/assets/musculacao.jpg";
import yogaImg from "@/assets/yoga.jpg";
import heroImg from "@/assets/hero-gym.jpg";
import fachadaImg from "@/assets/fachada-flipper.jpg";
import martialImg from "@/assets/martial-arts.jpg";

const timelineData = [
  {
    id: 1,
    title: "Fundação",
    date: "Década de 70",
    content: "A Flipper nasce com a missão de transformar vidas através do esporte e da natação em São Paulo.",
    category: "História",
    icon: Award,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
    link: "/historia",
    image: fachadaImg,
  },
  {
    id: 2,
    title: "Natação",
    date: "Referência SP",
    content: "Piscina semiolímpica aquecida com aulas para todas as idades — do bebê ao idoso.",
    category: "Modalidade",
    icon: Waves,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 95,
    link: "/natacao",
    image: swimmingImg,
  },
  {
    id: 3,
    title: "Musculação",
    date: "Alta Performance",
    content: "Equipamentos modernos e profissionais qualificados para o seu melhor treino.",
    category: "Modalidade",
    icon: Dumbbell,
    relatedIds: [2, 4],
    status: "completed" as const,
    energy: 90,
    link: "/musculacao",
    image: musculacaoImg,
  },
  {
    id: 4,
    title: "Bem-estar",
    date: "Corpo & Mente",
    content: "Yoga, Pilates e aulas de relaxamento para equilíbrio físico e mental.",
    category: "Modalidade",
    icon: Heart,
    relatedIds: [3, 5],
    status: "in-progress" as const,
    energy: 85,
    link: "/bem-estar",
    image: yogaImg,
  },
  {
    id: 5,
    title: "Comunidade",
    date: "+5.000 alunos",
    content: "Uma família de mais de 5 mil alunos ativos que crescem juntos há mais de 50 anos.",
    category: "Comunidade",
    icon: Users,
    relatedIds: [4, 6],
    status: "in-progress" as const,
    energy: 80,
    image: heroImg,
  },
  {
    id: 6,
    title: "Horários",
    date: "Seg–Sex 6h–22h",
    content: "Segunda a sexta das 6h às 22h, sábado das 6h às 13h. Flexibilidade para a sua rotina.",
    category: "Atendimento",
    icon: Clock,
    relatedIds: [5, 1],
    status: "completed" as const,
    energy: 100,
    link: "/horarios",
    image: fachadaImg,
  },
];

// Preload all timeline images on mount
const allImages = timelineData.map((t) => t.image).filter(Boolean);

export default function FlipperTimeline() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const handleActiveChange = (id: number | null) => {
    if (id === null) {
      setActiveImage(null);
    } else {
      const item = timelineData.find((t) => t.id === id);
      setActiveImage(item?.image || null);
    }
  };

  return (
    <section className="py-24 lg:py-28 relative overflow-hidden">
      {/* ─── Ambient ocean background ─── */}
      {/* Radial glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, hsla(185,80%,50%,0.10) 0%, transparent 70%)",
        }}
      />
      {/* Animated caustic pattern */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='c'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.015' numOctaves='3' seed='2'/%3E%3CfeDisplacementMap in='SourceGraphic' scale='30'/%3E%3C/filter%3E%3Ccircle cx='100' cy='100' r='90' fill='none' stroke='%2360d9d9' stroke-width='1' filter='url(%23c)'/%3E%3Ccircle cx='100' cy='100' r='60' fill='none' stroke='%2360d9d9' stroke-width='0.8' filter='url(%23c)'/%3E%3C/svg%3E")`,
          backgroundSize: "400px 400px",
        }}
      />
      {/* Floating bubbles */}
      {[
        { size: 6, left: "12%", delay: 0, dur: 14 },
        { size: 4, left: "28%", delay: 3, dur: 18 },
        { size: 8, left: "45%", delay: 1, dur: 12 },
        { size: 3, left: "62%", delay: 5, dur: 20 },
        { size: 5, left: "78%", delay: 2, dur: 16 },
        { size: 7, left: "90%", delay: 4, dur: 15 },
      ].map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: b.size,
            height: b.size,
            left: b.left,
            bottom: "-2%",
            background: "radial-gradient(circle at 30% 30%, hsla(185,90%,80%,0.35), hsla(185,80%,60%,0.08))",
            border: "1px solid hsla(185,80%,70%,0.15)",
          }}
          animate={{ y: [0, -800], opacity: [0, 0.6, 0.4, 0] }}
          transition={{
            duration: b.dur,
            repeat: Infinity,
            delay: b.delay,
            ease: "linear",
          }}
        />
      ))}
      {/* Subtle cross-pattern texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Hidden preload images for instant display */}
      <div className="hidden" aria-hidden="true">
        {allImages.map((src) => (
          <img key={src} src={src} alt="" />
        ))}
      </div>

      {/* Translucent background image */}
      <AnimatePresence mode="wait">
        {activeImage && (
          <motion.div
            key={activeImage}
            className="absolute inset-0 z-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <img
              src={activeImage}
              alt=""
              className="w-full h-full object-cover"
              style={{ opacity: 0.18, filter: "blur(2px)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-10 md:mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ type: "spring", stiffness: 60, damping: 16 }}
        >
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Conheça a <span className="text-secondary font-extrabold">Academia Flipper</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
            Mais de 50 anos transformando vidas através do esporte. Explore nossa história e modalidades.
          </p>
        </motion.div>

        <RadialOrbitalTimeline timelineData={timelineData} onActiveChange={handleActiveChange} />
      </div>
    </section>
  );
}
