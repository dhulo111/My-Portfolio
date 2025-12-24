import { useEffect, useState } from "react";
import { Cn } from '@/lib/utils.js';
import { X, Menu, Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skill" },
  { name: "Projects", href: "#project" },
  { name: "Contact", href: "#contact" },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Mobile menu no longer locks scroll
    // This effect is intentionally left empty or removed to allow scrolling
    // while the dropdown is open, as per "not show full page" request.
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={Cn(
          "fixed w-full top-0 z-50 transition-all duration-500 ease-in-out",
          isScrolled || isMenuOpen
            ? "py-4 bg-background/80 backdrop-blur-md border-b border-border/40 shadow-sm"
            : "py-6 bg-transparent"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="group relative flex items-center gap-2 text-xl font-bold tracking-tighter z-50"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-primary/20 transition-transform duration-500 group-hover:rotate-180">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <span className="relative z-10 flex gap-1">
              <span className="text-foreground transition-colors duration-300 group-hover:text-primary">Dhruvan</span>
              <span className="text-primary transition-colors duration-300 group-hover:text-foreground">Portfolio</span>
            </span>
          </a>

          {/* Desktop Nav Actions - Visible on LG and up */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Simple Link Navigation */}
            <div className="flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={Cn(
                      "relative text-sm font-medium transition-all duration-300 hover:text-primary",
                      isActive
                        ? "text-primary scale-105 font-semibold"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.name}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full animate-fade-in" />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Theme Toggle Only */}
            <div className="pl-6 border-l border-border/20">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile/Tablet Actions - Visible up to LG */}
          <div className="lg:hidden flex items-center gap-4 z-50">
            <ThemeToggle />

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-foreground hover:text-primary transition-colors relative focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span className={Cn("absolute block w-6 h-0.5 bg-current transition-all duration-300", isMenuOpen ? "rotate-45 top-3" : "top-1")} />
                <span className={Cn("absolute block w-6 h-0.5 bg-current transition-all duration-300 top-3", isMenuOpen ? "opacity-0" : "opacity-100")} />
                <span className={Cn("absolute block w-6 h-0.5 bg-current transition-all duration-300", isMenuOpen ? "-rotate-45 top-3" : "top-5")} />
              </div>
            </button>
          </div>

          {/* Mobile Overlay / Dropdown */}
          <div
            className={Cn(
              "absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border/40 shadow-xl flex flex-col items-center justify-start py-8 gap-6 transition-all duration-500 lg:hidden overflow-hidden",
              isMenuOpen ? "max-h-[500px] opacity-100 visible" : "max-h-0 opacity-0 invisible py-0"
            )}
          >
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={Cn(
                    "relative text-lg font-medium transition-all duration-300 hover:text-primary",
                    isActive ? "text-primary" : "text-foreground"
                  )}
                  style={{
                    transitionDelay: isMenuOpen ? `${idx * 50}ms` : '0ms',
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen ? 'translateY(0)' : 'translateY(-10px)'
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full animate-fade-in" />
                  )}
                </a>
              )
            })}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;