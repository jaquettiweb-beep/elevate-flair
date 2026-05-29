import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import { Link } from "react-router-dom";
import { ChevronRight, Dumbbell, Droplets, Waves, Zap, Phone, ArrowRight, HeartPulse, Sparkles, Crown } from "lucide-react";
import { motion } from "framer-motion";

type Prices = {
  anual: number;
  semestral: number;
  mensal: number;
};

type Tier = {
  label?: string;
  prices: Prices;
};

type Plan = {
  name: string;
  tagline: string;
  color: string;
  colorLight: string;
  icon: typeof Zap;
  tiers: Tier[];
  popular?: boolean;
};

const MATRICULA = 188;

const plans: Plan[] = [
  {
    name: "Uno",
    tagline: "Escolha sua atividade: musculação, 1 luta 1x por semana ou ginástica",
    color: "hsl(221,83%,53%)",
    colorLight: "hsla(221,83%,53%,0.12)",
    icon: Zap,
    tiers: [{ prices: { anual: 233, semestral: 251, mensal: 305 } }],
  },
  {
    name: "Terra",
    tagline: "Atividade terrestre adulto e kids",
    color: "hsl(24,95%,53%)",
    colorLight: "hsla(24,95%,53%,0.12)",
    icon: Dumbbell,
    popular: true,
    tiers: [{ prices: { anual: 431, semestral: 458, mensal: 530 } }],
  },
  {
    name: "Hidro",
    tagline: "Hidroginástica até 2x por semana",
    color: "hsl(185,80%,45%)",
    colorLight: "hsla(185,80%,45%,0.12)",
    icon: Droplets,
    tiers: [{ prices: { anual: 476, semestral: 503, mensal: 584 } }],
  },
  {
    name: "Água",
    tagline: "Natação adulto ou infantil",
    color: "hsl(200,90%,50%)",
    colorLight: "hsla(200,90%,50%,0.12)",
    icon: Waves,
    tiers: [
      { label: "Natação 1x", prices: { anual: 422, semestral: 485, mensal: 611 } },
      { label: "Natação 2x", prices: { anual: 566, semestral: 593, mensal: 710 } },
    ],
  },
  {
    name: "60+ Saúde",
    tagline: "Aulas exclusivas para 60+",
    color: "hsl(142,65%,45%)",
    colorLight: "hsla(142,65%,45%,0.12)",
    icon: HeartPulse,
    tiers: [{ prices: { anual: 485, semestral: 539, mensal: 584 } }],
  },
  {
    name: "Pilates",
    tagline: "Para você aproveitar o melhor do nosso Pilates Studio",
    color: "hsl(280,70%,58%)",
    colorLight: "hsla(280,70%,58%,0.12)",
    icon: Sparkles,
    tiers: [
      { label: "1x na semana", prices: { anual: 458, semestral: 548, mensal: 602 } },
      { label: "2x na semana", prices: { anual: 593, semestral: 683, mensal: 755 } },
      { label: "3x na semana", prices: { anual: 704, semestral: 781, mensal: 854 } },
    ],
  },
];

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20plano%20";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function formatPrice(price: number) {
  return price.toLocaleString("pt-BR");
}

const cycleLabels: { key: keyof Prices; title: string; sub: string }[] = [
  { key: "anual", title: "Anual", sub: "1 + 11 parcelas" },
  { key: "semestral", title: "Semestral", sub: "1 + 5 parcelas" },
  { key: "mensal", title: "Mensal", sub: "à vista" },
];

