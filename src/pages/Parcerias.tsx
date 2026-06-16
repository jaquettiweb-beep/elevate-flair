import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import { Link } from "react-router-dom";
import { ChevronRight, ExternalLink, Building2, Stethoscope, Sparkles, Apple, GraduationCap, Phone, ArrowRight, Handshake, Store } from "lucide-react";
import { motion } from "framer-motion";

import greenbook from "@/assets/partners/greenbook.png.asset.json";
import adventista from "@/assets/partners/adventista.png.asset.json";
import cantoDoBatuque from "@/assets/partners/canto-do-batuque.png.asset.json";
import brasoes from "@/assets/partners/brasoes.png.asset.json";
import diversamente from "@/assets/partners/diversamente.png.asset.json";

const wa = (msg: string) =>
  `https://wa.me/5511944440557?text=${encodeURIComponent(msg)}`;

type Partner = {
  name: string;
  icon: typeof Building2;
  description: string;
  highlight?: string;
  url?: string;
  urlLabel?: string;
};

const partners: Partner[] = [
  {
    name: "CAASP",
    icon: Building2,
    description:
      "Estamos presentes na CAASP com desconto especial em nossos planos para advogados em São Paulo.",
    url: "https://www.caasp.org.br/clubedeservicos/parceiro/Detalhes/7301",
    urlLabel: "Ver no Clube de Serviços CAASP",
  },
  {
    name: "Altima",
    icon: Stethoscope,
    description:
      "Na Altima, acreditamos que saúde esportiva vai muito além do alto rendimento. Nosso propósito é melhorar a vida de quem passa por aqui — seja atleta profissional, amador ou alguém que busca emagrecimento, hipertrofia, envelhecimento saudável ou equilíbrio hormonal.",
    highlight: "Para alunos Flipper: 10% de desconto nas consultas.",
    url: "https://www.instagram.com/clinicaaltima",
    urlLabel: "Instagram @clinicaaltima",
  },
  {
    name: "Vigora",
    icon: Sparkles,
    description:
      "A clínica Vigora atua em tratamentos estéticos no rosto, corpo e áreas íntimas. Além disso, oferece massagens para promover o bem-estar físico, mental e psicológico. Utilizamos cosméticos veganos, ortomoleculares, entre outros de alta tecnologia. Possui atendimento com nutricionista — bem pertinho da Flipper.",
  },
  {
    name: "Nutricionista Esportivo",
    icon: Apple,
    description:
      "Descontos especiais com o nosso nutricionista esportivo Daniel Agostinho. Atendimento online ou presencial. WhatsApp: (11) 98292-2323.",
    highlight: "Descontos exclusivos para alunos Flipper.",
    url: "https://nutridoesporte.com.br",
    urlLabel: "nutridoesporte.com.br",
  },
];

