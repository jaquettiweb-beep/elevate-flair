'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { LucideIcon, Waves, Dumbbell, Heart, Calendar, CreditCard, History, Camera, PartyPopper, Newspaper, ShoppingBag, Briefcase, Mail } from 'lucide-react';
import flipperLogo from "@/assets/flipper-logo-header.png";

const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flipper%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre...";

type LinkItem = {
	title: string;
	href: string;
	icon: LucideIcon;
	description?: string;
};

const academiaLinks: LinkItem[] = [
  { title: "Natação", href: "/natacao", icon: Waves, description: "Aulas para idades e níveis" },
  { title: "Musculação", href: "/musculacao", icon: Dumbbell, description: "Treinos e equipamentos modernos" },
  { title: "Bem-Estar", href: "/bem-estar", icon: Heart, description: "Pilates, Yoga e muito mais" },
  { title: "Horários", href: "/horarios", icon: Calendar, description: "Confira horários das aulas" },
  { title: "Planos", href: "/planos", icon: CreditCard, description: "Encontre seu plano ideal" },
];

const sobreLinks: LinkItem[] = [
  { title: "Nossa Jornada", href: "/historia", icon: History, description: "Mais de 50 anos de tradição" },
  { title: "Galeria", href: "/galeria", icon: Camera, description: "Fotos da academia Flipper" },
  { title: "Eventos", href: "/eventos", icon: PartyPopper, description: "Confira nossos eventos" },
  { title: "Imprensa", href: "/imprensa", icon: Newspaper, description: "Flipper na televisão" },
];

const sobreLinks2: LinkItem[] = [
  { title: "Produtos", href: "/produtos", icon: ShoppingBag },
  { title: "Trabalhe Conosco", href: "/trabalhe-conosco", icon: Briefcase },
  { title: "Contato", href: "/contato", icon: Mail },
];