function PriceTable({ prices, color }: { prices: Prices; color: string }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid hsla(185,80%,70%,0.1)" }}>
      {cycleLabels.map((c, i) => (
        <div
          key={c.key}
          className="flex items-center justify-between gap-3 px-4 py-3"
          style={{
            background: i % 2 === 0 ? "hsla(190,60%,95%,0.04)" : "transparent",
          }}
        >
          <div className="flex flex-col">
            <span className="text-white text-sm font-semibold">{c.title}</span>
            <span className="text-white/40 text-[11px]">{c.sub}</span>
          </div>
          <span className="text-lg font-display font-bold" style={{ color }}>
            R$ {formatPrice(prices[c.key])}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Planos() {
  return (
    <Layout>
      <SEOHead
        title="Planos e Valores | Academia Flipper Brooklin SP"
        description="Confira os planos da Academia Flipper: musculação, lutas, natação, hidroginástica, pilates e 60+. Valores anual, semestral e mensal."
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
                <Crown size={14} style={{ color: "hsl(185,80%,55%)" }} />
                <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: "hsl(185,80%,65%)" }}>
                  Nossos Planos
                </span>
              </motion.div>

              <motion.h1
                className="font-display text-3xl sm:text-4xl lg:text-6xl font-bold mb-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 60 }}
              >
                <span className="text-white">Planos e </span>
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, hsl(185,80%,55%), hsl(200,90%,60%))" }}>
                  Valores
                </span>
              </motion.h1>

              <motion.p
                className="text-white/50 max-w-xl mx-auto text-base sm:text-lg"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Escolha o plano ideal para você. Matrícula única de R$ {MATRICULA} em todos os planos.
              </motion.p>
            </div>

            {/* Plans grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-14"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {plans.map((plan) => (
                <motion.div
                  key={plan.name}
                  variants={cardVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group relative"
                >
                  {plan.popular && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 text-[10px] font-bold tracking-wider uppercase px-4 py-1 rounded-full text-white"
                      style={{ background: plan.color, boxShadow: `0 4px 16px ${plan.colorLight}` }}
                    >
                      Mais Popular
                    </div>
                  )}

                  <div
                    className="rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 relative"
                    style={{
                      background: "hsla(190,60%,95%,0.08)",
                      backdropFilter: "blur(24px)",
                      WebkitBackdropFilter: "blur(24px)",
                      border: plan.popular ? `2px solid ${plan.color}60` : "1px solid hsla(185,80%,70%,0.1)",
                      boxShadow: plan.popular
                        ? `0 12px 48px ${plan.colorLight}, inset 0 1px 0 hsla(0,0%,100%,0.08)`
                        : "0 8px 32px hsla(0,0%,0%,0.12), inset 0 1px 0 hsla(0,0%,100%,0.05)",
                    }}
                  >
                    <div className="p-6 flex-1 flex flex-col relative z-10">
                      {/* Header */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                        style={{ background: plan.colorLight }}
                      >
                        <plan.icon size={22} style={{ color: plan.color }} />
                      </div>

                      <p className="text-[10px] font-bold tracking-wider uppercase mb-1" style={{ color: plan.color }}>
                        Plano
                      </p>
                      <h2 className="font-display text-2xl font-bold text-white mb-2">{plan.name}</h2>
                      <p className="text-white/45 text-sm mb-5 min-h-[40px]">{plan.tagline}</p>

                      {/* Tiers */}
                      <div className="space-y-4 flex-1">
                        {plan.tiers.map((tier, ti) => (
                          <div key={ti}>
                            {tier.label && (
                              <p
                                className="text-xs font-bold uppercase tracking-wider mb-2 px-1"
                                style={{ color: plan.color }}
                              >
                                {tier.label}
                              </p>
                            )}
                            <PriceTable prices={tier.prices} color={plan.color} />
                          </div>
                        ))}
                      </div>

                      <p className="text-white/35 text-[11px] mt-4 mb-4">
                        Matrícula: R$ {MATRICULA}
                      </p>

                      {/* CTA */}
                      <a
                        href={`${WHATSAPP_URL}${plan.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-center py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] active:scale-95"
                        style={{
                          background: plan.popular ? plan.color : "transparent",
                          color: plan.popular ? "white" : plan.color,
                          border: plan.popular ? "none" : `1.5px solid ${plan.color}50`,
                          boxShadow: plan.popular ? `0 4px 16px ${plan.colorLight}` : "none",
                        }}
                      >
                        Quero o plano {plan.name}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-white/50 text-sm mb-2">
                Não tem certeza qual plano é ideal? Fale com a gente!
              </p>
              <p className="text-white/30 text-xs mb-5">
                Responderemos em até 2 horas úteis via WhatsApp
              </p>
              <a
                href={`${WHATSAPP_URL}ideal`}
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
