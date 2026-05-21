import { motion } from "framer-motion";

export default function Partners() {
  return (
    <section id="parceiros" className="relative py-20 bg-[#0C1220] border-y border-[#222D42]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto"
        >
          <span className="text-[#EE6200] uppercase tracking-[0.2em] text-xs font-semibold">
            Benefícios corporativos
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-black text-[#F0EDE8]">
            Aceitamos TotalPass e Wellhub
          </h2>
          <p className="text-[#8A95A8] text-base md:text-lg leading-relaxed">
            Use seu benefício corporativo na Academia Flipper. Somos parceiros das principais
            plataformas de wellness do Brasil. Acesse os links abaixo para mais informações.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <a
              href="https://totalpass.com/br/academias/academia-flipper/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[10px] px-7 py-4 text-base font-semibold text-[#F0EDE8] bg-[#111828] border border-[#222D42] hover:border-[#EE6200] hover:text-[#EE6200] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(238,98,0,0.25)]"
            >
              Ver no TotalPass →
            </a>
            <a
              href="https://wellhub.com/pt-br/search/partners/academia-flipper-campo-belo-sao-paulo/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[10px] px-7 py-4 text-base font-semibold text-[#F0EDE8] bg-[#111828] border border-[#222D42] hover:border-[#EE6200] hover:text-[#EE6200] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(238,98,0,0.25)]"
            >
              Ver no Wellhub (Gympass) →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
