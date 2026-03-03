import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import {
  ContainerScroll,
  ContainerSticky,
  GalleryContainer,
  GalleryCol,
  ContainerStagger,
  ContainerAnimated,
} from "@/components/ui/animated-gallery";

import heroImg from "@/assets/hero-gym.jpg";
import swimmingImg from "@/assets/swimming.jpg";
import yogaImg from "@/assets/yoga.jpg";
import martialImg from "@/assets/martial-arts.jpg";
import pilatesImg from "@/assets/pilates.jpg";
import musculacaoImg from "@/assets/musculacao.jpg";

const IMAGES_1 = [heroImg, swimmingImg, yogaImg, musculacaoImg];
const IMAGES_2 = [pilatesImg, martialImg, heroImg, swimmingImg];
const IMAGES_3 = [yogaImg, musculacaoImg, pilatesImg, martialImg];

export default function Gallery() {
  return (
    <Layout>
      <PageTransition>
        <SEOHead
          title="Galeria de Fotos - Conheça a Infraestrutura da Academia Flipper"
          description="Veja fotos da nossa academia: equipamentos modernos, piscina aquecida, espaços amplos e climatizados. Estrutura completa para seu treino em São Paulo."
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

            <ContainerStagger className="space-y-4">
              <ContainerAnimated>
                <h1 className="font-display text-3xl lg:text-5xl font-bold text-primary-foreground">
                  Nossa Infraestrutura
                </h1>
              </ContainerAnimated>
              <ContainerAnimated>
                <p className="text-primary-foreground/70 max-w-lg">
                  Conheça nossos espaços, equipamentos e o ambiente que faz da Flipper a academia mais completa de São Paulo.
                </p>
              </ContainerAnimated>
            </ContainerStagger>
          </div>
        </section>

        {/* Animated Gallery */}
        <div className="bg-background">
          <ContainerScroll>
            <ContainerSticky>
              <GalleryContainer className="px-4 max-w-7xl mx-auto">
                <GalleryCol yRange={["0%", "-10%"]}>
                  {IMAGES_1.map((src, i) => (
                    <img
                      key={i}
                      className="aspect-video block h-auto max-h-full w-full rounded-md object-cover shadow"
                      src={src}
                      alt="Academia Flipper"
                      loading="lazy"
                    />
                  ))}
                </GalleryCol>
                <GalleryCol className="mt-[-50%]" yRange={["15%", "5%"]}>
                  {IMAGES_2.map((src, i) => (
                    <img
                      key={i}
                      className="aspect-video block h-auto max-h-full w-full rounded-md object-cover shadow"
                      src={src}
                      alt="Academia Flipper"
                      loading="lazy"
                    />
                  ))}
                </GalleryCol>
                <GalleryCol yRange={["-10%", "2%"]} className="-mt-2">
                  {IMAGES_3.map((src, i) => (
                    <img
                      key={i}
                      className="aspect-video block h-auto max-h-full w-full rounded-md object-cover shadow"
                      src={src}
                      alt="Academia Flipper"
                      loading="lazy"
                    />
                  ))}
                </GalleryCol>
              </GalleryContainer>
            </ContainerSticky>
          </ContainerScroll>
        </div>
      </PageTransition>
    </Layout>
  );
}
