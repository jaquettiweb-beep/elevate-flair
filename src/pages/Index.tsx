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
          title="Academia Flipper - Natação, Musculação e +14 Modalidades | Brooklin SP Desde 1974"
          description="Academia humanizada no Brooklin com natação, musculação, yoga, pilates, jiu jitsu e artes marciais. Piscinas aquecidas. Aula experimental grátis!"
          keywords="academia brooklin, natação são paulo, musculação brooklin, yoga, pilates, jiu jitsu, academia flipper, piscina aquecida"
          schema={{
            "@context": "https://schema.org",
            "@type": "SportsActivityLocation",
            "name": "Academia Flipper",
            "description": "Academia humanizada com natação, musculação, yoga, pilates, artes marciais e mais de 14 modalidades no Brooklin, São Paulo.",
            "url": "https://www.academiaflipper.com.br",
            "telephone": "+55-11-3876-2340",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Av. Vereador José Diniz, 2583",
              "addressLocality": "São Paulo",
              "addressRegion": "SP",
              "postalCode": "04726-001",
              "addressCountry": "BR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": -23.6234957,
              "longitude": -46.6813073
            },
            "openingHoursSpecification": [
              { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "06:00", "closes": "22:00" },
              { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "06:00", "closes": "13:00" }
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.6",
              "reviewCount": "230",
              "bestRating": "5"
            },
            "priceRange": "R$ 179 - R$ 289"
          }}
        />
        <PageTransition>
          <HeroSection introComplete={introComplete} />
          <section id="timeline">
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}>
              <FlipperTimeline />
            </motion.div>
          </section>

          <Modalities />

          <section id="testimonials">
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}>
              <Testimonials />
            </motion.div>
          </section>

          <section id="stats">
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}>
              <Stats />
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
