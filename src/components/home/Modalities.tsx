import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import swimmingImg from "@/assets/swimming.jpg";
import yogaImg from "@/assets/yoga.jpg";
import martialImg from "@/assets/martial-arts.jpg";
import pilatesImg from "@/assets/pilates.jpg";
import musculacaoImg from "@/assets/musculacao.jpg";

// ─── Data ────────────────────────────────────────────────────────────────────
type Category = "Aquático" | "Luta" | "Bem-estar" | "Fitness" | "Infantil";

const CATEGORY_STYLES: Record<Category, { bg: string; text: string }> = {
  "Aquático": { bg: "rgba(30,64,175,0.2)", text: "#93C5FD" },
  "Luta": { bg: "rgba(153,27,27,0.2)", text: "#FCA5A5" },
  "Bem-estar": { bg: "rgba(22,101,52,0.2)", text: "#86EFAC" },
  "Fitness": { bg: "rgba(146,64,14,0.2)", text: "#FCD34D" },
  "Infantil": { bg: "rgba(91,33,182,0.2)", text: "#C4B5FD" },
};

const MODALITIES = [
  { name: "Natação", category: "Aquático" as Category, desc: "Adulto, infantil e bebê. Piscina aquecida semiolímpica.", img: swimmingImg, link: "/natacao" },
  { name: "Musculação", category: "Fitness" as Category, desc: "Equipamentos de última geração com orientação profissional.", img: musculacaoImg, link: "/musculacao" },
  { name: "Yoga", category: "Bem-estar" as Category, desc: "Equilíbrio entre corpo e mente com instrutores certificados.", img: yogaImg, link: "/modalidade/yoga" },
  { name: "Pilates Studio", category: "Bem-estar" as Category, desc: "Aparelhos de Pilates com acompanhamento individual.", img: pilatesImg, link: "/modalidade/pilates-studio" },
  { name: "Pilates Solo", category: "Fitness" as Category, desc: "Fortalecimento e flexibilidade no solo para todos os níveis.", img: pilatesImg, link: "/modalidade/pilates-solo" },
  { name: "Hidroginástica", category: "Aquático" as Category, desc: "Exercícios aquáticos de baixo impacto para todas as idades.", img: swimmingImg, link: "/modalidade/hidroginastica" },
  { name: "Muay Thai", category: "Luta" as Category, desc: "Arte marcial tailandesa — força, técnica e condicionamento.", img: martialImg, link: "/modalidade/muay-thai" },
  { name: "Jiu Jitsu", category: "Luta" as Category, desc: "Técnicas de grappling e defesa pessoal no tatame.", img: martialImg, link: "/modalidade/jiu-jitsu" },
  { name: "Judô (infantil)", category: "Infantil" as Category, desc: "Disciplina e coordenação motora para crianças.", img: martialImg, link: "/modalidade/judo-infantil" },
  { name: "Kung Fu", category: "Luta" as Category, desc: "Arte marcial chinesa milenar — equilíbrio e técnica.", img: martialImg, link: "/modalidade/kung-fu" },
  { name: "Krav Maga", category: "Luta" as Category, desc: "Sistema de defesa pessoal prático e eficiente.", img: martialImg, link: "/modalidade/krav-maga" },
  { name: "Aikidô", category: "Luta" as Category, desc: "Arte marcial japonesa baseada em harmonia e força.", img: martialImg, link: "/modalidade/aikido" },
  { name: "Ballet (infantil)", category: "Infantil" as Category, desc: "Expressão artística, postura e ritmo para crianças.", img: pilatesImg, link: "/modalidade/ballet-infantil" },
  { name: "Ginástica", category: "Fitness" as Category, desc: "Coordenação, flexibilidade e condicionamento físico global.", img: musculacaoImg, link: "/modalidade/ginastica" },
  { name: "Hidroterapia", category: "Aquático" as Category, desc: "Reabilitação e bem-estar por exercícios aquáticos terapêuticos.", img: swimmingImg, link: "/modalidade/hidroterapia" },
  { name: "Programa 60+ Saúde", category: "Bem-estar" as Category, desc: "Atividades físicas especialmente para a melhor idade.", img: swimmingImg, link: "/modalidade/programa-60-saude" },
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
      className="group bg-[#1A2335] border border-[#222D42] rounded-[14px] overflow-hidden transition-all duration-250 hover:-translate-y-[3px] hover:border-[#EE6200] hover:shadow-[0_8px_32px_rgba(238,98,0,0.15)] cursor-pointer"
      onClick={() => navigate(mod.link)}
    >
      <div className="h-[3px] bg-[#EE6200] w-full" />
      <div className="h-[160px] w-full overflow-hidden border-b border-[#222D42]">
        <img src={mod.img} alt={mod.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      
      <div className="p-[14px_16px_18px]">
        <span 
          className="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium mb-2"
          style={{ backgroundColor: style.bg, color: style.text }}
        >
          {mod.category}
        </span>
        <h3 className="text-[17px] font-bold text-[#F0EDE8] mb-1 leading-tight">{mod.name}</h3>
        <p className="text-[13px] text-[#8A95A8] mb-3 line-clamp-2 leading-[1.7]">
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
  return (
    <section id="modalidades" className="px-5 lg:px-10 relative z-10 transition-colors duration-500">
      <div className="container mx-auto">
        <div className="text-center mb-10 sm:text-left sm:mb-12">
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
            Mais de 15 atividades esportivas e aquáticas para você encontrar o equilíbrio perfeito para sua saúde.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-4"
        >
          {MODALITIES.map((mod) => (
            <ModalityCard key={mod.name} mod={mod} />
          ))}
        </motion.div>

        <div className="mt-8 pt-4 flex justify-center">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -2, backgroundColor: "#EE6200", color: "#FFFFFF" }}
            whileTap={{ scale: 0.98 }}
            className="border-[1.5px] border-[#EE6200] bg-transparent text-[#EE6200] rounded-[8px] px-8 py-3 font-semibold text-sm transition-all duration-300 hover:shadow-[0_6px_20px_rgba(238,98,0,0.4)]"
          >
            Ver todas as modalidades
          </motion.button>
        </div>
      </div>
    </section>
  );
}
