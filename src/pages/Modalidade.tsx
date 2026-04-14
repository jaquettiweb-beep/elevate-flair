import { useParams, Link, Navigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import { ChevronRight, Clock, MapPin, Users, Star } from "lucide-react";
import BackToModalities from "@/components/BackToModalities";
import ImageCarousel from "@/components/ImageCarousel";
import { MODALITY_DATA, WHATSAPP_URL } from "@/data/modalityData";

const Modalidade = () => {
  const { slug } = useParams<{ slug: string }>();

  if (slug === "natacao") return <Navigate to="/natacao" replace />;
  if (slug === "musculacao") return <Navigate to="/musculacao" replace />;
  if (slug === "bem-estar") return <Navigate to="/bem-estar" replace />;

  const data = slug ? MODALITY_DATA[slug] : null;

  if (!data) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <SEOHead
        title={`${data.name} - Academia Flipper`}
        description={data.description}
      />
      <PageTransition>
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, hsl(205, 72%, 55%) 0%, hsl(210, 75%, 30%) 50%, hsl(215, 80%, 14%) 100%)`,
            }}
          />
          <div className="relative z-10 pt-32 pb-16">
            <div className="container mx-auto px-4">
              <ScrollReveal>
                <BackToModalities />
                <nav className="flex items-center gap-2 text-sm text-white/70 mb-8">
                  <Link to="/" className="hover:text-white transition-colors">Início</Link>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-white font-medium">{data.name}</span>
                </nav>
              </ScrollReveal>

              <ScrollReveal>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl">{data.emoji}</span>
                  <h1 className="font-display text-4xl lg:text-6xl font-bold text-white drop-shadow-md">
                    {data.name}
                  </h1>
                </div>
                <p className="text-white/85 text-lg max-w-2xl mb-12 leading-relaxed drop-shadow">
                  {data.description}
                </p>
              </ScrollReveal>

              <ScrollReveal>
                <div className="mb-12">
                  <ImageCarousel
                    images={data.galleryImgs.map((src, i) => ({
                      src,
                      alt: `${data.name} — foto ${i + 1}`,
                    }))}
                    height="h-[420px]"
                  />
                </div>
              </ScrollReveal>

              <div className="grid md:grid-cols-3 gap-6 mb-16">
                <ScrollReveal>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Horários</h3>
                    <p className="text-white/75 text-sm">{data.schedule}</p>
                  </div>
                </ScrollReveal>
                <ScrollReveal>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Público</h3>
                    <p className="text-white/75 text-sm">{data.audience}</p>
                  </div>
                </ScrollReveal>
                <ScrollReveal>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Local</h3>
                    <p className="text-white/75 text-sm">Academia Flipper — São Paulo</p>
                  </div>
                </ScrollReveal>
              </div>

              <ScrollReveal>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-16">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Star className="w-7 h-7 text-yellow-300" /> Benefícios
                  </h2>
                  <ul className="space-y-3 text-white/85 text-lg">
                    {data.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-yellow-300 font-bold mt-0.5">✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="text-center">
                  <a
                    href={`${WHATSAPP_URL}${encodeURIComponent(data.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 btn-cta rounded-full px-8 py-4 text-lg font-bold"
                  >
                    Agende sua Aula Experimental
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
};

export default Modalidade;
