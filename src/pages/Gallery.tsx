import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ThumbnailCarousel from "@/components/ui/carousel-thumbnails";

import heroImg from "@/assets/hero-gym.jpg";
import swimmingImg from "@/assets/swimming.jpg";
import yogaImg from "@/assets/yoga.jpg";
import martialImg from "@/assets/martial-arts.jpg";
import pilatesImg from "@/assets/pilates.jpg";
import musculacaoImg from "@/assets/musculacao.jpg";

const GALLERY_IMAGES = [
  { full: heroImg, thumb: heroImg, alt: "Sala de musculação moderna da Academia Flipper" },
  { full: swimmingImg, thumb: swimmingImg, alt: "Piscina semiolímpica aquecida" },
  { full: yogaImg, thumb: yogaImg, alt: "Aula de Yoga na Academia Flipper" },
  { full: martialImg, thumb: martialImg, alt: "Treino de artes marciais" },
  { full: pilatesImg, thumb: pilatesImg, alt: "Studio de Pilates" },
  { full: musculacaoImg, thumb: musculacaoImg, alt: "Treino de musculação" },
];

export default function Gallery() {
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
            <ThumbnailCarousel images={GALLERY_IMAGES} />
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
}
