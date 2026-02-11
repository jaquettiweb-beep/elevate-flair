import { Dumbbell, Award, Clock } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const FEATURES = [
  {
    icon: Dumbbell,
    title: "Infraestrutura Completa",
    desc: "Equipamentos modernos de última geração, piscina semiolímpica aquecida, salas climatizadas e vestiários completos para seu conforto.",
  },
  {
    icon: Award,
    title: "Professores Qualificados",
    desc: "Equipe de profissionais certificados e experientes, prontos para orientar seu treino com segurança e eficiência.",
  },
  {
    icon: Clock,
    title: "Horários Flexíveis",
    desc: "Aulas de segunda a sábado das 6h às 22h. Encontre o melhor horário para encaixar o treino na sua rotina.",
  },
];

export default function WhyFlipper() {
  const ref = useScrollAnimation();

  return (
    <section className="py-20 lg:py-28 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-14 animate-on-scroll">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Por que escolher a <span className="gradient-text">Flipper</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Há mais de 15 anos transformando vidas através do esporte e bem-estar em São Paulo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="animate-on-scroll-3d card-3d bg-card rounded-xl p-8 border border-border hover:border-primary/30 transition-colors"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-5">
                <f.icon size={28} className="text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
