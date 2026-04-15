import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import { GymDecorFooter } from "@/components/GymDecorations";
import FloatingParticles from "@/components/FloatingParticles";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flipper%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre...";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0C1220] border-t border-[#222D42]">
      <GymDecorFooter />
      <FloatingParticles count={6} color="hsla(0,0%,100%,0.04)" />

      <motion.div
        className="container mx-auto px-6 py-20 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
          {/* Column 1: Logo + Tagline */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <h3 className="font-display text-3xl font-black text-[#F0EDE8] tracking-tight">FLIPPER</h3>
            <p className="text-[#8A95A8] text-base leading-relaxed max-w-sm">
              Uma academia humanizada, com modalidades para diversas idades, focada em bem-estar, saúde e desenvolvimento pessoal. Transformando vidas através do esporte e do acolhimento familiar há mais de 50 anos no Brooklin.
            </p>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <h4 className="font-display font-bold text-[#F0EDE8] text-lg">Explorar</h4>
            <nav className="flex flex-col gap-4" aria-label="Links do rodapé">
              {[
                { label: "Home", path: "/" },
                { label: "Planos", path: "/planos" },
                { label: "Horários", path: "/horarios" },
                { label: "Nossa História", path: "/historia" },
                { label: "Contato", path: "/contato" },
              ].map((l) => (
                <Link
                  key={l.path}
                  to={l.path}
                  className="text-[#8A95A8] text-sm font-medium hover:text-[#EE6200] hover:translate-x-1 transition-all duration-200"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Column 3: Social + Contact */}
          <motion.div variants={itemVariants} className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h4 className="font-display font-bold text-[#F0EDE8] text-lg">Conecte-se</h4>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: Instagram, href: "https://www.instagram.com/academia.flipper/", label: "Instagram" },
                  { icon: Youtube, href: "https://www.youtube.com/@academiaflipper9455", label: "YouTube" },
                  { icon: Linkedin, href: "https://www.linkedin.com/company/academia-flipper/", label: "LinkedIn" },
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#111828] border border-[#222D42] text-[#8A95A8] hover:bg-[#EE6200] hover:border-[#EE6200] hover:text-[#F0EDE8] transition-all duration-300"
                    aria-label={`Seguir no ${label}`}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={24} />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-[#222D42] pt-6">
              <div className="flex items-start gap-3 text-sm text-[#8A95A8]">
                <Clock size={18} className="shrink-0 text-[#EE6200] mt-0.5" />
                <span>Seg – Sex: 6h às 22h | Sáb: 8h às 13h | Dom e feriados: Fechado</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-[#8A95A8]">
                <MapPin size={18} className="shrink-0 text-[#EE6200] mt-0.5" />
                <span>Av. Vereador José Diniz, 2583 – Brooklin, SP</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#8A95A8]">
                <Phone size={18} className="shrink-0 text-[#EE6200]" />
                <a href="tel:+551138762340" className="hover:text-[#EE6200] transition-colors">
                  (11) 3876-2340
                </a>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-[8px] px-[30px] py-[13px] text-[15px] font-semibold text-white bg-[#EE6200] hover:bg-[#CC5400] transition-all hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(238,98,0,0.4)]"
              >
                Atendimento via WhatsApp
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          className="mt-16 pt-8 border-t border-[#222D42] text-center text-[#8A95A8] text-xs"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p>© {new Date().getFullYear()} Academia Flipper. Todos os direitos reservados. Design com Alma.</p>
        </motion.div>
      </motion.div>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsActivityLocation",
            name: "Academia Flipper",
            description: "Academia completa em São Paulo com natação, musculação, pilates, artes marciais e muito mais",
            url: "https://www.academiaflipper.com.br",
            telephone: "+551138762340",
            priceRange: "$$",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Av. Vereador José Diniz, 2583 – Brooklin",
              addressLocality: "São Paulo",
              addressRegion: "SP",
              postalCode: "04604-007",
              addressCountry: "BR",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: -23.6234957,
              longitude: -46.6813073,
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "06:00",
                closes: "22:00",
              },
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Saturday",
                opens: "08:00",
                closes: "13:00",
              },
            ],
            sameAs: [
              "https://www.instagram.com/academiaflipper",
              "https://www.facebook.com/academiaflipper",
            ],
          }),
        }}
      />
    </footer>
  );
}
