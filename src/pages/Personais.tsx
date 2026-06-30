import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";

type Personal = {
  name: string;
  phone: string; // digits only, with country+area code (55 + DDD + number)
};

const PERSONAIS: Personal[] = [
  { name: "Ana Paula Paschoalatto Mateo", phone: "5511983140984" },
  { name: "Douglas Galhardi", phone: "5511983562211" },
  { name: "Eduardo Gomes da Cruz", phone: "5511954709663" },
  { name: "Fábio de Oliveira Pereira", phone: "5511980559596" },
  { name: "Glaucione Duarte Purcino", phone: "5511999712436" },
  { name: "Jeferson Ricardo Lima", phone: "5511995165257" },
  { name: "Larissa da Silva Lino", phone: "5511940680216" },
  { name: "Mauricio Santos Rocha", phone: "5511985740868" },
  { name: "Thiago de Santis Goularte", phone: "5511965419596" },
  { name: "Welton Chagas Silva", phone: "5511992805737" },
  { name: "Any Salles", phone: "5511958583156" },
];

const formatPhone = (phone: string) => {
  // phone = 55 + DDD(2) + number(8 or 9)
  const ddd = phone.slice(2, 4);
  const rest = phone.slice(4);
  if (rest.length === 9) {
    return `(${ddd}) ${rest.slice(0, 5)}-${rest.slice(5)}`;
  }
  return `(${ddd}) ${rest.slice(0, 4)}-${rest.slice(4)}`;
};

const initials = (name: string) =>
  name
    .split(" ")
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const waLink = (phone: string, name: string) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(
    `Olá ${name.split(" ")[0]}! Te encontrei pelo site da Academia Flipper e gostaria de saber mais sobre treino personal.`
  )}`;

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, type: "spring" as const, stiffness: 60, damping: 14, mass: 0.8 },
  }),
};

const Personais = () => {
  return (
    <Layout>
      <SEOHead
        title="Personal Trainers - Academia Flipper"
        description="Conheça os personal trainers que atendem na Academia Flipper e fale diretamente com o profissional ideal para o seu treino."
        path="/personais"
      />
      <PageTransition>
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, hsl(205, 72%, 55%) 0%, hsl(210, 75%, 30%) 50%, hsl(215, 80%, 14%) 100%)`,
            }}
          />
          <div className="relative z-10 pt-32 pb-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 60, damping: 14, mass: 0.8 }}
                className="text-center mb-16"
              >
                <span className="block text-[11px] font-bold tracking-[0.14em] uppercase mb-3 text-[#EE6200]">
                  Treino Individual
                </span>
                <h1 className="font-display text-4xl lg:text-6xl font-bold text-white drop-shadow-md mb-4">
                  Personal Trainers
                </h1>
                <p className="text-white/85 text-lg max-w-2xl mx-auto leading-relaxed">
                  Profissionais autônomos que atendem na Academia Flipper. Fale direto com quem combina mais
                  com seus objetivos e agende seu treino personalizado.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {PERSONAIS.map((p, i) => (
                  <motion.article
                    key={p.name}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={cardVariants}
                    className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:border-[#EE6200]/60 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(238,98,0,0.25)] p-5 flex flex-col gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#EE6200]/20 border border-[#EE6200]/40 text-[#EE6200] font-bold text-lg">
                        {initials(p.name)}
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-white leading-tight">{p.name}</h2>
                        <p className="text-[#EE6200] text-sm font-semibold">Personal Trainer</p>
                      </div>
                    </div>
                    <a
                      href={waLink(p.phone, p.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white bg-[#25D366] hover:bg-[#1FB855] transition-colors"
                    >
                      <MessageCircle className="size-4" />
                      {formatPhone(p.phone)}
                    </a>
                  </motion.article>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center text-white/60 text-sm mt-12"
              >
                Os personal trainers listados são profissionais autônomos e não fazem parte do quadro de
                funcionários da Academia Flipper.
              </motion.p>
            </div>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
};

export default Personais;
