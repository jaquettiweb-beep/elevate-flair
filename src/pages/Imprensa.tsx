import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import { Link } from "react-router-dom";
import { ChevronRight, Newspaper, Play, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const pressVideos = [
  {
    id: "kK0OV8BHFUo",
    title: "Cuidado no tratamento da água nas piscinas",
    source: "Gazeta",
    description: "Reportagem sobre os cuidados com o tratamento da água nas piscinas da Academia Flipper.",
  },
  {
    id: "n1zVfAfJsoY",
    title: "Metade dos casos de demência poderiam ser evitados",
    source: "Record",
    description: "Matéria da Record sobre como atividades físicas podem prevenir casos de demência.",
  },
  {
    id: "LkGBQtZRkbw",
    title: "Academia oferece aula especial de fortalecimento para idosos",
    source: "Record",
    description: "Reportagem sobre as aulas especiais de fortalecimento voltadas para a terceira idade.",
  },
  {
    id: "V1d_tGYsENg",
    title: "Aniversário do Gympass com aula de Krav Maga na Flipper",
    source: "Wellhub / Gympass",
    description: "A Flipper como um dos primeiros parceiros do Gympass, destaque em aula de Krav Maga.",
  },
  {
    id: "zGfStZtyS60",
    title: "Matéria sobre Academias no Jornal da Record",
    source: "Record",
    description: "Reportagem do Jornal da Record sobre academias durante a pandemia, com participação da Flipper.",
  },
  {
    id: "ovihJMun9eY",
    title: "Academia Flipper em reportagem da Globo",
    source: "Globo – Jornal Hoje",
    description: "Matéria do Jornal Hoje da Globo destacando a Academia Flipper no bairro do Brooklin.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 60, damping: 18 },
  },
};

export default function Imprensa() {
  return (
    <Layout>
      <SEOHead
        title="Flipper na Imprensa - Academia Flipper"
        description="Veja as reportagens e matérias sobre a Academia Flipper na TV e mídia. Destaques na Globo, Record e mais."
        path="/imprensa"
      />
      <PageTransition>
        <section className="relative overflow-hidden min-h-screen">
          {/* Background */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, hsl(210, 78%, 22%) 0%, hsl(212, 76%, 16%) 30%, hsl(215, 80%, 12%) 60%, hsl(218, 82%, 9%) 100%)`,
            }}
          />

          <div className="container mx-auto px-4 relative z-10 pt-32 pb-24">
            {/* Breadcrumb */}
            <motion.nav
              className="flex items-center gap-2 text-sm mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Link to="/" className="text-white/40 hover:text-secondary transition-colors">Início</Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/25" />
              <span className="text-white/70 font-medium">Imprensa</span>
            </motion.nav>

            {/* Header */}
            <div className="text-center mb-16">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                style={{
                  background: "hsla(24,95%,53%,0.1)",
                  border: "1px solid hsla(24,95%,53%,0.2)",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 }}
              >
                <Newspaper size={14} style={{ color: "hsl(24,95%,53%)" }} />
                <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: "hsl(24,95%,65%)" }}>
                  Na Mídia
                </span>
              </motion.div>

              <motion.h1
                className="font-display text-4xl lg:text-6xl font-bold text-white mb-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 60 }}
              >
                Flipper na{" "}
                <span className="relative inline-block">
                  <span className="text-secondary">Imprensa</span>
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
                className="text-white/50 max-w-xl mx-auto text-lg"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Confira as reportagens e matérias em que a Academia Flipper foi destaque na televisão e mídia.
              </motion.p>
            </div>

            {/* Videos grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {pressVideos.map((video) => (
                <motion.div
                  key={video.id}
                  variants={cardVariants}
                  className="group"
                >
                  <div
                    className="rounded-2xl overflow-hidden transition-all duration-300"
                    style={{
                      background: "hsla(190,60%,95%,0.06)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid hsla(185,80%,70%,0.1)",
                      boxShadow: "0 8px 32px hsla(0,0%,0%,0.12), inset 0 1px 0 hsla(0,0%,100%,0.05)",
                    }}
                  >
                    {/* YouTube embed */}
                    <div className="relative aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${video.id}`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                        loading="lazy"
                      />
                    </div>

                    {/* Info */}
                    <div className="p-5 lg:p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full"
                          style={{
                            background: "hsla(24,95%,53%,0.12)",
                            color: "hsl(24,95%,65%)",
                          }}
                        >
                          {video.source}
                        </span>
                      </div>
                      <h2 className="font-display font-bold text-white text-base lg:text-lg mb-2 leading-snug">
                        {video.title}
                      </h2>
                      <p className="text-white/40 text-sm leading-relaxed">
                        {video.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <a
                href="https://www.youtube.com/channel/UCzCWgr4rw-_OtazzG-g_32Q"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, hsl(24,95%,53%), hsl(15,90%,50%))",
                  boxShadow: "0 4px 20px hsla(24,95%,53%,0.3)",
                }}
              >
                <Play size={18} />
                Ver mais no YouTube
                <ExternalLink size={14} className="opacity-60" />
              </a>
            </motion.div>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
}
