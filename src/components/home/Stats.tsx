import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Users, Trophy, Layers, ThumbsUp } from "lucide-react";

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

export default function Stats() {
  return (
    <section className="py-20 lg:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ type: "spring", stiffness: 80, damping: 18, delay: i * 0.1 }}
              whileHover={{ scale: 1.08, y: -6, transition: { duration: 0.3 } }}
              className="text-center cursor-default"
            >
              <s.icon size={28} className="mx-auto mb-3 text-secondary" />
              <Counter target={s.value} suffix={s.suffix} />
              <p className="text-white/50 text-sm mt-2">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
