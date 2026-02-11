import { Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const TESTIMONIALS = [
  {
    name: "Mariana Silva",
    text: "A melhor academia que já frequentei! Os professores são atenciosos e a infraestrutura é impecável. A piscina aquecida é maravilhosa.",
    rating: 5,
    modality: "Natação",
  },
  {
    name: "Carlos Mendes",
    text: "Treino na Flipper há 3 anos e a evolução no meu condicionamento foi incrível. Ambiente motivador e equipamentos sempre novos.",
    rating: 5,
    modality: "Musculação",
  },
  {
    name: "Ana Paula Costa",
    text: "As aulas de Pilates mudaram minha postura e qualidade de vida. Instrutores super qualificados e ambiente acolhedor.",
    rating: 5,
    modality: "Pilates",
  },
];

export default function Testimonials() {
  const ref = useScrollAnimation();

  return (
    <section className="py-20 lg:py-28 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-14 animate-on-scroll">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
            O que nossos <span className="gradient-text">alunos</span> dizem
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Milhares de alunos satisfeitos confiam na Flipper para alcançar seus objetivos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="animate-on-scroll-3d card-3d bg-card rounded-xl p-8 border border-border"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} className="fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
              <div>
                <p className="font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.modality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
