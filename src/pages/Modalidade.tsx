import { useParams, Link, Navigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import { ChevronRight, Clock, MapPin, Users, Star } from "lucide-react";
import BackToModalities from "@/components/BackToModalities";
import swimmingImg from "@/assets/swimming.jpg";
import yogaImg from "@/assets/yoga.jpg";             // Yoga ✅
import pilatesImg from "@/assets/pilates.jpg";         // Pilates ✅
import musculacaoImg from "@/assets/musculacao.jpg";   // Musculação ✅

// Hidro — confirmed by user: hidro-1 to hidro-5 are all Hidroginástica
import hidro1 from "@/assets/hidro-1.jpg";
import hidro2 from "@/assets/hidro-2.jpg";
import hidro3 from "@/assets/hidro-3.jpg";
import hidro4 from "@/assets/hidro-4.jpg";
import hidro5 from "@/assets/hidro-5.jpg";

// Yoga — confirmed by user: yoga_new-1 to yoga_new-4 are Yoga
import yogaNew1 from "@/assets/yoga_new-1.jpg";
import yogaNew2 from "@/assets/yoga_new-2.jpg";
import yogaNew3 from "@/assets/yoga_new-3.jpg";
import yogaNew4 from "@/assets/yoga_new-4.jpg";

// Judô — confirmed by user: judo-1 to judo-3 are Judô
import judo1 from "@/assets/judo-1.jpg";
import judo2 from "@/assets/judo-2.jpg";
import judo3 from "@/assets/judo-3.jpg";
import judo4 from "@/assets/judo-4.jpg";

// Jiu Jitsu — confirmed by user: jiujitsu-1 to jiujitsu-3 are Jiu Jitsu
import jiujitsu1 from "@/assets/jiujitsu-1.jpg";
import jiujitsu2 from "@/assets/jiujitsu-2.jpg";
import jiujitsu3 from "@/assets/jiujitsu-3.jpg";
import jiujitsu4 from "@/assets/jiujitsu-4.jpg";

// Aikidô — confirmed by user: aikido-1 and aikido-2 are Aikidô
import aikido1 from "@/assets/aikido-1.jpg";
import aikido2 from "@/assets/aikido-2.jpg";
import aikido3 from "@/assets/aikido-3.jpg";
import aikido4 from "@/assets/aikido-4.jpg";

// Ballet — confirmed by user: ballet-1 to ballet-5 are Ballet
import ballet1 from "@/assets/ballet-1.jpg";
import ballet2 from "@/assets/ballet-2.jpg";
import ballet3 from "@/assets/ballet-3.jpg";
import ballet4 from "@/assets/ballet-4.jpg";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flipper%20e%20gostaria%20de%20saber%20mais%20sobre%20";

interface ModalityData {
  name: string;
  slug: string;
  heroImg: string;
  galleryImgs?: string[];
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
    heroImg: pilatesImg,
    emoji: "🤸",
    description: "Aulas com aparelhos (Reformer, Cadillac, Chair) para reabilitação, fortalecimento e melhora postural. Acompanhamento individualizado com profissionais especializados.",
    benefits: ["Melhora da postura e alinhamento corporal", "Fortalecimento profundo do core", "Reabilitação de lesões", "Aumento da flexibilidade e mobilidade", "Consciência corporal aprimorada"],
    schedule: "Segunda a sexta, diversos horários",
    audience: "Todos os níveis, com atenção especial para reabilitação",
  },
  "pilates-solo": {
    name: "Pilates Solo",
    slug: "pilates-solo",
    heroImg: yogaNew1,
    galleryImgs: [yogaNew2, yogaNew3],
    emoji: "🤸",
    description: "Exercícios de fortalecimento do core, alongamento e consciência corporal realizados no solo, com acompanhamento profissional para todos os níveis.",
    benefits: ["Fortalecimento muscular sem impacto", "Melhora da flexibilidade", "Correção postural", "Redução de dores nas costas", "Turmas em grupo motivadoras"],
    schedule: "Segunda a sexta, manhã e noite",
    audience: "Iniciantes a avançados",
  },
  "hidroginastica": {
    name: "Hidroginástica",
    slug: "hidroginastica",
    heroImg: hidro1,
    galleryImgs: [hidro2, hidro3, hidro4, hidro5],
    emoji: "🌊",
    description: "Exercícios aquáticos de baixo impacto realizados em nossa piscina semiolímpica aquecida. Ideal para todas as idades e condicionamentos físicos.",
    benefits: ["Exercício de baixo impacto nas articulações", "Melhora cardiovascular", "Fortalecimento muscular na água", "Socialização e bem-estar", "Ideal para gestantes e idosos"],
    schedule: "Segunda a sábado, manhã",
    audience: "Todas as idades, especialmente 50+",
  },
  "muay-thai": {
    name: "Muay Thai",
    slug: "muay-thai",
    heroImg: jiujitsu1,
    galleryImgs: [jiujitsu2, jiujitsu3],
    emoji: "🥊",
    description: "Arte marcial tailandesa conhecida como a 'arte dos oito membros'. Treinos intensos de força, técnica e condicionamento com instrutores experientes.",
    benefits: ["Condicionamento físico intenso", "Defesa pessoal eficiente", "Queima calórica elevada", "Aumento da confiança", "Disciplina e foco mental"],
    schedule: "Segunda, quarta e sexta, 18h",
    audience: "A partir de 14 anos",
  },
  "jiu-jitsu": {
    name: "Jiu Jitsu",
    slug: "jiu-jitsu",
    heroImg: jiujitsu1,
    galleryImgs: [jiujitsu2, jiujitsu3, jiujitsu4],
    emoji: "🥋",
    description: "Técnicas de grappling e defesa pessoal no tatame. Arte marcial brasileira reconhecida mundialmente, ensinada por faixas pretas experientes.",
    benefits: ["Defesa pessoal completa", "Fortalecimento de todo o corpo", "Desenvolvimento de raciocínio estratégico", "Comunidade e companheirismo", "Superação de limites pessoais"],
    schedule: "Segunda, quarta e sexta, 19h",
    audience: "Adultos, todos os níveis",
  },
  "judo-infantil": {
    name: "Judô (Infantil)",
    slug: "judo-infantil",
    heroImg: judo1,
    galleryImgs: [judo2, judo3, judo4],
    emoji: "🥋",
    description: "Disciplina, coordenação motora e respeito através da arte marcial japonesa. Aulas lúdicas e seguras para o desenvolvimento integral da criança.",
    benefits: ["Desenvolvimento da coordenação motora", "Disciplina e respeito", "Socialização saudável", "Autoconfiança", "Condicionamento físico infantil"],
    schedule: "Terça e quinta, 15h",
    audience: "Crianças de 4 a 12 anos",
  },
  "krav-maga": {
    name: "Krav Maga",
    slug: "krav-maga",
    heroImg: aikido1,
    galleryImgs: [aikido2, aikido3],
    emoji: "🛡️",
    description: "Sistema de defesa pessoal israelense, prático e eficiente. Técnicas diretas para situações reais, com treino de condicionamento integrado.",
    benefits: ["Defesa pessoal prática e realista", "Condicionamento físico intenso", "Autoconfiança em situações de risco", "Reflexos e tempo de reação", "Controle emocional sob pressão"],
    schedule: "Terça e quinta, 17h",
    audience: "Adultos, todos os níveis",
  },
  "aikido": {
    name: "Aikidô",
    slug: "aikido",
    heroImg: aikido1,
    galleryImgs: [aikido2, aikido3, aikido4],
    emoji: "☯️",
    description: "Arte marcial japonesa baseada em harmonia e redirecionamento de força. Filosofia de paz e autodefesa sem violência desnecessária.",
    benefits: ["Harmonia corpo-mente", "Defesa pessoal não-violenta", "Flexibilidade articular", "Equilíbrio e centração", "Filosofia de vida pacífica"],
    schedule: "Terça e quinta, 19h",
    audience: "Todas as idades",
  },
  "ballet-infantil": {
    name: "Ballet (Infantil)",
    slug: "ballet-infantil",
    heroImg: ballet1,
    galleryImgs: [ballet2, ballet3, ballet4],
    emoji: "🩰",
    description: "Expressão artística, postura e ritmo para crianças. Aulas lúdicas que desenvolvem a coordenação, musicalidade e autoexpressão.",
    benefits: ["Postura e elegaância", "Coordenação motora e ritmo", "Expressão artística", "Disciplina e foco", "Socialização entre crianças"],
    schedule: "Terça e quinta, 14h",
    audience: "Crianças de 3 a 10 anos",
  },
  "ginastica": {
    name: "Ginástica",
    slug: "ginastica",
    heroImg: ballet3,
    galleryImgs: [ballet4],
    emoji: "🤾",
    description: "Aulas de ginástica que trabalham coordenação, flexibilidade e condicionamento físico global. Diversas modalidades para todos os perfis.",
    benefits: ["Condicionamento cardiovascular", "Flexibilidade e coordenação", "Queima calórica eficiente", "Motivação em grupo", "Variedade de exercícios"],
    schedule: "Sexta, 20h",
    audience: "Adultos",
  },
  "hidroterapia": {
    name: "Hidroterapia",
    slug: "hidroterapia",
    heroImg: hidro1,
    galleryImgs: [hidro2, hidro3],
    emoji: "💧",
    description: "Reabilitação e bem-estar através de exercícios aquáticos terapêuticos em piscina aquecida. Acompanhamento especializado para recuperação.",
    benefits: ["Reabilitação de lesões articulares", "Alívio de dores crônicas", "Recuperação pós-cirúrgica", "Relaxamento muscular profundo", "Melhora da mobilidade"],
    schedule: "Segunda a sexta, com agendamento",
    audience: "Indicação médica ou livre demanda",
  },
  "programa-60-saude": {
    name: "Programa 60+ Saúde",
    slug: "programa-60-saude",
    heroImg: yogaImg,
    galleryImgs: [yogaNew1, yogaNew2],
    emoji: "❤️",
    description: "Programa especial de atividades físicas adaptadas para a melhor idade. Exercícios seguros e acompanhados para manter a saúde e a qualidade de vida.",
    benefits: ["Exercícios adaptados e seguros", "Manutenção da mobilidade", "Socialização e bem-estar emocional", "Prevenção de quedas", "Acompanhamento profissional dedicado"],
    schedule: "Terça e quinta, 10h",
    audience: "Pessoas acima de 60 anos",
  },
  "yoga": {
    name: "Yoga",
    slug: "yoga",
    heroImg: yogaImg,
    galleryImgs: [yogaNew1, yogaNew2, yogaNew3, yogaNew4],
    emoji: "🧘",
    description: "Aulas de Hatha e Vinyasa Yoga para todos os níveis. Melhore flexibilidade, força, equilíbrio e concentração com instrutores certificados.",
    benefits: ["Redução do estresse e ansiedade", "Melhora da flexibilidade", "Fortalecimento muscular", "Equilíbrio e concentração", "Consciência respiratória"],
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
                <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                  <Link to="/" className="hover:text-secondary transition-colors">Início</Link>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-foreground font-medium">{data.name}</span>
                </nav>
              </ScrollReveal>

              {/* Hero */}
              <ScrollReveal>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-5xl">{data.emoji}</span>
                  <h1 className="font-display text-4xl lg:text-6xl font-bold text-foreground">
                    <span className="text-secondary">{data.name}</span>
                  </h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl mb-12 leading-relaxed">
                  {data.description}
                </p>
              </ScrollReveal>

              {/* Hero image */}
              <ScrollReveal>
                <div className="rounded-2xl overflow-hidden mb-8 shadow-2xl">
                  <img src={data.heroImg} alt={data.name} className="w-full h-[400px] object-cover" />
                </div>
              </ScrollReveal>

              {/* Specific Gallery if exists */}
              {data.galleryImgs && data.galleryImgs.length > 0 && (
                <ScrollReveal>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
                    {data.galleryImgs.map((imgSrc, i) => (
                      <div key={i} className="rounded-xl overflow-hidden shadow-lg h-[200px]">
                        <img
                          src={imgSrc}
                          alt={`${data.name} galeria ${i + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              )}

              {/* Info cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-16">
                <ScrollReveal>
                  <div className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-6">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center mb-4">
                      <Clock className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Horários</h3>
                    <p className="text-muted-foreground text-sm">{data.schedule}</p>
                  </div>
                </ScrollReveal>
                <ScrollReveal>
                  <div className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-6">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Público</h3>
                    <p className="text-muted-foreground text-sm">{data.audience}</p>
                  </div>
                </ScrollReveal>
                <ScrollReveal>
                  <div className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-6">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center mb-4">
                      <MapPin className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Local</h3>
                    <p className="text-muted-foreground text-sm">Academia Flipper — São Paulo</p>
                  </div>
                </ScrollReveal>
              </div>

              {/* Benefits */}
              <ScrollReveal>
                <div className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-8 mb-16">
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <Star className="w-7 h-7 text-secondary" /> Benefícios
                  </h2>
                  <ul className="space-y-3 text-muted-foreground text-lg">
                    {data.benefits.map((b, i) => (
                      <li key={i}>• {b}</li>
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
