import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import { Link } from "react-router-dom";
import { ChevronRight, Newspaper, Play, ExternalLink, Tv, Award } from "lucide-react";
import { motion } from "framer-motion";

const pressVideos = [
  {
    id: "ovihJMun9eY",
    title: "Academia Flipper em reportagem da Globo",
    source: "Globo",
    sourceColor: "hsla(200,80%,50%,0.15)",
    sourceText: "hsl(200,80%,65%)",
    description: "Matéria do Jornal Hoje da Globo destacando a Academia Flipper no bairro do Brooklin.",
    featured: true,
  },
  {
    id: "kK0OV8BHFUo",
    title: "Cuidado no tratamento da água nas piscinas",
    source: "Gazeta",
    sourceColor: "hsla(24,95%,53%,0.12)",
    sourceText: "hsl(24,95%,65%)",
    description: "Reportagem sobre os cuidados com o tratamento da água nas piscinas da Academia Flipper.",
  },
  {
    id: "n1zVfAfJsoY",
    title: "Metade dos casos de demência poderiam ser evitados",
    source: "Record",
    sourceColor: "hsla(0,70%,50%,0.12)",
    sourceText: "hsl(0,70%,70%)",
    description: "Matéria da Record sobre como atividades físicas podem prevenir casos de demência.",
  },
  {
    id: "LkGBQtZRkbw",
    title: "Aula especial de fortalecimento para idosos",
    source: "Record",
    sourceColor: "hsla(0,70%,50%,0.12)",
    sourceText: "hsl(0,70%,70%)",
    description: "Reportagem sobre as aulas especiais de fortalecimento voltadas para a terceira idade.",
  },
  {
    id: "V1d_tGYsENg",
    title: "Aniversário do Gympass com Krav Maga na Flipper",
    source: "Wellhub",
    sourceColor: "hsla(150,60%,45%,0.12)",
    sourceText: "hsl(150,60%,60%)",
    description: "A Flipper como um dos primeiros parceiros do Gympass, destaque em aula de Krav Maga.",
  },
  {
    id: "zGfStZtyS60",
    title: "Matéria sobre Academias no Jornal da Record",
    source: "Record",
    sourceColor: "hsla(0,70%,50%,0.12)",
    sourceText: "hsl(0,70%,70%)",
    description: "Reportagem do Jornal da Record sobre academias durante a pandemia, com participação da Flipper.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 70, damping: 20 },
  },
};

