import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import { Link } from "react-router-dom";
import { ChevronRight, Dumbbell, Droplets, Waves, Zap, Check, Minus, Phone, ArrowRight, Star, Calendar, Users, Crown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type PlanFeature = {
  text: string;
  badge?: string;
};

type Plan = {
  name: string;
  tagline: string;
  color: string;
  colorLight: string;
  icon: typeof Zap;
  features: PlanFeature[];
  description: string;
  price?: {
    monthly: number;
    quarterly: number;
  };
  bestFor?: string;
  popular?: boolean;
  disabled?: boolean;
  testimonial?: {
    text: string;
    author: string;
  };
};

const plans: Plan[] = [
  {
    name: "Uno",
    tagline: "Comece sua jornada",
    color: "hsl(221,83%,53%)",
    colorLight: "hsla(221,83%,53%,0.12)",
    icon: Zap,
    features: [
      { text: "Musculação ilimitada" },
      { text: "1 Luta 1x por semana" },
      { text: "Avaliação física gratuita", badge: "Incluso" },
    ],
    description: "Ideal para quem quer começar com foco em uma modalidade.",
    price: { monthly: 189.90, quarterly: 169.90 },
    bestFor: "Iniciantes e quem quer experimentar",
  },
  {
    name: "Terra",
    tagline: "Nosso plano mais completo",
    color: "hsl(24,95%,53%)",
    colorLight: "hsla(24,95%,53%,0.12)",
    icon: Dumbbell,
    features: [
      { text: "Musculação ilimitada" },
      { text: "Todas as lutas ilimitadas" },
      { text: "Yoga, Pilates, Ginástica" },
      { text: "Aulas coletivas incluídas", badge: "Premium" },
    ],
    popular: true,
    description: "Acesso completo a todas as atividades terrestres com liberdade total.",
    price: { monthly: 289.90, quarterly: 259.90 },
    bestFor: "Quem quer variedade e resultados rápidos",
    testimonial: {
      text: "Melhor custo-benefício! Faço musculação e jiu jitsu sem pagar nada a mais.",
      author: "Rafael M.",
    },
  },
  {
    name: "Hidro",
    tagline: "Exercícios na água",
    color: "hsl(185,80%,45%)",
    colorLight: "hsla(185,80%,45%,0.12)",
    icon: Droplets,
    features: [
      { text: "Hidroginástica 2x por semana" },
      { text: "Piscina aquecida climatizada" },
      { text: "Ideal para articulações", badge: "60+" },
    ],
    description: "Perfeito para quem busca exercícios de baixo impacto na água.",
    price: { monthly: 179.90, quarterly: 159.90 },
    bestFor: "60+ e quem busca baixo impacto",
  },
  {
    name: "Água",
    tagline: "Natação para todas as idades",
    color: "hsl(200,90%,50%)",
    colorLight: "hsla(200,90%,50%,0.12)",
    icon: Waves,
    features: [
      { text: "Natação adulto ou infantil" },
      { text: "2x por semana" },
      { text: "Piscina semiolímpica aquecida" },
    ],
    description: "Aulas de natação do bebê ao adulto com professores certificados.",
    price: { monthly: 199.90, quarterly: 179.90 },
    bestFor: "Famílias e quem quer aprender a nadar",
  },
  {
    name: "Ginástica",
    tagline: "Em breve — novidades",
    color: "hsl(0,0%,40%)",
    colorLight: "hsla(0,0%,40%,0.12)",
    icon: Check,
    features: [],
    description: "Novas modalidades de ginástica chegando em breve.",
    disabled: true,
  },
];

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20plano%20";

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

// Comparison table data
type ComparisonRow = {
  feature: string;
  uno: string;
  terra: string;
  agua: string;
  hidro: string;
};

const comparisonData: ComparisonRow[] = [
  { feature: "Musculação", uno: "✓", terra: "✓", agua: "—", hidro: "—" },
  { feature: "Lutas (Jiu Jitsu, Muay Thai…)", uno: "1x/sem", terra: "Ilimitado", agua: "—", hidro: "—" },
  { feature: "Yoga, Pilates, Ginástica", uno: "—", terra: "✓", agua: "—", hidro: "—" },
  { feature: "Natação (Adulto/Infantil)", uno: "—", terra: "—", agua: "2x/sem", hidro: "—" },
  { feature: "Hidroginástica", uno: "—", terra: "—", agua: "—", hidro: "2x/sem" },
  { feature: "Avaliação Física", uno: "✓", terra: "✓", agua: "✓", hidro: "✓" },
  { feature: "Aulas Coletivas", uno: "—", terra: "✓", agua: "—", hidro: "—" },
];

function formatPrice(price: number) {
  return price.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function Planos() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly">("monthly");

  return (
    <Layout>
      <SEOHead
        title="Planos de Natação e Musculação Brooklin SP a partir de R$179 | Academia Flipper"
        description="Planos de academia com natação, musculação e 14+ modalidades no Brooklin. A partir de R$179,90/mês. 5.000+ alunos. Aula experimental grátis. Agende agora!"
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
            <div className="text-center mb-10">
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
                <span className="text-white">Seu Plano Perfeito </span>
                <span className="relative inline-block">
                  <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, hsl(185,80%,55%), hsl(200,90%,60%))" }}>
                    a Partir de R$ 179,90
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
                className="text-white/50 max-w-xl mx-auto text-base sm:text-lg"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Compare, escolha e comece sua transformação. Todos os planos incluem aula experimental grátis e avaliação física.
              </motion.p>

              {/* Billing toggle */}
              <motion.div
                className="flex items-center justify-center gap-3 mt-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    billingCycle === "monthly"
                      ? "bg-white/15 text-white border border-white/20"
                      : "text-white/40 border border-transparent hover:text-white/60"
                  }`}
                >
                  Mensal
                </button>
                <button
                  onClick={() => setBillingCycle("quarterly")}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                    billingCycle === "quarterly"
                      ? "bg-white/15 text-white border border-white/20"
                      : "text-white/40 border border-transparent hover:text-white/60"
                  }`}
                >
                  Trimestral
                  <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-bold">
                    Economize 10%
                  </span>
                </button>
              </motion.div>
            </div>

            {/* Plans grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5 max-w-6xl mx-auto mb-14"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {plans.filter(p => !p.disabled).map((plan) => {
                const currentPrice = plan.price
                  ? billingCycle === "monthly" ? plan.price.monthly : plan.price.quarterly
                  : null;
                const monthlyPrice = plan.price?.monthly;
                const savings = plan.price && billingCycle === "quarterly"
                  ? ((plan.price.monthly - plan.price.quarterly) * 3).toFixed(0)
                  : null;

                return (
                  <motion.div
                    key={plan.name}
                    variants={{
                      hidden: { opacity: 0, y: 40, scale: plan.popular ? 0.88 : 0.92 },
                      visible: cardVariants.visible
                    }}
                    whileHover={!plan.disabled ? { y: -8, transition: { duration: 0.3 } } : {}}
                    className={`group relative ${plan.disabled ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
                  >
                    {plan.popular && (
                      <div
                        className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 text-[10px] font-bold tracking-wider uppercase px-4 py-1 rounded-full text-white flex items-center gap-1.5"
                        style={{ background: plan.color, boxShadow: `0 4px 16px ${plan.colorLight}` }}
                      >
                        <Star size={10} fill="currentColor" />
                        Mais Popular
                      </div>
                    )}

                    <div
                      className="rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 relative"
                      style={{
                        background: "hsla(190,60%,95%,0.08)",
                        backdropFilter: "blur(24px)",
                        WebkitBackdropFilter: "blur(24px)",
                        border: plan.popular
                          ? `2px solid ${plan.color}60`
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
                        <p className="text-white/40 text-sm mb-4">{plan.tagline}</p>

                        {/* Price */}
                        {currentPrice && (
                          <div className="mb-4">
                            <div className="flex items-baseline gap-1">
                              <span className="text-3xl font-display font-black text-white">
                                R$ {formatPrice(currentPrice)}
                              </span>
                              <span className="text-white/30 text-sm">/mês</span>
                            </div>
                            {billingCycle === "quarterly" && savings && (
                              <p className="text-green-400 text-xs font-semibold mt-1">
                                Economize R$ {savings} no trimestre
                              </p>
                            )}
                          </div>
                        )}

                        {/* Best for */}
                        {plan.bestFor && (
                          <p className="text-white/50 text-xs mb-4 flex items-center gap-1.5">
                            <Users size={12} className="shrink-0" />
                            Melhor para: {plan.bestFor}
                          </p>
                        )}

                        {/* Features */}
                        <ul className="space-y-2.5 mb-5 flex-1">
                          {plan.features.map((f) => (
                            <li key={f.text} className="flex items-start gap-2 text-sm text-white/65">
                              <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: plan.color }} />
                              <span>{f.text}</span>
                              {f.badge && (
                                <span
                                  className="text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-1"
                                  style={{ background: plan.colorLight, color: plan.color }}
                                >
                                  {f.badge}
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>

                        {/* Testimonial mini */}
                        {plan.testimonial && (
                          <div
                            className="mb-4 p-3 rounded-lg text-xs"
                            style={{ background: `${plan.colorLight}`, border: `1px solid ${plan.color}20` }}
                          >
                            <p className="text-white/60 italic mb-1">"{plan.testimonial.text}"</p>
                            <p className="text-white/40 font-semibold">— {plan.testimonial.author}</p>
                          </div>
                        )}

                        {/* CTA */}
                        <a
                          href={`${WHATSAPP_URL}${plan.name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full text-center py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] active:scale-95"
                          style={{
                            background: plan.popular
                              ? plan.color
                              : "transparent",
                            color: plan.popular ? "white" : plan.color,
                            border: plan.popular ? "none" : `1.5px solid ${plan.color}50`,
                            boxShadow: plan.popular ? `0 4px 16px ${plan.colorLight}` : "none",
                          }}
                        >
                          Começar com {plan.name}
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* ─── Comparison Table ─── */}
            <motion.div
              className="max-w-5xl mx-auto mb-14"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-2xl font-bold text-white text-center mb-8">
                Compare os <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, hsl(185,80%,55%), hsl(200,90%,60%))" }}>Planos</span>
              </h2>

              <div className="overflow-x-auto rounded-2xl" style={{ background: "hsla(190,60%,95%,0.06)", border: "1px solid hsla(185,80%,70%,0.08)" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-white/50 font-medium">Benefício</th>
                      <th className="p-4 text-center">
                        <span className="text-white font-bold">Uno</span>
                      </th>
                      <th className="p-4 text-center relative">
                        <div className="flex items-center justify-center gap-1.5">
                          <span className="text-white font-bold">Terra</span>
                          <span className="text-[8px] bg-[hsl(24,95%,53%)] text-white px-1.5 py-0.5 rounded-full font-bold">POPULAR</span>
                        </div>
                      </th>
                      <th className="p-4 text-center">
                        <span className="text-white font-bold">Água</span>
                      </th>
                      <th className="p-4 text-center">
                        <span className="text-white font-bold">Hidro</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, i) => (
                      <tr key={row.feature} className={`border-b border-white/5 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}>
                        <td className="p-4 text-white/60">{row.feature}</td>
                        <td className="p-4 text-center">
                          <ComparisonCell value={row.uno} />
                        </td>
                        <td className="p-4 text-center bg-[hsl(24,95%,53%)]/[0.04]">
                          <ComparisonCell value={row.terra} highlight />
                        </td>
                        <td className="p-4 text-center">
                          <ComparisonCell value={row.agua} />
                        </td>
                        <td className="p-4 text-center">
                          <ComparisonCell value={row.hidro} />
                        </td>
                      </tr>
                    ))}
                    {/* Price row */}
                    <tr className="border-t-2 border-white/10">
                      <td className="p-4 text-white font-bold">Preço Mensal</td>
                      <td className="p-4 text-center text-white font-bold">R$ 189,90</td>
                      <td className="p-4 text-center text-white font-bold bg-[hsl(24,95%,53%)]/[0.04]">R$ 289,90</td>
                      <td className="p-4 text-center text-white font-bold">R$ 199,90</td>
                      <td className="p-4 text-center text-white font-bold">R$ 179,90</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
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

function ComparisonCell({ value, highlight }: { value: string; highlight?: boolean }) {
  if (value === "✓") {
    return <Check size={18} className={highlight ? "text-[hsl(24,95%,53%)] mx-auto" : "text-green-400 mx-auto"} />;
  }
  if (value === "—") {
    return <Minus size={16} className="text-white/15 mx-auto" />;
  }
  return <span className={`text-xs font-medium ${highlight ? "text-[hsl(24,95%,53%)]" : "text-white/60"}`}>{value}</span>;
}
