import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import TiltCard from "@/components/TiltCard";

const TESTIMONIALS = [
  {
    name: "Mariana Silva",
    text: "A melhor academia que já frequentei! Os professores são atenciosos e a infraestrutura é impecável.",
    rating: 5,
    modality: "Natação",
  },
  {
    name: "Carlos Mendes",
    text: "Treino na Flipper há 3 anos e a evolução no meu condicionamento foi incrível. Ambiente motivador.",
    rating: 5,
    modality: "Musculação",
  },
  {
    name: "Ana Paula Costa",
    text: "As aulas de Pilates mudaram minha postura e qualidade de vida. Instrutores super qualificados.",
    rating: 5,
    modality: "Pilates",
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

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ type: "spring", stiffness: 60, damping: 16 }}
        >
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-4">
            O que nossos <span className="text-secondary">alunos</span> dizem
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-lg">
            Milhares de alunos confiam na Flipper para alcançar seus objetivos.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <TiltCard
              key={t.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="gym-card p-7 cursor-default"
              intensity={6}
              liquidHover
            >
              <Quote size={20} className="text-primary/30 mb-3" />

              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="fill-secondary text-secondary" />
                ))}
              </div>

              <p className="text-white/60 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-primary-foreground font-bold text-xs">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-xs text-primary/70">{t.modality}</p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
