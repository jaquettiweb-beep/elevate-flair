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

            {/* Parallax wrapper: Modalities → Stats */}
            <div ref={parallaxRef} className="relative overflow-hidden">
              {/* Parallax fachada background */}
              <motion.div
                className="absolute inset-0 z-[0]"
                style={{ y: bgY, top: "-15%", bottom: "-15%", height: "130%" }}
              >
                <img
                  src={fachadaImg}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{
                  background: "linear-gradient(180deg, hsla(210,75%,18%,0.82) 0%, hsla(220,80%,10%,0.85) 40%, hsla(215,80%,7%,0.88) 70%, hsla(210,75%,12%,0.92) 100%)",
                  mixBlendMode: "multiply",
                }} />
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
              </motion.div>

              <div className="relative z-[1]">
                <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}>
                  <Modalities />
                </motion.div>
                <SectionDivider variant="curved" />
                <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}>
                  <Stats />
                </motion.div>
              </div>
            </div>

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
