import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import swimmingImg from "@/assets/swimming.jpg";
import yogaImg from "@/assets/yoga.jpg";
import martialImg from "@/assets/martial-arts.jpg";
import pilatesImg from "@/assets/pilates.jpg";
import musculacaoImg from "@/assets/musculacao.jpg";

// ─── Data ────────────────────────────────────────────────────────────────────
const MODALITIES = [
  { name: "Natação", desc: "Adulto, infantil e bebê. Piscina aquecida semiolímpica.", img: swimmingImg, emoji: "🏊", link: "/natacao" },
  { name: "Musculação", desc: "Equipamentos de última geração com orientação profissional.", img: musculacaoImg, emoji: "💪", link: "/musculacao" },
  { name: "Yoga", desc: "Equilíbrio entre corpo e mente com instrutores certificados.", img: yogaImg, emoji: "🧘", link: "/modalidade/yoga" },
  { name: "Pilates Studio", desc: "Aparelhos de Pilates com acompanhamento individual.", img: pilatesImg, emoji: "🤸", link: "/modalidade/pilates-studio" },
  { name: "Pilates Solo", desc: "Fortalecimento e flexibilidade no solo para todos os níveis.", img: pilatesImg, emoji: "🤸", link: "/modalidade/pilates-solo" },
  { name: "Hidroginástica", desc: "Exercícios aquáticos de baixo impacto para todas as idades.", img: swimmingImg, emoji: "🌊", link: "/modalidade/hidroginastica" },
  { name: "Muay Thai", desc: "Arte marcial tailandesa — força, técnica e condicionamento.", img: martialImg, emoji: "🥊", link: "/modalidade/muay-thai" },
  { name: "Jiu Jitsu", desc: "Técnicas de grappling e defesa pessoal no tatame.", img: martialImg, emoji: "🥋", link: "/modalidade/jiu-jitsu" },
  { name: "Judô (infantil)", desc: "Disciplina e coordenação motora para crianças.", img: martialImg, emoji: "🥋", link: "/modalidade/judo-infantil" },
  { name: "Kung Fu", desc: "Arte marcial chinesa milenar — equilíbrio e técnica.", img: martialImg, emoji: "🥋", link: "/modalidade/kung-fu" },
  { name: "Krav Maga", desc: "Sistema de defesa pessoal prático e eficiente.", img: martialImg, emoji: "🛡️", link: "/modalidade/krav-maga" },
  { name: "Aikidô", desc: "Arte marcial japonesa baseada em harmonia e força.", img: martialImg, emoji: "☯️", link: "/modalidade/aikido" },
  { name: "Ballet (infantil)", desc: "Expressão artística, postura e ritmo para crianças.", img: pilatesImg, emoji: "🩰", link: "/modalidade/ballet-infantil" },
  { name: "Ginástica", desc: "Coordenação, flexibilidade e condicionamento físico global.", img: musculacaoImg, emoji: "🤾", link: "/modalidade/ginastica" },
  { name: "Hidroterapia", desc: "Reabilitação e bem-estar por exercícios aquáticos terapêuticos.", img: swimmingImg, emoji: "💧", link: "/modalidade/hidroterapia" },
  { name: "Programa 60+ Saúde", desc: "Atividades físicas especialmente para a melhor idade.", img: swimmingImg, emoji: "❤️", link: "/modalidade/programa-60-saude" },
];

function ModalityCard({ mod, index }: { mod: typeof MODALITIES[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      className="group relative h-[320px] rounded-2xl overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => navigate(mod.link)}
    >
      <img src={mod.img} alt={mod.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <span className="text-3xl mb-3 block transform transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">
          {mod.emoji}
        </span>
        <h3 className="text-xl font-bold text-white mb-1">{mod.name}</h3>
        
        <AnimatePresence>
          {isHovered && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-white/70 text-sm leading-relaxed mb-4 overflow-hidden"
            >
              {mod.desc}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2 text-secondary font-semibold text-sm">
          <span>Saiba mais</span>
          <motion.span animate={{ x: isHovered ? 4 : 0 }}>→</motion.span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Modalities() {
  return (
    <section id="modalidades" className="py-24 relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="font-display text-4xl lg:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Nossas <span className="text-secondary">Modalidades</span>
          </motion.h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Mais de 15 atividades esportivas e aquáticas para você encontrar o equilíbrio perfeito para sua saúde.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MODALITIES.map((mod, i) => (
            <ModalityCard key={mod.name} mod={mod} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
