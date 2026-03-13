import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import { Link } from "react-router-dom";
import { ChevronRight, Clock, MapPin, Users, Award } from "lucide-react";
import { Timeline } from "@/components/ui/timeline";
import equipeAntigaImg from "@/assets/flipper-equipe-antiga.jpeg";
import comunidadeHojeImg from "@/assets/flipper-comunidade-hoje.jpeg";
import fachadaAntigaImg from "@/assets/flipper-antiga-fachada.png";
import piscinaAntigaImg from "@/assets/flipper-piscina-antiga.jpeg";
import musculacaoAntigaImg from "@/assets/flipper-musculacao-antiga.jpeg";
import taekwondoAntigaImg from "@/assets/flipper-taekwondo-antiga.jpeg";
import ginasticaAntigaImg from "@/assets/flipper-ginastica-antiga.jpeg";
import alongamentoAntigaImg from "@/assets/flipper-alongamento-antiga.jpeg";
import fachadaImg from "@/assets/fachada-flipper.jpg";

const heroStats = [
  { icon: Clock, value: "50+", label: "Anos" },
  { icon: Users, value: "5.000+", label: "Alunos" },
  { icon: MapPin, value: "São Paulo", label: "Desde 1970" },
  { icon: Award, value: "16", label: "Modalidades" },
];

