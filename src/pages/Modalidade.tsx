import { useParams, Link, Navigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import { ChevronRight, Clock, MapPin, Users, Star } from "lucide-react";
import BackToModalities from "@/components/BackToModalities";
import ImageCarousel from "@/components/ImageCarousel";

// Natação / Hidro
import natacao1 from "@/assets/natacao-1.jpg";
import natacao2 from "@/assets/natacao-2.jpg";
import hidro1 from "@/assets/hidro-1.jpg";
import hidro2 from "@/assets/hidro-2.jpg";
import hidro3 from "@/assets/hidro-3.jpg";
import hidro4 from "@/assets/hidro-4.jpg";
import hidro5 from "@/assets/hidro-5.jpg";

// Pilates
import pilatesImg from "@/assets/pilates.jpg";

// Yoga — set novo (15 fotos disponíveis, usamos 6 para variedade)
import yogaNew1 from "@/assets/yoga_new-1.jpg";
import yogaNew2 from "@/assets/yoga_new-2.jpg";
import yogaNew3 from "@/assets/yoga_new-3.jpg";
import yogaNew4 from "@/assets/yoga_new-4.jpg";
import yogaNew5 from "@/assets/yoga_new-5.jpg";
import yogaNew6 from "@/assets/yoga_new-6.jpg";

// Yoga real (para 60+, ambiente do estúdio Flipper)
import yogaReal1 from "@/assets/yoga-real-1.jpg";
import yogaReal2 from "@/assets/yoga-real-2.jpg";
import yogaReal3 from "@/assets/yoga-real-3.jpg";
import yogaReal4 from "@/assets/yoga-real-4.jpg";

// Judô (14 fotos disponíveis, usamos 6)
import judo1 from "@/assets/judo-1.jpg";
import judo2 from "@/assets/judo-2.jpg";
import judo3 from "@/assets/judo-3.jpg";
import judo4 from "@/assets/judo-4.jpg";
import judo5 from "@/assets/judo-5.jpg";
import judo6 from "@/assets/judo-6.jpg";

// NOTA: jiujitsu-1..10 contêm fotos reais de BALLET da Flipper (crianças de tutu rosa, barra laranja)
// Usamos para Ballet Infantil — são as melhores fotos do estúdio disponíveis
import balletInfantil1 from "@/assets/jiujitsu-1.jpg";
import balletInfantil2 from "@/assets/jiujitsu-2.jpg";
import balletInfantil3 from "@/assets/jiujitsu-3.jpg";
import balletInfantil4 from "@/assets/jiujitsu-4.jpg";
import balletInfantil5 from "@/assets/jiujitsu-5.jpg";
import balletInfantil6 from "@/assets/jiujitsu-6.jpg";
import balletInfantil7 from "@/assets/jiujitsu-7.jpg";
import balletInfantil8 from "@/assets/jiujitsu-8.jpg";
import balletInfantil9 from "@/assets/jiujitsu-9.jpg";
import balletInfantil10 from "@/assets/jiujitsu-10.jpg";

// Aikidô (18 fotos disponíveis, usamos 6)
import aikido1 from "@/assets/aikido-1.jpg";
import aikido2 from "@/assets/aikido-2.jpg";
import aikido3 from "@/assets/aikido-3.jpg";
import aikido4 from "@/assets/aikido-4.jpg";
import aikido5 from "@/assets/aikido-5.jpg";
import aikido6 from "@/assets/aikido-6.jpg";

// Ballet real (estúdio Flipper — fotos do evento de final de ano)
import balletReal1 from "@/assets/ballet-real-1.jpg";
import balletReal2 from "@/assets/ballet-real-2.jpg";
import balletReal3 from "@/assets/ballet-real-3.jpg";
import balletReal4 from "@/assets/ballet-real-4.jpg";
import balletReal5 from "@/assets/ballet-real-5.jpg";

// Ballet genérico (para Ginástica)
import ballet1 from "@/assets/ballet-1.jpg";
import ballet2 from "@/assets/ballet-2.jpg";
import ballet3 from "@/assets/ballet-3.jpg";
import ballet4 from "@/assets/ballet-4.jpg";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flipper%20e%20gostaria%20de%20saber%20mais%20sobre%20";

interface ModalityData {
  name: string;
  slug: string;
  galleryImgs: string[];
  emoji: string;
  description: string;
  benefits: string[];
  schedule: string;
  audience: string;
}

const MODALITY_DATA: Record<string, ModalityData> = {
  "pilates-studio": {
    name: "Pilates Studio",
    slug: "pilates-studio",
    galleryImgs: [pilatesImg, pilatesImg, pilatesImg],
    emoji: "🤸",
    description:
      "Aulas com aparelhos (Reformer, Cadillac, Chair) para reabilitação, fortalecimento e melhora postural. Acompanhamento individualizado com profissionais especializados.",
    benefits: [
      "Melhora da postura e alinhamento corporal",
      "Fortalecimento profundo do core",
      "Reabilitação de lesões",
      "Aumento da flexibilidade e mobilidade",
      "Consciência corporal aprimorada",
    ],
    schedule: "Segunda a sexta, diversos horários",
    audience: "Todos os níveis, com atenção especial para reabilitação",
  },
  "pilates-solo": {
    name: "Pilates Solo",
    slug: "pilates-solo",
    galleryImgs: [pilatesImg, pilatesImg, pilatesImg],
    emoji: "🤸",
    description:
      "Exercícios de fortalecimento do core, alongamento e consciência corporal realizados no solo, com acompanhamento profissional para todos os níveis.",
    benefits: [
      "Fortalecimento muscular sem impacto",
      "Melhora da flexibilidade",
      "Correção postural",
      "Redução de dores nas costas",
      "Turmas em grupo motivadoras",
    ],
    schedule: "Segunda a sexta, manhã e noite",
    audience: "Iniciantes a avançados",
  },
  hidroginastica: {
    name: "Hidroginástica",
    slug: "hidroginastica",
    galleryImgs: [hidro1, hidro2, hidro3, hidro4, hidro5, natacao1, natacao2],
    emoji: "🌊",
    description:
      "Exercícios aquáticos de baixo impacto realizados em nossa piscina semiolímpica aquecida. Ideal para todas as idades e condicionamentos físicos.",
    benefits: [
      "Exercício de baixo impacto nas articulações",
      "Melhora cardiovascular",
      "Fortalecimento muscular na água",
      "Socialização e bem-estar",
      "Ideal para gestantes e idosos",
    ],
    schedule: "Segunda a sábado, manhã",
    audience: "Todas as idades, especialmente 50+",
  },
  "muay-thai": {
    name: "Muay Thai",
    slug: "muay-thai",
    galleryImgs: [aikido1, aikido2, aikido3, aikido4, aikido5, aikido6],
    emoji: "🥊",
    description:
      "Arte marcial tailandesa conhecida como a 'arte dos oito membros'. Treinos intensos de força, técnica e condicionamento com instrutores experientes.",
    benefits: [
      "Condicionamento físico intenso",
      "Defesa pessoal eficiente",
      "Queima calórica elevada",
      "Aumento da confiança",
      "Disciplina e foco mental",
    ],
    schedule: "Segunda, quarta e sexta, 18h",
    audience: "A partir de 14 anos",
  },
  "jiu-jitsu": {
    name: "Jiu Jitsu",
    slug: "jiu-jitsu",
    galleryImgs: [judo1, judo2, judo3, judo4, judo5, judo6],
    emoji: "🥋",
    description:
      "Técnicas de grappling e defesa pessoal no tatame. Arte marcial brasileira reconhecida mundialmente, ensinada por faixas pretas experientes.",
    benefits: [
      "Defesa pessoal completa",
      "Fortalecimento de todo o corpo",
      "Desenvolvimento de raciocínio estratégico",
      "Comunidade e companheirismo",
      "Superação de limites pessoais",
    ],
    schedule: "Segunda, quarta e sexta, 19h",
    audience: "Adultos, todos os níveis",
  },
  "judo-infantil": {
    name: "Judô (Infantil)",
    slug: "judo-infantil",
    galleryImgs: [judo1, judo2, judo3, judo4, judo5, judo6],
    emoji: "🥋",
    description:
      "Disciplina, coordenação motora e respeito através da arte marcial japonesa. Aulas lúdicas e seguras para o desenvolvimento integral da criança.",
    benefits: [
      "Desenvolvimento da coordenação motora",
      "Disciplina e respeito",
      "Socialização saudável",
      "Autoconfiança",
      "Condicionamento físico infantil",
    ],
    schedule: "Terça e quinta, 15h",
    audience: "Crianças de 4 a 12 anos",
  },
  "krav-maga": {
    name: "Krav Maga",
    slug: "krav-maga",
    galleryImgs: [aikido1, aikido2, aikido3, aikido4, aikido5, aikido6],
    emoji: "🛡️",
    description:
      "Sistema de defesa pessoal israelense, prático e eficiente. Técnicas diretas para situações reais, com treino de condicionamento integrado.",
    benefits: [
      "Defesa pessoal prática e realista",
      "Condicionamento físico intenso",
      "Autoconfiança em situações de risco",
      "Reflexos e tempo de reação",
      "Controle emocional sob pressão",
    ],
    schedule: "Terça e quinta, 17h",
    audience: "Adultos, todos os níveis",
  },
  aikido: {
    name: "Aikidô",
    slug: "aikido",
    galleryImgs: [aikido1, aikido2, aikido3, aikido4, aikido5, aikido6],
    emoji: "☯️",
    description:
      "Arte marcial japonesa baseada em harmonia e redirecionamento de força. Filosofia de paz e autodefesa sem violência desnecessária.",
    benefits: [
      "Harmonia corpo-mente",
      "Defesa pessoal não-violenta",
      "Flexibilidade articular",
      "Equilíbrio e centração",
      "Filosofia de vida pacífica",
    ],
    schedule: "Terça e quinta, 19h",
    audience: "Todas as idades",
  },
  "ballet-infantil": {
    name: "Ballet (Infantil)",
    slug: "ballet-infantil",
    galleryImgs: [
      balletInfantil1, balletInfantil2, balletInfantil3, balletInfantil4, balletInfantil5,
      balletInfantil6, balletInfantil7, balletInfantil8, balletInfantil9, balletInfantil10
    ],
    emoji: "🩰",
    description:
      "Expressão artística, postura e ritmo para crianças. Aulas lúdicas que desenvolvem a coordenação, musicalidade e autoexpressão.",
    benefits: [
      "Postura e elegância",
      "Coordenação motora e ritmo",
      "Expressão artística",
      "Disciplina e foco",
      "Socialização entre crianças",
    ],
    schedule: "Terça e quinta, 14h",
    audience: "Crianças de 3 a 10 anos",
  },
  ginastica: {
    name: "Ginástica",
    slug: "ginastica",
    galleryImgs: [ballet3, yogaNew4, yogaNew5, yogaNew6],
    emoji: "🤾",
    description:
      "Aulas de ginástica que trabalham coordenação, flexibilidade e condicionamento físico global. Diversas modalidades para todos os perfis.",
    benefits: [
      "Condicionamento cardiovascular",
      "Flexibilidade e coordenação",
      "Queima calórica eficiente",
      "Motivação em grupo",
      "Variedade de exercícios",
    ],
    schedule: "Sexta, 20h",
    audience: "Adultos",
  },
  "programa-60-saude": {
    name: "Programa 60+ Saúde",
    slug: "programa-60-saude",
    galleryImgs: [yogaReal1, yogaReal2, yogaReal3, yogaReal4],
    emoji: "❤️",
    description:
      "Programa especial de atividades físicas adaptadas para a melhor idade. Exercícios seguros e acompanhados para manter a saúde e a qualidade de vida.",
    benefits: [
      "Exercícios adaptados e seguros",
      "Manutenção da mobilidade",
      "Socialização e bem-estar emocional",
      "Prevenção de quedas",
      "Acompanhamento profissional dedicado",
    ],
    schedule: "Terça e quinta, 10h",
    audience: "Pessoas acima de 60 anos",
  },
  yoga: {
    name: "Yoga",
    slug: "yoga",
    galleryImgs: [yogaNew1, yogaNew2, yogaNew3, yogaNew4, yogaNew5, yogaNew6],
    emoji: "🧘",
    description:
      "Aulas de Hatha e Vinyasa Yoga para todos os níveis. Melhore flexibilidade, força, equilíbrio e concentração com instrutores certificados.",
    benefits: [
      "Redução do estresse e ansiedade",
      "Melhora da flexibilidade",
      "Fortalecimento muscular",
      "Equilíbrio e concentração",
      "Consciência respiratória",
    ],
    schedule: "Segunda a sexta, manhã e noite / Sábado, 9h",
    audience: "Todos os níveis",
  },
};

const Modalidade = () => {
  const { slug } = useParams<{ slug: string }>();

  // Redirect existing dedicated pages
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
              {/* Breadcrumb */}
              <ScrollReveal>
                <BackToModalities />
                <nav className="flex items-center gap-2 text-sm text-white/70 mb-8">
                  <Link to="/" className="hover:text-white transition-colors">Início</Link>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-white font-medium">{data.name}</span>
                </nav>
              </ScrollReveal>

              {/* Hero */}
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

              {/* Carousel — obrigatório em todas as modalidades */}
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

              {/* Info cards */}
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

              {/* Benefits */}
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

              {/* CTA */}
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
