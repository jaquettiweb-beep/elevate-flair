import { motion } from "framer-motion";
import { ShoppingBag, Shirt } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const products = [
  { name: "Sunga", emoji: "🩲" },
  { name: "Bolsa", emoji: "👜" },
  { name: "Maiô", emoji: "👙" },
  { name: "Sacochila", emoji: "🎒" },
  { name: "Sunga Boxer", emoji: "🩳" },
  { name: "Toucas de Natação", emoji: "🏊" },
];

export default function FlipperProducts() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-secondary/15 border border-secondary/30 rounded-full px-5 py-2 mb-6">
              <ShoppingBag className="w-4 h-4 text-secondary" />
              <span className="text-secondary text-sm font-semibold">Loja Flipper</span>
            </div>
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Produtos <span className="text-secondary">Flipper</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-lg">
              Tudo o que você precisa para suas aulas, disponível na nossa recepção.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6 mb-10">
          {products.map((product, i) => (
            <ScrollReveal key={product.name}>
              <motion.div
                className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-6 text-center group hover:border-secondary/50 transition-all duration-300"
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="text-4xl mb-3">{product.emoji}</div>
                <h3 className="font-display font-bold text-foreground text-sm lg:text-base group-hover:text-secondary transition-colors">
                  {product.name}
                </h3>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/25 rounded-xl px-6 py-3">
              <Shirt className="w-5 h-5 text-secondary" />
              <span className="text-foreground font-medium text-sm">
                Compras diretamente na recepção
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
