import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import HeroSection from "@/components/home/HeroSection";
import WhyFlipper from "@/components/home/WhyFlipper";
import Modalities from "@/components/home/Modalities";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";
import Section3DTransition from "@/components/Section3DTransition";

const Index = () => {
  return (
    <Layout>
      <PageTransition>
        <SEOHead
          title="Academia Flipper - Natação, Musculação e Fitness em São Paulo | Agende sua Aula"
          description="A melhor academia de São Paulo! Natação, musculação, pilates, artes marciais e mais de 15 modalidades. Infraestrutura completa e professores qualificados. Agende sua aula experimental grátis!"
          path="/"
        />
        <HeroSection />
        <Section3DTransition effect="foldUp">
          <WhyFlipper />
        </Section3DTransition>
        <Section3DTransition effect="swingDoor">
          <Modalities />
        </Section3DTransition>
        <Section3DTransition effect="flipIn">
          <Stats />
        </Section3DTransition>
        <Section3DTransition effect="foldRight">
          <Testimonials />
        </Section3DTransition>
        <Section3DTransition effect="cubeRotate">
          <CTASection />
        </Section3DTransition>
      </PageTransition>
    </Layout>
  );
};

export default Index;
