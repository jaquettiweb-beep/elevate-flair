import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { ChevronRight, Waves, Droplets, Baby, User, Users } from "lucide-react";
import BackToModalities from "@/components/BackToModalities";
import ImageCarousel from "@/components/ImageCarousel";
import natacao1 from "@/assets/natacao-new-1.jpg";
import natacao2 from "@/assets/natacao-new-2.jpg";
import natacao3 from "@/assets/natacao-new-3.jpg";
import natacao4 from "@/assets/natacao-new-4.jpg";

const NATACAO_IMAGES = [
  { src: natacao1, alt: "Aula de natação na Academia Flipper — professor e alunos na piscina" },
  { src: natacao2, alt: "Alunos com certificado de natação da Academia Flipper" },
  { src: natacao3, alt: "Piscina semiolímpica da Academia Flipper com bandeiras" },
  { src: natacao4, alt: "Aluno nadando na piscina da Academia Flipper" },
];

const Natacao = () => {
  return (
    <Layout>
      <SEOHead
        title="Natação - Academia Flipper | Piscina Semiolímpica Aquecida"
        description="Aulas de natação para todas as idades na Academia Flipper. Piscina semiolímpica aquecida, do bebê ao idoso."
      />
      <PageTransition>
        <section className="relative overflow-hidden page-white" style={{ background: '#ffffff', color: '#0f172a' }}>
          <div className="container mx-auto px-4 relative z-10 pt-24 pb-16">
            <ScrollReveal>
              <BackToModalities />
              <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8 mt-4">
                <Link to="/" className="hover:text-[#EE6200] transition-colors">Início</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-slate-900 font-medium">Natação</span>
              </nav>
            </ScrollReveal>

            <ScrollReveal>
              <h1 className="font-display text-4xl lg:text-6xl font-bold mb-6" style={{ color: '#0f172a' }}>
                <span className="text-[#EE6200]">Natação</span> para Todas as Idades
              </h1>
              <p className="text-lg max-w-2xl mb-12" style={{ color: '#475569' }}>
                Piscina semiolímpica aquecida com aulas para bebês, crianças, adultos e idosos. Referência em São Paulo há mais de 50 anos.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <div className="mb-16">
                <ImageCarousel images={NATACAO_IMAGES} height="h-[420px]" />
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
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <Waves className="w-7 h-7 text-[#EE6200]" /> Nossa Piscina
                </h2>
                <ul className="space-y-3 text-slate-600 text-lg">
                  <li>• Piscina semiolímpica (25m) aquecida</li>
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


