import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { ChevronRight, Phone } from "lucide-react";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flipper%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20hor%C3%A1rios...";

const SCHEDULE_DATA = [
  { time: "06:00", mon: "Natação", tue: "Musculação", wed: "Natação", thu: "Musculação", fri: "Natação", sat: "Hidroginástica" },
  { time: "07:00", mon: "Hidroginástica", tue: "Yoga", wed: "Hidroginástica", thu: "Yoga", fri: "Hidroginástica", sat: "Natação" },
  { time: "08:00", mon: "Pilates Solo", tue: "Natação", wed: "Pilates Solo", thu: "Natação", fri: "Pilates Solo", sat: "Musculação" },
  { time: "09:00", mon: "Musculação", tue: "Pilates Studio", wed: "Musculação", thu: "Pilates Studio", fri: "Musculação", sat: "Yoga" },
  { time: "10:00", mon: "Yoga", tue: "60+ Saúde", wed: "Yoga", thu: "60+ Saúde", fri: "Yoga", sat: "Kung Fu" },
  { time: "14:00", mon: "Natação Infantil", tue: "Ballet Infantil", wed: "Natação Infantil", thu: "Ballet Infantil", fri: "Natação Infantil", sat: "—" },
  { time: "15:00", mon: "Judô Infantil", tue: "Natação Infantil", wed: "Judô Infantil", thu: "Natação Infantil", fri: "Judô Infantil", sat: "—" },
  { time: "17:00", mon: "Musculação", tue: "Krav Maga", wed: "Musculação", thu: "Krav Maga", fri: "Musculação", sat: "—" },
  { time: "18:00", mon: "Muay Thai", tue: "Musculação", wed: "Muay Thai", thu: "Musculação", fri: "Muay Thai", sat: "—" },
  { time: "19:00", mon: "Jiu Jitsu", tue: "Aikidô", wed: "Jiu Jitsu", thu: "Aikidô", fri: "Jiu Jitsu", sat: "—" },
  { time: "20:00", mon: "Kung Fu", tue: "Natação", wed: "Kung Fu", thu: "Natação", fri: "Ginástica", sat: "—" },
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
  if (val === "—") return "";
  if (val.includes("Natação")) return "bg-[hsl(200,80%,92%)] text-[hsl(200,80%,30%)]";
  if (val.includes("Musculação")) return "bg-[hsl(221,70%,92%)] text-[hsl(221,70%,30%)]";
  if (val.includes("Yoga") || val.includes("Pilates")) return "bg-[hsl(160,60%,90%)] text-[hsl(160,60%,28%)]";
  if (val.includes("Muay") || val.includes("Krav") || val.includes("Jiu") || val.includes("Kung") || val.includes("Aikidô") || val.includes("Judô"))
    return "bg-[hsl(0,70%,92%)] text-[hsl(0,70%,30%)]";
  if (val.includes("Hidro") || val.includes("60+") || val.includes("Ginástica"))
    return "bg-[hsl(40,80%,90%)] text-[hsl(40,80%,30%)]";
  if (val.includes("Ballet")) return "bg-[hsl(320,60%,92%)] text-[hsl(320,60%,30%)]";
  return "bg-muted text-muted-foreground";
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
                      <td className="px-4 py-3 font-mono font-semibold text-foreground sticky left-0 bg-background z-10">
                        {row.time}
                      </td>
                      {DAYS.map((d) => {
                        const val = row[d.key];
                        return (
                          <td key={d.key} className="px-3 py-2 text-center">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCellColor(val)}`}>
                              {val}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          <p className="text-muted-foreground text-sm mt-6 text-center">
            * Horários sujeitos a alteração. Entre em contato para confirmar disponibilidade.
          </p>

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
