import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { ChevronRight, MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { z } from "zod";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flipper%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre...";

const contactSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(100),
  email: z.string().email("Email inválido").max(255),
  phone: z.string().optional(),
  subject: z.string().min(1, "Selecione um assunto"),
  message: z.string().min(20, "Mensagem deve ter pelo menos 20 caracteres").max(1000),
});

type FormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const ref = useScrollAnimation();
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormData;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setSubmitted(true);
  };

  return (
    <Layout>
      <SEOHead
        title="Contato - Academia Flipper | Tire suas Dúvidas e Agende sua Aula"
        description="Entre em contato com a Academia Flipper. WhatsApp, telefone, email e endereço. Agende sua aula experimental grátis em São Paulo!"
        path="/contato"
      />

      {/* Hero */}
      <section className="pt-28 pb-12 bg-primary">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-primary-foreground/60 text-sm mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-primary-foreground">Contato</span>
          </nav>
          <h1 className="font-display text-3xl lg:text-5xl font-bold text-primary-foreground">
            Entre em Contato
          </h1>
          <p className="text-primary-foreground/70 mt-3 max-w-lg">
            Tire suas dúvidas, agende uma aula experimental ou saiba mais sobre nossos planos.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background" ref={ref}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="animate-on-scroll">
              {submitted ? (
                <div className="bg-[hsl(142,60%,95%)] border border-[hsl(142,60%,80%)] rounded-xl p-8 text-center">
                  <CheckCircle size={48} className="mx-auto mb-4 text-[hsl(142,70%,40%)]" />
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">Mensagem Enviada!</h3>
                  <p className="text-muted-foreground">Entraremos em contato em breve. Obrigado!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Nome *</label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.name ? "border-destructive" : "border-border"} bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-shadow`}
                      placeholder="Seu nome completo"
                    />
                    {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email *</label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-destructive" : "border-border"} bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-shadow`}
                        placeholder="seu@email.com"
                      />
                      {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">Telefone</label>
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1">Assunto *</label>
                    <select
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.subject ? "border-destructive" : "border-border"} bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-shadow`}
                    >
                      <option value="">Selecione...</option>
                      <option value="experimental">Aula Experimental</option>
                      <option value="planos">Planos e Preços</option>
                      <option value="duvidas">Dúvidas</option>
                      <option value="outro">Outro</option>
                    </select>
                    {errors.subject && <p className="text-destructive text-xs mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">Mensagem *</label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.message ? "border-destructive" : "border-border"} bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-shadow resize-none`}
                      placeholder="Como podemos ajudar?"
                    />
                    {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
                    <p className="text-muted-foreground text-xs mt-1 text-right">{formData.message.length}/1000</p>
                  </div>

                  <button
                    type="submit"
                    className="btn-cta rounded-lg px-8 py-3 font-bold flex items-center gap-2 w-full justify-center"
                  >
                    <Send size={18} />
                    Enviar Mensagem
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="space-y-6 animate-on-scroll-3d">
              {[
                { icon: MapPin, title: "Endereço", content: "R. Alcântara, 261 – Vila Mariana, São Paulo – SP", link: "https://www.google.com/maps/dir//Academia+Flipper/@-23.6147526,-46.6866098,13z/" },
                { icon: Phone, title: "WhatsApp / Telefone", content: "(11) 94444-0557", link: WHATSAPP_URL },
                { icon: Mail, title: "Email", content: "contato@academiaflipper.com.br", link: "mailto:contato@academiaflipper.com.br" },
                { icon: Clock, title: "Horários", content: "Seg–Sex: 6h – 22h | Sáb: 8h – 18h" },
              ].map((item) => (
                <div key={item.title} className="card-3d bg-card border border-border rounded-xl p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
                    <item.icon size={22} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-muted-foreground text-sm">{item.content}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Map */}
              <div className="rounded-xl overflow-hidden border border-border aspect-video">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.5!2d-46.6813073!3d-23.6234957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce50978ff3462b%3A0x84af2af537efb30a!2sAcademia%20Flipper!5e0!3m2!1spt-BR!2sbr!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização da Academia Flipper no Google Maps"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
