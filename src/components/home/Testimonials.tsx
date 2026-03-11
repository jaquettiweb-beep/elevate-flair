import { motion } from "framer-motion";
import { Star, Users, Calendar, ThumbsUp, ShieldCheck, Clock, Award, Heart, Waves, Dumbbell } from "lucide-react";
import { TestimonialStack, Testimonial } from "@/components/ui/glass-testimonial-swiper";

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    initials: "MS",
    name: "Mariana Silva",
    role: "Aluna de Natação — 3 anos",
    quote: "A melhor academia que já frequentei! Os professores são atenciosos e a infraestrutura é impecável. A piscina aquecida faz toda a diferença no inverno. Minha filha também adora as aulas infantis.",
    tags: [{ text: "DESTAQUE", type: "featured" }, { text: "Natação", type: "default" }],
    stats: [{ icon: Calendar, text: "3 anos" }, { icon: Star, text: "5 estrelas" }],
    avatarGradient: "linear-gradient(135deg, hsl(185,80%,45%), hsl(200,75%,40%))",
  },
  {
    id: 2,
    initials: "CM",
    name: "Carlos Mendes",
    role: "Aluno de Musculação — 4 anos",
    quote: "Treino na Flipper há 4 anos e a evolução no meu condicionamento foi incrível. Ambiente motivador, equipamentos de última geração e profissionais que realmente se importam com seus alunos.",
    tags: [{ text: "Musculação", type: "default" }, { text: "Fitness", type: "default" }],
    stats: [{ icon: Dumbbell, text: "Musculação" }, { icon: ThumbsUp, text: "Recomenda" }],
    avatarGradient: "linear-gradient(135deg, hsl(221,83%,53%), hsl(250,70%,50%))",
  },
  {
    id: 3,
    initials: "AP",
    name: "Ana Paula Costa",
    role: "Aluna de Pilates — 2 anos",
    quote: "As aulas de Pilates mudaram minha postura e qualidade de vida. Instrutores super qualificados e atenciosos. O acompanhamento individual faz toda a diferença nos resultados.",
    tags: [{ text: "Pilates", type: "default" }, { text: "Bem-estar", type: "featured" }],
    stats: [{ icon: Heart, text: "Saúde" }, { icon: ShieldCheck, text: "Verificado" }],
    avatarGradient: "linear-gradient(135deg, hsl(330,70%,55%), hsl(280,60%,50%))",
  },
  {
    id: 4,
    initials: "RF",
    name: "Roberto Ferreira",
    role: "Aluno de Muay Thai — 1 ano",
    quote: "Comecei no Muay Thai sem experiência nenhuma e hoje me sinto outro. Os professores têm uma didática excelente, respeitam o ritmo de cada aluno e o ambiente é acolhedor.",
    tags: [{ text: "Artes Marciais", type: "default" }, { text: "Novo", type: "default" }],
    stats: [{ icon: Award, text: "Evolução" }, { icon: Clock, text: "1 ano" }],
    avatarGradient: "linear-gradient(135deg, hsl(24,95%,53%), hsl(15,90%,45%))",
  },
  {
    id: 5,
    initials: "LS",
    name: "Lucia Santos",
    role: "Programa 60+ Saúde — 2 anos",
    quote: "O programa 60+ mudou minha vida! Me sinto mais disposta, com mais energia e fiz amizades maravilhosas. A equipe é carinhosa e preparada para atender nossas necessidades.",
    tags: [{ text: "60+", type: "featured" }, { text: "Hidro", type: "default" }],
    stats: [{ icon: Users, text: "Comunidade" }, { icon: Heart, text: "Qualidade" }],
    avatarGradient: "linear-gradient(135deg, hsl(150,60%,45%), hsl(170,55%,40%))",
  },
  {
    id: 6,
    initials: "PT",
    name: "Pedro Takahashi",
    role: "Aluno de Jiu Jitsu — 5 anos",
    quote: "O tatame da Flipper é referência na região. Professores graduados, ambiente limpo e organizado. Meus dois filhos também treinam judô aqui. Uma academia para toda a família.",
    tags: [{ text: "Jiu Jitsu", type: "default" }, { text: "Família", type: "default" }],
    stats: [{ icon: Waves, text: "5 anos" }, { icon: ShieldCheck, text: "Verificado" }],
    avatarGradient: "linear-gradient(135deg, hsl(45,90%,50%), hsl(35,85%,45%))",
  },
  {
    id: 7,
    initials: "JO",
    name: "Juliana Oliveira",
    role: "Aluna de Yoga e Natação — 3 anos",
    quote: "Faço yoga e natação na Flipper e a combinação é perfeita para o meu equilíbrio. A infraestrutura é excelente e os horários flexíveis encaixam perfeitamente na minha rotina.",
    tags: [{ text: "Yoga", type: "default" }, { text: "Natação", type: "default" }],
    stats: [{ icon: Calendar, text: "3 anos" }, { icon: ThumbsUp, text: "Recomenda" }],
    avatarGradient: "linear-gradient(135deg, hsl(260,65%,55%), hsl(290,60%,50%))",
  },
];

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
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-4">
            O que nossos <span className="text-secondary">alunos</span> dizem
          </h2>
          <p className="text-foreground/50 max-w-xl mx-auto text-lg">
            Milhares de alunos confiam na Flipper para alcançar seus objetivos.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ type: "spring", stiffness: 60, damping: 16, delay: 0.15 }}
          className="max-w-lg mx-auto"
        >
          <TestimonialStack testimonials={testimonialsData} visibleBehind={3} />
        </motion.div>

        <motion.p
          className="text-center text-foreground/30 text-xs mt-8 tracking-widest uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Arraste para ver mais depoimentos
        </motion.p>
      </div>
    </section>
  );
}
