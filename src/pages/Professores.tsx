import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";

import kamile from "@/assets/professores/kamile.png";
import alex from "@/assets/professores/alex.png";
import silvia from "@/assets/professores/silvia.png";
import raimundo from "@/assets/professores/raimundo.png";
import rui from "@/assets/professores/rui.png";
import sueli from "@/assets/professores/sueli.png";
import eduarda from "@/assets/professores/eduarda.png";
import anaLidia from "@/assets/professores/ana-lidia.png";
import mariana from "@/assets/professores/mariana.png";
import ruy from "@/assets/professores/ruy.png";
import silvio from "@/assets/professores/silvio.png";
import vagner from "@/assets/professores/vagner.png";
import ricardo from "@/assets/professores/ricardo.png";
import joseDaniel from "@/assets/professores/jose-daniel.png";

type Professor = {
  name: string;
  role: string;
  bio: string[];
  img: string;
};

const PROFESSORES: Professor[] = [
  {
    name: "Kamile Cardoso da Silva",
    role: "Instrutora de Musculação",
    img: kamile,
    bio: [
      "Formada em Educação Física pela UNIP.",
      "Possui cursos de extensão em treinamento feminino, reabilitação física e musculação para a manutenção e melhora da qualidade de vida de idosos.",
    ],
  },
  {
    name: "Alex Fernandes dos Santos",
    role: "Instrutor de Musculação",
    img: alex,
    bio: [
      "Possui certificação de musculação pela FPA e curso de Biomecânica da Hipertrofia.",
      "Especialização completa em musculação, emagrecimento, treinamento de força para terceira idade, treinamento concorrente e novas perspectivas no treinamento da musculação.",
    ],
  },
  {
    name: "Silvia Aparecida Capuzzo",
    role: "Coordenadora da Natação",
    img: silvia,
    bio: [
      "Formada em Educação Física pela Escola Superior de Educação Física de Jundiaí.",
      "Pós-graduada em Administração e MKT Esportivo pela Universidade Gama Filho.",
    ],
  },
  {
    name: "Raimundo Francisco de Oliveira",
    role: "Fundador e Professor do Projeto 60+",
    img: raimundo,
    bio: [
      "Especialista em qualidade de vida e saúde do público 60+.",
      "Educador Físico formado pela UNIP.",
    ],
  },
  {
    name: "Rui Pedro Belo Duarte do Amaral",
    role: "Professor de Pilates Studio",
    img: rui,
    bio: ["Professor de Pilates Studio na Academia Flipper."],
  },
  {
    name: "Sueli Freire Rillo",
    role: "Professora de Ginástica, Pilates Solo e Studio",
    img: sueli,
    bio: [
      "Professora de Ginástica, Pilates Solo e Studio.",
      "Educadora Física e Fisioterapeuta.",
    ],
  },
  {
    name: "Eduarda Zalara",
    role: "Professora de Yoga e Pilates Studio",
    img: eduarda,
    bio: [
      "Professora de Yoga nos estilos Hatha Yoga, Yin e Vinyasa.",
      "Professora de Pilates Studio.",
    ],
  },
  {
    name: "Ana Lidia Guerra",
    role: "Instrutora de Yoga",
    img: anaLidia,
    bio: ["Instrutora de Hatha Yoga, Yogaterapia Hormonal e Yoga para crianças."],
  },
  {
    name: "Mariana Boralli",
    role: "Professora de Ballet Infantil",
    img: mariana,
    bio: ["Professora de Ballet Infantil na Academia Flipper."],
  },
  {
    name: "Ruy Mantovani Junior",
    role: "Sensei de Judô Infantil",
    img: ruy,
    bio: [
      "Sensei de Judô Infantil.",
      "Faixa preta sho dan.",
    ],
  },
  {
    name: "Silvio Keidi",
    role: "Professor de Jiu Jitsu",
    img: silvio,
    bio: [
      "Professor de Jiu Jitsu.",
      "Faixa Preta de Jiu Jitsu Brasileiro, 3º grau, Fusion Jiu Jitsu School.",
    ],
  },
  {
    name: "Vagner Ferreira de Almeida",
    role: "Professor de Aikidô",
    img: vagner,
    bio: [
      "Professor de Aikidô.",
      "Faixa preta pela Federação Paulista de Aikido — 4º dan.",
    ],
  },
  {
    name: "Ricardo Alves de Castro",
    role: "Professor de Krav Maga",
    img: ricardo,
    bio: [
      "Professor de Krav Maga.",
      "Certificado pela IKMF (International Krav Maga Federation) — Expert 1.",
    ],
  },
  {
    name: "José Daniel de Oliveira",
    role: "Professor de Muay Thai",
    img: joseDaniel,
    bio: [
      "Professor de Muay Thai.",
      "Educador Físico com pós-graduação em Lutas e Artes Marciais.",
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, type: "spring" as const, stiffness: 60, damping: 14, mass: 0.8 },
  }),
};

const Professores = () => {
  return (
    <Layout>
      <SEOHead
        title="Nossos Professores - Academia Flipper"
        description="Conheça o corpo docente da Academia Flipper: profissionais qualificados em musculação, natação, yoga, pilates, lutas e muito mais."
      />
      <PageTransition>
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, hsl(205, 72%, 55%) 0%, hsl(210, 75%, 30%) 50%, hsl(215, 80%, 14%) 100%)`,
            }}
          />
          <div className="relative z-10 pt-32 pb-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 60, damping: 14, mass: 0.8 }}
                className="text-center mb-16"
              >
                <span className="block text-[11px] font-bold tracking-[0.14em] uppercase mb-3 text-[#EE6200]">
                  Nosso Time
                </span>
                <h1 className="font-display text-4xl lg:text-6xl font-bold text-white drop-shadow-md mb-4">
                  Nossos Professores
                </h1>
                <p className="text-white/85 text-lg max-w-2xl mx-auto leading-relaxed">
                  Profissionais qualificados, apaixonados pelo que fazem e prontos para te ajudar a alcançar seus objetivos.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROFESSORES.map((p, i) => (
                  <motion.article
                    key={p.name}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={cardVariants}
                    className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:border-[#EE6200]/60 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(238,98,0,0.25)]"
                  >
                    <div className="aspect-[4/5] w-full overflow-hidden bg-[#0c2a3d]">
                      <img
                        src={p.img}
                        alt={`Professor(a) ${p.name}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={p.name === "Silvia Aparecida Capuzzo" ? { objectPosition: "20% 25%" } : undefined}
                      />
                    </div>
                    <div className="p-5">
                      <h2 className="text-lg font-bold text-white leading-tight mb-1">{p.name}</h2>
                      <p className="text-[#EE6200] text-sm font-semibold mb-3">{p.role}</p>
                      <div className="space-y-2">
                        {p.bio.map((line, j) => (
                          <p key={j} className="text-white/80 text-sm leading-relaxed">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
};

export default Professores;
