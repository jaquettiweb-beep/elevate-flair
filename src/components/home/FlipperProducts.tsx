import { motion } from "framer-motion";
import { ShoppingBag, Shirt } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

import sungaImg from "@/assets/produtos/sunga.jpeg";
import bolsaImg from "@/assets/produtos/bolsa.jpeg";
import maioImg from "@/assets/produtos/maio.jpeg";
import sacochilaImg from "@/assets/produtos/sacochila.jpeg";
import sungaBoxerImg from "@/assets/produtos/sunga-boxer.jpeg";
import toucasImg from "@/assets/produtos/toucas.jpeg";

const products = [
  { name: "Sunga", image: sungaImg },
  { name: "Bolsa", image: bolsaImg },
  { name: "Maiô", image: maioImg },
  { name: "Sacochila", image: sacochilaImg },
  { name: "Sunga Boxer", image: sungaBoxerImg },
  { name: "Toucas de Natação", image: toucasImg },
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
          {products.map((product) => (
            <ScrollReveal key={product.name}>
              <motion.div
                className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl overflow-hidden text-center group hover:border-secondary/50 transition-all duration-300"
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 lg:p-4">
                  <h3 className="font-display font-bold text-foreground text-sm lg:text-base group-hover:text-secondary transition-colors">
                    {product.name}
                  </h3>
                </div>
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
