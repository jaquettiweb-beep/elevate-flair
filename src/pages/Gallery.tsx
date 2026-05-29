import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import { Link } from "react-router-dom";
import { ChevronRight, Loader2, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { useGalleryImages } from "@/hooks/useGalleryImages";

export default function Gallery() {
  // Apenas fotos da estrutura/ambiente da academia
  const { data: images, isLoading } = useGalleryImages("Academia");
  const [zoomed, setZoomed] = useState<{ src: string; alt: string } | null>(null);

  return (
    <Layout>
      <PageTransition>
        <SEOHead
          title="Galeria de Fotos - Conheça a Infraestrutura da Academia Flipper"
          description="Veja fotos da nossa academia: equipamentos modernos, piscina aquecida, espaços amplos e climatizados."
          path="/galeria"
        />

        {/* Hero */}
        <section className="pt-28 pb-12 bg-primary">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-primary-foreground/60 text-sm mb-6" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link>
              <ChevronRight size={14} />
              <span className="text-primary-foreground">Galeria</span>
            </nav>
            <h1 className="font-display text-3xl lg:text-5xl font-bold text-primary-foreground">
              Nossa Infraestrutura
            </h1>
            <p className="text-primary-foreground/70 mt-3 max-w-lg">
              Conheça nossos espaços, equipamentos e o ambiente que faz da Flipper a academia mais completa de São Paulo.
            </p>
          </div>
        </section>

        {/* Fixed grid gallery */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : images && images.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((img) => (
                  <ScrollReveal key={img.id}>
                    <button
                      type="button"
                      onClick={() =>
                        setZoomed({
                          src: img.image_url,
                          alt: img.alt_text || "Foto da estrutura da Academia Flipper",
                        })
                      }
                      className="block w-full overflow-hidden rounded-2xl shadow-lg group cursor-zoom-in"
                      aria-label="Ampliar imagem"
                    >
                      <img
                        src={img.image_url}
                        alt={img.alt_text || "Foto da estrutura da Academia Flipper"}
                        loading="lazy"
                        className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </button>
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-12">Nenhuma imagem disponível.</p>
            )}
          </div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {zoomed && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setZoomed(null)}
            >
              <button
                type="button"
                onClick={() => setZoomed(null)}
                className="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Fechar"
              >
                <X size={24} />
              </button>
              <motion.img
                src={zoomed.src}
                alt={zoomed.alt}
                className="max-h-[90vh] max-w-[95vw] rounded-2xl object-contain shadow-2xl"
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 24 }}
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </PageTransition>
    </Layout>
  );
}
