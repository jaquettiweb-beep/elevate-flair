'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from '@/components/ui/accordion';
import {
	LucideIcon,
	Waves,
	Dumbbell,
	Heart,
	Calendar,
	CreditCard,
	History,
	Camera,
	Droplets,
	Swords,
	Hand,
	Baby,
	PersonStanding,
	Sparkles,
	Newspaper,
	Users,
	UserCheck,
	Handshake,
	ShoppingBag,
	Briefcase,
	Mail,
	Music,
} from 'lucide-react';
import flipperLogo from "@/assets/flipper-logo-header.png";

const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flipper%20e%20gostaria%20de%20agendar%20uma%20aula%20experimental%20gr%C3%A1tis!";

type LinkItem = {
	title: string;
	href: string;
	icon: LucideIcon;
	description?: string;
};

type CategoryGroup = {
	label: string;
	icon: LucideIcon;
	color: string;
	items: LinkItem[];
};

// "Modalidades" — todas as aulas e modalidades, agrupadas por categoria
const modalityCategories: CategoryGroup[] = [
	{
		label: "Aquáticas",
		icon: Waves,
		color: "#60b4e8",
		items: [
			{ title: "Natação", href: "/natacao", icon: Waves, description: "Adulto, infantil e bebê" },
			{ title: "Hidroginástica", href: "/modalidade/hidroginastica", icon: Droplets, description: "Exercícios de baixo impacto" },
		],
	},
	{
		label: "Fitness",
		icon: Dumbbell,
		color: "#f0a940",
		items: [
			{ title: "Musculação", href: "/musculacao", icon: Dumbbell, description: "Equipamentos modernos" },
			{ title: "Ginástica", href: "/modalidade/ginastica", icon: Sparkles, description: "Condicionamento global" },
		],
	},
	{
		label: "Bem-estar",
		icon: Heart,
		color: "#6dcfa0",
		items: [
			{ title: "Bem-Estar", href: "/bem-estar", icon: Heart, description: "Pilates, Yoga e muito mais" },
			{ title: "Yoga", href: "/modalidade/yoga", icon: Heart, description: "Corpo e mente em equilíbrio" },
			{ title: "Pilates", href: "/modalidade/pilates", icon: PersonStanding, description: "Studio e Solo" },
			{ title: "Programa 60+", href: "/modalidade/programa-60-saude", icon: Heart, description: "Saúde na melhor idade" },
		],
	},
	{
		label: "Lutas",
		icon: Swords,
		color: "#e87878",
		items: [
			{ title: "Jiu Jitsu", href: "/modalidade/jiu-jitsu", icon: Swords, description: "Grappling e defesa" },
			{ title: "Muay Thai", href: "/modalidade/muay-thai", icon: Hand, description: "Arte marcial tailandesa" },
			{ title: "Judô Infantil", href: "/modalidade/judo-infantil", icon: Baby, description: "Disciplina para crianças" },
			{ title: "Aikidô", href: "/modalidade/aikido", icon: Swords, description: "Harmonia e técnica" },
			{ title: "Krav Maga", href: "/modalidade/krav-maga", icon: Swords, description: "Defesa pessoal prática" },
		],
	},
	{
		label: "Infantil",
		icon: Baby,
		color: "#a987e8",
		items: [
			{ title: "Ballet Infantil", href: "/modalidade/ballet-infantil", icon: Music, description: "Expressão, postura e ritmo" },
		],
	},
];

// "Conheça a Flipper" — história e identidade da academia (sem Eventos, a pedido)
const conhecaLinks: LinkItem[] = [
	{ title: "Nossa História", href: "/historia", icon: History, description: "Mais de 50 anos de tradição" },
	{ title: "Galeria", href: "/galeria", icon: Camera, description: "Fotos da nossa academia" },
	{ title: "Imprensa", href: "/imprensa", icon: Newspaper, description: "Flipper na mídia" },
];

