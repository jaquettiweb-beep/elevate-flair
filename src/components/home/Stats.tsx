import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Users, Trophy, Layers, ThumbsUp } from "lucide-react";

const STATS = [
  { icon: Users, value: 5000, suffix: "+", label: "Alunos Ativos", color: "hsla(185,80%,45%,1)" },
  { icon: Trophy, value: 50, suffix: "+", label: "Anos de Experiência", color: "hsla(24,95%,53%,1)" },
  { icon: Layers, value: 15, suffix: "+", label: "Modalidades", color: "hsla(221,83%,53%,1)" },
  { icon: ThumbsUp, value: 98, suffix: "%", label: "Satisfação", color: "hsla(150,60%,45%,1)" },
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
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ type: "spring", stiffness: 60, damping: 16 }}
        >
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-[#111827] mb-3">
            Nossos <span className="text-[#FF6B00]">Números</span>
          </h2>
          <p className="text-[#6B7280] text-[15px] max-w-md mx-auto">
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
              <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 lg:p-8 text-center overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-md">
                {/* Accent bar */}
                <div className="absolute top-0 left-0 w-full h-[3px]" style={{ background: s.color }} />

                {/* Icon container */}
                <motion.div
                  className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center relative shadow-inner"
                  style={{
                    background: `linear-gradient(135deg, ${s.color.replace('1)', '0.1)')}, ${s.color.replace('1)', '0.05)')})`,
                    border: `1px solid ${s.color.replace('1)', '0.15)')}`,
                  }}
                >
                  <s.icon size={24} style={{ color: s.color }} />
                </motion.div>

                <Counter target={s.value} suffix={s.suffix} />
                
                {/* Divider line */}
                <div className="w-8 h-[2px] mx-auto my-3 rounded-full opacity-30"
                  style={{ background: s.color }} />
                
                <p className="text-[#6B7280] text-sm font-medium tracking-wide">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
