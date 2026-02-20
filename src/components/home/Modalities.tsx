import { motion } from "framer-motion";
import TiltCard from "@/components/TiltCard";
import swimmingImg from "@/assets/swimming.jpg";
import yogaImg from "@/assets/yoga.jpg";
import martialImg from "@/assets/martial-arts.jpg";
import pilatesImg from "@/assets/pilates.jpg";
import musculacaoImg from "@/assets/musculacao.jpg";

const MODALITIES = [
  { name: "Natação", desc: "Adulto, infantil e bebê. Piscina aquecida semiolímpica.", img: swimmingImg },
  { name: "Musculação", desc: "Equipamentos de última geração com orientação profissional.", img: musculacaoImg },
  { name: "Yoga", desc: "Equilíbrio entre corpo e mente com instrutores certificados.", img: yogaImg },
  { name: "Pilates Studio", desc: "Aparelhos de Pilates com acompanhamento individual.", img: pilatesImg },
  { name: "Pilates Solo", desc: "Fortalecimento e flexibilidade no solo para todos os níveis.", img: pilatesImg },
  { name: "Hidroginástica", desc: "Exercícios aquáticos de baixo impacto para todas as idades.", img: swimmingImg },
  { name: "Muay Thai", desc: "Arte marcial tailandesa que combina força, técnica e condicionamento.", img: martialImg },
  { name: "Jiu Jitsu", desc: "Técnicas de grappling e defesa pessoal no tatame.", img: martialImg },
  { name: "Judô (infantil)", desc: "Disciplina e coordenação motora para crianças.", img: martialImg },
  { name: "Kung Fu", desc: "Arte marcial chinesa milenar com foco em equilíbrio e técnica.", img: martialImg },
  { name: "Krav Maga", desc: "Sistema de defesa pessoal prático e eficiente.", img: martialImg },
  { name: "Aikidô", desc: "Arte marcial japonesa baseada em harmonia e redirecionamento de força.", img: martialImg },
  { name: "Ballet (infantil)", desc: "Expressão artística, postura e ritmo para crianças.", img: pilatesImg },
  { name: "Ginástica", desc: "Coordenação, flexibilidade e condicionamento físico global.", img: musculacaoImg },
  { name: "Hidroterapia", desc: "Reabilitação e bem-estar através de exercícios aquáticos terapêuticos.", img: swimmingImg },
  { name: "Programa 60+ Saúde", desc: "Atividades físicas especialmente desenvolvidas para a melhor idade.", img: swimmingImg },
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
      delay: i * 0.07,
    },
  }),
};

export default function Modalities() {
  return (
    <section id="modalidades" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ type: "spring", stiffness: 60, damping: 16 }}
        >
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Nossas <span className="gradient-text">Modalidades</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            16 modalidades para encontrar a atividade perfeita para você.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {MODALITIES.map((m, i) => (
            <TiltCard
              key={m.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="gym-card group cursor-default"
              intensity={5}
              liquidHover
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <motion.img
                  src={m.img}
                  alt={`Aula de ${m.name} na Academia Flipper em São Paulo`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={768}
                  height={512}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <span className="absolute bottom-3 left-3 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {m.name}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-foreground mb-1.5">{m.name}</h3>
                <p className="text-muted-foreground text-sm">{m.desc}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
