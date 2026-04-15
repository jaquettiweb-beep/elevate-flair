import React, { useState, memo, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Users, Star, Clock } from "lucide-react";
import swimmingImg from "@/assets/modalidade-natacao-3.jpg";
import pilatesImg from "@/assets/modalidade-pilates-1.jpg";
import musculacaoImg from "@/assets/modalidade-musculacao-1.jpg";
import yogaImg from "@/assets/modalidade-yoga-1.jpg";
import hidroImg from "@/assets/modalidade-hidroginastica-2.jpg";
import judoImg from "@/assets/modalidade-judo-infantil-1.jpg";
import jiuJitsuImg from "@/assets/modalidade-jiu-jitsu-1.jpg";
import muayThaiImg from "@/assets/modalidade-muay-thai-1.jpg";
import aikidoImg from "@/assets/modalidade-aikido-1.jpg";
import balletImg from "@/assets/modalidade-ballet-infantil-1.jpg";
import ginasticaImg from "@/assets/modalidade-ginastica-1.jpg";
import programa60Img from "@/assets/modalidade-programa-60-saude-1.jpg";
import kravMagaImg from "@/assets/modalidade-krav-maga-1.jpg";

// ─── Data ────────────────────────────────────────────────────────────────────
type Category = "Aquático" | "Luta" | "Bem-estar" | "Fitness" | "Infantil";

const CATEGORY_STYLES: Record<Category, { bg: string; text: string }> = {
  "Aquático": { bg: "rgba(12,42,61,0.85)", text: "#60b4e8" },
  "Fitness": { bg: "rgba(42,30,8,0.85)", text: "#f0a940" },
  "Bem-estar": { bg: "rgba(14,42,26,0.85)", text: "#6dcfa0" },
  "Luta": { bg: "rgba(45,16,16,0.85)", text: "#e87878" },
  "Infantil": { bg: "rgba(30,16,48,0.85)", text: "#a987e8" },
};

type Modality = {
  name: string;
  category: Category;
  desc: string;
  img: string;
  link: string;
  featured?: boolean;
  stats?: { icon: typeof Users; text: string }[];
  badge?: string;
};

const MODALITIES: Modality[] = [
  { name: "Natação", category: "Aquático", desc: "Adulto, infantil e bebê. Piscinas aquecidas com turmas por nível.", img: swimmingImg, link: "/natacao" },
  { name: "Musculação", category: "Fitness", desc: "Treino funcional e seguro com orientação profissional individualizada.", img: musculacaoImg, link: "/musculacao" },
  { name: "Yoga", category: "Bem-estar", desc: "Equilíbrio entre corpo e mente com instrutores certificados.", img: yogaImg, link: "/modalidade/yoga" },
  { name: "Pilates", category: "Bem-estar", desc: "Studio e Solo — fortalecimento, reabilitação e consciência corporal.", img: pilatesImg, link: "/modalidade/pilates" },
  { name: "Hidroginástica", category: "Aquático", desc: "Exercícios aquáticos de baixo impacto para todas as idades.", img: hidroImg, link: "/modalidade/hidroginastica" },
  { name: "Muay Thai", category: "Luta", desc: "Arte marcial tailandesa — força, técnica e condicionamento.", img: muayThaiImg, link: "/modalidade/muay-thai" },
  { name: "Jiu Jitsu", category: "Luta", desc: "Técnicas de grappling e defesa pessoal no tatame.", img: jiuJitsuImg, link: "/modalidade/jiu-jitsu" },
  { name: "Judô (infantil)", category: "Infantil", desc: "Disciplina e coordenação motora para crianças.", img: judoImg, link: "/modalidade/judo-infantil" },
  { name: "Krav Maga", category: "Luta", desc: "Sistema de defesa pessoal prático e eficiente.", img: kravMagaImg, link: "/modalidade/krav-maga" },
  { name: "Aikidô", category: "Luta", desc: "Arte marcial japonesa baseada em harmonia e força.", img: aikidoImg, link: "/modalidade/aikido" },
  { name: "Ballet (infantil)", category: "Infantil", desc: "Expressão artística, postura e ritmo para crianças.", img: balletImg, link: "/modalidade/ballet-infantil" },
  { name: "Ginástica", category: "Fitness", desc: "Coordenação, flexibilidade e condicionamento físico global.", img: ginasticaImg, link: "/modalidade/ginastica" },
  { name: "Programa 60+ Saúde", category: "Bem-estar", desc: "Atividades físicas especialmente para a melhor idade.", img: programa60Img, link: "/modalidade/programa-60-saude" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  },
};

