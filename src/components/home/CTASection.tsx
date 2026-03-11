import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flipper%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre...";

export default function CTASection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 60, damping: 16 }}
        >
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Pronto para Começar sua Transformação?
          </h2>
          <p className="text-foreground/60 text-lg mb-10 leading-relaxed">
            Venha conhecer a Academia Flipper e descubra por que somos referência em São Paulo.
            Sua primeira aula experimental é por nossa conta!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-8 py-4 text-lg font-bold flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(135deg, hsl(185,80%,45%), hsl(195,75%,40%))",
                boxShadow: "0 6px 24px hsla(185,80%,45%,0.25)",
              }}
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              <Phone size={20} className="text-white" />
              <span className="text-white">Falar no WhatsApp</span>
            </motion.a>
            <motion.div whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contato"
                className="rounded-full px-8 py-4 text-lg font-semibold text-white/80 border border-white/15 hover:border-white/30 hover:bg-white/[0.05] transition-all flex items-center justify-center gap-2"
              >
                Entrar em Contato
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
