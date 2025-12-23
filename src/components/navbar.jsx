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
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={Cn(
          "fixed w-full top-0 z-50 transition-all duration-500 ease-in-out",
          isScrolled
            ? "py-4 bg-background/70 backdrop-blur-xl border-b border-white/5 shadow-sm"
            : "py-6 bg-transparent"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="group relative flex items-center gap-2 text-xl font-bold tracking-tighter z-50"
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-primary/20 transition-transform duration-500 group-hover:rotate-180">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <span className="relative z-10">
              <span className="text-foreground transition-colors duration-300 group-hover:text-primary">Dhruvan</span>
              <span className="text-primary transition-colors duration-300 group-hover:text-foreground">Portfolio</span>
            </span>
          </a>

          {/* Desktop Nav Actions */}
          <div className="hidden md:flex items-center gap-8">
            {/* Simple Link Navigation (No Pill Background) */}
            <div className="flex items-center gap-6">
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
            <div className="pl-4 border-l border-white/10">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-4 z-50">
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

          {/* Mobile Overlay */}
          <div
            className={Cn(
              "fixed inset-0 bg-background/98 backdrop-blur-3xl z-40 flex flex-col items-center justify-center space-y-8 transition-all duration-500 md:hidden",
              isMenuOpen ? "opacity-100 clip-circle-full" : "opacity-0 clip-circle-0 pointer-events-none"
            )}
            style={{
              clipPath: isMenuOpen ? "circle(150% at 90% 5%)" : "circle(0% at 90% 5%)",
              transition: "clip-path 0.7s ease-in-out, opacity 0.5s ease-in-out"
            }}
          >
            {navItems.map((item, idx) => (
              <a
                key={item.name}
                href={item.href}
                className="relative text-3xl font-bold text-foreground overflow-hidden group"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                  {item.name}
                </span>
                <span className="absolute left-0 top-0 inline-block translate-y-full text-primary transition-transform duration-300 group-hover:translate-y-0">
                  {item.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;