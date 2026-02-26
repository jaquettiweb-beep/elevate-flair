import { useState, useCallback } from "react";
import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import HeroSection from "@/components/home/HeroSection";
import WhyFlipper from "@/components/home/WhyFlipper";
import Modalities from "@/components/home/Modalities";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";
import IntroAnimation from "@/components/IntroAnimation";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <>
      {/* Intro overlay — rendered outside Layout so it sits above everything */}
      <IntroAnimation onComplete={handleIntroComplete} />

      <Layout>
        <SEOHead
          title="Academia Flipper - Natação, Musculação e Mais em São Paulo"
          description="A melhor academia de São Paulo com natação, musculação, yoga, pilates e artes marciais. Infraestrutura completa e professores qualificados."
        />
        <PageTransition>
          <HeroSection introComplete={introComplete} />
          {/* Continuous gradient background for all content sections */}
          <div
            style={{
              background: `linear-gradient(
                180deg,
                hsl(185, 70%, 92%) 0%,
                hsl(195, 65%, 85%) 15%,
                hsl(200, 68%, 75%) 30%,
                hsl(205, 72%, 55%) 50%,
                hsl(210, 75%, 30%) 70%,
                hsl(212, 78%, 20%) 85%,
                hsl(215, 80%, 14%) 100%
              )`,
            }}
          >
            <WhyFlipper />
            <Modalities />
            <Stats />

            <Testimonials />
            <CTASection />
          </div>
        </PageTransition>
      </Layout>
    </>
  );
};

export default Index;
