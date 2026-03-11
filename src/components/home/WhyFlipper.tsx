import { motion } from "framer-motion";
import { Dumbbell, Award, Clock } from "lucide-react";
import TiltCard from "@/components/TiltCard";

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
    desc: "Segunda a sexta das 6h às 22h, sábado das 6h às 13h. Encaixe o treino na sua rotina com facilidade.",
    accent: "from-[hsl(var(--neon-blue))] to-primary",
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
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ type: "spring", stiffness: 60, damping: 16 }}
        >
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Por que escolher a <span className="text-secondary font-extrabold">Flipper</span>?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Mais de 50 anos transformando vidas através do esporte em São Paulo.
          </p>
        </motion.div>

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
              <h3 className="font-display text-xl font-bold text-foreground mb-3">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
