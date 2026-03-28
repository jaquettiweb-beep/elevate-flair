import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { ChevronRight, Phone } from "lucide-react";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flipper%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20hor%C3%A1rios...";

const SCHEDULE_DATA = [
  { time: "06:15", mon: ["Natação"], tue: ["Natação"], wed: ["Natação"], thu: ["Natação"], fri: [], sat: [] },
  { time: "07:00", mon: ["Natação", "Pilates Studio"], tue: ["Yoga", "Krav Maga", "Natação", "Pilates Studio"], wed: ["Natação", "Pilates Studio"], thu: ["Yoga", "Krav Maga", "Natação", "Pilates Studio"], fri: ["Natação", "Pilates Studio"], sat: [] },
  { time: "07:45", mon: ["Natação"], tue: ["Hidroginástica", "Natação"], wed: ["Natação"], thu: ["Hidroginástica", "Natação"], fri: ["Hidroginástica", "Natação"], sat: [] },
  { time: "08:00", mon: ["Pilates Studio"], tue: ["Pilates Studio"], wed: ["Pilates Studio"], thu: ["Pilates Studio"], fri: ["Pilates Studio"], sat: [] },
  { time: "08:30", mon: ["Natação"], tue: [], wed: ["Natação"], thu: [], fri: ["Natação"], sat: [] },
  { time: "09:00", mon: ["Ballet", "Pilates Studio"], tue: ["Pilates Studio"], wed: ["Ballet", "Pilates Studio"], thu: ["Pilates Studio"], fri: ["Pilates Studio"], sat: [] },
  { time: "09:30", mon: ["Pilates Studio"], tue: ["Pilates Studio"], wed: ["Pilates Studio"], thu: ["Pilates Studio"], fri: ["Pilates Studio"], sat: ["Natação Baby"] },
  { time: "10:00", mon: ["Pilates Studio"], tue: ["Natação Baby", "Pilates Studio"], wed: ["Pilates Studio"], thu: ["Natação Baby", "Pilates Studio"], fri: ["Pilates Studio"], sat: ["Natação Baby"] },
  { time: "10:30", mon: ["Pilates Studio"], tue: ["Pilates Studio"], wed: ["Pilates Studio"], thu: ["Pilates Studio"], fri: ["Pilates Studio"], sat: ["Natação Baby"] },
  { time: "10:45", mon: ["Hidroginástica"], tue: ["Hidroginástica"], wed: ["Hidroginástica"], thu: ["Hidroginástica"], fri: [], sat: [] },
  { time: "11:00", mon: ["Pilates Studio", "60+ Fortal."], tue: ["Pilates Studio", "60+ Fortal."], wed: ["Pilates Studio", "60+ Alongamento"], thu: ["Pilates Studio", "60+ Fortal."], fri: ["Pilates Studio", "60+ Fortal."], sat: ["Krav Maga"] },
  { time: "11:30", mon: ["Pilates Studio", "Hidrog. (Lotação)"], tue: ["Pilates Studio", "Natação"], wed: ["Pilates Studio", "Hidrog. (Lotação)"], thu: ["Pilates Studio", "Natação"], fri: ["Pilates Studio", "Hidrog. (Lotação)"], sat: [] },
  { time: "12:00", mon: ["Pilates Studio"], tue: ["Pilates Studio"], wed: ["Pilates Studio", "60+ Equilíbrio"], thu: ["Pilates Studio", "60+ Alongamento"], fri: ["Pilates Studio"], sat: [] },
  { time: "13:00", mon: [], tue: ["Pilates Studio"], wed: [], thu: ["Pilates Studio"], fri: [], sat: [] },
  { time: "14:00", mon: [], tue: ["Pilates Studio"], wed: [], thu: ["Pilates Studio"], fri: [], sat: [] },
  { time: "15:00", mon: ["Ballet"], tue: ["Pilates Studio"], wed: ["Ballet"], thu: ["Pilates Studio"], fri: [], sat: [] },
  { time: "16:00", mon: ["Judô", "Pilates Studio"], tue: [], wed: ["Judô"], thu: [], fri: ["Pilates Studio"], sat: [] },
  { time: "16:30", mon: [], tue: ["Pilates Studio"], wed: ["Pilates Studio"], thu: ["Pilates Studio"], fri: [], sat: [] },
  { time: "17:00", mon: [], tue: [], wed: [], thu: [], fri: ["Yoga"], sat: [] },
  { time: "17:30", mon: ["Ginástica Funcional"], tue: ["Pilates Studio", "Natação Baby"], wed: ["Ginástica Funcional"], thu: ["Pilates Studio", "Natação Baby"], fri: [], sat: [] },
  { time: "18:00", mon: ["Localizada", "Muay Thai"], tue: [], wed: ["Localizada", "Muay Thai"], thu: [], fri: [], sat: [] },
  { time: "18:15", mon: ["Hidroginástica", "Natação"], tue: ["Natação"], wed: ["Hidroginástica", "Natação"], thu: ["Natação"], fri: ["Natação"], sat: [] },
  { time: "18:30", mon: ["Mat Pilates"], tue: ["Pilates Studio"], wed: ["Mat Pilates"], thu: ["Pilates Studio"], fri: [], sat: [] },
  { time: "19:00", mon: ["Natação"], tue: ["Aikido / Jiu Jitsu", "Natação"], wed: ["Krav Maga", "Natação"], thu: ["Aikido / Jiu Jitsu", "Natação"], fri: ["Krav Maga", "Natação"], sat: [] },
  { time: "19:30", mon: [], tue: ["Pilates Studio"], wed: [], thu: ["Pilates Studio"], fri: [], sat: [] },
  { time: "19:45", mon: ["Natação"], tue: ["Natação"], wed: ["Natação"], thu: ["Natação"], fri: ["Natação"], sat: [] },
  { time: "20:30", mon: ["Natação"], tue: ["Natação"], wed: ["Natação"], thu: ["Natação"], fri: ["Natação"], sat: [] },
];

