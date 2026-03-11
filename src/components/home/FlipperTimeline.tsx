import { useState, useEffect } from "react";
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
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Translucent background image */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            key={activeImage}
            className="absolute inset-0 z-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <img
              src={activeImage}
              alt=""
              className="w-full h-full object-cover"
              style={{ opacity: 0.15 }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ type: "spring", stiffness: 60, damping: 16 }}
        >
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Conheça a <span className="text-secondary font-extrabold">Flipper</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Explore a trajetória da Flipper — clique nos pontos para descobrir mais.
          </p>
        </motion.div>

        <RadialOrbitalTimeline timelineData={timelineData} onActiveChange={handleActiveChange} />
      </div>
    </section>
  );
}
