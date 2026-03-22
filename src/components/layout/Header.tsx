import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Waves, Dumbbell, Heart, Calendar, Camera, Mail, History, ShoppingBag, Newspaper, PartyPopper, CreditCard, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import flipperLogo from "@/assets/flipper-logo-header.png";
import type { LucideIcon } from "lucide-react";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flipper%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre...";

type LinkItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  description?: string;
};

const academiaLinks: LinkItem[] = [
  { title: "Natação", href: "/natacao", icon: Waves, description: "Aulas para todas as idades e níveis" },
  { title: "Musculação", href: "/musculacao", icon: Dumbbell, description: "Treinos personalizados e equipamentos modernos" },
  { title: "Bem-Estar", href: "/bem-estar", icon: Heart, description: "Pilates, Yoga e muito mais" },
  { title: "Horários", href: "/horarios", icon: Calendar, description: "Confira os horários das aulas" },
  { title: "Planos", href: "/planos", icon: CreditCard, description: "Encontre o plano ideal para você" },
];

const sobreLinks: LinkItem[] = [
  { title: "Nossa Jornada", href: "/historia", icon: History, description: "Mais de 50 anos de tradição" },
  { title: "Galeria", href: "/galeria", icon: Camera, description: "Fotos da nossa academia" },
  { title: "Eventos", href: "/eventos", icon: PartyPopper, description: "Confira nossos eventos" },
  { title: "Imprensa", href: "/imprensa", icon: Newspaper, description: "Flipper na mídia" },
];

const sobreLinks2: LinkItem[] = [
  { title: "Produtos", href: "/produtos", icon: ShoppingBag },
  { title: "Trabalhe Conosco", href: "/trabalhe-conosco", icon: Briefcase },
  { title: "Contato", href: "/contato", icon: Mail },
];

interface HeaderProps {
  alwaysVisible?: boolean;
}

