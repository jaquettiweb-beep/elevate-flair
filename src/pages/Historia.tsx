import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/layout/PageTransition";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Timeline } from "@/components/ui/timeline";
import fachadaImg from "@/assets/fachada-flipper.jpg";
import swimmingImg from "@/assets/swimming.jpg";
import musculacaoImg from "@/assets/musculacao.jpg";
import yogaImg from "@/assets/yoga.jpg";
import pilatesImg from "@/assets/pilates.jpg";
import martialArtsImg from "@/assets/martial-arts.jpg";

const timelineData = [
  {
    title: "Década de 70",
    content: (
      <div>
        <p className="text-foreground/80 text-sm md:text-base font-normal mb-8 leading-relaxed">
          A Academia Flipper nasceu com um sonho: oferecer <strong className="text-secondary">natação de qualidade</strong> para todas as idades em São Paulo. 
          Desde o início, a piscina semiolímpica aquecida se tornou referência na região, atraindo famílias que buscavam saúde e bem-estar.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src={fachadaImg}
            alt="Fachada da Academia Flipper"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
          />
          <img
            src={swimmingImg}
            alt="Piscina da Flipper nos primeiros anos"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Décadas de 80 e 90",
    content: (
      <div>
        <p className="text-foreground/80 text-sm md:text-base font-normal mb-8 leading-relaxed">
          Com o crescimento da demanda, a Flipper expandiu sua infraestrutura e passou a oferecer novas modalidades, 
          incluindo <strong className="text-secondary">musculação</strong>, <strong className="text-secondary">artes marciais</strong> e ginástica. 
          A academia se consolidou como um espaço completo para a prática esportiva.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src={musculacaoImg}
            alt="Sala de musculação"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
          />
          <img
            src={martialArtsImg}
            alt="Artes marciais na Flipper"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Anos 2000",
    content: (
      <div>
        <p className="text-foreground/80 text-sm md:text-base font-normal mb-8 leading-relaxed">
          A Flipper incorporou <strong className="text-secondary">yoga</strong>, <strong className="text-secondary">pilates</strong> e programas voltados à terceira idade, 
          ampliando sua missão para o bem-estar integral. A academia passou a atender do bebê ao idoso, 
          tornando-se um verdadeiro centro de saúde comunitário.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src={yogaImg}
            alt="Aula de yoga"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
          />
          <img
            src={pilatesImg}
            alt="Aula de pilates"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Hoje",
    content: (
      <div>
        <p className="text-foreground/80 text-sm md:text-base font-normal mb-8 leading-relaxed">
          Com mais de <strong className="text-secondary">50 anos de história</strong> e uma comunidade de mais de 5 mil alunos ativos, 
          a Flipper segue firme na sua missão de transformar vidas através do esporte.
        </p>
        <div className="mb-8">
          <div className="flex flex-col gap-2 text-foreground/70 text-sm md:text-base">
            <p>✅ Piscina semiolímpica aquecida</p>
            <p>✅ Musculação com equipamentos modernos</p>
            <p>✅ Yoga, Pilates e bem-estar</p>
            <p>✅ Artes marciais diversas</p>
            <p>✅ Natação do bebê ao idoso</p>
            <p>✅ +5.000 alunos ativos</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img
            src={fachadaImg}
            alt="Flipper hoje"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
          />
          <img
            src={swimmingImg}
            alt="Piscina moderna da Flipper"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
          />
        </div>
      </div>
    ),
  },
];

const Historia = () => {
  return (
    <Layout>
      <SEOHead
        title="Nossa Jornada - Academia Flipper | +50 Anos em São Paulo"
        description="Conheça a trajetória de mais de 50 anos da Academia Flipper, referência em natação e esportes em São Paulo."
      />
      <PageTransition>
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, hsl(205, 72%, 55%) 0%, hsl(210, 75%, 30%) 50%, hsl(215, 80%, 14%) 100%)`,
            }}
          />
          <div className="relative z-10 pt-32 pb-16">
            <div className="container mx-auto px-4 mb-12">
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                <Link to="/" className="hover:text-secondary transition-colors">Início</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-foreground font-medium">Nossa Jornada</span>
              </nav>
              <h1 className="font-display text-4xl lg:text-6xl font-bold text-foreground mb-4">
                +50 Anos de <span className="text-secondary">História</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Uma trajetória de dedicação, paixão pelo esporte e compromisso com a saúde e o bem-estar de toda a comunidade paulistana.
              </p>
            </div>
            <Timeline data={timelineData} />
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
};

export default Historia;
