import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { ChevronRight, X, ChevronLeft, ChevronRightIcon } from "lucide-react";

import heroImg from "@/assets/hero-gym.jpg";
import swimmingImg from "@/assets/swimming.jpg";
import yogaImg from "@/assets/yoga.jpg";
import martialImg from "@/assets/martial-arts.jpg";
import pilatesImg from "@/assets/pilates.jpg";
import musculacaoImg from "@/assets/musculacao.jpg";

const IMAGES = [
  { src: heroImg, alt: "Sala de musculação moderna da Academia Flipper", category: "Equipamentos" },
  { src: swimmingImg, alt: "Piscina semiolímpica aquecida da Academia Flipper", category: "Espaços" },
  { src: yogaImg, alt: "Aula de Yoga na Academia Flipper", category: "Aulas" },
  { src: martialImg, alt: "Treino de artes marciais na Academia Flipper", category: "Aulas" },
  { src: pilatesImg, alt: "Studio de Pilates na Academia Flipper", category: "Espaços" },
  { src: musculacaoImg, alt: "Treino de musculação na Academia Flipper", category: "Equipamentos" },
];

const CATEGORIES = ["Todas", "Equipamentos", "Espaços", "Aulas"];

export default function Gallery() {
  const ref = useScrollAnimation();
  const [filter, setFilter] = useState("Todas");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === "Todas" ? IMAGES : IMAGES.filter((img) => img.category === filter);

  const openLightbox = (i: number) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const prev = () => setLightbox((p) => (p !== null && p > 0 ? p - 1 : filtered.length - 1));
  const next = () => setLightbox((p) => (p !== null && p < filtered.length - 1 ? p + 1 : 0));

  return (
    <Layout>
      <SEOHead
        title="Galeria de Fotos - Conheça a Infraestrutura da Academia Flipper"
        description="Veja fotos da nossa academia: equipamentos modernos, piscina aquecida, espaços amplos e climatizados. Estrutura completa para seu treino em São Paulo."
        path="/galeria"
      />

      {/* Hero */}
      <section className="pt-28 pb-12 bg-primary">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-primary-foreground/60 text-sm mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-primary-foreground">Galeria</span>
          </nav>
          <h1 className="font-display text-3xl lg:text-5xl font-bold text-primary-foreground">
            Nossa Infraestrutura
          </h1>
          <p className="text-primary-foreground/70 mt-3 max-w-lg">
            Conheça nossos espaços, equipamentos e o ambiente que faz da Flipper a academia mais completa de São Paulo.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-background" ref={ref}>
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 justify-center mb-10 animate-on-scroll">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((img, i) => (
              <button
                key={img.alt + i}
                onClick={() => openLightbox(i)}
                className="animate-on-scroll-3d group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors flex items-center justify-center">
                  <span className="text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity font-semibold text-sm">
                    Ampliar
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4" onClick={closeLightbox}>
          <button onClick={closeLightbox} className="absolute top-4 right-4 text-primary-foreground p-2" aria-label="Fechar">
            <X size={28} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 text-primary-foreground p-2" aria-label="Anterior">
            <ChevronLeft size={32} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 text-primary-foreground p-2" aria-label="Próxima">
            <ChevronRightIcon size={32} />
          </button>
          <img
            src={filtered[lightbox].src}
            alt={filtered[lightbox].alt}
            className="max-w-full max-h-[85vh] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </Layout>
  );
}