export default function Header({ alwaysVisible = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [heroScrolled, setHeroScrolled] = useState(alwaysVisible);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (alwaysVisible) { setHeroScrolled(true); return; }
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { scrolled: boolean };
      setHeroScrolled(detail.scrolled);
    };
    window.addEventListener("hero-scroll-state", handler);
    return () => window.removeEventListener("hero-scroll-state", handler);
  }, [alwaysVisible]);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isVisible = alwaysVisible || heroScrolled;

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.header
            key="header"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 28, mass: 0.8 }}
            className={cn(
              "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
              scrolled
                ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/5 py-2"
                : "bg-transparent py-4"
            )}
          >
            <div className="container mx-auto flex items-center justify-between px-4">
              {/* Logo */}
              <Link to="/" className="flex items-center shrink-0">
                <img src={flipperLogo} alt="Academia Flipper" className="h-10 w-auto object-contain" />
              </Link>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-1">
                <NavigationMenu>
                  <NavigationMenuList>
                    {/* Home */}
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/"
                          className={cn(
                            "group inline-flex h-9 w-max items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                            scrolled
                              ? "text-foreground/70 hover:text-foreground hover:bg-accent"
                              : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10",
                            location.pathname === "/" && (scrolled ? "text-primary font-bold" : "text-primary-foreground font-bold")
                          )}
                        >
                          Home
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>

                    {/* Academia dropdown */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger
                        className={cn(
                          "bg-transparent",
                          scrolled
                            ? "text-foreground/70 hover:text-foreground hover:bg-accent data-[state=open]:bg-accent"
                            : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 data-[state=open]:bg-primary-foreground/10"
                        )}
                      >
                        Academia
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid w-[540px] grid-cols-1 p-3 gap-1">
                          {academiaLinks.map((item) => (
                            <ListItem key={item.href} {...item} />
                          ))}
                          <div className="mt-2 border-t border-border pt-3 px-3">
                            <p className="text-xs text-muted-foreground">
                              Quer conhecer?{" "}
                              <a
                                href={WHATSAPP_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary font-semibold hover:underline"
                              >
                                Agende uma aula experimental
                              </a>
                            </p>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Sobre dropdown */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger
                        className={cn(
                          "bg-transparent",
                          scrolled
                            ? "text-foreground/70 hover:text-foreground hover:bg-accent data-[state=open]:bg-accent"
                            : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 data-[state=open]:bg-primary-foreground/10"
                        )}
                      >
                        Sobre
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid w-[480px] grid-cols-2 p-3 gap-1">
                          <div className="space-y-1">
                            {sobreLinks.map((item) => (
                              <ListItem key={item.href} {...item} />
                            ))}
                          </div>
                          <div className="space-y-1 border-l border-border pl-3">
                            {sobreLinks2.map((item) => (
                              <Link
                                key={item.href}
                                to={item.href}
                                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                              >
                                <item.icon className="size-4" />
                                {item.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              {/* Desktop CTA */}
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild className={cn(
                  scrolled ? "text-foreground/70 hover:text-foreground" : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                )}>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    <Phone className="size-4 mr-1" />
                    WhatsApp
                  </a>
                </Button>
                <Button size="sm" asChild className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-md">
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    Agende sua Aula
                  </a>
                </Button>
              </div>

              {/* Mobile Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg"
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                aria-label="Abrir menu"
              >
                <MenuToggleIcon
                  open={mobileOpen}
                  className={cn(
                    "size-7",
                    scrolled ? "text-foreground" : "text-primary-foreground"
                  )}
                />
              </button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <MobileMenu open={mobileOpen}>
        <div className="flex-1 overflow-y-auto py-20 px-6">
          <nav className="space-y-6">
            <MobileLink to="/" label="Home" currentPath={location.pathname} onClick={() => setMobileOpen(false)} />
            
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Academia</p>
              {academiaLinks.map((link) => (
                <MobileLink key={link.href} to={link.href} label={link.title} currentPath={location.pathname} onClick={() => setMobileOpen(false)} />
              ))}
            </div>
            
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Sobre</p>
              {sobreLinks.map((link) => (
                <MobileLink key={link.href} to={link.href} label={link.title} currentPath={location.pathname} onClick={() => setMobileOpen(false)} />
              ))}
              {sobreLinks2.map((link) => (
                <MobileLink key={link.href} to={link.href} label={link.title} currentPath={location.pathname} onClick={() => setMobileOpen(false)} />
              ))}
            </div>
          </nav>
        </div>

        <div className="p-6 border-t border-border space-y-3">
          <Button variant="outline" className="w-full" asChild>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Phone className="size-4 mr-2" />
              WhatsApp
            </a>
          </Button>
          <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90" asChild>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Agende sua Aula
            </a>
          </Button>
        </div>
      </MobileMenu>
    </>
  );
}

/* ── Subcomponents ────────────────────────────── */

function MobileMenu({ open, children }: { open: boolean; children: React.ReactNode }) {
  if (!open || typeof window === "undefined") return null;

  return createPortal(
    <div
      id="mobile-menu"
      className="fixed inset-0 z-[60] flex flex-col bg-background/98 backdrop-blur-xl md:hidden animate-in slide-in-from-right duration-300"
    >
      {children}
    </div>,
    document.body
  );
}

function MobileLink({ to, label, currentPath, onClick }: { to: string; label: string; currentPath: string; onClick: () => void }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "block py-2.5 px-3 rounded-lg text-base font-medium transition-colors",
        currentPath === to
          ? "text-primary bg-accent"
          : "text-foreground/70 hover:text-foreground hover:bg-accent/50"
      )}
    >
      {label}
    </Link>
  );
}

function ListItem({ title, description, icon: Icon, href }: LinkItem) {
  return (
    <NavigationMenuLink asChild>
      <Link
        to={href}
        className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-accent group"
      >
        <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-background text-muted-foreground group-hover:text-primary group-hover:border-primary/30 transition-colors">
          <Icon className="size-4" />
        </div>
        <div>
          <div className="text-sm font-medium text-foreground">{title}</div>
          {description && (
            <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
          )}
        </div>
      </Link>
    </NavigationMenuLink>
  );
}
