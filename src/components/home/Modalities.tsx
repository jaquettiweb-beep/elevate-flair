import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import swimmingImg from "@/assets/swimming.jpg";
import yogaImg from "@/assets/yoga.jpg";
import martialImg from "@/assets/martial-arts.jpg";
import pilatesImg from "@/assets/pilates.jpg";
import musculacaoImg from "@/assets/musculacao.jpg";

const MODALITIES = [
  { name: "Natação", desc: "Adulto, infantil e bebê. Piscina aquecida semiolímpica.", img: swimmingImg },
  { name: "Musculação", desc: "Equipamentos de última geração com orientação profissional.", img: musculacaoImg },
  { name: "Yoga", desc: "Equilíbrio entre corpo e mente com instrutores certificados.", img: yogaImg },
  { name: "Pilates", desc: "Studio e solo. Fortalecimento e flexibilidade para todos.", img: pilatesImg },
  { name: "Artes Marciais", desc: "Muay Thai, Krav Maga, Aikidô, Kung Fu, Jiu Jitsu e Judô.", img: martialImg },
  { name: "Hidroginástica", desc: "Exercícios aquáticos de baixo impacto. Ideal para 60+.", img: swimmingImg },
];

export default function Modalities() {
  const ref = useScrollAnimation();

  return (
    <section id="modalidades" className="py-20 lg:py-28 bg-muted" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-14 animate-on-scroll">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Nossas <span className="gradient-text">Modalidades</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mais de 15 modalidades para você encontrar a atividade perfeita para seus objetivos.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODALITIES.map((m, i) => (
            <div
              key={m.name}
              className="animate-on-scroll-3d card-3d group relative rounded-xl overflow-hidden bg-card border border-border"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={m.img}
                  alt={`Aula de ${m.name} na Academia Flipper em São Paulo`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  width={768}
                  height={512}
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{m.name}</h3>
                <p className="text-muted-foreground text-sm">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
