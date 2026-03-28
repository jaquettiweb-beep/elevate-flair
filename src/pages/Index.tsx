import { useState, useCallback, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
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
import fachadaImg from "@/assets/fachada-flipper.jpg";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 50, damping: 18, mass: 1 } },
};

const Index = () => {
  const hasSeenIntro = sessionStorage.getItem("flipper-intro-seen") === "true";
  const [introComplete, setIntroComplete] = useState(hasSeenIntro);
  const location = useLocation();
  const parallaxRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem("flipper-intro-seen", "true");
    setIntroComplete(true);
  }, []);

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
          <section id="timeline">
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}>
              <FlipperTimeline />
            </motion.div>
          </section>

          <Modalities />

          <section id="stats">
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}>
              <Stats />
            </motion.div>
          </section>

          <section id="testimonials">
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}>
              <Testimonials />
            </motion.div>
          </section>

          <section id="ctasection">
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}>
              <CTASection />
            </motion.div>
          </section>
        </PageTransition>
      </Layout>
    </>
  );
};

export default Index;
