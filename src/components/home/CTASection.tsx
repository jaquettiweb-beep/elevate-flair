import { motion } from "framer-motion";
import { Phone, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flipper%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre...";

export default function CTASection() {
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden">
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
              background: "#FFFBEB",
              border: "1px solid #FDE68A",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Sparkles size={14} style={{ color: "#92400E" }} />
            <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: "#92400E" }}>
              Aula Experimental Grátis
            </span>
          </motion.div>

          <h2 className="font-display text-3xl lg:text-5xl font-bold text-[#111827] mb-6 leading-tight">
            Pronto para Começar sua{" "}
            <span className="relative inline-block">
              <span className="text-[#FF6B00]">Transformação</span>
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                style={{ background: "#FF6B00" }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              />
            </span>
            ?
          </h2>
          <p className="text-[#6B7280] text-lg mb-12 leading-relaxed max-w-lg mx-auto">
            Venha conhecer a Academia Flipper e descubra por que somos referência em São Paulo há mais de 50 anos.
            Sua primeira aula experimental é por nossa conta!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-[10px] px-8 py-4 text-lg font-bold flex items-center justify-center gap-3 overflow-hidden bg-[#FF6B00] text-white shadow-lg shadow-orange-500/20"
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              <Phone size={20} className="relative z-10" />
              <span className="relative z-10">Falar no WhatsApp</span>
            </motion.a>

            <motion.div whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contato"
                className="group rounded-[10px] px-8 py-4 text-lg font-semibold text-[#111827] flex items-center justify-center gap-3 transition-all duration-300 border border-[#E5E7EB] bg-white hover:border-[#FF6B00] hover:text-[#FF6B00]"
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
