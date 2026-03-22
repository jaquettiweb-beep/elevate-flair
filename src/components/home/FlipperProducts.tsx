import { motion } from "framer-motion";
import { ShoppingBag, Shirt, Phone, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


import sungaImg from "@/assets/produtos/sunga.jpeg";
import bolsaImg from "@/assets/produtos/bolsa.jpeg";
import maioImg from "@/assets/produtos/maio.jpeg";
import sacochilaImg from "@/assets/produtos/sacochila.jpeg";
import sungaBoxerImg from "@/assets/produtos/sunga-boxer.jpeg";
import toucasImg from "@/assets/produtos/toucas.jpeg";

const products = [
  { name: "Sunga", category: "vestuario", image: sungaImg, desc: "Modelos adulto e infantil", fullDesc: "Sungas de alta durabilidade, resistentes ao cloro, ideais para treinos diários e lazer. Disponíveis em diversos tamanhos." },
  { name: "Sunga Boxer", category: "vestuario", image: sungaBoxerImg, desc: "Modelo confortável", fullDesc: "Corte boxer que oferece maior conforto e liberdade de movimento. Material tecnológico de secagem rápida." },
  { name: "Maiô", category: "vestuario", image: maioImg, desc: "Conforto para suas aulas", fullDesc: "Maiôs com excelente sustentação e recortes anatômicos para natação. Tecido com proteção UV e alta resistência." },
  { name: "Bolsa", category: "acessorios", image: bolsaImg, desc: "Prática e resistente", fullDesc: "Espaçosa e com compartimentos ideais para carregar seus itens de treino, toalha e troca de roupa." },
  { name: "Sacochila", category: "acessorios", image: sacochilaImg, desc: "Leve e espaçosa", fullDesc: "Praticidade para o dia a dia. Perfeita para levar o básico para a academia de forma leve ecompacta." },
  { name: "Toucas de Natação", category: "equipamentos", image: toucasImg, desc: "Silicone e lycra", fullDesc: "Toucas confortáveis que protegem o cabelo e melhoram o deslize na água. Opções em silicone selado ou lycra macia." },
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
              <Dialog>
                <DialogTrigger asChild>
                  <motion.div
                    className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl overflow-hidden text-center group hover:border-secondary/50 transition-all duration-300 cursor-pointer"
                    whileHover={{ y: -6, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="aspect-[3/4] overflow-hidden relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white text-xs font-semibold bg-secondary px-3 py-1.5 rounded-full flex items-center gap-1">
                          Ver <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                    <div className="p-3 lg:p-4">
                      <h3 className="font-display font-bold text-foreground text-sm lg:text-base group-hover:text-secondary transition-colors">
                        {product.name}
                      </h3>
                    </div>
                  </motion.div>
                </DialogTrigger>

                <DialogContent className="bg-slate-900/95 backdrop-blur-md border border-white/10 text-white max-w-lg rounded-2xl p-6 sm:p-8">
                  <DialogHeader className="p-0">
                    <DialogTitle className="font-display text-2xl font-bold text-white flex items-center gap-2 mb-2">
                      <ShoppingBag size={20} className="text-secondary" />
                      {product.name}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                    <div className="aspect-[3/4] rounded-xl overflow-hidden border border-white/5 bg-black/20">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-between">
                      <div>
                        <p className="text-white/80 text-sm mb-4 leading-relaxed">{product.fullDesc}</p>
                        
                        <div className="bg-white/5 rounded-lg p-3 border border-white/5 mb-4">
                          <p className="text-xs text-white/40 mb-1">Disponibilidade</p>
                          <p className="font-semibold text-sm text-emerald-400 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Pronta Entrega na Recepção
                          </p>
                        </div>
                      </div>

                      <Button 
                        asChild
                        className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold gap-2 h-11"
                      >
                        <a 
                          href={`https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Gostaria%20de%20saber%20sobre%20o%20produto%20${encodeURIComponent(product.name)}%20da%20Flipper`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Tenho Interesse <Phone size={16} />
                        </a>
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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
