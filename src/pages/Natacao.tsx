import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { ChevronRight, Waves, Droplets, Baby, User, Users } from "lucide-react";
import BackToModalities from "@/components/BackToModalities";
import swimmingImg from "@/assets/swimming.jpg";

const Natacao = () => {
  return (
    <Layout>
      <SEOHead
        title="Natação - Academia Flipper | Piscina Semiolímpica Aquecida"
        description="Aulas de natação para todas as idades na Academia Flipper. Piscina semiolímpica aquecida, do bebê ao idoso."
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
                <span className="text-foreground font-medium">Natação</span>
              </nav>
            </ScrollReveal>

            <ScrollReveal>
              <h1 className="font-display text-4xl lg:text-6xl font-bold text-foreground mb-6">
                <span className="text-secondary">Natação</span> para Todas as Idades
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mb-12">
                Piscina semiolímpica aquecida com aulas para bebês, crianças, adultos e idosos. Referência em São Paulo há mais de 50 anos.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <div className="rounded-2xl overflow-hidden mb-16 shadow-2xl">
                <img src={swimmingImg} alt="Piscina da Academia Flipper" className="w-full h-[400px] object-cover" />
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {[
                { icon: Baby, title: "Natação Bebê", desc: "A partir de 6 meses, estimulando o desenvolvimento motor e a familiarização com a água em um ambiente seguro e acolhedor." },
                { icon: Users, title: "Natação Infantil", desc: "Turmas por faixa etária com metodologia lúdica que ensina técnica e segurança aquática de forma divertida." },
                { icon: User, title: "Natação Adulto", desc: "Do iniciante ao avançado, com foco em técnica, condicionamento e saúde cardiovascular." },
                { icon: Droplets, title: "Hidroginástica", desc: "Exercícios de baixo impacto na água, ideais para todas as idades e condicionamentos físicos." },
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
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <Waves className="w-7 h-7 text-secondary" /> Nossa Piscina
                </h2>
                <ul className="space-y-3 text-muted-foreground text-lg">
                  <li>• Piscina semiolímpica (25m) aquecida a 28°C</li>
                  <li>• Tratamento com ozônio — menos cloro, mais conforto</li>
                  <li>• Vestiários completos com chuveiro quente</li>
                  <li>• Profissionais formados e experientes</li>
                  <li>• Turmas reduzidas para melhor atenção</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
};

export default Natacao;
