import { motion } from "framer-motion";
import { Dumbbell, Award, Clock } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import DisplayCards from "@/components/ui/display-cards";

const FEATURES = [
  {
    icon: Dumbbell,
    title: "Infraestrutura Completa",
    desc: "Equipamentos modernos, piscina semiolímpica aquecida, salas climatizadas e vestiários completos.",
    accent: "from-primary to-primary-glow",
  },
  {
    icon: Award,
    title: "Professores Qualificados",
    desc: "Profissionais certificados e experientes, prontos para orientar seu treino com segurança.",
    accent: "from-secondary to-[hsl(15,90%,50%)]",
  },
  {
    icon: Clock,
    title: "Horários Flexíveis",
    desc: "Segunda a sábado das 6h às 22h. Encaixe o treino na sua rotina com facilidade.",
    accent: "from-[hsl(var(--neon-blue))] to-primary",
  },
];

const displayCards = [
  {
    icon: <Dumbbell className="size-4" />,
    title: "Infraestrutura",
    description: "Equipamentos de ponta e espaços modernos",
    date: "Desde 2008",
    iconClassName: "text-secondary",
    titleClassName: "text-secondary",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Award className="size-4" />,
    title: "Professores",
    description: "Equipe qualificada e certificada",
    date: "15+ anos",
    iconClassName: "text-primary",
    titleClassName: "text-primary",
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Clock className="size-4" />,
    title: "Flexibilidade",
    description: "Horários que cabem na sua rotina",
    date: "Seg a Sáb",
    iconClassName: "text-secondary",
    titleClassName: "text-secondary",
    className:
      "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 60,
      damping: 16,
      delay: i * 0.12,
    },
  }),
};

export default function WhyFlipper() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Top: Title + Display Cards side by side */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ type: "spring", stiffness: 60, damping: 16 }}
          >
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Por que escolher a{" "}
              <span className="text-secondary font-extrabold">Flipper</span>?
            </h2>
            <p className="text-muted-foreground max-w-xl text-lg">
              Mais de 15 anos transformando vidas através do esporte em São
              Paulo.
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ type: "spring", stiffness: 50, damping: 16, delay: 0.2 }}
          >
            <DisplayCards cards={displayCards} />
          </motion.div>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES.map((f, i) => (
            <TiltCard
              key={f.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="gym-card p-8 cursor-default"
              intensity={6}
              liquidHover
            >
              <motion.div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.accent} flex items-center justify-center mb-5`}
                style={{ boxShadow: "0 4px 14px hsla(185,80%,45%,0.2)" }}
                whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <f.icon size={24} className="text-primary-foreground" />
              </motion.div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {f.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {f.desc}
              </p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