export default function Imprensa() {
  const featured = pressVideos[0];
  const others = pressVideos.slice(1);

  return (
    <Layout>
      <SEOHead
        title="Flipper na Imprensa - Academia Flipper"
        description="Veja as reportagens e matérias sobre a Academia Flipper na TV e mídia. Destaques na Globo, Record e mais."
        path="/imprensa"
      />
      <PageTransition>
        <section className="relative overflow-hidden min-h-screen">
          {/* Ocean-themed background */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, hsl(185, 70%, 92%) 0%, hsl(195, 60%, 50%) 15%, hsl(210, 78%, 22%) 40%, hsl(215, 80%, 12%) 70%, hsl(218, 82%, 9%) 100%)`,
            }}
          />

          {/* Decorative water ripples */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-[8%] left-[5%] w-[500px] h-[500px] rounded-full opacity-[0.04]"
              style={{ background: "radial-gradient(circle, hsl(185,80%,70%), transparent 70%)" }}
              animate={{ scale: [1, 1.15, 1], x: [0, 20, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-[50%] right-[2%] w-[600px] h-[600px] rounded-full opacity-[0.03]"
              style={{ background: "radial-gradient(circle, hsl(200,70%,60%), transparent 70%)" }}
              animate={{ scale: [1, 1.2, 1], y: [0, -30, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

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
            <div className="text-center mb-14">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                style={{
                  background: "hsla(185,80%,45%,0.1)",
                  border: "1px solid hsla(185,80%,45%,0.2)",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 }}
              >
                <Tv size={14} style={{ color: "hsl(185,80%,55%)" }} />
                <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: "hsl(185,80%,65%)" }}>
                  Na Mídia
                </span>
              </motion.div>

              <motion.h1
                className="font-display text-4xl lg:text-6xl font-bold mb-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 60 }}
              >
                <span className="text-white">Flipper na </span>
                <span className="relative inline-block">
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(135deg, hsl(185,80%,55%), hsl(200,90%,60%))" }}
                  >
                    Imprensa
                  </span>
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                    style={{ background: "linear-gradient(90deg, hsl(185,80%,55%), hsl(200,90%,60%))" }}
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
                Mais de 50 anos de tradição no Brooklin — confira as reportagens que destacaram a Flipper na TV.
              </motion.p>

              {/* Stats mini bar */}
              <motion.div
                className="flex items-center justify-center gap-6 mt-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                {[
                  { icon: Tv, label: "Aparições na TV", value: "6+" },
                  { icon: Award, label: "Emissoras", value: "4" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center gap-2.5 px-4 py-2 rounded-full"
                    style={{
                      background: "hsla(190,60%,95%,0.08)",
                      border: "1px solid hsla(185,80%,70%,0.1)",
                    }}
                  >
                    <stat.icon size={14} className="text-secondary" />
                    <span className="text-white font-bold text-sm">{stat.value}</span>
                    <span className="text-white/40 text-xs">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Featured video */}
            <motion.div
              className="max-w-4xl mx-auto mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring" as const, stiffness: 60 }}
            >
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "hsla(190,60%,95%,0.1)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid hsla(185,80%,70%,0.15)",
                  boxShadow: "0 12px 48px hsla(0,0%,0%,0.2), inset 0 1px 0 hsla(0,0%,100%,0.08)",
                }}
              >
                <div className="relative aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${featured.id}`}
                    title={featured.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full rounded-t-2xl"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full"
                        style={{ background: featured.sourceColor, color: featured.sourceText }}
                      >
                        ⭐ Destaque
                      </span>
                      <span
                        className="text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full"
                        style={{ background: featured.sourceColor, color: featured.sourceText }}
                      >
                        {featured.source}
                      </span>
                    </div>
                    <h2 className="font-display font-bold text-white text-lg lg:text-xl mb-1">
                      {featured.title}
                    </h2>
                    <p className="text-white/40 text-sm">{featured.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Other videos grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {others.map((video) => (
                <motion.div
                  key={video.id}
                  variants={cardVariants}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="group"
                >
                  <div
                    className="rounded-xl overflow-hidden h-full transition-all duration-300"
                    style={{
                      background: "hsla(190,60%,95%,0.08)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid hsla(185,80%,70%,0.1)",
                      boxShadow: "0 8px 32px hsla(0,0%,0%,0.12), inset 0 1px 0 hsla(0,0%,100%,0.05)",
                    }}
                  >
                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: "radial-gradient(circle at 50% 30%, hsla(185,80%,55%,0.06), transparent 70%)" }}
                    />

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

                    <div className="p-4">
                      <span
                        className="inline-block text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full mb-2"
                        style={{ background: video.sourceColor, color: video.sourceText }}
                      >
                        {video.source}
                      </span>
                      <h2 className="font-display font-bold text-white text-sm leading-snug mb-1 group-hover:text-secondary/80 transition-colors">
                        {video.title}
                      </h2>
                      <p className="text-white/35 text-xs leading-relaxed line-clamp-2">
                        {video.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              className="text-center mt-14"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <a
                href="https://www.youtube.com/channel/UCzCWgr4rw-_OtazzG-g_32Q"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-white transition-all hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, hsl(185,80%,40%), hsl(200,90%,45%))",
                  boxShadow: "0 4px 24px hsla(185,80%,40%,0.3), inset 0 1px 0 hsla(0,0%,100%,0.15)",
                }}
              >
                <Play size={18} fill="currentColor" />
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
