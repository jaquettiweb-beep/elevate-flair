import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { ChevronRight, Dumbbell, Target, TrendingUp, Shield } from "lucide-react";
import BackToModalities from "@/components/BackToModalities";
import ImageCarousel from "@/components/ImageCarousel";
import musc1 from "@/assets/muscu-new-1.jpg";
import musc2 from "@/assets/muscu-new-2.jpg";
import musc3 from "@/assets/muscu-new-3.jpg";
import musc4 from "@/assets/muscu-new-4.jpg";
import musc5 from "@/assets/muscu-new-5.jpg";
import musc6 from "@/assets/muscu-new-6.jpg";
import musc7 from "@/assets/muscu-new-7.jpg";
import musc8 from "@/assets/muscu-new-8.jpg";
import musc9 from "@/assets/muscu-new-9.jpg";

const MUSCULACAO_IMAGES = [
  { src: musc1, alt: "Academia Flipper — sala de musculação com equipamentos" },
  { src: musc2, alt: "Academia Flipper — aparelhos de musculação" },
  { src: musc3, alt: "Academia Flipper — equipamentos com vista" },
  { src: musc4, alt: "Academia Flipper — sala de treino completa" },
  { src: musc5, alt: "Academia Flipper — área de bikes e máquinas" },
  { src: musc6, alt: "Academia Flipper — esteiras" },
  { src: musc7, alt: "Academia Flipper — halteres" },
  { src: musc8, alt: "Academia Flipper — turma de musculação" },
  { src: musc9, alt: "Academia Flipper — alunos treinando" },
];

const Musculacao = () => {
  return (
    <Layout>
      <SEOHead
        title="Musculação - Academia Flipper | Equipamentos Modernos"
        description="Musculação com equipamentos modernos e profissionais qualificados na Academia Flipper. Treinos personalizados para todos os níveis."
      />
      <PageTransition>
        <section className="relative overflow-hidden page-white" style={{ background: '#ffffff', color: '#0f172a' }}>
          <div className="container mx-auto px-4 relative z-10 pt-24 pb-16">
            <ScrollReveal>
              <BackToModalities />
              <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8 mt-4">
                <Link to="/" className="hover:text-[#EE6200] transition-colors">Início</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-slate-900 font-medium">Musculação</span>
              </nav>
            </ScrollReveal>

            <ScrollReveal>
              <h1 className="font-display text-4xl lg:text-6xl font-bold mb-6" style={{ color: '#0f172a' }}>
                <span className="text-[#EE6200]">Musculação</span> de Alta Performance
              </h1>
              <p className="text-lg max-w-2xl mb-12" style={{ color: '#475569' }}>
                Equipamentos modernos, ambiente motivador e profissionais qualificados para o seu melhor treino.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <div className="mb-16">
                <ImageCarousel images={MUSCULACAO_IMAGES} height="h-[460px]" />
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {[
                { icon: Dumbbell, title: "Equipamentos Modernos", desc: "Aparelhos de última geração para treinos de força, hipertrofia e resistência, com manutenção constante." },
                { icon: Target, title: "Treino Personalizado", desc: "Avaliação física completa e programa de treino individualizado, atualizado periodicamente conforme sua evolução." },
                { icon: TrendingUp, title: "Acompanhamento", desc: "Professores sempre presentes na sala para orientação, correção de postura e motivação durante o treino." },
                { icon: Shield, title: "Segurança", desc: "Ambiente seguro com protocolos de higiene, espaço bem ventilado e equipamentos higienizados regularmente." },
              ].map((item, i) => (
                <ScrollReveal key={i}>
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
                    <div className="w-14 h-14 rounded-full bg-[#EE6200]/10 border-2 border-[#EE6200] flex items-center justify-center mb-4">
                      <item.icon className="w-7 h-7 text-[#EE6200]" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Horário da Musculação</h2>
                <p className="text-slate-600 text-lg">
                  Segunda a sexta das 6h às 22h, sábados das 6h às 13h. Sala ampla com espaço para treinar com conforto.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
};

export default Musculacao;
