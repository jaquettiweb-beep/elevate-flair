import { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
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

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 50, damping: 18, mass: 1 } },
};

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
      {!hasSeenIntro && <IntroAnimation onComplete={handleIntroComplete} />}

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
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}>
              <FlipperTimeline />
            </motion.div>
            <SectionDivider variant="wave" />
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}>
              <Modalities />
            </motion.div>
            <SectionDivider variant="curved" />
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}>
              <Stats />
            </motion.div>
            <SectionDivider variant="wave" flip />
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}>
              <Testimonials />
            </motion.div>
            <SectionDivider variant="curved" flip />
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}>
              <CTASection />
            </motion.div>
          </div>
        </PageTransition>
      </Layout>
    </>
  );
};

export default Index;
