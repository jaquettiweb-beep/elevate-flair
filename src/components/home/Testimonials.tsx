import { motion } from "framer-motion";
import { Star, Users, Calendar, ThumbsUp, ShieldCheck, Clock, Award, Heart, Waves, Dumbbell, MessageCircle } from "lucide-react";
import { TestimonialStack, Testimonial } from "@/components/ui/glass-testimonial-swiper";

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    initials: "AP",
    name: "A. Pereira",
    role: "Mãe de aluna de Natação — 4 anos",
    quote: "Minha filha já faz natação na Flipper há 4 anos. Hoje ela tem 8 anos e já é um 'peixe Espada'. Sempre que a criança pula de nível ganha medalha e troca de touca. São organizados, muito profissionais, o ambiente é muito limpo e os professores muito competentes e bacanas.",
    tags: [{ text: "DESTAQUE", type: "featured" }, { text: "Natação", type: "default" }],
    stats: [{ icon: Calendar, text: "4 anos" }, { icon: Star, text: "5 estrelas" }],
    avatarGradient: "linear-gradient(135deg, hsl(185,80%,45%), hsl(200,75%,40%))",
    avatarUrl: "https://lh3.googleusercontent.com/a/AATXAJws-yNTYQ_7x57YTqDSRuz7nuogNVoysK9OjRnZ=w72-h72-p-c0x00000000-rp-mo-br100",
  },
  {
    id: 2,
    initials: "WM",
    name: "W. Moreira Jr.",
    role: "Aluno desde os 15 anos — Gerações",
    quote: "A Flipper já virou família... frequento desde os meus 15 anos, e vem vindo de gerações que hoje fazem parte do desenvolvimento dos meus filhos. Ótima estrutura para ensinamentos e aprendizagem e ótimos profissionais... todos bem qualificados! Ambiente maravilhoso.",
    tags: [{ text: "Família", type: "featured" }, { text: "Tradição", type: "default" }],
    stats: [{ icon: Users, text: "Gerações" }, { icon: ThumbsUp, text: "Recomenda" }],
    avatarGradient: "linear-gradient(135deg, hsl(221,83%,53%), hsl(250,70%,50%))",
    avatarUrl: "https://lh3.googleusercontent.com/a/AATXAJzYJyGYOXWPRqO1SCPfamZpSNnxALkvPQ5Bpyt3=w72-h72-p-c0x00000000-rp-mo-br100",
  },
  {
    id: 3,
    initials: "IK",
    name: "I. Kimura",
    role: "Aluna de longa data",
    quote: "Frequento a academia há muito tempo e me sinto em casa como uma família. Considero ótimas a localização, a estrutura, as piscinas e principalmente, a qualidade dos profissionais. Recomendo sem receio de errar.",
    tags: [{ text: "Piscina", type: "default" }, { text: "Bem-estar", type: "featured" }],
    stats: [{ icon: Heart, text: "Família" }, { icon: ShieldCheck, text: "Verificado" }],
    avatarGradient: "linear-gradient(135deg, hsl(330,70%,55%), hsl(280,60%,50%))",
    avatarUrl: "https://lh3.googleusercontent.com/a/AATXAJy1-UujECEqnMrxXxfZvh7XZ4rPhN_3g3vq2wSP=w72-h72-p-c0x00000000-rp-mo-ba2-br100",
  },
  {
    id: 4,
    initials: "LR",
    name: "L. Rodrigues",
    role: "Mãe de aluno de Natação — 3 anos",
    quote: "Meu filho é aluno do curso de natação há quase 3 anos. Meu filho ama seus professores! A Silvia com sua equipe atenderam todas as nossas expectativas. São profissionais sérios e competentes. O curso de natação é excelente!",
    tags: [{ text: "Natação", type: "default" }, { text: "Infantil", type: "default" }],
    stats: [{ icon: Waves, text: "Natação" }, { icon: Clock, text: "3 anos" }],
    avatarGradient: "linear-gradient(135deg, hsl(24,95%,53%), hsl(15,90%,45%))",
    avatarUrl: "https://lh3.googleusercontent.com/a/AATXAJzl2AwFYHZZA5ImeTKqMF-eZ8UEH1gZV6z6LnqO=w72-h72-p-c0x00000000-rp-mo-br100",
  },
  {
    id: 5,
    initials: "AG",
    name: "A. L. Gonçalves",
    role: "Aluna de Yoga",
    quote: "Academia tradicional no bairro, com mais de 40 anos. Tem várias atividades, inclusive yoga. Única com piscina na região, ambiente familiar e profissionais que sabem orientar com conhecimento. Atende crianças, adultos e 3ª idade, sempre com carinho.",
    tags: [{ text: "Yoga", type: "default" }, { text: "Tradição", type: "featured" }],
    stats: [{ icon: Award, text: "Tradição" }, { icon: Users, text: "Todas idades" }],
    avatarGradient: "linear-gradient(135deg, hsl(150,60%,45%), hsl(170,55%,40%))",
    avatarUrl: "https://lh3.googleusercontent.com/a/AATXAJz2_aX4PJ6ncX2FUman3nHyadtt6d3m1ig3dcx1=w72-h72-p-c0x00000000-rp-mo-br100",
  },
  {
    id: 6,
    initials: "PR",
    name: "P. Ribeiro",
    role: "Família inteira na Flipper",
    quote: "Uma excelente academia com equipe comprometida e ambiente familiar. Minha família faz diversas modalidades. Sobrinhos desde pequenos fazem natação, karatê, balé e os adultos musculação.",
    tags: [{ text: "Família", type: "default" }, { text: "Multimodal", type: "default" }],
    stats: [{ icon: Dumbbell, text: "Musculação" }, { icon: Heart, text: "Família" }],
    avatarGradient: "linear-gradient(135deg, hsl(45,90%,50%), hsl(35,85%,45%))",
    avatarUrl: "https://lh3.googleusercontent.com/a-/AOh14GjiIApfP2GHA0iD0EFfO3Hmkn8MTlwwVYMYYU66=w72-h72-p-c0x00000000-rp-mo-br100",
  },
  {
    id: 7,
    initials: "LE",
    name: "L. Eduardo",
    role: "Aluno de Jiu Jitsu",
    quote: "Excelente academia, infraestrutura da melhor qualidade. Vista panorâmica com localização privilegiada. Mestre Julio César Sardinha é um excelente mestre com muita técnica e disciplina. Ambiente familiar. Recomendo!",
    tags: [{ text: "Jiu Jitsu", type: "default" }, { text: "Artes Marciais", type: "default" }],
    stats: [{ icon: Award, text: "Qualidade" }, { icon: ShieldCheck, text: "Verificado" }],
    avatarGradient: "linear-gradient(135deg, hsl(260,65%,55%), hsl(290,60%,50%))",
    avatarUrl: "https://lh3.googleusercontent.com/a-/AOh14GgkApGqy6KmfllRFClGRsCzNJdDyyQyF_JBP2YImw=w72-h72-p-c0x00000000-rp-mo-br100",
  },
];

