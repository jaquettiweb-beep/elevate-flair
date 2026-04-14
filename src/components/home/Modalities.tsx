import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import swimmingImg from "@/assets/natacao-new-3.jpg";
import pilatesImg from "@/assets/pilates-real-1.jpg";
import musculacaoImg from "@/assets/muscu-new-1.jpg";
import yogaImg from "@/assets/yoga-flipper-1.jpg";
import hidroImg from "@/assets/hidro-extra-1.jpg";
import yogaNewImg from "@/assets/yoga_new-1.jpg";
import judoImg from "@/assets/judo-new-1.jpg";
import jiuJitsuImg from "@/assets/jiu-jitsu-real-1.jpg";
import muayThaiImg from "@/assets/aikido-1.jpg";
import aikidoImg from "@/assets/aikido-real-1.jpg";
import balletImg from "@/assets/ballet-new-1.jpg";
import ginasticaImg from "@/assets/ginastica-real-1.jpg";
import programa60Img from "@/assets/programa60-real-1.jpg";
import kravMagaImg from "@/assets/aikido-3.jpg";

// ─── Data ────────────────────────────────────────────────────────────────────
type Category = "Aquático" | "Luta" | "Bem-estar" | "Fitness" | "Infantil";

const CATEGORY_STYLES: Record<Category, { bg: string; text: string }> = {
  "Aquático": { bg: "rgba(12,42,61,0.85)", text: "#60b4e8" },
  "Fitness": { bg: "rgba(42,30,8,0.85)", text: "#f0a940" },
  "Bem-estar": { bg: "rgba(14,42,26,0.85)", text: "#6dcfa0" },
  "Luta": { bg: "rgba(45,16,16,0.85)", text: "#e87878" },
  "Infantil": { bg: "rgba(30,16,48,0.85)", text: "#a987e8" },
};

const MODALITIES = [
  { name: "Natação", category: "Aquático" as Category, desc: "Adulto, infantil e bebê. Piscina aquecida semiolímpica.", img: swimmingImg, link: "/natacao" },
  { name: "Musculação", category: "Fitness" as Category, desc: "Equipamentos de última geração com orientação profissional.", img: musculacaoImg, link: "/musculacao" },
  { name: "Yoga", category: "Bem-estar" as Category, desc: "Equilíbrio entre corpo e mente com instrutores certificados.", img: yogaImg, link: "/modalidade/yoga" },
  { name: "Pilates", category: "Bem-estar" as Category, desc: "Studio e Solo — fortalecimento, reabilitação e consciência corporal.", img: pilatesImg, link: "/modalidade/pilates" },
  { name: "Hidroginástica", category: "Aquático" as Category, desc: "Exercícios aquáticos de baixo impacto para todas as idades.", img: hidroImg, link: "/modalidade/hidroginastica" },
  { name: "Muay Thai", category: "Luta" as Category, desc: "Arte marcial tailandesa — força, técnica e condicionamento.", img: muayThaiImg, link: "/modalidade/muay-thai" },
  { name: "Jiu Jitsu", category: "Luta" as Category, desc: "Técnicas de grappling e defesa pessoal no tatame.", img: jiuJitsuImg, link: "/modalidade/jiu-jitsu" },
  { name: "Judô (infantil)", category: "Infantil" as Category, desc: "Disciplina e coordenação motora para crianças.", img: judoImg, link: "/modalidade/judo-infantil" },
  { name: "Krav Maga", category: "Luta" as Category, desc: "Sistema de defesa pessoal prático e eficiente.", img: kravMagaImg, link: "/modalidade/krav-maga" },
  { name: "Aikidô", category: "Luta" as Category, desc: "Arte marcial japonesa baseada em harmonia e força.", img: aikidoImg, link: "/modalidade/aikido" },
  { name: "Ballet (infantil)", category: "Infantil" as Category, desc: "Expressão artística, postura e ritmo para crianças.", img: balletImg, link: "/modalidade/ballet-infantil" },
  { name: "Ginástica", category: "Fitness" as Category, desc: "Coordenação, flexibilidade e condicionamento físico global.", img: ginasticaImg, link: "/modalidade/ginastica" },
  { name: "Programa 60+ Saúde", category: "Bem-estar" as Category, desc: "Atividades físicas especialmente para a melhor idade.", img: programa60Img, link: "/modalidade/programa-60-saude" },
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

function ModalityCard({ mod }: { mod: typeof MODALITIES[0] }) {
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
}

export default function Modalities() {
  const [activeFilter, setActiveFilter] = useState("Todas");

  const filteredModalities = activeFilter === "Todas" 
    ? MODALITIES 
    : MODALITIES.filter(m => m.category === (activeFilter === "Lutas" ? "Luta" : activeFilter));

  const filterOptions = ["Todas", "Aquático", "Fitness", "Lutas", "Bem-estar", "Infantil"];

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
            Escolha sua <span className="text-[#EE6200]">atividade</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#8A95A8] text-[15px] leading-[1.7]"
          >
            Mais de 14 atividades esportivas e aquáticas para você encontrar o equilíbrio perfeito para sua saúde.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-8">
          {filterOptions.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
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

        <motion.div 
          key={activeFilter}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px]"
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