/* ─── Featured Card (Natação, Musculação) ─── */
const FeaturedModalityCard = memo(function FeaturedModalityCard({ mod }: { mod: Modality }) {
  const navigate = useNavigate();
  const style = CATEGORY_STYLES[mod.category];

  return (
    <motion.div
      variants={cardVariants}
      className="group relative col-span-1 sm:col-span-2 lg:col-span-3 cursor-pointer"
      onClick={() => navigate(mod.link)}
    >
      <div className="bg-[#1A2335] border border-[#222D42] border-t-[3px] border-t-[#EE6200] rounded-[14px] overflow-hidden transition-all duration-[250ms] ease-in-out hover:-translate-y-[4px] hover:border-[#EE6200] hover:shadow-[0_12px_40px_rgba(238,98,0,0.2)]">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Image */}
          <div className="relative h-[220px] sm:h-full min-h-[280px] overflow-hidden">
            <img src={mod.img} alt={mod.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1A2335]/80 hidden sm:block" />
            
            {mod.badge && (
              <span 
                className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide text-white"
                style={{ background: "linear-gradient(135deg, #EE6200, #FF9E52)", boxShadow: "0 4px 12px rgba(238,98,0,0.3)" }}
              >
                ⭐ {mod.badge}
              </span>
            )}
            
            <span 
              className="absolute top-4 right-4 px-[8px] py-[3px] rounded-[10px] text-[10px] font-[600]"
              style={{ backgroundColor: style.bg, color: style.text }}
            >
              {mod.category}
            </span>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 flex flex-col justify-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#F0EDE8] mb-2 leading-tight">{mod.name}</h3>
            <p className="text-[14px] text-[#8A95A8] mb-5 leading-relaxed">
              {mod.desc}
            </p>

            {/* Stats */}
            {mod.stats && (
              <div className="flex flex-wrap gap-4 mb-5">
                {mod.stats.map((stat) => (
                  <div key={stat.text} className="flex items-center gap-1.5">
                    <stat.icon size={14} className="text-[#EE6200]" />
                    <span className="text-[12px] text-[#8A95A8] font-medium">{stat.text}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <span className="inline-flex items-center justify-center gap-2 bg-[#EE6200] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#CC5400] transition-colors">
                Agendar Aula Experimental
              </span>
              <span className="inline-flex items-center text-[#EE6200] font-medium text-[13px] group-hover:translate-x-1 transition-transform">
                Ver detalhes →
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

/* ─── Standard Card ─── */
const ModalityCard = memo(function ModalityCard({ mod }: { mod: Modality }) {
  const navigate = useNavigate();
  const style = CATEGORY_STYLES[mod.category];

  return (
    <motion.div
      variants={cardVariants}
      className="group bg-[#1A2335] border border-[#222D42] border-t-[3px] border-t-[#EE6200] rounded-[14px] overflow-hidden transition-all duration-[250ms] ease-in-out hover:-translate-y-[4px] hover:border-[#EE6200] hover:shadow-[0_8px_28px_rgba(238,98,0,0.15)] cursor-pointer"
      onClick={() => navigate(mod.link)}
    >
      <div className="relative h-[180px] w-full overflow-hidden border-b border-[#222D42]">
        <img src={mod.img} alt={mod.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <span 
          className="absolute top-[10px] right-[10px] px-[8px] py-[3px] rounded-[10px] text-[10px] font-[600]"
          style={{ backgroundColor: style.bg, color: style.text }}
        >
          {mod.category}
        </span>
      </div>
      
      <div className="p-[14px_16px_18px]">
        <h3 className="text-[17px] font-bold text-[#F0EDE8] mb-1 leading-tight">{mod.name}</h3>
        <p className="text-[13px] text-[#8A95A8] mb-3 truncate">
          {mod.desc}
        </p>

        <div className="flex items-center text-[#EE6200] font-medium text-[13px]">
          <span>Saiba mais</span>
          <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
        </div>
      </div>
    </motion.div>
  );
});

export default function Modalities() {
  const [activeFilter, setActiveFilter] = useState("Todas");

  const filteredModalities = activeFilter === "Todas" 
    ? MODALITIES 
    : MODALITIES.filter(m => m.category === (activeFilter === "Lutas" ? "Luta" : activeFilter));

  const filterOptions = ["Todas", "Aquático", "Fitness", "Lutas", "Bem-estar", "Infantil"];

  const handleFilterChange = useCallback((cat: string) => {
    setActiveFilter(cat);
  }, []);

  return (
    <section id="modalidades" className="px-5 lg:px-10 relative z-10 transition-colors duration-500">
      <div className="container mx-auto">
        <div className="text-center mb-6 sm:text-left sm:mb-8">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="block text-[11px] font-bold tracking-[0.14em] uppercase mb-3 text-[#EE6200]"
          >
            Nossas Modalidades
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[clamp(24px,4vw,32px)] font-semibold text-[#F0EDE8] mb-2"
          >
            <span className="text-[#EE6200]">14 Modalidades Premium.</span>{" "}
            Qual é a Sua?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#8A95A8] text-[15px] leading-[1.7]"
          >
            De natação a jiu jitsu, encontre o equilíbrio perfeito para sua saúde. Aula experimental grátis em todas.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-8" role="group" aria-label="Filtrar modalidades">
          {filterOptions.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat)}
                aria-pressed={isActive}
                className={`px-[14px] py-[5px] rounded-[20px] text-[12px] transition-colors ${
                  isActive 
                    ? "bg-[#EE6200] text-[#fff] border border-[#EE6200]" 
                    : "bg-transparent text-[#8A95A8] border border-[#222D42] hover:border-[#EE6200]/50"
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* All Cards - Same Size Grid */}
        <motion.div 
          key={activeFilter}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[16px]"
        >
          {filteredModalities.map((mod) => (
            <ModalityCard key={mod.name} mod={mod} />
          ))}
        </motion.div>

        <div className="mt-2 text-center">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#EE6200] text-[#fff] border-none px-[28px] py-[12px] rounded-[8px] font-[600] block mx-auto mt-[24px] w-fit cursor-pointer transition-all duration-300 hover:shadow-[0_6px_20px_rgba(238,98,0,0.3)]"
          >
            Ver todas as modalidades
          </motion.button>
        </div>
      </div>
    </section>
  );
}
