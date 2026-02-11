import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import { GymDecorFooter } from "@/components/GymDecorations";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flipper%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre...";

export default function Footer() {
  return (
    <footer className="section-dark relative">
      <GymDecorFooter />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <h3 className="font-display text-2xl font-bold text-primary-foreground mb-4">FLIPPER</h3>
            <p className="text-footer-foreground text-sm leading-relaxed">
              Academia completa em São Paulo, oferecendo as melhores modalidades esportivas e aquáticas. 
              Transformando vidas através do esporte desde 2010.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-primary-foreground mb-4">Links Rápidos</h4>
            <nav className="flex flex-col gap-2" aria-label="Links do rodapé">
              {[
                { label: "Home", path: "/" },
                { label: "Horários", path: "/horarios" },
                { label: "Galeria", path: "/galeria" },
                { label: "Contato", path: "/contato" },
              ].map((l) => (
                <Link
                  key={l.path}
                  to={l.path}
                  className="text-footer-foreground text-sm hover:text-primary-foreground transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-primary-foreground mb-4">Contato</h4>
            <ul className="space-y-3 text-sm text-footer-foreground">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-secondary" />
                <span>R. Alcântara, 261 – Vila Mariana, São Paulo – SP</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-secondary" />
                <a href="tel:+5511944440557" className="hover:text-primary-foreground transition-colors">
                  (11) 94444-0557
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-secondary" />
                <a href="mailto:contato@academiaflipper.com.br" className="hover:text-primary-foreground transition-colors">
                  contato@academiaflipper.com.br
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={16} className="mt-0.5 shrink-0 text-secondary" />
                <div>
                  <p>Seg–Sex: 6h – 22h</p>
                  <p>Sáb: 8h – 18h</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display font-bold text-primary-foreground mb-4">Siga-nos</h4>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Instagram, href: "https://www.instagram.com/academiaflipper", color: "bg-gradient-to-br from-[hsl(340,75%,55%)] to-[hsl(30,90%,55%)]" },
                { icon: Facebook, href: "https://www.facebook.com/academiaflipper", color: "bg-[hsl(221,44%,41%)]" },
                { icon: Linkedin, href: "https://www.linkedin.com/company/academiaflipper", color: "bg-[hsl(201,100%,35%)]" },
                { icon: Youtube, href: "https://www.youtube.com/@academiaflipper", color: "bg-[hsl(0,100%,42%)]" },
              ].map(({ icon: Icon, href, color }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${color} w-10 h-10 rounded-full flex items-center justify-center text-primary-foreground transition-transform hover:scale-110`}
                  aria-label={`Seguir no ${Icon.displayName || "social"}`}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 bg-[hsl(142,70%,40%)] text-primary-foreground rounded-full px-5 py-2 text-sm font-semibold hover:scale-105 transition-transform"
            >
              <Phone size={16} />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-primary-foreground/10 text-center text-footer-foreground text-xs">
          <p>© {new Date().getFullYear()} Academia Flipper. Todos os direitos reservados.</p>
        </div>
      </div>

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
            telephone: "+5511944440557",
            priceRange: "$$",
            address: {
              "@type": "PostalAddress",
              streetAddress: "R. Alcântara, 261 – Vila Mariana",
              addressLocality: "São Paulo",
              addressRegion: "SP",
              postalCode: "04120-000",
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
                closes: "18:00",
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
