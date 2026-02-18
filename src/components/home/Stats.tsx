import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Users, Trophy, Layers, ThumbsUp } from "lucide-react";
import { GymDecorStats } from "@/components/GymDecorations";
import FloatingParticles from "@/components/FloatingParticles";

const STATS = [
  { icon: Users, value: 5000, suffix: "+", label: "Alunos Ativos" },
  { icon: Trophy, value: 15, suffix: "+", label: "Anos de Experiência" },
  { icon: Layers, value: 15, suffix: "+", label: "Modalidades" },
  { icon: ThumbsUp, value: 98, suffix: "%", label: "Satisfação" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let current = 0;
          const increment = target / 50;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(current));
            }
          }, 30);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="gradient-text font-display text-4xl lg:text-5xl font-900">
      {count.toLocaleString("pt-BR")}{suffix}
    </span>
  );
}

const statVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: 30,
    scale: 0.95,
    rotateX: 4,
  }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      type: "spring" as const,
      stiffness: 120,
      damping: 20,
    },
  }),
};

export default function Stats() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const orbX = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section className="py-20 relative overflow-hidden" ref={ref} style={{ background: "linear-gradient(180deg, hsl(205 70% 78%), hsl(210 75% 22%))" }}>
      <GymDecorStats />
      <FloatingParticles count={15} color="hsla(0,0%,100%,0.08)" />

      {/* Moving glow orb */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full"
        style={{
          x: orbX,
          background: "radial-gradient(circle, hsla(var(--secondary), 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Second orb */}
      <motion.div
        className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full"
        style={{
          x: useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]),
          background: "radial-gradient(circle, hsla(221,83%,53%,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              custom={i}
              variants={statVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              whileHover={{
                scale: 1.1,
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="text-center cursor-default relative"
            >
              {/* Glow ring behind icon */}
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full"
                style={{ background: "radial-gradient(circle, hsla(var(--secondary),0.15) 0%, transparent 70%)" }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              />

              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <s.icon size={32} className="mx-auto mb-3 text-secondary relative z-10" />
              </motion.div>
              <Counter target={s.value} suffix={s.suffix} />
              <p className="text-footer-foreground text-sm mt-2">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
