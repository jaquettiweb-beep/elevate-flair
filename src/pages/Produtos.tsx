import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import { Link } from "react-router-dom";
import { ChevronRight, ShoppingBag, MapPin, Phone, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const ProductCard = ({ product }: { product: any }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.3 } }}
          className="group relative cursor-pointer"
        >
          <div
            className="relative rounded-2xl overflow-hidden transition-all duration-300 h-full flex flex-col"
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
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"
              style={{ background: "radial-gradient(circle at 50% 30%, hsla(24,95%,53%,0.08), transparent 70%)" }}
            />

            {/* Product image */}
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
            </div>

            {/* Text */}
            <div className="p-4 lg:p-5 text-center flex flex-col flex-1 justify-between">
              <div>
                <h2 className="font-display font-bold text-white text-base lg:text-lg mb-1 group-hover:text-secondary transition-colors duration-300">
                  {product.name}
                </h2>
                <p className="text-white/40 text-xs lg:text-sm">{product.desc}</p>
              </div>
              <div className="mt-4 flex justify-center">
                <span className="text-xs text-secondary font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Ver Detalhes <ArrowRight size={12} />
                </span>
              </div>
            </div>
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
                href={`https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20produto%20${encodeURIComponent(product.name)}%20da%20Flipper`}
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
  );
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

            {/* Tabs / Categories */}
            <Tabs defaultValue="todos" className="w-full max-w-2xl mx-auto mb-12">
              <TabsList className="grid grid-cols-4 bg-white/5 backdrop-blur-md border border-white/10 p-1 rounded-full h-12">
                <TabsTrigger value="todos" className="rounded-full text-white/60 data-[state=active]:bg-secondary data-[state=active]:text-white transition-all">Todos</TabsTrigger>
                <TabsTrigger value="vestuario" className="rounded-full text-white/60 data-[state=active]:bg-secondary data-[state=active]:text-white transition-all">Vestuário</TabsTrigger>
                <TabsTrigger value="acessorios" className="rounded-full text-white/60 data-[state=active]:bg-secondary data-[state=active]:text-white transition-all">Acessórios</TabsTrigger>
                <TabsTrigger value="equipamentos" className="rounded-full text-white/60 data-[state=active]:bg-secondary data-[state=active]:text-white transition-all">Equipamentos</TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <TabsContent value="todos" className="mt-0">
                  <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6 max-w-3xl mx-auto mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0 }}
                  >
                    {products.map((product) => (
                      <ProductCard key={product.name} product={product} />
                    ))}
                  </motion.div>
                </TabsContent>

                {["vestuario", "acessorios", "equipamentos"].map((cat) => (
                  <TabsContent key={cat} value={cat} className="mt-0">
                    <motion.div
                      className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6 max-w-3xl mx-auto mb-16"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0 }}
                    >
                      {products
                        .filter((p) => p.category === cat)
                        .map((product) => (
                          <ProductCard key={product.name} product={product} />
                        ))}
                    </motion.div>
                  </TabsContent>
                ))}
              </AnimatePresence>
            </Tabs>


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