export function Header({ alwaysVisible = false }: { alwaysVisible?: boolean }) {
	const [open, setOpen] = React.useState(false);
	const [heroScrolled, setHeroScrolled] = React.useState(alwaysVisible);
	const scrolled = useScroll(10);

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

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.header
					key="header-3"
					initial={{ y: -80, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: -80, opacity: 0 }}
					transition={{ type: "spring", stiffness: 200, damping: 28, mass: 0.8 }}
					className={cn('fixed top-0 left-0 right-0 z-50 w-full border-b border-transparent transition-all duration-300', {
						'bg-background/95 supports-[backdrop-filter]:bg-background/50 border-border backdrop-blur-lg': scrolled,
					})}
				>
					<nav className="mx-auto flex h-24 w-full items-center justify-between px-6 md:px-12 lg:px-20 relative">
						{/* Esquerda: Logo */}
						<div className="flex w-full md:w-1/3 items-center justify-start">
							<Link to="/" className="hover:bg-transparent rounded-md p-1.5 flex items-center shrink-0">
                                <img src={flipperLogo} alt="Academia Flipper" className="h-[60px] w-auto object-contain" />
							</Link>
						</div>

						{/* Centro: Links (Escondidos no mobile) */}
						<div className="hidden md:flex w-1/3 items-center justify-center">
							<NavigationMenu>
								<NavigationMenuList>
                                    <NavigationMenuItem>
                                      <NavigationMenuLink className="px-4" asChild>
                                        <Link to="/" className="hover:bg-accent rounded-md p-2 text-sm font-medium">
                                          Home
                                        </Link>
                                      </NavigationMenuLink>
                                    </NavigationMenuItem>

                                    <NavigationMenuItem>
                                      <NavigationMenuTrigger className="bg-transparent">Academia</NavigationMenuTrigger>
                                      <NavigationMenuContent className="bg-background p-1 pr-1.5">
                                        <ul className="bg-popover grid w-[420px] grid-cols-2 gap-2 rounded-md border p-2 shadow">
                                          {academiaLinks.map((item, i) => (
                                            <li key={i}>
                                              <ListItem {...item} />
                                            </li>
                                          ))}
                                        </ul>
                                        <div className="p-2">
                                          <p className="text-muted-foreground text-sm">
                                            Quer treinar conosco?{' '}
                                            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-foreground font-medium hover:underline">
                                              Agende experimental.
                                            </a>
                                          </p>
                                        </div>
                                      </NavigationMenuContent>
                                    </NavigationMenuItem>

                                    <NavigationMenuItem>
                                      <NavigationMenuTrigger className="bg-transparent">Sobre</NavigationMenuTrigger>
                                      <NavigationMenuContent className="bg-background p-1 pr-1.5 pb-1.5">
                                        <div className="grid w-[460px] grid-cols-2 gap-2">
                                          <ul className="bg-popover space-y-2 rounded-md border p-2 shadow">
                                            {sobreLinks.map((item, i) => (
                                              <li key={i}>
                                                <ListItem {...item} />
                                              </li>
                                            ))}
                                          </ul>
                                          <ul className="space-y-2 p-3">
                                            {sobreLinks2.map((item, i) => (
                                              <li key={i}>
                                                <NavigationMenuLink
                                                  asChild
                                                  className="flex p-2 hover:bg-accent flex-row rounded-md items-center gap-x-2"
                                                >
                                                  <Link to={item.href}>
                                                    <item.icon className="text-foreground size-4 shrink-0" />
                                                    <span className="font-medium text-sm">{item.title}</span>
                                                  </Link>
                                                </NavigationMenuLink>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      </NavigationMenuContent>
                                    </NavigationMenuItem>
								</NavigationMenuList>
							</NavigationMenu>
						</div>

						{/* Direita: CTA / Mobile Menu Toggle */}
						<div className="flex w-1/3 items-center justify-end gap-2">
							<div className="hidden md:flex items-center gap-2">
								<a
									href={WHATSAPP_URL}
									target="_blank"
									rel="noopener noreferrer"
									className="btn-cta rounded-full px-5 py-2.5 text-xs font-semibold animate-pulse-glow"
								>
									Agende sua Aula
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
					<MobileMenu open={open} className="flex flex-col justify-between gap-2 overflow-y-auto">
						<NavigationMenu className="max-w-full">
							<div className="flex w-full flex-col gap-y-2">
                                <Link to="/" className="text-sm font-bold p-2 hover:bg-accent rounded-md" onClick={() => setOpen(false)}>Home</Link>
                                
                                <span className="text-xs font-bold uppercase tracking-wider mt-4 px-2 text-muted-foreground">Academia</span>
                                {academiaLinks.map((link, i) => (
                                  <ListItem key={i} {...link} onClick={() => setOpen(false)} />
                                ))}
                                
                                <span className="text-xs font-bold uppercase tracking-wider mt-4 px-2 text-muted-foreground">Sobre</span>
                                {sobreLinks.map((link, i) => (
                                  <ListItem key={i} {...link} onClick={() => setOpen(false)} />
                                ))}
                                {sobreLinks2.map((link, i) => (
                                  <ListItem key={i} {...link} onClick={() => setOpen(false)} />
                                ))}
							</div>
						</NavigationMenu>
						<div className="flex flex-col gap-2 mt-4">
							<a
								href={WHATSAPP_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="btn-cta rounded-full px-4 py-3 text-center text-sm font-semibold animate-pulse-glow"
							>
								Agende sua Aula Exploratória
							</a>
						</div>
					</MobileMenu>
				</motion.header>
			)}
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
				'bg-background/95 supports-[backdrop-filter]:bg-background/50 backdrop-blur-lg',
				'fixed top-14 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-y md:hidden',
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

function ListItem({
	title,
	description,
	icon: Icon,
	className,
	href,
    onClick,
	...props
}: React.ComponentProps<typeof NavigationMenuLink> & LinkItem & { onClick?: () => void }) {
	return (
		<NavigationMenuLink className={cn('w-full flex flex-row gap-x-2 data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-sm p-2', className)} {...props} asChild>
			<Link to={href} onClick={onClick}>
				<div className="bg-background/40 flex shrink-0 aspect-square size-10 items-center justify-center rounded-md border shadow-sm">
					<Icon className="text-foreground size-4" />
				</div>
				<div className="flex flex-col items-start justify-center ml-1">
					<span className="font-medium text-sm">{title}</span>
					{description && <span className="text-muted-foreground text-[10px] leading-snug">{description}</span>}
				</div>
			</Link>
		</NavigationMenuLink>
	);
}

function useScroll(threshold: number) {
	const [scrolled, setScrolled] = React.useState(false);

	const onScroll = React.useCallback(() => {
		setScrolled(window.scrollY > threshold);
	}, [threshold]);

	React.useEffect(() => {
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, [onScroll]);

	React.useEffect(() => {
		onScroll();
	}, [onScroll]);

	return scrolled;
}