const schools = [
  { name: "GreenBook", logo: greenbook.url },
  { name: "Adventista", logo: adventista.url },
  { name: "Canto do Batuque", logo: cantoDoBatuque.url },
  { name: "Brasões", logo: brasoes.url },
  { name: "Diversamente", logo: diversamente.url },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

export default function Parcerias() {
  return (
    <Layout>
      <PageTransition>
        <SEOHead
          title="Parcerias e Benefícios | Academia Flipper São Paulo"
          description="Conheça as parcerias da Academia Flipper: CAASP, clínicas de saúde, nutricionista esportivo e escolas com descontos. Parcerias corporativas e exposição de produtos."
          path="/parcerias"
        />

        {/* Hero */}
        <section className="pt-28 pb-12 bg-primary">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-primary-foreground/60 text-sm mb-6" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link>
              <ChevronRight size={14} />
              <span className="text-primary-foreground">Parcerias</span>
            </nav>
            <motion.div
              className="h-1 bg-primary-foreground/30 mb-4 rounded-full origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ width: "80px" }}
            />
            <h1 className="font-display text-3xl lg:text-5xl font-bold text-primary-foreground">
              Parcerias <span className="text-primary-foreground/80">& Benefícios</span>
            </h1>
            <p className="text-primary-foreground/70 mt-3 max-w-2xl">
              Vantagens exclusivas para alunos Flipper e oportunidades para empresas,
              escolas e marcas que querem caminhar com a gente.
            </p>
          </div>
        </section>

        {/* Parcerias que temos */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="max-w-2xl mb-10">
              <span className="inline-flex items-center gap-2 text-secondary uppercase tracking-[0.2em] text-xs font-semibold">
                <Handshake size={14} /> Parcerias que temos
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-3">
                Benefícios que cuidam de você
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              {partners.map((p, i) => (
                <motion.article
                  key={p.name}
                  {...fadeUp}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-6 hover:border-secondary/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                      <p.icon size={22} />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground">{p.name}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">{p.description}</p>
                  {p.highlight && (
                    <p className="mt-4 rounded-lg bg-secondary/10 text-secondary font-semibold text-sm px-3 py-2">
                      {p.highlight}
                    </p>
                  )}
                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                    >
                      {p.urlLabel} <ExternalLink size={14} />
                    </a>
                  )}
                </motion.article>
              ))}
            </div>

            <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mt-6">
              <a
                href="https://wa.me/5511934972306?text=Ol%C3%A1!%20Sou%20aluno%20Flipper%20e%20quero%20saber%20sobre%20a%20clinica."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-6 py-3 text-sm font-semibold hover:bg-secondary/90 transition-colors"
              >
                <Phone size={16} /> Falar com a Vigora / Nutricionista
              </a>
            </motion.div>
          </div>
        </section>

        {/* Escolas parceiras */}
        <section className="py-16 bg-muted/40">
          <div className="container mx-auto px-4">
            <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="max-w-2xl mb-10">
              <span className="inline-flex items-center gap-2 text-secondary uppercase tracking-[0.2em] text-xs font-semibold">
                <GraduationCap size={14} /> Escolas parceiras
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-3">
                Escolas com desconto na Flipper
              </h2>
              <p className="text-muted-foreground mt-3">
                Alunos e famílias destas escolas contam com condições especiais em nossos planos.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {schools.map((s, i) => (
                <motion.div
                  key={s.name}
                  {...fadeUp}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex h-24 w-full items-center justify-center">
                    <img
                      src={s.logo}
                      alt={`Logo ${s.name}`}
                      loading="lazy"
                      className="max-h-24 max-w-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground text-center">{s.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Parcerias corporativas */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10">
            <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 text-secondary uppercase tracking-[0.2em] text-xs font-semibold">
                <Building2 size={14} /> Para empresas e escolas
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-3 mb-5">
                Parcerias Corporativas
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Empresas e escolas da região que desejam oferecer benefícios diferenciados
                  para seus colaboradores, funcionários ou alunos podem contar com a Flipper
                  para criar condições especiais e exclusivas.
                </p>
                <p>
                  Uma parceria com a Flipper é uma forma concreta de investir no bem-estar
                  das pessoas que fazem parte da sua organização — e de oferecer um benefício
                  que faz diferença real no dia a dia de cada uma delas.
                </p>
                <p>
                  Se a sua empresa ou escola quer construir essa parceria, entre em contato
                  com a nossa equipe. Vamos juntos criar uma proposta que faça sentido para
                  os dois lados.
                </p>
              </div>

              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <a
                  href={wa("Olá! Quero saber sobre parcerias corporativas com a Flipper.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col rounded-xl border border-border bg-card p-4 hover:border-secondary/50 transition-colors"
                >
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">Produtos e parcerias corporativas</span>
                  <span className="font-display font-bold text-foreground mt-1">Cibele</span>
                  <span className="inline-flex items-center gap-1.5 text-secondary text-sm font-semibold mt-1">
                    <Phone size={14} /> (11) 97201-1147
                  </span>
                </a>
                <a
                  href={wa("Olá! Quero saber sobre parceria de colégio/escola com a Flipper.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col rounded-xl border border-border bg-card p-4 hover:border-secondary/50 transition-colors"
                >
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">Colégios e escolas</span>
                  <span className="font-display font-bold text-foreground mt-1">Patricia</span>
                  <span className="inline-flex items-center gap-1.5 text-secondary text-sm font-semibold mt-1">
                    <Phone size={14} /> (11) 94444-0557
                  </span>
                </a>
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }}>
              <span className="inline-flex items-center gap-2 text-secondary uppercase tracking-[0.2em] text-xs font-semibold">
                <Store size={14} /> Para marcas e expositores
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-3 mb-5">
                Exposição de Produtos
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  A Flipper recebe diariamente um público engajado, ativo e sempre aberto a
                  descobrir novidades. Se você tem um produto ou serviço que conversa com esse
                  perfil, nosso espaço pode ser o lugar ideal para apresentá-lo.
                </p>
                <p>
                  Já recebemos expositores de diferentes segmentos e cada experiência foi única
                  — tanto para quem expôs quanto para os nossos alunos e visitantes.
                </p>
                <p>
                  Quer saber como funciona? Fale com a nossa representante e vamos encontrar
                  juntos o melhor formato para a sua marca.
                </p>
              </div>

              <a
                href={wa("Olá Cibele! Tenho interesse em expor meus produtos na Flipper.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Quero expor meu produto <ArrowRight size={16} />
              </a>
            </motion.div>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
}
