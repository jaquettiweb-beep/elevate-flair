import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { GymDecorTestimonials } from "@/components/GymDecorations";

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
    y: 70,
    rotateX: 20,
    rotateY: (i - 1) * 12,
    scale: 0.8,
    filter: "blur(5px)",
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

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-background overflow-hidden relative">
      {/* Gym decorative icons */}
      <GymDecorTestimonials />
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 50, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
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
            O que nossos <span className="gradient-text">alunos</span> dizem
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Milhares de alunos satisfeitos confiam na Flipper para alcançar seus objetivos.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6" style={{ perspective: "1200px" }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
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
                boxShadow: "0 25px 50px -12px hsla(221, 83%, 53%, 0.2)",
                transition: { duration: 0.3 },
              }}
              className="gym-card p-8 cursor-default"
              style={{ transformStyle: "preserve-3d" }}
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

              <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">"{t.text}"</p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-primary">{t.modality}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
