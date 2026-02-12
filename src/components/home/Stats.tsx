import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Users, Trophy, Layers, ThumbsUp } from "lucide-react";
import { GymDecorStats } from "@/components/GymDecorations";

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
    y: 60,
    scale: 0.6,
    rotateZ: (i - 1.5) * 8,
    filter: "blur(6px)",
  }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateZ: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      type: "spring" as const,
      stiffness: 120,
      damping: 14,
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
    <section className="py-20 section-dark" ref={ref}>
      {/* Gym decorative icons */}
      <GymDecorStats />
      {/* Moving glow orb */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full"
        style={{
          x: orbX,
          background: "radial-gradient(circle, hsla(var(--secondary), 0.08) 0%, transparent 70%)",
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
              whileHover={{ scale: 1.08, y: -4 }}
              className="text-center cursor-default"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <s.icon size={32} className="mx-auto mb-3 text-secondary" />
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
