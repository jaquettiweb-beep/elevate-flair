import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import { Link } from "react-router-dom";
import { ChevronRight, CalendarX, Bell, Instagram } from "lucide-react";
import { motion } from "framer-motion";

export default function Eventos() {
  return (
    <Layout>
      <SEOHead
        title="Eventos - Academia Flipper | Brooklin SP"
        description="Fique por dentro dos próximos eventos da Academia Flipper no Brooklin. Acompanhe nossas redes sociais."
        path="/eventos"
      />
      <PageTransition>
        <section className="relative overflow-hidden min-h-screen">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, hsl(185,70%,92%) 0%, hsl(195,60%,50%) 15%, hsl(210,78%,22%) 40%, hsl(215,80%,12%) 70%, hsl(218,82%,9%) 100%)`,
            }}
          />

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
              <span className="text-white/70 font-medium">Eventos</span>
            </motion.nav>

            {/* Header */}
            <div className="text-center mb-14">
              <motion.h1
                className="font-display text-4xl lg:text-6xl font-bold mb-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 60 }}
              >
                <span className="text-white">Nossos </span>
                <span className="relative inline-block">
                  <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, hsl(185,80%,55%), hsl(200,90%,60%))" }}>
                    Eventos
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
            </div>

            {/* Empty state */}
            <motion.div
              className="max-w-lg mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring" as const, stiffness: 60 }}
            >
              <div
                className="rounded-2xl p-10 lg:p-14"
                style={{
                  background: "hsla(190,60%,95%,0.08)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid hsla(185,80%,70%,0.12)",
                  boxShadow: "0 12px 48px hsla(0,0%,0%,0.15), inset 0 1px 0 hsla(0,0%,100%,0.06)",
                }}
              >
                <CalendarX size={40} className="mx-auto mb-4 text-white/20" />

                <h2 className="font-display text-xl font-bold text-white mb-3">
                  Nenhum evento no momento
                </h2>
                <p className="text-white/40 text-sm mb-8 leading-relaxed">
                  Estamos preparando novidades incríveis! Siga nossas redes sociais para ficar por dentro dos próximos eventos.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href="https://www.instagram.com/academiaflipper/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all hover:scale-105 active:scale-95 text-sm"
                    style={{
                      background: "linear-gradient(135deg, hsl(330,80%,50%), hsl(24,95%,53%))",
                      boxShadow: "0 4px 20px hsla(330,80%,50%,0.25)",
                    }}
                  >
                    <Instagram size={16} />
                    Seguir no Instagram
                  </a>
                  <div
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white/50 text-xs"
                    style={{ background: "hsla(185,80%,45%,0.08)", border: "1px solid hsla(185,80%,45%,0.12)" }}
                  >
                    <Bell size={12} />
                    Em breve novidades
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
}
