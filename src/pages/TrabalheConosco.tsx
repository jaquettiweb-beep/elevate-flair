import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import { Link } from "react-router-dom";
import { ChevronRight, Briefcase, GraduationCap, Mail, MapPin, Users, Heart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const positions = [
  {
    title: "Programa de Estágio 2026",
    type: "Estágio",
    typeColor: "hsl(185,80%,55%)",
    typeBg: "hsla(185,80%,55%,0.12)",
    icon: GraduationCap,
    requirements: [
      "Estudante de Educação Física",
      "Vontade de aprender",
      "Disponibilidade presencial",
    ],
    description: "Procurando um lugar onde é possível praticar o que você aprende na sala de aula? Então temos uma oportunidade para você!",
  },
  {
    title: "Professor(a) de Natação",
    type: "CLT",
    typeColor: "hsl(200,90%,55%)",
    typeBg: "hsla(200,90%,55%,0.12)",
    icon: Users,
    requirements: [
      "CREF ativo",
      "Experiência com natação infantil e adulto",
      "Disponibilidade de horários",
    ],
    description: "Buscamos profissionais apaixonados por ensinar natação para todas as idades.",
  },
  {
    title: "Recepcionista",
    type: "CLT",
    typeColor: "hsl(24,95%,53%)",
    typeBg: "hsla(24,95%,53%,0.12)",
    icon: Heart,
    requirements: [
      "Boa comunicação",
      "Organização e proatividade",
      "Experiência em atendimento",
    ],
    description: "Faça parte da linha de frente da academia mais tradicional do Brooklin.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 70, damping: 20 },
  },
};

const benefits = [
  "Ambiente acolhedor e familiar",
  "Mais de 50 anos de tradição",
  "Equipe unida e colaborativa",
  "Localização privilegiada no Brooklin",
];

export default function TrabalheConosco() {
  return (
    <Layout>
      <SEOHead
        title="Trabalhe Conosco - Academia Flipper | Brooklin SP"
        description="Junte-se à equipe da Academia Flipper! Confira nossas vagas abertas e envie seu currículo. Estágio, professores e mais."
        path="/trabalhe-conosco"
      />
      <PageTransition>
        <section className="relative overflow-hidden min-h-screen">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, hsl(185,70%,92%) 0%, hsl(195,60%,50%) 15%, hsl(210,78%,22%) 40%, hsl(215,80%,12%) 70%, hsl(218,82%,9%) 100%)`,
            }}
          />

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-[15%] left-[5%] w-[500px] h-[500px] rounded-full opacity-[0.04]"
              style={{ background: "radial-gradient(circle, hsl(185,80%,70%), transparent 70%)" }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10 pt-32 pb-24">
            {/* Breadcrumb */}
            <motion.nav
              className="flex items-center gap-2 text-sm mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Link to="/" className="text-white/40 hover:text-secondary transition-colors">Início</Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/25" />
              <span className="text-white/70 font-medium">Trabalhe Conosco</span>
            </motion.nav>

            {/* Header */}
            <div className="text-center mb-14">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                style={{ background: "hsla(185,80%,45%,0.1)", border: "1px solid hsla(185,80%,45%,0.2)" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 }}
              >
                <Briefcase size={14} style={{ color: "hsl(185,80%,55%)" }} />
                <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: "hsl(185,80%,65%)" }}>
                  Carreiras
                </span>
              </motion.div>

              <motion.h1
                className="font-display text-4xl lg:text-6xl font-bold mb-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 60 }}
              >
                <span className="text-white">Trabalhe </span>
                <span className="relative inline-block">
                  <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, hsl(185,80%,55%), hsl(200,90%,60%))" }}>
                    Conosco
                  </span>
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                    style={{ background: "linear-gradient(90deg, hsl(185,80%,55%), hsl(200,90%,60%))" }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                  />
                </span>
              </motion.h1>

              <motion.p
                className="text-white/50 max-w-xl mx-auto text-lg"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Faça parte da academia mais tradicional do Brooklin. Estamos sempre em busca de talentos apaixonados por esporte.
              </motion.p>
            </div>

            {/* Why work here */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-3 mb-12"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {benefits.map((b) => (
                <div
                  key={b}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                  style={{ background: "hsla(190,60%,95%,0.08)", border: "1px solid hsla(185,80%,70%,0.1)" }}
                >
                  <Heart size={12} className="text-secondary" />
                  <span className="text-white/60">{b}</span>
                </div>
              ))}
            </motion.div>

            {/* Positions */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-14"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {positions.map((pos) => (
                <motion.div
                  key={pos.title}
                  variants={cardVariants}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="group"
                >
                  <div
                    className="rounded-2xl overflow-hidden h-full flex flex-col relative transition-all duration-300"
                    style={{
                      background: "hsla(190,60%,95%,0.08)",
                      backdropFilter: "blur(24px)",
                      WebkitBackdropFilter: "blur(24px)",
                      border: "1px solid hsla(185,80%,70%,0.1)",
                      boxShadow: "0 8px 32px hsla(0,0%,0%,0.12), inset 0 1px 0 hsla(0,0%,100%,0.05)",
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(circle at 50% 20%, ${pos.typeBg}, transparent 70%)` }}
                    />

                    <div className="p-6 flex-1 flex flex-col relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: pos.typeBg }}
                        >
                          <pos.icon size={20} style={{ color: pos.typeColor }} />
                        </div>
                        <span
                          className="text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full"
                          style={{ background: pos.typeBg, color: pos.typeColor }}
                        >
                          {pos.type}
                        </span>
                      </div>

                      <h2 className="font-display font-bold text-white text-lg mb-2 leading-snug">
                        {pos.title}
                      </h2>
                      <p className="text-white/40 text-sm mb-5 leading-relaxed flex-1">
                        {pos.description}
                      </p>

                      <ul className="space-y-2 mb-4">
                        {pos.requirements.map((r) => (
                          <li key={r} className="flex items-start gap-2 text-sm text-white/50">
                            <ArrowRight size={12} className="mt-0.5 flex-shrink-0" style={{ color: pos.typeColor }} />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              className="max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div
                className="rounded-2xl p-8 text-center"
                style={{
                  background: "hsla(190,60%,95%,0.06)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid hsla(185,80%,70%,0.1)",
                }}
              >
                <Mail size={28} className="mx-auto mb-4" style={{ color: "hsl(185,80%,55%)" }} />
                <h3 className="font-display font-bold text-white text-lg mb-2">
                  Envie seu currículo
                </h3>
                <p className="text-white/40 text-sm mb-5">
                  Mande seu CV para o e-mail abaixo com a vaga desejada no assunto.
                </p>
                <a
                  href="mailto:contato@academiaflipper.com.br?subject=Currículo - Trabalhe Conosco"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-white transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, hsl(185,80%,40%), hsl(200,90%,45%))",
                    boxShadow: "0 4px 24px hsla(185,80%,40%,0.3), inset 0 1px 0 hsla(0,0%,100%,0.15)",
                  }}
                >
                  <Mail size={16} />
                  contato@academiaflipper.com.br
                </a>

                <div className="flex items-center justify-center gap-2 mt-5 text-white/30 text-xs">
                  <MapPin size={12} />
                  Av. Vereador José Diniz, 2583 – Brooklin, SP
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
}
