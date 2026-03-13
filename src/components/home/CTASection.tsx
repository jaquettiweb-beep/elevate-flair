import { motion } from "framer-motion";
import { Phone, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flipper%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre...";

export default function CTASection() {
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Central glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px]"
          style={{ background: "radial-gradient(ellipse, hsla(185,80%,45%,0.08) 0%, transparent 60%)" }} />
        
        {/* Floating accent orbs */}
        <motion.div
          className="absolute top-1/4 left-[15%] w-3 h-3 rounded-full"
          style={{ background: "hsla(185,80%,60%,0.3)" }}
          animate={{ y: [-10, 10, -10], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-[20%] w-2 h-2 rounded-full"
          style={{ background: "hsla(24,95%,53%,0.3)" }}
          animate={{ y: [8, -8, 8], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-1/3 right-[10%] w-2 h-2 rounded-full"
          style={{ background: "hsla(221,83%,53%,0.25)" }}
          animate={{ y: [-6, 12, -6], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 60, damping: 16 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
            style={{
              background: "hsla(24,95%,53%,0.1)",
              border: "1px solid hsla(24,95%,53%,0.2)",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Sparkles size={14} style={{ color: "hsl(24,95%,53%)" }} />
            <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: "hsl(24,95%,65%)" }}>
              Aula Experimental Grátis
            </span>
          </motion.div>

          <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Pronto para Começar sua{" "}
            <span className="relative inline-block">
              <span className="text-secondary">Transformação</span>
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                style={{ background: "linear-gradient(90deg, hsl(24,95%,53%), hsl(15,90%,50%))" }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              />
            </span>
            ?
          </h2>
          <p className="text-white/60 text-lg mb-12 leading-relaxed max-w-lg mx-auto">
            Venha conhecer a Academia Flipper e descubra por que somos referência em São Paulo.
            Sua primeira aula experimental é por nossa conta!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl px-8 py-4 text-lg font-bold flex items-center justify-center gap-3 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(185,80%,45%), hsl(195,75%,40%))",
                boxShadow: "0 8px 30px hsla(185,80%,45%,0.25), inset 0 1px 0 hsla(0,0%,100%,0.15)",
              }}
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: "linear-gradient(105deg, transparent 40%, hsla(0,0%,100%,0.1) 45%, hsla(0,0%,100%,0.2) 50%, hsla(0,0%,100%,0.1) 55%, transparent 60%)", backgroundSize: "200% 100%", animation: "shimmerSlide 2s ease-in-out infinite" }} />
              <Phone size={20} className="text-white relative z-10" />
              <span className="text-white relative z-10">Falar no WhatsApp</span>
            </motion.a>

            <motion.div whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contato"
                className="group rounded-2xl px-8 py-4 text-lg font-semibold text-white/80 flex items-center justify-center gap-3 transition-all duration-300"
                style={{
                  background: "hsla(0,0%,100%,0.04)",
                  border: "1px solid hsla(0,0%,100%,0.12)",
                  backdropFilter: "blur(12px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "hsla(0,0%,100%,0.08)";
                  e.currentTarget.style.borderColor = "hsla(0,0%,100%,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "hsla(0,0%,100%,0.04)";
                  e.currentTarget.style.borderColor = "hsla(0,0%,100%,0.12)";
                }}
              >
                Entrar em Contato
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
