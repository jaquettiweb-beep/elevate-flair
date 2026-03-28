import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { ChevronRight, Dumbbell, Target, TrendingUp, Shield } from "lucide-react";
import BackToModalities from "@/components/BackToModalities";
import { useGalleryImages } from "@/hooks/useGalleryImages";
import musculacaoImg from "@/assets/musculacao.jpg";

const Musculacao = () => {
  const { data: images } = useGalleryImages("Musculação");

  const heroImage = images?.[0]?.image_url || musculacaoImg;
  const extraImages = images?.slice(1) || [];

  return (
    <Layout>
      <SEOHead
        title="Musculação - Academia Flipper | Equipamentos Modernos"
        description="Musculação com equipamentos modernos e profissionais qualificados na Academia Flipper. Treinos personalizados para todos os níveis."
      />
      <PageTransition>
        <section className="pt-32 pb-16 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <ScrollReveal>
              <BackToModalities />
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                <Link to="/" className="hover:text-secondary transition-colors">Início</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-foreground font-medium">Musculação</span>
              </nav>
            </ScrollReveal>

            <ScrollReveal>
              <h1 className="font-display text-4xl lg:text-6xl font-bold text-foreground mb-6">
                <span className="text-secondary">Musculação</span> de Alta Performance
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mb-12">
                Equipamentos modernos, ambiente motivador e profissionais qualificados para o seu melhor treino.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <div className="rounded-2xl overflow-hidden mb-16 shadow-2xl">
                <img src={heroImage} alt="Sala de musculação da Academia Flipper" className="w-full h-[400px] object-cover" />
              </div>
            </ScrollReveal>

            {extraImages.length > 0 && (
              <ScrollReveal>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
                  {extraImages.map((img) => (
                    <div key={img.id} className="rounded-xl overflow-hidden shadow-lg">
                      <img
                        src={img.image_url}
                        alt={img.alt_text}
                        className="w-full h-[200px] object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            )}

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {[
                { icon: Dumbbell, title: "Equipamentos Modernos", desc: "Aparelhos de última geração para treinos de força, hipertrofia e resistência, com manutenção constante." },
                { icon: Target, title: "Treino Personalizado", desc: "Avaliação física completa e programa de treino individualizado, atualizado periodicamente conforme sua evolução." },
                { icon: TrendingUp, title: "Acompanhamento", desc: "Professores sempre presentes na sala para orientação, correção de postura e motivação durante o treino." },
                { icon: Shield, title: "Segurança", desc: "Ambiente seguro com protocolos de higiene, espaço bem ventilado e equipamentos higienizados regularmente." },
              ].map((item, i) => (
                <ScrollReveal key={i}>
                  <div className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-8">
                    <div className="w-14 h-14 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center mb-4">
                      <item.icon className="w-7 h-7 text-secondary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal>
              <div className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Horário da Musculação</h2>
                <p className="text-muted-foreground text-lg">
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
