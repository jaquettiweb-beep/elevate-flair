import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { GymDecorCTA } from "@/components/GymDecorations";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flipper%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre...";

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05]);
  const textY = useTransform(scrollYProgress, [0, 1], ["20%", "-10%"]);

  return (
    <section ref={ref} className="py-20 lg:py-28 relative overflow-hidden">
      {/* Gym decorative icons */}
      <GymDecorCTA />
      {/* Animated gradient bg */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark"
        style={{ scale: bgScale }}
      />
      <div className="absolute inset-0 hero-gradient opacity-60" />

      {/* Energy particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: `hsl(var(--secondary))`,
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, (i % 2 ? 20 : -20), 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}

      <motion.div
        className="relative z-10 container mx-auto px-4 text-center"
        style={{ y: textY }}
      >
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 60, scale: 0.9, rotateX: 15 }}
          whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <Zap size={40} className="mx-auto mb-6 text-secondary" />
          </motion.div>

          <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
            Pronto para Começar sua Transformação?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-10 leading-relaxed">
            Venha conhecer a Academia Flipper e descubra por que somos referência em São Paulo.
            Sua primeira aula experimental é por nossa conta!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta rounded-full px-8 py-4 text-lg font-bold flex items-center justify-center gap-2 animate-pulse-glow"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              <Phone size={20} />
              Falar no WhatsApp
            </motion.a>
            <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contato"
                className="rounded-full px-8 py-4 text-lg font-semibold text-primary-foreground border-2 border-primary-foreground/30 hover:border-primary-foreground/60 transition-colors flex items-center justify-center gap-2"
              >
                Entrar em Contato
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
