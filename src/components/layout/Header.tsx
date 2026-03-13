import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import flipperLogo from "@/assets/flipper-logo-header.png";

const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "Nossa Jornada", path: "/historia" },
  { label: "Produtos", path: "/produtos" },
  { label: "Imprensa", path: "/imprensa" },
  { label: "Horários", path: "/horarios" },
  { label: "Galeria", path: "/galeria" },
  { label: "Contato", path: "/contato" },
];

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flipper%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre...";

interface HeaderProps {
  /** When true, header is always visible (non-home pages). When false, header appears on scroll. */
  alwaysVisible?: boolean;
}

export default function Header({ alwaysVisible = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [heroScrolled, setHeroScrolled] = useState(alwaysVisible);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  /* track page scroll for glass effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* listen for hero scroll state emitted by HeroSection */
  useEffect(() => {
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

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

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
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
              scrolled
                ? "bg-background/60 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/5 py-2"
                : "bg-transparent py-4"
            }`}
          >
            <div className="container mx-auto flex items-center justify-between px-4">
              {/* Logo */}
              <Link to="/" className="flex items-center">
                <img
                  src={flipperLogo}
                  alt="Academia Flipper"
                  className="h-12 w-auto object-contain"
                />
              </Link>

              {/* Desktop Nav */}
              <nav
                className="hidden lg:flex items-center gap-5 xl:gap-7"
                aria-label="Navegação principal"
              >
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`text-xs xl:text-sm font-medium transition-colors whitespace-nowrap relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-secondary after:origin-left after:transition-transform after:duration-300 ${
                      location.pathname === item.path
                        ? `font-bold ${
                            scrolled ? "text-primary" : "text-primary-foreground"
                          } after:scale-x-100`
                        : `${
                            scrolled
                              ? "text-foreground/70 hover:text-foreground"
                              : "text-primary-foreground/80 hover:text-primary-foreground"
                          } after:scale-x-0 hover:after:scale-x-100`
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* CTA Desktop */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-2 btn-cta rounded-full px-4 xl:px-5 py-2 xl:py-2.5 text-xs xl:text-sm font-semibold animate-pulse-glow whitespace-nowrap"
              >
                <Phone size={14} />
                Agende sua Aula
              </a>

              {/* Mobile Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`md:hidden p-2 rounded-lg transition-colors ${
                  scrolled ? "text-foreground" : "text-primary-foreground"
                }`}
                aria-label="Abrir menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="fixed inset-0 z-40 glass-card bg-background/95 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={item.path}
                  className={`text-2xl font-display font-bold transition-colors ${
                    location.pathname === item.path
                      ? "text-primary"
                      : "text-foreground/70"
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="btn-cta rounded-full px-8 py-3 text-lg font-bold flex items-center gap-2"
            >
              <Phone size={20} />
              Agende sua Aula
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
