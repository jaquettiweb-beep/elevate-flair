import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { ChevronRight, Award, Users, Heart, Waves } from "lucide-react";
import fachadaImg from "@/assets/fachada-flipper.jpg";

const Historia = () => {
  return (
    <Layout>
      <SEOHead
        title="Nossa História - Academia Flipper | +50 Anos em São Paulo"
        description="Conheça a trajetória de mais de 50 anos da Academia Flipper, referência em natação e esportes em São Paulo."
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
            {/* Breadcrumb */}
            <ScrollReveal>
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                <Link to="/" className="hover:text-secondary transition-colors">Início</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-foreground font-medium">Nossa História</span>
              </nav>
            </ScrollReveal>

            <ScrollReveal>
              <h1 className="font-display text-4xl lg:text-6xl font-bold text-foreground mb-6">
                +50 Anos de <span className="text-secondary">História</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mb-12">
                Uma trajetória de dedicação, paixão pelo esporte e compromisso com a saúde e o bem-estar de toda a comunidade paulistana.
              </p>
            </ScrollReveal>

            {/* Hero image */}
            <ScrollReveal>
              <div className="rounded-2xl overflow-hidden mb-16 shadow-2xl">
                <img src={fachadaImg} alt="Fachada da Academia Flipper" className="w-full h-[400px] object-cover" />
              </div>
            </ScrollReveal>

            {/* Timeline */}
            <div className="space-y-16">
              <ScrollReveal>
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center flex-shrink-0">
                    <Award className="w-8 h-8 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Década de 70 — O Início</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      A Academia Flipper nasceu na década de 70 com um sonho: oferecer natação de qualidade para todas as idades em São Paulo. 
                      Desde o início, a piscina semiolímpica aquecida se tornou referência na região, atraindo famílias que buscavam saúde e bem-estar.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center flex-shrink-0">
                    <Waves className="w-8 h-8 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Décadas de 80 e 90 — Expansão</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Com o crescimento da demanda, a Flipper expandiu sua infraestrutura e passou a oferecer novas modalidades, 
                      incluindo musculação, artes marciais e ginástica. A academia se consolidou como um espaço completo para a prática esportiva.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center flex-shrink-0">
                    <Heart className="w-8 h-8 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Anos 2000 — Bem-estar Integral</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      A Flipper incorporou yoga, pilates e programas voltados à terceira idade, ampliando sua missão para o bem-estar integral. 
                      A academia passou a atender do bebê ao idoso, tornando-se um verdadeiro centro de saúde comunitário.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center flex-shrink-0">
                    <Users className="w-8 h-8 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Hoje — +5.000 Alunos</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Com mais de 50 anos de história e uma comunidade de mais de 5 mil alunos ativos, a Flipper segue firme na sua missão 
                      de transformar vidas através do esporte. Equipamentos modernos, profissionais qualificados e uma infraestrutura completa 
                      fazem da Flipper a melhor escolha para toda a família.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
};

export default Historia;