// "Serviços" — pessoas e demais páginas do site
const servicosLinks: LinkItem[] = [
	{ title: "Professores", href: "/professores", icon: Users, description: "Conheça nosso corpo docente" },
	{ title: "Personal Trainers", href: "/personais", icon: UserCheck, description: "Profissionais para treino individual" },
];

const servicosLinks2: LinkItem[] = [
	{ title: "Produtos", href: "/produtos", icon: ShoppingBag, description: "Loja e parceiros" },
	{ title: "Parcerias", href: "/parcerias", icon: Handshake, description: "Benefícios e descontos" },
	{ title: "Trabalhe Conosco", href: "/trabalhe-conosco", icon: Briefcase, description: "Vagas e oportunidades" },
	{ title: "Contato", href: "/contato", icon: Mail, description: "Fale com a gente" },
];

// Mobile-only: all modalities flat
const allModalityLinks = modalityCategories.flatMap(cat => cat.items);

export function Header({ alwaysVisible = false }: { alwaysVisible?: boolean }) {
	const location = useLocation();
	const [open, setOpen] = React.useState(false);
	const [openPanel, setOpenPanel] = React.useState<string | null>(null);
	const [heroScrolled, setHeroScrolled] = React.useState(alwaysVisible);

	/* close menus on route change */
	React.useEffect(() => {
		setOpen(false);
		setOpenPanel(null);
	}, [location.pathname]);

	/* listen for hero scroll state emitted by HeroSection */
	React.useEffect(() => {
		if (alwaysVisible) {
			setHeroScrolled(true);
			return;
		}
		const handler = (e: Event) => {
			const detail = (e as CustomEvent).detail as { scrolled: boolean };
			setHeroScrolled(detail.scrolled);
		};
		window.addEventListener("hero-scroll-state", handler);
		return () => window.removeEventListener("hero-scroll-state", handler);
	}, [alwaysVisible]);

	const isVisible = alwaysVisible || heroScrolled;

	React.useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	const togglePanel = (key: string) => setOpenPanel((cur) => (cur === key ? null : key));

	return (
		<AnimatePresence>
			<motion.header
					key="header-3"
					initial={{ y: -80, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: -80, opacity: 0 }}
					transition={{ type: "spring", stiffness: 200, damping: 28, mass: 0.8 }}
				className={cn('fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300 bg-[#111828]')}
				>
					<nav className="mx-auto flex h-20 w-full items-center justify-between gap-4 px-6 md:px-8 lg:px-12 relative">
						{/* Left: Logo */}
						<div className="flex items-center justify-start shrink-0">
							<Link to="/" className="rounded-md p-1.5 flex items-center shrink-0 transition-opacity">
                                <img src={flipperLogo} alt="Academia Flipper" className="h-[44px] w-auto object-contain antialiased" />
							</Link>
						</div>

						{/* Center: Desktop Nav — 5 tópicos principais (portal para todas as páginas) */}
						<div className="hidden md:flex flex-1 items-center justify-center min-w-0 gap-1">
							<button
								onClick={() => togglePanel('modalidades')}
								className={cn(
									"flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap",
									openPanel === 'modalidades'
										? "text-[#EE6200] bg-[#1A2335]"
										: "text-[#8A95A8] hover:text-[#EE6200] hover:bg-[#1A2335]"
								)}
							>
								Modalidades
							</button>
							<button
								onClick={() => togglePanel('conheca')}
								className={cn(
									"flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap",
									openPanel === 'conheca'
										? "text-[#EE6200] bg-[#1A2335]"
										: "text-[#8A95A8] hover:text-[#EE6200] hover:bg-[#1A2335]"
								)}
							>
								Conheça a Flipper
							</button>
							<Link
								to="/planos"
								className={cn(
									"px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap",
									location.pathname === '/planos'
										? "text-[#EE6200] bg-[#1A2335]"
										: "text-[#8A95A8] hover:text-[#EE6200] hover:bg-[#1A2335]"
								)}
							>
								Planos
							</Link>
							<Link
								to="/horarios"
								className={cn(
									"px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap",
									location.pathname === '/horarios'
										? "text-[#EE6200] bg-[#1A2335]"
										: "text-[#8A95A8] hover:text-[#EE6200] hover:bg-[#1A2335]"
								)}
							>
								Horários
							</Link>
							<button
								onClick={() => togglePanel('servicos')}
								className={cn(
									"flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap",
									openPanel === 'servicos'
										? "text-[#EE6200] bg-[#1A2335]"
										: "text-[#8A95A8] hover:text-[#EE6200] hover:bg-[#1A2335]"
								)}
							>
								Serviços
							</button>
						</div>

						{/* Right: CTA / Mobile Menu Toggle */}
						<div className="flex items-center justify-end gap-2 shrink-0">
							<div className="hidden md:flex items-center gap-2">
								<a
									href={WHATSAPP_URL}
									target="_blank"
									rel="noopener noreferrer"
									className="rounded-[8px] px-[20px] py-[12px] text-[14px] font-semibold text-white bg-[#EE6200] hover:bg-[#CC5400] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(238,98,0,0.4)] active:scale-95 flex items-center gap-2 whitespace-nowrap"
								>
									<Calendar size={16} />
									Agendar Aula Grátis
								</a>
							</div>
							<Button
								size="icon"
								variant="outline"
								onClick={() => setOpen(!open)}
								className="md:hidden"
								aria-expanded={open}
								aria-controls="mobile-menu"
								aria-label="Toggle menu"
							>
								<MenuToggleIcon open={open} className="size-5" duration={300} />
							</Button>
						</div>
					</nav>

					{/* Desktop Panel: Modalidades */}
					<AnimatePresence>
						{openPanel === 'modalidades' && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								exit={{ opacity: 0, height: 0 }}
								transition={{ duration: 0.3, ease: 'easeInOut' }}
								className="hidden md:block absolute top-full left-0 right-0 bg-[#111828]/98 backdrop-blur-xl border-b border-[#222D42] overflow-hidden z-[110]"
							>
								<div className="container mx-auto px-6 py-8 max-w-6xl">
									<div className="grid grid-cols-3 lg:grid-cols-5 gap-6">
										{modalityCategories.map((cat) => (
											<CategoryBlock key={cat.label} cat={cat} onNavigate={() => setOpenPanel(null)} />
										))}
									</div>
									<div className="mt-6 pt-4 border-t border-[#222D42] flex items-center justify-between gap-4 flex-wrap">
										<p className="text-xs text-[#8A95A8]">
											14 modalidades com aula experimental gratuita.
										</p>
										<a
											href={WHATSAPP_URL}
											target="_blank"
											rel="noopener noreferrer"
											onClick={() => setOpenPanel(null)}
											className="inline-flex items-center gap-2 rounded-[8px] px-4 py-2 text-sm font-semibold text-white bg-[#EE6200] hover:bg-[#CC5400] transition-all"
										>
											<Calendar size={14} />
											Agendar Aula Grátis
										</a>
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>

					{/* Desktop Panel: Conheça a Flipper */}
					<AnimatePresence>
						{openPanel === 'conheca' && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								exit={{ opacity: 0, height: 0 }}
								transition={{ duration: 0.3, ease: 'easeInOut' }}
								className="hidden md:block absolute top-full left-0 right-0 bg-[#111828]/98 backdrop-blur-xl border-b border-[#222D42] overflow-hidden z-[110]"
							>
								<div className="container mx-auto px-6 py-8 max-w-3xl">
									<div className="grid grid-cols-3 gap-3">
										{conhecaLinks.map((item) => (
											<ListItem key={item.href} {...item} onClick={() => setOpenPanel(null)} />
										))}
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>

					{/* Desktop Panel: Serviços */}
					<AnimatePresence>
						{openPanel === 'servicos' && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								exit={{ opacity: 0, height: 0 }}
								transition={{ duration: 0.3, ease: 'easeInOut' }}
								className="hidden md:block absolute top-full left-0 right-0 bg-[#111828]/98 backdrop-blur-xl border-b border-[#222D42] overflow-hidden z-[110]"
							>
								<div className="container mx-auto px-6 py-8 max-w-5xl">
									<div className="grid grid-cols-2 gap-8">
										<div>
											<h3 className="text-xs font-bold uppercase tracking-wider text-[#8A95A8] mb-3">Profissionais</h3>
											<div className="space-y-1">
												{servicosLinks.map((item) => (
													<ListItem key={item.href} {...item} onClick={() => setOpenPanel(null)} />
												))}
											</div>
										</div>
										<div>
											<h3 className="text-xs font-bold uppercase tracking-wider text-[#8A95A8] mb-3">Mais</h3>
											<div className="grid grid-cols-2 gap-1">
												{servicosLinks2.map((item) => (
													<ListItem key={item.href} {...item} onClick={() => setOpenPanel(null)} />
												))}
											</div>
										</div>
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>

					{/* Mobile Menu */}
					<MobileMenu open={open} className="flex flex-col justify-between gap-2 overflow-y-auto">
						<div className="max-w-full">
							<div className="flex w-full flex-col gap-y-2">
								<Link to="/" className="text-sm font-bold p-2 text-[#F0EDE8] hover:bg-[#1A2335] rounded-md" onClick={() => setOpen(false)}>Início</Link>

								{/* Modalidades by category */}
								<span className="text-xs font-bold uppercase tracking-wider mt-4 px-2 text-[#EE6200]">Modalidades</span>
								{modalityCategories.map((cat) => (
									<React.Fragment key={cat.label}>
										<span className="text-[10px] font-bold uppercase tracking-wider mt-2 px-2 flex items-center gap-2" style={{ color: cat.color }}>
											<cat.icon size={11} />
											{cat.label}
										</span>
										{cat.items.map((link, i) => (
											<ListItem key={i} {...link} onClick={() => setOpen(false)} />
										))}
									</React.Fragment>
								))}

								<div className="h-px bg-[#222D42] my-2" />

								{/* Conheça a Flipper */}
								<span className="text-xs font-bold uppercase tracking-wider px-2 text-[#EE6200]">Conheça a Flipper</span>
								{conhecaLinks.map((link, i) => (
									<ListItem key={i} {...link} onClick={() => setOpen(false)} />
								))}

								<div className="h-px bg-[#222D42] my-2" />

								{/* Planos & Horários */}
								<Link to="/planos" className="text-sm font-bold p-2 text-[#F0EDE8] hover:bg-[#1A2335] rounded-md" onClick={() => setOpen(false)}>Planos</Link>
								<Link to="/horarios" className="text-sm font-bold p-2 text-[#F0EDE8] hover:bg-[#1A2335] rounded-md" onClick={() => setOpen(false)}>Horários</Link>

								<div className="h-px bg-[#222D42] my-2" />

								{/* Serviços */}
								<span className="text-xs font-bold uppercase tracking-wider px-2 text-[#EE6200]">Serviços</span>
								{[...servicosLinks, ...servicosLinks2].map((link, i) => (
									<ListItem key={i} {...link} onClick={() => setOpen(false)} />
								))}
							</div>
						</div>
						<div className="flex flex-col gap-2 mt-4">
							<a
								href={WHATSAPP_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="btn-cta rounded-full px-4 py-3 text-center text-sm font-semibold shadow-sm flex items-center justify-center gap-2"
							>
								<Calendar size={16} />
								Agendar Aula Grátis
							</a>
						</div>
					</MobileMenu>
				</motion.header>
		</AnimatePresence>
	);
}

type MobileMenuProps = React.ComponentProps<'div'> & {
	open: boolean;
};

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
	if (!open || typeof window === 'undefined') return null;

	return createPortal(
		<div
			id="mobile-menu"
			className={cn(
				'bg-[#111828] supports-[backdrop-filter]:bg-[#111828]/95 backdrop-blur-xl border-[#222D42]',
				'fixed top-14 right-0 bottom-0 left-0 z-[120] flex flex-col overflow-hidden border-y md:hidden',
			)}
		>
			<div
				data-slot={open ? 'open' : 'closed'}
				className={cn(
					'data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out',
					'size-full p-6 overflow-y-auto pb-24',
					className,
				)}
				{...props}
			>
				{children}
			</div>
		</div>,
		document.body,
	);
}

function NavLink({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "relative py-2 text-sm font-semibold transition-colors group",
        isActive ? "text-[#EE6200]" : "text-[#8A95A8] hover:text-[#EE6200]",
        className
      )}
    >
      {children}
      <span
        className={cn(
          "absolute bottom-0 left-0 h-[2px] bg-[#EE6200] transition-all duration-250",
          isActive ? "w-full" : "w-0 group-hover:w-full"
        )}
      />
    </Link>
  );
}

function CategoryBlock({ cat, onNavigate }: { cat: CategoryGroup; onNavigate?: () => void }) {
  return (
    <div>
      <div
        className="flex items-center gap-2 mb-2 px-2 py-1.5 rounded-md"
        style={{ backgroundColor: `${cat.color}14` }}
      >
        <cat.icon size={14} style={{ color: cat.color }} />
        <span
          className="text-[10px] font-bold tracking-[0.12em] uppercase"
          style={{ color: cat.color }}
        >
          {cat.label}
        </span>
        <span className="ml-auto text-[10px] text-[#8A95A8]">{cat.items.length}</span>
      </div>
      <ul className="space-y-0.5">
        {cat.items.map((item, i) => (
          <li key={i}>
            <CompactListItem {...item} accent={cat.color} onClick={onNavigate} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function CompactListItem({ title, description, icon: Icon, href, accent, onClick }: LinkItem & { accent: string; onClick?: () => void }) {
  return (
    <Link
      to={href}
      onClick={onClick}
      className="group flex items-center gap-2.5 rounded-md px-2 py-1.5 hover:bg-[#111828] transition-colors"
    >
      <span
        className="flex shrink-0 items-center justify-center size-7 rounded-md border border-[#222D42] bg-[#111828] transition-colors group-hover:border-[color:var(--accent)]"
        style={{ ['--accent' as any]: accent }}
      >
        <Icon className="size-3.5" style={{ color: accent }} />
      </span>
      <span className="flex flex-col min-w-0">
        <span className="text-[12.5px] font-semibold text-[#F0EDE8] leading-tight truncate group-hover:text-[#EE6200] transition-colors">
          {title}
        </span>
        {description && (
          <span className="text-[10.5px] text-[#8A95A8] leading-tight truncate">
            {description}
          </span>
        )}
      </span>
    </Link>
  );
}

function ListItem({
	title,
	description,
	icon: Icon,
	className,
	href,
    onClick,
}: LinkItem & { className?: string; onClick?: () => void }) {
	return (
		<Link
			to={href}
			onClick={onClick}
			className={cn('w-full flex flex-row gap-x-3 hover:bg-[#111828] rounded-lg p-3 transition-all duration-200 cursor-pointer items-center', className)}
		>
			<div className="bg-[#111828] border border-[#222D42] flex shrink-0 aspect-square size-10 items-center justify-center rounded-lg">
				<Icon className="text-[#EE6200] size-5" />
			</div>
			<div className="flex flex-col items-start justify-center ml-3">
				<span className="font-bold text-sm text-[#F0EDE8]">{title}</span>
				{description && <span className="text-[#8A95A8] text-[11px] leading-snug">{description}</span>}
			</div>
		</Link>
	);
}
