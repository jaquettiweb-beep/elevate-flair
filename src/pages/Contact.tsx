import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { ChevronRight, MapPin, Phone, Mail, Clock, Send, CheckCircle, Waves, Dumbbell, Heart, Shield, HelpCircle, FileText, Calendar, ArrowRight } from "lucide-react";
import { z } from "zod";
import { motion } from "framer-motion";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flipper%20e%20gostaria%20de%20agendar%20uma%20aula%20experimental%20gr%C3%A1tis!";

const contactSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(100),
  contact: z.string().min(5, "Informe seu WhatsApp ou email para contato"),
  interest: z.string().min(1, "Selecione o que você procura"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof contactSchema>;

const interestOptions = [
  { value: "natacao-infantil", label: "Natação Infantil", icon: Waves },
  { value: "natacao-adulto", label: "Natação Adulto", icon: Waves },
  { value: "musculacao", label: "Musculação", icon: Dumbbell },
  { value: "bem-estar", label: "Yoga / Pilates / Bem-estar", icon: Heart },
  { value: "lutas", label: "Lutas (Jiu Jitsu, Muay Thai…)", icon: Shield },
  { value: "planos", label: "Planos e Preços", icon: FileText },
  { value: "outro", label: "Outra dúvida", icon: HelpCircle },
];

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({ name: "", contact: "", interest: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showMessage = formData.interest === "outro";

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  // Detect if contact is phone or email for success message
  const contactMethod = formData.contact.includes("@") ? "email" : "WhatsApp";

  return (
    <Layout>
      <PageTransition>
      <SEOHead
        title="Agende Sua Aula Grátis | Academia Flipper Brooklin SP | Respondemos em 2h"
        description="Agende sua aula experimental grátis na Academia Flipper. Natação, musculação, lutas, yoga e pilates no Brooklin. Resposta em até 2 horas. Fale conosco!"
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
          <motion.div
            className="h-1 bg-primary-foreground/30 mb-4 rounded-full origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ width: "80px" }}
          />
          <h1 className="font-display text-3xl lg:text-5xl font-bold text-primary-foreground">
            Agende Sua Aula Experimental{" "}
            <span className="text-primary-foreground/80">Grátis</span>
          </h1>
          <p className="text-primary-foreground/70 mt-3 max-w-lg">
            Em 2 minutos você agenda sua aula grátis. Sem compromisso, sem burocracia.{" "}
            <span className="text-primary-foreground/90 font-medium">Respondemos em até 2 horas úteis.</span>
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="w-full">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="bg-[hsl(142,60%,95%)] border border-[hsl(142,60%,80%)] rounded-xl p-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle size={64} className="mx-auto mb-4 text-[hsl(142,70%,40%)]" />
                  </motion.div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    Recebemos sua mensagem, {formData.name.split(" ")[0]}! 🎉
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Nossa equipe entrará em contato via <strong>{contactMethod}</strong>{" "}
                    em até <strong>2 horas úteis</strong>.
                  </p>
                  <p className="text-muted-foreground text-sm mb-6">
                    Enquanto isso, que tal conhecer nossas modalidades?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      to="/galeria"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Ver Galeria
                      <ArrowRight size={16} />
                    </Link>
                    <button
                      onClick={() => { setSubmitted(false); setFormData({ name: "", contact: "", interest: "", message: "" }); }}
                      className="px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-accent transition-colors"
                    >
                      Enviar outra mensagem
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15, margin: "0px 0px -50px 0px" }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0 }}
                  >
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Seu nome</label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className={`w-full px-4 py-3.5 rounded-lg border ${errors.name ? "border-destructive" : "border-border"} bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-shadow min-h-[48px]`}
                      placeholder="Ex: Maria Silva"
                      autoComplete="name"
                    />
                    {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                  </motion.div>

                  {/* Contact (WhatsApp or Email) */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15, margin: "0px 0px -50px 0px" }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
                  >
                    <label htmlFor="contact" className="block text-sm font-medium text-foreground mb-1">WhatsApp ou Email</label>
                    <input
                      id="contact"
                      type="text"
                      value={formData.contact}
                      onChange={(e) => handleChange("contact", e.target.value)}
                      className={`w-full px-4 py-3.5 rounded-lg border ${errors.contact ? "border-destructive" : "border-border"} bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-shadow min-h-[48px]`}
                      placeholder="(11) 99999-9999 ou maria@email.com"
                    />
                    <p className="text-muted-foreground text-xs mt-1">Escolha o melhor jeito de te responder</p>
                    {errors.contact && <p className="text-destructive text-xs mt-1">{errors.contact}</p>}
                  </motion.div>

                  {/* Interest */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15, margin: "0px 0px -50px 0px" }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.16 }}
                  >
                    <label htmlFor="interest" className="block text-sm font-medium text-foreground mb-1">O que você procura?</label>
                    <select
                      id="interest"
                      value={formData.interest}
                      onChange={(e) => handleChange("interest", e.target.value)}
                      className={`w-full px-4 py-3.5 rounded-lg border ${errors.interest ? "border-destructive" : "border-border"} bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-shadow min-h-[48px]`}
                    >
                      <option value="">Selecione sua modalidade de interesse...</option>
                      {interestOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.interest && <p className="text-destructive text-xs mt-1">{errors.interest}</p>}
                  </motion.div>

                  {/* Conditional Message */}
                  {showMessage && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">Sua mensagem (opcional)</label>
                      <textarea
                        id="message"
                        rows={3}
                        value={formData.message || ""}
                        onChange={(e) => handleChange("message", e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-shadow resize-none"
                        placeholder="Conte mais sobre sua dúvida..."
                      />
                    </motion.div>
                  )}

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-cta rounded-lg px-8 py-3.5 font-bold flex items-center gap-2 w-full justify-center min-h-[52px] disabled:opacity-60 disabled:cursor-not-allowed"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.24 }}
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Calendar size={18} />
                        Quero Receber Contato
                      </>
                    )}
                  </motion.button>

                  {/* Privacy note */}
                  <p className="text-muted-foreground text-xs text-center">
                    🔒 Seus dados estão seguros. Responderemos em até <strong>2 horas úteis</strong>.
                  </p>
                </form>
              )}
            </div>

            {/* Info */}
            <ScrollReveal direction="right" intensity="high">
              <div className="space-y-6">
                {[
                  { icon: MapPin, title: "Endereço", content: "Av. Vereador José Diniz, 2583 – Brooklin, São Paulo – SP", link: "https://www.google.com/maps/dir//Academia+Flipper/@-23.6147526,-46.6866098,13z/" },
                  { icon: Phone, title: "Telefone", content: "(11) 3876-2340", link: "tel:+551138762340" },
                  { icon: Phone, title: "WhatsApp", content: "(11) 94444-0557", link: WHATSAPP_URL },
                  { icon: Mail, title: "Email", content: "contato@academiaflipper.com.br", link: "mailto:contato@academiaflipper.com.br" },
                  { icon: Clock, title: "Horários", content: "Seg–Sex: 6h – 22h | Sáb: 6h – 13h" },
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
            </ScrollReveal>
          </div>
        </div>
      </section>
      </PageTransition>
    </Layout>
  );
}
