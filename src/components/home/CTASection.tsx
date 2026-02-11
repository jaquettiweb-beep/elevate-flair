import { Phone, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flipper%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre...";

export default function CTASection() {
  const ref = useScrollAnimation();

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden" ref={ref}>
      {/* Animated gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark" />
      <div className="absolute inset-0 hero-gradient opacity-60" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="animate-on-scroll max-w-2xl mx-auto">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
            Pronto para Começar sua Transformação?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-10 leading-relaxed">
            Venha conhecer a Academia Flipper e descubra por que somos referência em São Paulo.
            Sua primeira aula experimental é por nossa conta!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta rounded-full px-8 py-4 text-lg font-bold flex items-center justify-center gap-2 animate-pulse-glow"
            >
              <Phone size={20} />
              Falar no WhatsApp
            </a>
            <Link
              to="/contato"
              className="rounded-full px-8 py-4 text-lg font-semibold text-primary-foreground border-2 border-primary-foreground/30 hover:border-primary-foreground/60 transition-colors flex items-center justify-center gap-2"
            >
              Entrar em Contato
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
