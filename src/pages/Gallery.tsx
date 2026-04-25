import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import { Link } from "react-router-dom";
import { ChevronRight, Loader2 } from "lucide-react";
import ThumbnailCarousel from "@/components/ui/carousel-thumbnails";
import ImageCarousel from "@/components/ImageCarousel";
import ScrollReveal from "@/components/ScrollReveal";
import { useGalleryImages } from "@/hooks/useGalleryImages";

// ─── Krav Maga real images ────────────────────────────────────────────────────
import kravMagaReal1 from "@/assets/krav-maga-real-1.jpg";
import kravMagaReal2 from "@/assets/krav-maga-real-2.jpg";
import kravMagaReal3 from "@/assets/krav-maga-real-3.jpg";
import kravMagaReal4 from "@/assets/krav-maga-real-4.jpg";
import kravMagaReal5 from "@/assets/krav-maga-real-5.jpg";

const kravMagaImages = [
  { src: kravMagaReal1, alt: "Krav Maga – treino defesa pessoal 1" },
  { src: kravMagaReal2, alt: "Krav Maga – treino defesa pessoal 2" },
  { src: kravMagaReal3, alt: "Krav Maga – treino defesa pessoal 3" },
  { src: kravMagaReal4, alt: "Krav Maga – treino defesa pessoal 4" },
  { src: kravMagaReal5, alt: "Krav Maga – treino defesa pessoal 5" },
];

export default function Gallery() {
  const { data: images, isLoading } = useGalleryImages();

  const carouselImages = (images ?? []).slice(1).map((img) => ({
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

        {/* Krav Maga Section */}
        <section className="py-16 bg-background border-t border-border/50">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-10">
                <span
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-semibold tracking-wider uppercase"
                  style={{
                    background: "hsla(0,70%,50%,0.1)",
                    border: "1px solid hsla(0,70%,50%,0.2)",
                    color: "hsl(0,70%,55%)",
                  }}
                >
                  🛡️ Krav Maga
                </span>
                <h2 className="font-display text-2xl lg:text-4xl font-bold text-foreground">
                  Treinos de Krav Maga
                </h2>
                <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
                  Defesa pessoal prática e eficiente. Confira momentos dos nossos treinos.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="max-w-4xl mx-auto">
                <ImageCarousel images={kravMagaImages} height="h-[480px]" />
              </div>
            </ScrollReveal>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
}
