import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import { Link } from "react-router-dom";
import { ChevronRight, Dumbbell, Droplets, Waves, Zap, Phone, ArrowRight, HeartPulse, Sparkles, Crown, Star } from "lucide-react";
import { motion } from "framer-motion";

type Plan = {
  name: string;
  description: string;
  color: string;
  colorLight: string;
  icon: typeof Zap;
  popular?: boolean;
  exclusive?: boolean;
};

const plans: Plan[] = [
  {
    name: "Uno",
    description:
      "O ponto de partida perfeito para quem quer começar com clareza. Musculação, luta ou ginástica — você escolhe o que faz mais sentido pra você e treina com toda a estrutura e acompanhamento da Flipper.",
    color: "hsl(221,83%,53%)",
    colorLight: "hsla(221,83%,53%,0.12)",
    icon: Zap,
  },
  {
    name: "Terra",
    description:
      "Para quem quer mais liberdade de escolha sem abrir mão de qualidade. Atividades terrestres da academia em um único plano, para adultos e crianças.",
    color: "hsl(24,95%,53%)",
    colorLight: "hsla(24,95%,53%,0.12)",
    icon: Dumbbell,
    popular: true,
  },
  {
    name: "Hidro",
    description:
      "Movimento sem impacto, resultado com consistência. A hidroginástica até duas vezes por semana é a escolha ideal para quem quer cuidar do corpo e da saúde de um jeito leve e prazeroso.",
    color: "hsl(185,80%,45%)",
    colorLight: "hsla(185,80%,45%,0.12)",
    icon: Droplets,
  },
  {
    name: "Água",
    description:
      "Natação para adultos ou crianças, com toda a qualidade e estrutura que só a Flipper oferece. De bebês aos adultos, a piscina da Flipper tem espaço para todos.",
    color: "hsl(200,90%,50%)",
    colorLight: "hsla(200,90%,50%,0.12)",
    icon: Waves,
  },
  {
    name: "60+ Saúde",
    description:
      "Criado com muito cuidado para quem tem mais de 60 anos e quer viver com mais energia, independência e qualidade de vida. Aulas exclusivas com foco em fortalecimento, equilíbrio e funcionalidade — porque envelhecer bem é uma conquista que se constrói todos os dias. Um programa único que você só encontra aqui.",
    color: "hsl(142,65%,45%)",
    colorLight: "hsla(142,65%,45%,0.12)",
    icon: HeartPulse,
    exclusive: true,
  },
  {
    name: "Pilates",
    description:
      "Para quem quer transformar a relação com o próprio corpo. Nosso Pilates Studio completo oferece uma prática que vai além da técnica — é sobre postura, consciência corporal e bem-estar que você carrega pra vida toda.",
    color: "hsl(280,70%,58%)",
    colorLight: "hsla(280,70%,58%,0.12)",
    icon: Sparkles,
  },
];

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20plano%20";

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
                Escolha o plano ideal para você e fale com a gente para conhecer os valores.
              </motion.p>
            </div>

            {/* Plans grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-14"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
            >
              {plans.map((plan) => (
                <motion.div
                  key={plan.name}
                  variants={{
                    hidden: { opacity: 0, y: 40, scale: 0.94 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.5, ease: "easeOut" as const },
                    },
                  }}
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

                  {plan.exclusive && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 text-[10px] font-bold tracking-wider uppercase px-4 py-1 rounded-full text-white flex items-center gap-1"
                      style={{ background: plan.color, boxShadow: `0 4px 16px ${plan.colorLight}` }}
                    >
                      <Star size={10} />
                      Exclusivo da Academia Flipper
                    </div>
                  )}

                  <div
                    className="rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 relative"
                    style={{
                      background: "hsla(190,60%,95%,0.08)",
                      backdropFilter: "blur(24px)",
                      WebkitBackdropFilter: "blur(24px)",
                      border: plan.popular || plan.exclusive ? `2px solid ${plan.color}60` : "1px solid hsla(185,80%,70%,0.1)",
                      boxShadow: plan.popular || plan.exclusive
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
                      <h2 className="font-display text-2xl font-bold text-white mb-3">{plan.name}</h2>
                      <p className="text-white/60 text-sm leading-relaxed mb-6 flex-1">{plan.description}</p>

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
