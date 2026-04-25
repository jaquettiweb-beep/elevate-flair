import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Waves, Dumbbell, Award, Heart, Users, Clock, ArrowRight, MapPin, Train } from "lucide-react";
import { useNavigate } from "react-router-dom";

import swimmingImg from "@/assets/natacao-card-1.jpg";
import musculacaoImg from "@/assets/muscu-new-1.jpg";
import yogaImg from "@/assets/yoga-flipper-1.jpg";
import communityImg from "@/assets/flipper-comunidade-hoje.jpeg";
import fachadaImg from "@/assets/fachada-flipper.jpg";

const timelineData = [
  {
    id: 1,
    title: "Fundação",
    date: "Década de 70",
    content: "A Flipper nasce com a missão de transformar vidas através do esporte e da natação em São Paulo.",
    category: "História",
    icon: Award,
    status: "completed" as const,
    link: "/historia",
    image: fachadaImg,
  },
  {
    id: 2,
    title: "Natação",
    date: "Referência SP",
    content: "Duas piscinas de 17m e uma de 7m, aquecidas e com tratamento salino, para todas as idades.",
    category: "Modalidade",
    icon: Waves,
    status: "completed" as const,
    link: "/natacao",
    image: swimmingImg,
  },
  {
    id: 3,
    title: "Musculação",
    date: "Alta Performance",
    content: "Equipamentos funcionais e seguros, com instrutores certificados (CREF) presentes o dia todo.",
    category: "Modalidade",
    icon: Dumbbell,
    status: "completed" as const,
    link: "/musculacao",
    image: musculacaoImg,
  },
  {
    id: 4,
    title: "Bem-estar",
    date: "Corpo & Mente",
    content: "Yoga, Pilates e aulas de relaxamento para equilíbrio físico e mental.",
    category: "Modalidade",
    icon: Heart,
    status: "in-progress" as const,
    link: "/bem-estar",
    image: yogaImg,
  },
  {
    id: 5,
    title: "Comunidade",
    date: "+5.000 alunos",
    content: "Uma família de mais de 5 mil alunos ativos que crescem juntos há mais de 50 anos.",
    category: "Comunidade",
    icon: Users,
    status: "in-progress" as const,
    image: communityImg,
  },
  {
    id: 6,
    title: "Horários",
    date: "Seg–Sex 6h–22h",
    content: "Segunda a sexta das 6h às 22h, sábado das 8h às 13h. Flexibilidade para a sua rotina.",
    category: "Atendimento",
    icon: Clock,
    status: "completed" as const,
    link: "/horarios",
    image: fachadaImg,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 60,
      damping: 18,
      delay: i * 0.1,
    },
  }),
};

export default function FlipperTimeline() {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* ─── Ambient background ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, hsla(24,95%,53%,0.08) 0%, transparent 70%)",
        }}
      />
      {/* Subtle cross-pattern texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ type: "spring", stiffness: 60, damping: 16 }}
        >
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-[#F0EDE8] mb-4">
            Conheça a <span className="text-[#EE6200] font-extrabold">Academia Flipper</span>
          </h2>
          <p className="text-[#8A95A8] max-w-xl mx-auto text-base md:text-lg">
            Mais de 50 anos transformando vidas através do esporte. Explore nossa história e modalidades.
          </p>
        </motion.div>

        {/* ─── Metro station proximity badges ─── */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          <div
            className="flex items-center gap-3 px-5 py-3 rounded-xl"
            style={{
              background: "hsla(45,90%,55%,0.08)",
              border: "1px solid hsla(45,90%,55%,0.18)",
            }}
          >
            <Train size={18} style={{ color: "hsl(45,90%,55%)" }} />
            <div className="text-left">
              <span className="text-[#F0EDE8] text-sm font-semibold block leading-tight">
                300m da Estação Vereador José Diniz
              </span>
              <span className="text-xs" style={{ color: "hsl(45,90%,65%)" }}>
                Linha 15 – Prata (Monotrilho)
              </span>
            </div>
          </div>
          <div
            className="flex items-center gap-3 px-5 py-3 rounded-xl"
            style={{
              background: "hsla(280,60%,55%,0.08)",
              border: "1px solid hsla(280,60%,55%,0.18)",
            }}
          >
            <Train size={18} style={{ color: "hsl(280,60%,65%)" }} />
            <div className="text-left">
              <span className="text-[#F0EDE8] text-sm font-semibold block leading-tight">
                700m da Estação Campo Belo
              </span>
              <span className="text-xs" style={{ color: "hsl(280,60%,75%)" }}>
                Linha 5 – Lilás
              </span>
            </div>
          </div>
        </motion.div>

        {/* ─── Cards Grid (static, no rotation) ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
          {timelineData.map((item, index) => {
            const Icon = item.icon;
            const isHovered = hoveredId === item.id;

            return (
              <motion.div
                key={item.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                onHoverStart={() => setHoveredId(item.id)}
                onHoverEnd={() => setHoveredId(null)}
                onClick={() => item.link && navigate(item.link)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
                  item.link ? "hover:-translate-y-2 hover:shadow-2xl" : ""
                }`}
                style={{
                  background: "hsla(220,30%,12%,0.6)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: isHovered
                    ? "1px solid hsla(24,95%,53%,0.3)"
                    : "1px solid hsla(220,30%,30%,0.3)",
                  boxShadow: isHovered
                    ? "0 12px 40px hsla(24,95%,53%,0.12), inset 0 1px 0 hsla(0,0%,100%,0.06)"
                    : "0 4px 20px hsla(0,0%,0%,0.15), inset 0 1px 0 hsla(0,0%,100%,0.04)",
                }}
              >
                {/* Background image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ opacity: 0.15 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1220]/95 via-[#0C1220]/70 to-transparent" />
                </div>

                <div className="relative z-10 p-6">
                  {/* Category badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full"
                      style={{
                        background: "hsla(24,95%,53%,0.12)",
                        color: "#EE6200",
                      }}
                    >
                      {item.category}
                    </span>
                    <span className="text-xs text-[#8A95A8]">{item.date}</span>
                  </div>

                  {/* Icon + Title */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300"
                      style={{
                        background: isHovered
                          ? "hsla(24,95%,53%,0.2)"
                          : "hsla(220,30%,20%,0.6)",
                        border: isHovered
                          ? "1px solid hsla(24,95%,53%,0.3)"
                          : "1px solid hsla(220,30%,30%,0.3)",
                      }}
                    >
                      <Icon
                        className="w-6 h-6 transition-colors duration-300"
                        style={{
                          color: isHovered ? "#EE6200" : "#8A95A8",
                        }}
                      />
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#F0EDE8] group-hover:text-[#EE6200] transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-[#8A95A8] text-sm leading-relaxed mb-4">
                    {item.content}
                  </p>

                  {/* Link indicator */}
                  {item.link && (
                    <div className="flex items-center gap-2 text-[#EE6200] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                      Saiba mais
                      <ArrowRight size={16} />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
