import { motion } from "framer-motion";
import { Dumbbell, Award, Clock, Waves, Heart } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "Infraestrutura",
    date: "Desde 2009",
    content: "Equipamentos modernos, piscina semiolímpica aquecida, salas climatizadas e vestiários completos.",
    category: "Estrutura",
    icon: Dumbbell,
    relatedIds: [2, 5],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Professores",
    date: "+15 anos",
    content: "Profissionais certificados e experientes, prontos para orientar seu treino com segurança.",
    category: "Equipe",
    icon: Award,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 3,
    title: "Horários",
    date: "Seg–Sáb",
    content: "Segunda a sexta das 6h às 22h, sábado das 6h às 13h. Encaixe o treino na sua rotina.",
    category: "Flexibilidade",
    icon: Clock,
    relatedIds: [2, 4],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 4,
    title: "Natação",
    date: "Todas as idades",
    content: "Piscina semiolímpica aquecida com aulas para bebês, crianças e adultos.",
    category: "Modalidade",
    icon: Waves,
    relatedIds: [3, 5],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 5,
    title: "Bem-estar",
    date: "Corpo & Mente",
    content: "Yoga, pilates e acompanhamento personalizado para seu equilíbrio físico e mental.",
    category: "Saúde",
    icon: Heart,
    relatedIds: [4, 1],
    status: "in-progress" as const,
    energy: 85,
  },
];

export default function WhyFlipper() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ type: "spring", stiffness: 60, damping: 16 }}
        >
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Por que escolher a <span className="text-secondary font-extrabold">Flipper</span>?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Mais de 15 anos transformando vidas através do esporte em São Paulo.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ type: "spring", stiffness: 40, damping: 16, delay: 0.2 }}
        >
          <RadialOrbitalTimeline timelineData={timelineData} />
        </motion.div>
      </div>
    </section>
  );
}
