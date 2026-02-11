import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import HeroSection from "@/components/home/HeroSection";
import WhyFlipper from "@/components/home/WhyFlipper";
import Modalities from "@/components/home/Modalities";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

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
        <WhyFlipper />
        <Modalities />
        <Stats />
        <Testimonials />
        <CTASection />
      </PageTransition>
    </Layout>
  );
};

export default Index;