const DAYS = [
  { key: "mon", label: "Segunda" },
  { key: "tue", label: "Terça" },
  { key: "wed", label: "Quarta" },
  { key: "thu", label: "Quinta" },
  { key: "fri", label: "Sexta" },
  { key: "sat", label: "Sábado" },
] as const;

function getCellColor(val: string) {
  if (val.includes("Natação")) return "bg-[hsl(200,80%,92%)] text-[hsl(200,80%,30%)] border-[hsl(200,80%,85%)]";
  if (val.includes("Musculação")) return "bg-[hsl(221,70%,92%)] text-[hsl(221,70%,30%)] border-[hsl(221,70%,85%)]";
  if (val.includes("Yoga") || val.includes("Pilates") || val.includes("Alongamento") || val.includes("Equilíbrio")) return "bg-[hsl(160,60%,90%)] text-[hsl(160,60%,28%)] border-[hsl(160,60%,80%)]";
  if (val.includes("Muay") || val.includes("Krav") || val.includes("Jiu") || val.includes("Kung") || val.includes("Aikido") || val.includes("Judô"))
    return "bg-[hsl(0,70%,92%)] text-[hsl(0,70%,30%)] border-[hsl(0,70%,85%)]";
  if (val.includes("Hidro") || val.includes("60+") || val.includes("Ginástica") || val.includes("Localizada") || val.includes("Funcional") || val.includes("Fortal"))
    return "bg-[hsl(40,80%,90%)] text-[hsl(40,80%,30%)] border-[hsl(40,80%,80%)]";
  if (val.includes("Ballet")) return "bg-[hsl(320,60%,92%)] text-[hsl(320,60%,30%)] border-[hsl(320,60%,85%)]";
  return "bg-muted text-muted-foreground border-border";
}

export default function Schedule() {
  return (
    <Layout>
      <PageTransition>
      <SEOHead
        title="Horários das Aulas - Academia Flipper | Confira Nossa Grade"
        description="Veja os horários de todas as modalidades da Academia Flipper: natação, musculação, pilates, artes marciais e mais. Segunda a sábado das 6h às 22h."
        path="/horarios"
      />

      {/* Hero */}
      <section className="pt-28 pb-12 bg-primary">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-primary-foreground/60 text-sm mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-primary-foreground">Horários</span>
          </nav>
          <h1 className="font-display text-3xl lg:text-5xl font-bold text-primary-foreground">
            Grade de Horários
          </h1>
          <p className="text-primary-foreground/70 mt-3 max-w-lg">
            Confira os horários de todas as nossas modalidades e encontre a aula perfeita para sua rotina.
          </p>
        </div>
      </section>

      {/* Schedule Table */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up" intensity="high">
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[700px] text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="px-4 py-3 text-left font-semibold text-foreground sticky left-0 bg-muted z-10">Horário</th>
                    {DAYS.map((d) => (
                      <th key={d.key} className="px-4 py-3 text-center font-semibold text-foreground">{d.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SCHEDULE_DATA.map((row) => (
                    <tr key={row.time} className="border-t border-border hover:bg-muted/50 transition-colors">
                      <td className="px-4 py-3 font-mono font-semibold text-foreground sticky left-0 bg-background z-10 whitespace-nowrap align-top">
                        {row.time}
                      </td>
                      {DAYS.map((d) => {
                        const classes = row[d.key as keyof typeof row] as string[];
                        return (
                          <td key={d.key} className="px-3 py-2 text-center align-top min-w-[140px]">
                            {classes.length === 0 ? (
                              <span className="text-muted-foreground/30">—</span>
                            ) : (
                              <div className="flex flex-col gap-1.5 items-center">
                                {classes.map((c, i) => (
                                  <span key={i} className={`inline-block px-3 py-1.5 rounded-md text-xs font-medium border w-full leading-tight ${getCellColor(c)}`}>
                                    {c}
                                  </span>
                                ))}
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" intensity="medium">
            <div className="bg-[hsl(221,70%,96%)] border border-[hsl(221,70%,85%)] rounded-xl p-6 mt-12 text-center max-w-2xl mx-auto shadow-sm">
              <h3 className="font-bold text-lg mb-2 text-[hsl(221,70%,30%)]">Musculação – Horário Livre</h3>
              <p className="text-[hsl(221,70%,40%)]">
                A musculação não possui horários fixos de aula. O espaço fica livre para treino durante todo o horário de funcionamento da academia:
              </p>
              <div className="mt-3 font-medium text-[hsl(221,70%,30%)]">
                Segunda a Sexta: 06h às 22h <br/>
                Sábados: 08h às 13h
              </div>
            </div>
            <p className="text-muted-foreground text-sm mt-6 text-center">
              * Horários sujeitos a alteração. Entre em contato para confirmar disponibilidade.
            </p>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal direction="zoom" intensity="high">
            <div className="text-center mt-10">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta rounded-full px-8 py-4 text-lg font-bold inline-flex items-center gap-2"
              >
                <Phone size={20} />
                Agendar Aula Experimental
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
      </PageTransition>
    </Layout>
  );
}
