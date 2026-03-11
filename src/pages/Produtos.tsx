import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { ChevronRight, ShoppingBag, Shirt } from "lucide-react";
import { motion } from "framer-motion";

const products = [
  { name: "Sunga", emoji: "🩲" },
  { name: "Bolsa", emoji: "👜" },
  { name: "Maiô", emoji: "👙" },
  { name: "Sacochila", emoji: "🎒" },
  { name: "Sunga Boxer", emoji: "🩳" },
  { name: "Toucas de Natação", emoji: "🏊" },
];

export default function Produtos() {
  return (
    <Layout>
      <SEOHead
        title="Produtos Flipper - Acessórios para Natação e Treino"
        description="Confira os produtos exclusivos da Academia Flipper: sungas, maiôs, bolsas, sacochila e toucas de natação. Compras na recepção."
        path="/produtos"
      />
      <PageTransition>
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, hsl(205, 72%, 55%) 0%, hsl(210, 75%, 30%) 50%, hsl(215, 80%, 14%) 100%)`,
            }}
          />
          <div className="container mx-auto px-4 relative z-10">
            <ScrollReveal>
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                <Link to="/" className="hover:text-secondary transition-colors">Início</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-foreground font-medium">Produtos</span>
              </nav>
            </ScrollReveal>

            <ScrollReveal>
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 bg-secondary/15 border border-secondary/30 rounded-full px-5 py-2 mb-6">
                  <ShoppingBag className="w-4 h-4 text-secondary" />
                  <span className="text-secondary text-sm font-semibold">Loja Flipper</span>
                </div>
                <h1 className="font-display text-4xl lg:text-6xl font-bold text-foreground mb-6">
                  Produtos <span className="text-secondary">Flipper</span>
                </h1>
                <p className="text-muted-foreground max-w-xl mx-auto text-lg">
                  Tudo o que você precisa para suas aulas, disponível diretamente na nossa recepção.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 max-w-3xl mx-auto mb-14">
              {products.map((product) => (
                <ScrollReveal key={product.name}>
                  <motion.div
                    className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-8 text-center group hover:border-secondary/50 transition-all duration-300"
                    whileHover={{ y: -8, scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="text-5xl mb-4">{product.emoji}</div>
                    <h2 className="font-display font-bold text-foreground text-lg group-hover:text-secondary transition-colors">
                      {product.name}
                    </h2>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal>
              <div className="text-center">
                <div className="inline-flex items-center gap-3 bg-card/60 backdrop-blur-sm border border-border rounded-2xl px-8 py-5">
                  <Shirt className="w-6 h-6 text-secondary" />
                  <span className="text-foreground font-semibold">
                    Compras diretamente na recepção da academia
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
}
