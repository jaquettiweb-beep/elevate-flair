import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Users, Trophy, Layers, ThumbsUp } from "lucide-react";

const STATS = [
  { icon: Users, value: 5000, suffix: "+", label: "Alunos Ativos", color: "#EE6200" },
  { icon: Trophy, value: 50, suffix: "+", label: "Anos de Experiência", color: "#EE6200" },
  { icon: Layers, value: 15, suffix: "+", label: "Modalidades", color: "#EE6200" },
  { icon: ThumbsUp, value: 98, suffix: "%", label: "Satisfação", color: "#EE6200" },
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
    <span ref={ref} className="gradient-text font-display text-5xl lg:text-6xl font-900 tracking-tight">
      {count.toLocaleString("pt-BR")}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ type: "spring", stiffness: 60, damping: 16 }}
        >
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-[#F0EDE8] mb-3">
            Nossos <span className="text-[#EE6200]">Números</span>
          </h2>
          <p className="text-[#8A95A8] text-[15px] max-w-md mx-auto">
            Décadas de dedicação traduzidas em resultados expressivos para sua saúde.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ type: "spring", stiffness: 70, damping: 18, delay: i * 0.12 }}
              whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.3 } }}
              className="relative group cursor-default"
            >
              {/* Card design matching Modalities */}
              <div className="relative bg-[#1A2335] border border-[#222D42] rounded-2xl p-6 lg:p-8 text-center overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-[0_8px_32px_rgba(238,98,0,0.15)] group-hover:border-[#EE6200]">
                {/* Accent bar */}
                <div className="absolute top-0 left-0 w-full h-[3px]" style={{ background: s.color }} />

                {/* Icon container */}
                <motion.div
                  className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center relative shadow-inner"
                  style={{
                    background: "rgba(238,98,0,0.15)",
                    border: "1px solid rgba(238,98,0,0.25)",
                  }}
                >
                  <s.icon size={24} style={{ color: s.color }} />
                </motion.div>

                <Counter target={s.value} suffix={s.suffix} />
                
                {/* Divider line */}
                <div className="w-8 h-[2px] mx-auto my-3 rounded-full opacity-30"
                  style={{ background: s.color }} />
                
                <p className="text-[#8A95A8] text-sm font-medium tracking-wide">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
