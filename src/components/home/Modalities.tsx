import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GymDecorModalities } from "@/components/GymDecorations";
import TextReveal, { TextRevealHighlight } from "@/components/TextReveal";
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

const cardVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    z: -200,
    rotateY: (i % 3 - 1) * 20,
    rotateX: 15,
    scale: 0.7,
    filter: "blur(8px)",
  }),
  visible: (i: number) => ({
    opacity: 1,
    z: 0,
    rotateY: 0,
    rotateX: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      delay: i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export default function Modalities() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const sectionY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section id="modalidades" className="py-20 lg:py-28 bg-muted relative overflow-hidden" ref={ref}>
      {/* Gym decorative icons */}
      <GymDecorModalities />
      {/* Diagonal gym stripes bg */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          y: sectionY,
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            hsl(var(--foreground)),
            hsl(var(--foreground)) 2px,
            transparent 2px,
            transparent 40px
          )`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 50, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="energy-line w-16 mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
            <TextReveal>Nossas </TextReveal><TextRevealHighlight>Modalidades</TextRevealHighlight>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mais de 15 modalidades para você encontrar a atividade perfeita para seus objetivos.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1500px" }}>
          {MODALITIES.map((m, i) => (
            <motion.div
              key={m.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{
                y: -10,
                rotateY: 6,
                rotateX: -4,
                scale: 1.02,
                transition: { duration: 0.35, ease: "easeOut" },
              }}
              className="gym-card group cursor-default"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <motion.img
                  src={m.img}
                  alt={`Aula de ${m.name} na Academia Flipper em São Paulo`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={768}
                  height={512}
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 0.6 }}
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                {/* Name badge floating on hover */}
                <motion.div
                  className="absolute bottom-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ translateZ: 30 }}
                >
                  {m.name}
                </motion.div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{m.name}</h3>
                <p className="text-muted-foreground text-sm">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
