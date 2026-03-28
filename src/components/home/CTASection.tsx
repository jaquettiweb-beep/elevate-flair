import { motion } from "framer-motion";
import { Phone, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flipper%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre...";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden">
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
              background: "#1A2335",
              border: "1px solid #222D42",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Sparkles size={14} style={{ color: "#EE6200" }} />
            <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: "#EE6200" }}>
              Aula Experimental Grátis
            </span>
          </motion.div>

          <h2 className="font-display text-3xl lg:text-5xl font-bold text-[#F0EDE8] mb-6 leading-tight">
            Pronto para Começar sua{" "}
            <span className="relative inline-block">
              <span className="text-[#EE6200]">Transformação</span>
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                style={{ background: "#EE6200" }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              />
            </span>
            ?
          </h2>
          <p className="text-[#8A95A8] text-lg mb-12 leading-relaxed max-w-lg mx-auto">
            Venha conhecer a Academia Flipper e descubra por que somos referência em São Paulo há mais de 50 anos.
            Sua primeira aula experimental é por nossa conta!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[8px] px-[30px] py-[13px] text-[15px] font-semibold flex items-center justify-center gap-3 text-white bg-[#EE6200] hover:bg-[#CC5400] transition-all hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(238,98,0,0.4)]"
              whileTap={{ scale: 0.97 }}
            >
              <Phone size={20} className="relative z-10" />
              <span className="relative z-10">Falar no WhatsApp</span>
            </motion.a>

            <motion.div whileTap={{ scale: 0.97 }}>
              <Link
                to="/contato"
                className="group rounded-[8px] px-[30px] py-[13px] text-[15px] font-semibold flex items-center justify-center gap-3 transition-all duration-300 border-[1.5px] border-[#EE6200] bg-transparent text-[#EE6200] hover:bg-[#EE6200] hover:text-[#F0EDE8]"
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
