import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import HeroSection from "@/components/home/HeroSection";
import WhyFlipper from "@/components/home/WhyFlipper";
import Modalities from "@/components/home/Modalities";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";
import PageBubbles from "@/components/ocean/PageBubbles";

const Index = () => {
  return (
    <Layout>
      <SEOHead
        title="Academia Flipper - Natação, Musculação e Mais em São Paulo"
        description="A melhor academia de São Paulo com natação, musculação, yoga, pilates e artes marciais. Infraestrutura completa e professores qualificados."
      />
      <PageBubbles />
      <PageTransition>
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