const timelineData = [
  {
    title: "Década de 70",
    content: (
      <div>
        <p className="text-white/70 text-sm md:text-base font-normal mb-6 leading-relaxed">
          A Academia Flipper nasceu com um sonho: oferecer{" "}
          <strong className="text-secondary font-semibold">natação de qualidade</strong> para todas as idades em São Paulo.
          Desde o início, a piscina semiolímpica aquecida se tornou referência na região.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative group overflow-hidden rounded-xl">
            <img
              src={fachadaAntigaImg}
              alt="Fachada da Academia Flipper nos anos 70"
              className="object-cover h-24 md:h-48 lg:h-60 w-full transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute bottom-2 left-3 text-[10px] text-white/80 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Fachada original
            </span>
          </div>
          <div className="relative group overflow-hidden rounded-xl">
            <img
              src={piscinaAntigaImg}
              alt="Piscina da Flipper nos primeiros anos"
              className="object-cover h-24 md:h-48 lg:h-60 w-full transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute bottom-2 left-3 text-[10px] text-white/80 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Piscina original
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Décadas de 80 e 90",
    content: (
      <div>
        <p className="text-white/70 text-sm md:text-base font-normal mb-6 leading-relaxed">
          Com o crescimento da demanda, a Flipper expandiu sua infraestrutura e passou a oferecer{" "}
          <strong className="text-secondary font-semibold">musculação</strong>,{" "}
          <strong className="text-secondary font-semibold">artes marciais</strong> e ginástica.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative group overflow-hidden rounded-xl">
            <img
              src={musculacaoAntigaImg}
              alt="Sala de musculação antiga da Flipper"
              className="object-cover h-24 md:h-48 lg:h-60 w-full transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute bottom-2 left-3 text-[10px] text-white/80 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Musculação anos 80
            </span>
          </div>
          <div className="relative group overflow-hidden rounded-xl">
            <img
              src={taekwondoAntigaImg}
              alt="Turma de Taekwondo na Flipper"
              className="object-cover h-24 md:h-48 lg:h-60 w-full transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute bottom-2 left-3 text-[10px] text-white/80 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Taekwondo anos 90
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Anos 2000",
    content: (
      <div>
        <p className="text-white/70 text-sm md:text-base font-normal mb-6 leading-relaxed">
          A Flipper incorporou{" "}
          <strong className="text-secondary font-semibold">yoga</strong>,{" "}
          <strong className="text-secondary font-semibold">pilates</strong> e programas voltados à terceira idade,
          ampliando sua missão para o bem-estar integral.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative group overflow-hidden rounded-xl">
            <img
              src={ginasticaAntigaImg}
              alt="Aula de ginástica na Flipper"
              className="object-cover h-24 md:h-48 lg:h-60 w-full transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute bottom-2 left-3 text-[10px] text-white/80 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Ginástica
            </span>
          </div>
          <div className="relative group overflow-hidden rounded-xl">
            <img
              src={alongamentoAntigaImg}
              alt="Aula de alongamento na Flipper"
              className="object-cover h-24 md:h-48 lg:h-60 w-full transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute bottom-2 left-3 text-[10px] text-white/80 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Alongamento
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Hoje",
    content: (
      <div>
        <p className="text-white/70 text-sm md:text-base font-normal mb-6 leading-relaxed">
          Com mais de <strong className="text-secondary font-semibold">50 anos de história</strong> e uma comunidade de mais de 5 mil alunos ativos,
          a Flipper segue firme na sua missão de transformar vidas através do esporte.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
          {[
            "Piscina semiolímpica aquecida",
            "Musculação moderna",
            "Yoga & Pilates",
            "Artes marciais",
            "Natação bebê ao idoso",
            "+5.000 alunos ativos",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs md:text-sm text-white/80 font-medium"
              style={{
                background: "hsla(185,80%,45%,0.08)",
                border: "1px solid hsla(185,80%,45%,0.15)",
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative group overflow-hidden rounded-xl">
            <img
              src={equipeAntigaImg}
              alt="Equipe Flipper reunida"
              className="object-cover h-24 md:h-48 lg:h-60 w-full transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute bottom-2 left-3 text-[10px] text-white/80 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Nossa equipe
            </span>
          </div>
          <div className="relative group overflow-hidden rounded-xl">
            <img
              src={comunidadeHojeImg}
              alt="Comunidade Flipper hoje"
              className="object-cover h-24 md:h-48 lg:h-60 w-full transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute bottom-2 left-3 text-[10px] text-white/80 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Comunidade hoje
            </span>
          </div>
        </div>
      </div>
    ),
  },
];

const Historia = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <Layout>
      <SEOHead
        title="Nossa Jornada - Academia Flipper | +50 Anos em São Paulo"
        description="Conheça a trajetória de mais de 50 anos da Academia Flipper, referência em natação e esportes em São Paulo."
      />
      <PageTransition>
        <section className="relative overflow-hidden">
          {/* Full gradient background */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, hsl(210, 78%, 22%) 0%, hsl(212, 76%, 16%) 30%, hsl(215, 80%, 12%) 60%, hsl(218, 82%, 9%) 100%)`,
            }}
          />

          {/* ─── Hero with parallax fachada ─── */}
          <div ref={heroRef} className="relative z-10 overflow-hidden">
            {/* Parallax background image */}
            <motion.div className="absolute inset-0 z-0" style={{ y: heroImgY }}>
              <img
                src={fachadaImg}
                alt=""
                className="w-full h-[130%] object-cover"
                style={{ filter: "blur(1px)" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(180deg, hsla(210,78%,15%,0.75) 0%, hsla(215,80%,10%,0.88) 60%, hsl(215,80%,12%) 100%)",
                }}
              />
            </motion.div>

            <motion.div className="relative z-10 pt-32 pb-20" style={{ opacity: heroOpacity }}>
              <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm mb-10">
                  <Link to="/" className="text-white/40 hover:text-secondary transition-colors">Início</Link>
                  <ChevronRight className="w-3.5 h-3.5 text-white/25" />
                  <span className="text-white/70 font-medium">Nossa Jornada</span>
                </nav>

                {/* Badge */}
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                  style={{
                    background: "hsla(24,95%,53%,0.1)",
                    border: "1px solid hsla(24,95%,53%,0.2)",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Award size={14} style={{ color: "hsl(24,95%,53%)" }} />
                  <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: "hsl(24,95%,65%)" }}>
                    Desde 1970
                  </span>
                </motion.div>

                <motion.h1
                  className="font-display text-4xl lg:text-7xl font-bold text-white mb-5 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 60 }}
                >
                  +50 Anos de{" "}
                  <span className="relative inline-block">
                    <span className="text-secondary">História</span>
                    <motion.span
                      className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                      style={{ background: "linear-gradient(90deg, hsl(24,95%,53%), hsl(15,90%,50%))" }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                    />
                  </span>
                </motion.h1>

                <motion.p
                  className="text-white/50 text-lg max-w-2xl mb-12 leading-relaxed"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 60 }}
                >
                  Uma trajetória de dedicação, paixão pelo esporte e compromisso com a saúde e o bem-estar de toda a comunidade paulistana.
                </motion.p>

                {/* Hero stats */}
                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, type: "spring", stiffness: 60 }}
                >
                  {heroStats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl"
                      style={{
                        background: "hsla(0,0%,100%,0.05)",
                        border: "1px solid hsla(0,0%,100%,0.08)",
                        backdropFilter: "blur(12px)",
                      }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.08 }}
                    >
                      <stat.icon size={18} className="text-secondary flex-shrink-0" />
                      <div>
                        <p className="text-white font-bold text-sm leading-none">{stat.value}</p>
                        <p className="text-white/40 text-[10px] mt-0.5">{stat.label}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-white/25 text-[10px] tracking-[0.2em] uppercase font-medium">Role para explorar</span>
              <div className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1">
                <motion.div
                  className="w-1 h-2 rounded-full bg-secondary/60"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </div>

          {/* ─── Timeline ─── */}
          <div className="relative z-10 pb-20">
            <Timeline data={timelineData} />
          </div>

          {/* ─── CTA Bottom ─── */}
          <div className="relative z-10 pb-24">
            <div className="container mx-auto px-4">
              <motion.div
                className="max-w-xl mx-auto text-center rounded-2xl p-8 md:p-12"
                style={{
                  background: "hsla(190,60%,95%,0.06)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid hsla(185,80%,70%,0.1)",
                  boxShadow: "0 8px 32px hsla(0,0%,0%,0.15)",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ type: "spring", stiffness: 60, damping: 16 }}
              >
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
                  Faça parte dessa <span className="text-secondary">história</span>
                </h3>
                <p className="text-white/50 text-sm mb-6 leading-relaxed">
                  Venha conhecer a Flipper e descubra por que somos referência em São Paulo há mais de 50 anos.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <motion.a
                    href="https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flipper%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre..."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2"
                    style={{
                      background: "linear-gradient(135deg, hsl(185,80%,45%), hsl(195,75%,40%))",
                      boxShadow: "0 4px 16px hsla(185,80%,45%,0.25)",
                    }}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Agende uma Visita
                  </motion.a>
                  <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      to="/#modalidades"
                      className="px-6 py-3 rounded-xl font-semibold text-sm text-white/70 flex items-center justify-center gap-2 transition-colors hover:text-white"
                      style={{ border: "1px solid hsla(0,0%,100%,0.12)" }}
                    >
                      Ver Modalidades
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
};

export default Historia;
