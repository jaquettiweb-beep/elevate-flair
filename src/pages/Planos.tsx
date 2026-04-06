import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import { Link } from "react-router-dom";
import { ChevronRight, Dumbbell, Droplets, Waves, Zap, Check, Phone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Uno",
    tagline: "Escolha sua atividade",
    color: "hsl(221,83%,53%)",
    colorLight: "hsla(221,83%,53%,0.12)",
    icon: Zap,
    features: [
      "Musculação",
      "1 Luta 1x por semana",
      "Ginástica (Pendente Confirmação)",
    ],
    description: "Ideal para quem quer começar com uma modalidade.",
  },
  {
    name: "Terra",
    tagline: "Atividades terrestres",
    color: "hsl(24,95%,53%)",
    colorLight: "hsla(24,95%,53%,0.12)",
    icon: Dumbbell,
    features: [
      "Musculação",
      "Lutas",
      "Ginástica (Pendente Confirmação)",
      "Pilates",
      "Yoga",
    ],
    popular: true,
    description: "Acesso completo a todas as atividades terrestres. Válido para 1 atividade apenas.",
  },
  {
    name: "Hidro",
    tagline: "Hidroginástica 2x/semana",
    color: "hsl(185,80%,45%)",
    colorLight: "hsla(185,80%,45%,0.12)",
    icon: Droplets,
    features: [
      "Hidroginástica 2x por semana",
      "Ambiente aquático climatizado",
    ],
    description: "Perfeito para quem busca exercícios na água.",
  },
  {
    name: "Água",
    tagline: "Natação adulto ou infantil",
    color: "hsl(200,90%,50%)",
    colorLight: "hsla(200,90%,50%,0.12)",
    icon: Waves,
    features: [
      "Natação adulto ou infantil",
      "2x por semana",
      "Piscina aquecida e tratada",
    ],
    description: "Aulas de natação para todas as idades.",
  },
  {
    name: "Ginástica",
    tagline: "Breve novidades",
    color: "hsl(0,0%,40%)",
    colorLight: "hsla(0,0%,40%,0.12)",
    icon: Check,
    features: [],
    description: "Novas modalidades de ginástica chegando em breve.",
    disabled: true,
  },
];

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20planos%20da%20Flipper";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Planos() {
  return (
    <Layout>
      <SEOHead
        title="Planos - Academia Flipper | Brooklin SP"
        description="Conheça os planos da Academia Flipper: Uno, Terra, Hidro e Água. Musculação, natação, lutas e muito mais no Brooklin."
        path="/planos"
      />
      <PageTransition>
        <section className="relative overflow-hidden min-h-screen">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, hsl(185,70%,92%) 0%, hsl(195,60%,50%) 15%, hsl(210,78%,22%) 40%, hsl(215,80%,12%) 70%, hsl(218,82%,9%) 100%)`,
            }}
          />

          {/* Decorative ripples */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-[10%] right-[10%] w-[400px] h-[400px] rounded-full opacity-[0.04]"
              style={{ background: "radial-gradient(circle, hsl(185,80%,70%), transparent 70%)" }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
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
              <span className="text-white/70 font-medium">Planos</span>
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
                <Zap size={14} style={{ color: "hsl(185,80%,55%)" }} />
                <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: "hsl(185,80%,65%)" }}>
                  Nossos Planos
                </span>
              </motion.div>

              <motion.h1
                className="font-display text-4xl lg:text-6xl font-bold mb-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 60 }}
              >
                <span className="text-white">Conheça os </span>
                <span className="relative inline-block">
                  <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, hsl(185,80%,55%), hsl(200,90%,60%))" }}>
                    Planos
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
                Encontre o plano ideal para o seu estilo de vida. Todos incluem acesso à nossa estrutura completa.
              </motion.p>
            </div>

            {/* Plans grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 max-w-7xl mx-auto mb-14"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {plans.map((plan) => (
                <motion.div
                  key={plan.name}
                  variants={{
                    hidden: { opacity: 0, y: 40, scale: plan.popular ? 0.88 : (plan.disabled ? 0.95 : 0.92) },
                    visible: cardVariants.visible
                  }}
                  whileHover={!plan.disabled ? { y: -8, transition: { duration: 0.3 } } : {}}
                  className={`group relative ${plan.disabled ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
                >
                  {plan.popular && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 text-[10px] font-bold tracking-wider uppercase px-4 py-1 rounded-full text-white"
                      style={{ background: plan.color, boxShadow: `0 4px 16px ${plan.colorLight}` }}
                    >
                      Mais Popular
                    </div>
                  )}
                  {plan.disabled && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 text-[10px] font-bold tracking-wider uppercase px-4 py-1 rounded-full text-white bg-slate-600 whitespace-nowrap whitespace-nowrap shadow-lg"
                    >
                      Em breve — em atualização
                    </div>
                  )}
                  
                  <div
                    className="rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 relative"
                    style={{
                      background: "hsla(190,60%,95%,0.08)",
                      backdropFilter: "blur(24px)",
                      WebkitBackdropFilter: "blur(24px)",
                      border: plan.popular
                        ? `1px solid ${plan.color}40`
                        : "1px solid hsla(185,80%,70%,0.1)",
                      boxShadow: plan.popular
                        ? `0 12px 48px ${plan.colorLight}, inset 0 1px 0 hsla(0,0%,100%,0.08)`
                        : "0 8px 32px hsla(0,0%,0%,0.12), inset 0 1px 0 hsla(0,0%,100%,0.05)",
                    }}
                  >
                    {/* Hover glow */}
                    {!plan.disabled && (
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ background: `radial-gradient(circle at 50% 20%, ${plan.colorLight}, transparent 70%)` }}
                      />
                    )}

                    <div className="p-6 flex-1 flex flex-col relative z-10">
                      {/* Icon */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                        style={{ background: plan.colorLight }}
                      >
                        <plan.icon size={22} style={{ color: plan.color }} />
                      </div>

                      <p className="text-[10px] font-bold tracking-wider uppercase mb-1" style={{ color: plan.color }}>
                        Plano
                      </p>
                      <h2 className="font-display text-2xl font-bold text-white mb-1">{plan.name}</h2>
                      <p className="text-white/40 text-sm mb-5">{plan.tagline}</p>

                      {/* Features */}
                      <ul className="space-y-2.5 mb-6 flex-1">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm text-white/60">
                            <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: plan.color }} />
                            {f}
                          </li>
                        ))}
                        {plan.disabled && (
                          <li className="flex items-start gap-2 text-sm text-white/50 italic">
                            Detalhes serão anunciados em breve.
                          </li>
                        )}
                      </ul>

                      <p className="text-white/30 text-xs leading-relaxed">{plan.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <p className="text-white/40 text-sm mb-4">
                Valores e condições especiais? Fale com a gente!
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-white transition-all hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, hsl(185,80%,40%), hsl(200,90%,45%))",
                  boxShadow: "0 4px 24px hsla(185,80%,40%,0.3), inset 0 1px 0 hsla(0,0%,100%,0.15)",
                }}
              >
                <Phone size={18} />
                Falar pelo WhatsApp
                <ArrowRight size={14} className="opacity-60" />
              </a>
            </motion.div>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
}
