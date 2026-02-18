import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { GymDecorTestimonials } from "@/components/GymDecorations";
import FloatingParticles from "@/components/FloatingParticles";
import TiltCard from "@/components/TiltCard";

const TESTIMONIALS = [
  {
    name: "Mariana Silva",
    text: "A melhor academia que já frequentei! Os professores são atenciosos e a infraestrutura é impecável. A piscina aquecida é maravilhosa.",
    rating: 5,
    modality: "Natação",
  },
  {
    name: "Carlos Mendes",
    text: "Treino na Flipper há 3 anos e a evolução no meu condicionamento foi incrível. Ambiente motivador e equipamentos sempre novos.",
    rating: 5,
    modality: "Musculação",
  },
  {
    name: "Ana Paula Costa",
    text: "As aulas de Pilates mudaram minha postura e qualidade de vida. Instrutores super qualificados e ambiente acolhedor.",
    rating: 5,
    modality: "Pilates",
  },
];

const cardVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: 50,
    rotateX: 6,
    rotateY: (i - 1) * 4,
    scale: 0.96,
  }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 60,
      damping: 14,
      mass: 0.8,
      delay: i * 0.12,
    },
  }),
};

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 overflow-hidden relative" style={{ background: "linear-gradient(180deg, hsl(210 75% 22%), hsl(215 80% 16%))" }}>
      <GymDecorTestimonials />
      <FloatingParticles count={6} color="hsla(221,83%,53%,0.1)" />

      {/* Background radial pulse */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsla(221,83%,53%,0.04) 0%, transparent 60%)" }}
        animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 50, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ type: "spring", stiffness: 60, damping: 14 }}
        >
          <motion.div
            className="energy-line w-16 mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            O que nossos <span className="text-secondary">alunos</span> dizem
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            Milhares de alunos satisfeitos confiam na Flipper para alcançar seus objetivos.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6" style={{ perspective: "1200px" }}>
          {TESTIMONIALS.map((t, i) => (
            <TiltCard
              key={t.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="gym-card glow-border shimmer p-8 cursor-default"
              intensity={8}
              liquidHover
            >
              <Quote size={24} className="text-primary/20 mb-3" />

              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.15 + j * 0.05, type: "spring", stiffness: 300 }}
                  >
                    <Star size={16} className="fill-secondary text-secondary" />
                  </motion.div>
                ))}
              </div>

              <p className="text-primary-foreground/60 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>

              <div className="flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-primary-foreground font-bold text-sm depth-shadow"
                  whileHover={{ scale: 1.15, rotate: 10 }}
                >
                  {t.name.charAt(0)}
                </motion.div>
                <div>
                  <p className="font-semibold text-primary-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-primary">{t.modality}</p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
