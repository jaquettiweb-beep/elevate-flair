import { motion, useScroll, useTransform } from "framer-motion";
import { Dumbbell, Award, Clock } from "lucide-react";
import { useRef } from "react";

const FEATURES = [
  {
    icon: Dumbbell,
    title: "Infraestrutura Completa",
    desc: "Equipamentos modernos de última geração, piscina semiolímpica aquecida, salas climatizadas e vestiários completos para seu conforto.",
    accent: "from-primary to-primary-glow",
  },
  {
    icon: Award,
    title: "Professores Qualificados",
    desc: "Equipe de profissionais certificados e experientes, prontos para orientar seu treino com segurança e eficiência.",
    accent: "from-secondary to-[hsl(15,90%,50%)]",
  },
  {
    icon: Clock,
    title: "Horários Flexíveis",
    desc: "Aulas de segunda a sábado das 6h às 22h. Encontre o melhor horário para encaixar o treino na sua rotina.",
    accent: "from-[hsl(var(--neon-blue))] to-primary",
  },
];

const cardVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: 80,
    rotateX: 25,
    rotateY: i === 0 ? -15 : i === 2 ? 15 : 0,
    scale: 0.85,
    filter: "blur(6px)",
  }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay: i * 0.15,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export default function WhyFlipper() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-background relative overflow-hidden">
      {/* Subtle parallax grid texture */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          y: bgY,
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="energy-line w-16 mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Por que escolher a <span className="gradient-text">Flipper</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Há mais de 15 anos transformando vidas através do esporte e bem-estar em São Paulo.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8" style={{ perspective: "1200px" }}>
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{
                y: -8,
                rotateY: 5,
                rotateX: -3,
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
              className="gym-card p-8 cursor-default"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${f.accent} flex items-center justify-center mb-5`}
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <f.icon size={28} className="text-primary-foreground" />
              </motion.div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>

              {/* Bottom energy accent */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 rounded-b-lg"
                style={{
                  background: `linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)`,
                }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.15 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
