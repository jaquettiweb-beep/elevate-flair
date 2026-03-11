import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import { Link } from "react-router-dom";
import { ChevronRight, Loader2 } from "lucide-react";
import ThumbnailCarousel from "@/components/ui/carousel-thumbnails";
import { useGalleryImages } from "@/hooks/useGalleryImages";

export default function Gallery() {
  const { data: images, isLoading } = useGalleryImages();

  const carouselImages = (images ?? []).map((img) => ({
    full: img.image_url,
    thumb: img.image_url,
    alt: img.alt_text || "Foto da Academia Flipper",
  }));

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

        {/* Carousel Gallery */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : carouselImages.length > 0 ? (
              <ThumbnailCarousel images={carouselImages} />
            ) : (
              <p className="text-center text-muted-foreground py-12">Nenhuma imagem disponível.</p>
            )}
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
}
