import { useParams, Link, Navigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import { ChevronRight, Clock, MapPin, Users, Star } from "lucide-react";
import swimmingImg from "@/assets/swimming.jpg";
import yogaImg from "@/assets/yoga.jpg";
import martialImg from "@/assets/martial-arts.jpg";
import pilatesImg from "@/assets/pilates.jpg";
import musculacaoImg from "@/assets/musculacao.jpg";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flipper%20e%20gostaria%20de%20saber%20mais%20sobre%20";

interface ModalityData {
  name: string;
  slug: string;
  heroImg: string;
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
    heroImg: pilatesImg,
    emoji: "🤸",
    description: "Exercícios de fortalecimento do core, alongamento e consciência corporal realizados no solo, com acompanhamento profissional para todos os níveis.",
    benefits: ["Fortalecimento muscular sem impacto", "Melhora da flexibilidade", "Correção postural", "Redução de dores nas costas", "Turmas em grupo motivadoras"],
    schedule: "Segunda a sexta, manhã e noite",
    audience: "Iniciantes a avançados",
  },
  "hidroginastica": {
    name: "Hidroginástica",
    slug: "hidroginastica",
    heroImg: swimmingImg,
    emoji: "🌊",
    description: "Exercícios aquáticos de baixo impacto realizados em nossa piscina semiolímpica aquecida. Ideal para todas as idades e condicionamentos físicos.",
    benefits: ["Exercício de baixo impacto nas articulações", "Melhora cardiovascular", "Fortalecimento muscular na água", "Socialização e bem-estar", "Ideal para gestantes e idosos"],
    schedule: "Segunda a sábado, manhã",
    audience: "Todas as idades, especialmente 50+",
  },
  "muay-thai": {
    name: "Muay Thai",
    slug: "muay-thai",
    heroImg: martialImg,
    emoji: "🥊",
    description: "Arte marcial tailandesa conhecida como a 'arte dos oito membros'. Treinos intensos de força, técnica e condicionamento com instrutores experientes.",
    benefits: ["Condicionamento físico intenso", "Defesa pessoal eficiente", "Queima calórica elevada", "Aumento da confiança", "Disciplina e foco mental"],
    schedule: "Segunda, quarta e sexta, 18h",
    audience: "A partir de 14 anos",
  },
  "jiu-jitsu": {
    name: "Jiu Jitsu",
    slug: "jiu-jitsu",
    heroImg: martialImg,
    emoji: "🥋",
    description: "Técnicas de grappling e defesa pessoal no tatame. Arte marcial brasileira reconhecida mundialmente, ensinada por faixas pretas experientes.",
    benefits: ["Defesa pessoal completa", "Fortalecimento de todo o corpo", "Desenvolvimento de raciocínio estratégico", "Comunidade e companheirismo", "Superação de limites pessoais"],
    schedule: "Segunda, quarta e sexta, 19h",
    audience: "Adultos, todos os níveis",
  },
  "judo-infantil": {
    name: "Judô (Infantil)",
    slug: "judo-infantil",
    heroImg: martialImg,
    emoji: "🥋",
    description: "Disciplina, coordenação motora e respeito através da arte marcial japonesa. Aulas lúdicas e seguras para o desenvolvimento integral da criança.",
    benefits: ["Desenvolvimento da coordenação motora", "Disciplina e respeito", "Socialização saudável", "Autoconfiança", "Condicionamento físico infantil"],
    schedule: "Terça e quinta, 15h",
    audience: "Crianças de 4 a 12 anos",
  },
  "kung-fu": {
    name: "Kung Fu",
    slug: "kung-fu",
    heroImg: martialImg,
    emoji: "🥋",
    description: "Arte marcial chinesa milenar que trabalha equilíbrio, técnica, flexibilidade e filosofia de vida. Formas tradicionais e aplicação prática.",
    benefits: ["Flexibilidade e equilíbrio", "Concentração e disciplina mental", "Tradição e filosofia marcial", "Condicionamento físico completo", "Defesa pessoal"],
    schedule: "Terça e quinta, 20h / Sábado, 10h",
    audience: "A partir de 10 anos",
  },
  "krav-maga": {
    name: "Krav Maga",
    slug: "krav-maga",
    heroImg: martialImg,
    emoji: "🛡️",
    description: "Sistema de defesa pessoal israelense, prático e eficiente. Técnicas diretas para situações reais, com treino de condicionamento integrado.",
    benefits: ["Defesa pessoal prática e realista", "Condicionamento físico intenso", "Autoconfiança em situações de risco", "Reflexos e tempo de reação", "Controle emocional sob pressão"],
    schedule: "Terça e quinta, 17h",
    audience: "Adultos, todos os níveis",
  },
  "aikido": {
    name: "Aikidô",
    slug: "aikido",
    heroImg: martialImg,
    emoji: "☯️",
    description: "Arte marcial japonesa baseada em harmonia e redirecionamento de força. Filosofia de paz e autodefesa sem violência desnecessária.",
    benefits: ["Harmonia corpo-mente", "Defesa pessoal não-violenta", "Flexibilidade articular", "Equilíbrio e centragem", "Filosofia de vida pacífica"],
    schedule: "Terça e quinta, 19h",
    audience: "Todas as idades",
  },
  "ballet-infantil": {
    name: "Ballet (Infantil)",
    slug: "ballet-infantil",
    heroImg: pilatesImg,
    emoji: "🩰",
    description: "Expressão artística, postura e ritmo para crianças. Aulas lúdicas que desenvolvem a coordenação, musicalidade e autoexpressão.",
    benefits: ["Postura e elegância", "Coordenação motora e ritmo", "Expressão artística", "Disciplina e foco", "Socialização entre crianças"],
    schedule: "Terça e quinta, 14h",
    audience: "Crianças de 3 a 10 anos",
  },
  "ginastica": {
    name: "Ginástica",
    slug: "ginastica",
    heroImg: musculacaoImg,
    emoji: "🤾",
    description: "Aulas de ginástica que trabalham coordenação, flexibilidade e condicionamento físico global. Diversas modalidades para todos os perfis.",
    benefits: ["Condicionamento cardiovascular", "Flexibilidade e coordenação", "Queima calórica eficiente", "Motivação em grupo", "Variedade de exercícios"],
    schedule: "Sexta, 20h",
    audience: "Adultos",
  },
  "hidroterapia": {
    name: "Hidroterapia",
    slug: "hidroterapia",
    heroImg: swimmingImg,
    emoji: "💧",
    description: "Reabilitação e bem-estar através de exercícios aquáticos terapêuticos em piscina aquecida. Acompanhamento especializado para recuperação.",
    benefits: ["Reabilitação de lesões articulares", "Alívio de dores crônicas", "Recuperação pós-cirúrgica", "Relaxamento muscular profundo", "Melhora da mobilidade"],
    schedule: "Segunda a sexta, com agendamento",
    audience: "Indicação médica ou livre demanda",
  },
  "programa-60-saude": {
    name: "Programa 60+ Saúde",
    slug: "programa-60-saude",
    heroImg: swimmingImg,
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
                <div className="rounded-2xl overflow-hidden mb-16 shadow-2xl">
                  <img src={data.heroImg} alt={data.name} className="w-full h-[400px] object-cover" />
                </div>
              </ScrollReveal>

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