export default function Testimonials() {
  return (
    <section className="overflow-hidden relative">
      {/* Subtle decorative glow for light theme */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{ 
            background: "radial-gradient(ellipse 70% 50% at 50% 50%, hsla(24,95%,53%,0.08) 0%, transparent 70%)", 
            transform: "translate(30%, -30%)" 
          }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ type: "spring", stiffness: 60, damping: 16 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
            style={{
              background: "#1A2335",
              border: "1px solid #222D42",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <MessageCircle size={14} style={{ color: "#EE6200" }} />
            <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: "#EE6200" }}>
              Depoimentos Reais
            </span>
          </motion.div>

          <h2 className="font-display text-3xl lg:text-5xl font-bold text-[#F0EDE8] mb-4">
            O que nossos <span className="text-[#EE6200]">alunos</span> dizem
          </h2>
          <p className="text-[#8A95A8] max-w-xl mx-auto text-lg">
            Milhares de alunos confiam na Flipper para alcançar seus objetivos e transformar suas vidas.
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

        <motion.div
          className="flex items-center justify-center gap-3 mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="h-[1px] w-12" style={{ background: "linear-gradient(90deg, transparent, #222D42)" }} />
          <p className="text-[#8A95A8] text-xs tracking-[0.2em] uppercase font-medium">
            Arraste para ver mais depoimentos
          </p>
          <div className="h-[1px] w-12" style={{ background: "linear-gradient(90deg, #222D42, transparent)" }} />
        </motion.div>
      </div>
    </section>
  );
}
