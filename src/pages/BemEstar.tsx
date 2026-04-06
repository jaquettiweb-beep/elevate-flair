import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { ChevronRight, Heart, Flower2, Wind, Sun } from "lucide-react";
import BackToModalities from "@/components/BackToModalities";
import { useGalleryImages } from "@/hooks/useGalleryImages";
import yogaImg from "@/assets/yoga.jpg";
import pilatesImg from "@/assets/pilates.jpg";

const BemEstar = () => {
  const { data: images } = useGalleryImages("Bem-Estar");

  const firstImage = images?.[0]?.image_url || yogaImg;
  const secondImage = images?.[1]?.image_url || pilatesImg;
  const extraImages = images?.slice(2) || [];

  return (
    <Layout>
      <SEOHead
        title="Bem-estar - Academia Flipper | Yoga, Pilates e Relaxamento"
        description="Yoga, Pilates e aulas de relaxamento na Academia Flipper. Equilíbrio entre corpo e mente para uma vida mais saudável."
      />
      <PageTransition>
        <section className="relative overflow-hidden bg-white text-slate-900">
          <div className="container mx-auto px-4 relative z-10 pt-24 pb-16">
            <ScrollReveal>
              <BackToModalities />
              <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8 mt-4">
                <Link to="/" className="hover:text-[#EE6200] transition-colors">Início</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-slate-900 font-medium">Bem-estar</span>
              </nav>
            </ScrollReveal>

            <ScrollReveal>
              <h1 className="font-display text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
                <span className="text-[#EE6200]">Bem-estar</span> — Corpo & Mente
              </h1>
              <p className="text-slate-600 text-lg max-w-2xl mb-12">
                Yoga, Pilates e práticas de relaxamento para equilíbrio físico e mental. Cuide de você de forma integral.
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <ScrollReveal>
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img src={firstImage} alt="Aula de Yoga na Flipper" className="w-full h-[300px] object-cover" />
                </div>
              </ScrollReveal>
              <ScrollReveal>
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img src={secondImage} alt="Aula de Pilates na Flipper" className="w-full h-[300px] object-cover" />
                </div>
              </ScrollReveal>
            </div>

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
                { icon: Flower2, title: "Yoga", desc: "Aulas de Hatha e Vinyasa Yoga para todos os níveis. Melhore flexibilidade, força, equilíbrio e concentração." },
                { icon: Wind, title: "Pilates Solo", desc: "Exercícios de fortalecimento do core, alongamento e consciência corporal com acompanhamento individualizado." },
                { icon: Sun, title: "Pilates Studio", desc: "Aulas com aparelhos (Reformer, Cadillac) para reabilitação, fortalecimento e melhora postural." },
                { icon: Heart, title: "Relaxamento", desc: "Sessões de respiração guiada e meditação para reduzir estresse e promover bem-estar emocional." },
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
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Benefícios do Bem-estar</h2>
                <ul className="space-y-3 text-slate-600 text-lg">
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
