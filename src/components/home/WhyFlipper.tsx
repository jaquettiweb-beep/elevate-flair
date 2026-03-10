import { motion } from "framer-motion";
import { Dumbbell, Award, Clock } from "lucide-react";
import DisplayCards from "@/components/ui/display-cards";

const cards = [
  {
    icon: <Dumbbell className="size-4" />,
    title: "Infraestrutura Completa",
    description: "Equipamentos modernos e piscina aquecida",
    date: "+15 anos de experiência",
    iconClassName: "text-primary",
    titleClassName: "text-primary",
    className:
      "[grid-area:stack] hover:-translate-y-6 before:absolute before:w-full before:outline-1 before:rounded-xl before:outline-border before:h-full before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Award className="size-4" />,
    title: "Professores Qualificados",
    description: "Profissionais certificados e experientes",
    date: "Acompanhamento personalizado",
    iconClassName: "text-secondary",
    titleClassName: "text-secondary",
    className:
      "[grid-area:stack] translate-x-8 translate-y-6 hover:-translate-y-1 before:absolute before:w-full before:outline-1 before:rounded-xl before:outline-border before:h-full before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Clock className="size-4" />,
    title: "Horários Flexíveis",
    description: "Seg–Sex 6h às 22h · Sáb 6h às 13h",
    date: "Encaixe na sua rotina",
    iconClassName: "text-primary",
    titleClassName: "text-primary",
    className:
      "[grid-area:stack] translate-x-16 translate-y-12 hover:translate-y-4",
  },
];

export default function WhyFlipper() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ type: "spring", stiffness: 60, damping: 16 }}
          >
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Por que escolher a <span className="text-secondary font-extrabold">Flipper</span>?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto lg:mx-0 text-lg">
              Mais de 15 anos transformando vidas através do esporte em São Paulo.
            </p>
          </motion.div>

          {/* Cards */}
          <motion.div
            className="flex-1 flex justify-center py-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ type: "spring", stiffness: 50, damping: 18, delay: 0.15 }}
          >
            <DisplayCards cards={cards} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
