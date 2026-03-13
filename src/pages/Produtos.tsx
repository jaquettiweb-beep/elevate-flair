import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import { Link } from "react-router-dom";
import { ChevronRight, ShoppingBag, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

const products = [
  { name: "Sunga", emoji: "🩲", desc: "Modelos adulto e infantil" },
  { name: "Bolsa", emoji: "👜", desc: "Prática e resistente" },
  { name: "Maiô", emoji: "👙", desc: "Conforto para suas aulas" },
  { name: "Sacochila", emoji: "🎒", desc: "Leve e espaçosa" },
  { name: "Sunga Boxer", emoji: "🩳", desc: "Modelo confortável" },
  { name: "Toucas de Natação", emoji: "🏊", desc: "Silicone e lycra" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 70, damping: 18 },
  },
};

export default function Produtos() {
  return (
    <Layout>
      <SEOHead
        title="Produtos Flipper - Acessórios para Natação e Treino"
        description="Confira os produtos exclusivos da Academia Flipper: sungas, maiôs, bolsas, sacochila e toucas de natação. Compras na recepção."
        path="/produtos"
      />
      <PageTransition>
        <section className="relative overflow-hidden min-h-screen">
          {/* Background */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, hsl(210, 78%, 22%) 0%, hsl(212, 76%, 16%) 30%, hsl(215, 80%, 12%) 60%, hsl(218, 82%, 9%) 100%)`,
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
              <span className="text-white/70 font-medium">Produtos</span>
            </motion.nav>

            {/* Header */}
            <div className="text-center mb-16">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                style={{
                  background: "hsla(24,95%,53%,0.1)",
                  border: "1px solid hsla(24,95%,53%,0.2)",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 }}
              >
                <ShoppingBag size={14} style={{ color: "hsl(24,95%,53%)" }} />
                <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: "hsl(24,95%,65%)" }}>
                  Loja Flipper
                </span>
              </motion.div>

              <motion.h1
                className="font-display text-4xl lg:text-6xl font-bold text-white mb-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 60 }}
              >
                Produtos{" "}
                <span className="relative inline-block">
                  <span className="text-secondary">Flipper</span>
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                    style={{ background: "linear-gradient(90deg, hsl(24,95%,53%), hsl(15,90%,50%))" }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                  />
                </span>
              </motion.h1>

              <motion.p
                className="text-white/50 max-w-lg mx-auto text-lg"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Tudo o que você precisa para suas aulas, disponível diretamente na nossa recepção.
              </motion.p>
            </div>

            {/* Products grid */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6 max-w-3xl mx-auto mb-16"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {products.map((product) => (
                <motion.div
                  key={product.name}
                  variants={cardVariants}
                  whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.3 } }}
                  className="group relative cursor-default"
                >
                  <div
                    className="relative rounded-2xl p-6 lg:p-8 text-center overflow-hidden transition-all duration-300"
                    style={{
                      background: "hsla(190,60%,95%,0.06)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid hsla(185,80%,70%,0.1)",
                      boxShadow: "0 8px 32px hsla(0,0%,0%,0.12), inset 0 1px 0 hsla(0,0%,100%,0.05)",
                    }}
                  >
                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "radial-gradient(circle at 50% 30%, hsla(24,95%,53%,0.08), transparent 70%)" }}
                    />

                    {/* Emoji container */}
                    <motion.div
                      className="relative w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
                      style={{
                        background: "hsla(24,95%,53%,0.08)",
                        border: "1px solid hsla(24,95%,53%,0.12)",
                      }}
                      whileHover={{ rotate: [0, -6, 6, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <span className="text-3xl">{product.emoji}</span>
                    </motion.div>

                    <h2 className="font-display font-bold text-white text-base lg:text-lg mb-1 group-hover:text-secondary transition-colors duration-300">
                      {product.name}
                    </h2>
                    <p className="text-white/40 text-xs lg:text-sm">{product.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Info cards */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div
                className="flex-1 flex items-center gap-4 px-6 py-4 rounded-xl"
                style={{
                  background: "hsla(185,80%,45%,0.06)",
                  border: "1px solid hsla(185,80%,45%,0.12)",
                }}
              >
                <MapPin size={20} className="text-secondary flex-shrink-0" />
                <div>
                  <p className="text-white font-semibold text-sm">Compre na Recepção</p>
                  <p className="text-white/40 text-xs">Disponível durante o horário de funcionamento</p>
                </div>
              </div>
              <motion.a
                href="https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Gostaria%20de%20saber%20sobre%20os%20produtos%20da%20Flipper"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center gap-4 px-6 py-4 rounded-xl transition-colors"
                style={{
                  background: "hsla(24,95%,53%,0.08)",
                  border: "1px solid hsla(24,95%,53%,0.15)",
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone size={20} className="text-secondary flex-shrink-0" />
                <div>
                  <p className="text-white font-semibold text-sm">Dúvidas? Fale Conosco</p>
                  <p className="text-white/40 text-xs">WhatsApp disponível</p>
                </div>
              </motion.a>
            </motion.div>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
}
