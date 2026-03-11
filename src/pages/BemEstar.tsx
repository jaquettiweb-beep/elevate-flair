import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { ChevronRight, Heart, Flower2, Wind, Sun } from "lucide-react";
import BackToModalities from "@/components/BackToModalities";
import yogaImg from "@/assets/yoga.jpg";
import pilatesImg from "@/assets/pilates.jpg";

const BemEstar = () => {
  return (
    <Layout>
      <SEOHead
        title="Bem-estar - Academia Flipper | Yoga, Pilates e Relaxamento"
        description="Yoga, Pilates e aulas de relaxamento na Academia Flipper. Equilíbrio entre corpo e mente para uma vida mais saudável."
      />
      <PageTransition>
        <section className="pt-32 pb-16 relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, hsl(205, 72%, 55%) 0%, hsl(210, 75%, 30%) 50%, hsl(215, 80%, 14%) 100%)`,
            }}
          />
          <div className="container mx-auto px-4 relative z-10">
            <ScrollReveal>
              <BackToModalities />
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                <Link to="/" className="hover:text-secondary transition-colors">Início</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-foreground font-medium">Bem-estar</span>
              </nav>
            </ScrollReveal>

            <ScrollReveal>
              <h1 className="font-display text-4xl lg:text-6xl font-bold text-foreground mb-6">
                <span className="text-secondary">Bem-estar</span> — Corpo & Mente
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mb-12">
                Yoga, Pilates e práticas de relaxamento para equilíbrio físico e mental. Cuide de você de forma integral.
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <ScrollReveal>
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img src={yogaImg} alt="Aula de Yoga na Flipper" className="w-full h-[300px] object-cover" />
                </div>
              </ScrollReveal>
              <ScrollReveal>
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img src={pilatesImg} alt="Aula de Pilates na Flipper" className="w-full h-[300px] object-cover" />
                </div>
              </ScrollReveal>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {[
                { icon: Flower2, title: "Yoga", desc: "Aulas de Hatha e Vinyasa Yoga para todos os níveis. Melhore flexibilidade, força, equilíbrio e concentração." },
                { icon: Wind, title: "Pilates Solo", desc: "Exercícios de fortalecimento do core, alongamento e consciência corporal com acompanhamento individualizado." },
                { icon: Sun, title: "Pilates Studio", desc: "Aulas com aparelhos (Reformer, Cadillac) para reabilitação, fortalecimento e melhora postural." },
                { icon: Heart, title: "Relaxamento", desc: "Sessões de respiração guiada e meditação para reduzir estresse e promover bem-estar emocional." },
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
                <h2 className="text-2xl font-bold text-foreground mb-4">Benefícios do Bem-estar</h2>
                <ul className="space-y-3 text-muted-foreground text-lg">
                  <li>• Redução do estresse e ansiedade</li>
                  <li>• Melhora da postura e flexibilidade</li>
                  <li>• Fortalecimento muscular de baixo impacto</li>
                  <li>• Maior consciência corporal e equilíbrio</li>
                  <li>• Prevenção de lesões e dores crônicas</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
};

export default BemEstar;
