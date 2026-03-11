import { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import HeroSection from "@/components/home/HeroSection";
import FlipperTimeline from "@/components/home/FlipperTimeline";
import Modalities from "@/components/home/Modalities";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";
import IntroAnimation from "@/components/IntroAnimation";
import SectionDivider from "@/components/home/SectionDivider";

const Index = () => {
  const hasSeenIntro = sessionStorage.getItem("flipper-intro-seen") === "true";
  const [introComplete, setIntroComplete] = useState(hasSeenIntro);
  const location = useLocation();

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem("flipper-intro-seen", "true");
    setIntroComplete(true);
  }, []);

  // Scroll to hash on navigation (e.g. /#modalidades)
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [location.hash]);

  return (
    <>
      <IntroAnimation onComplete={handleIntroComplete} />

      <Layout>
        <SEOHead
          title="Academia Flipper - Natação, Musculação e Mais em São Paulo"
          description="A melhor academia de São Paulo com natação, musculação, yoga, pilates e artes marciais. Infraestrutura completa e professores qualificados."
        />
        <PageTransition>
          <HeroSection introComplete={introComplete} />
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
            <FlipperTimeline />
            <SectionDivider variant="wave" />
            <Modalities />
            <SectionDivider variant="curved" />
            <Stats />
            <SectionDivider variant="wave" flip />
            <Testimonials />
            <SectionDivider variant="curved" flip />
            <CTASection />
          </div>
        </PageTransition>
      </Layout>
    </>
  );
};

export default Index;
