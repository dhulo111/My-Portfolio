import { useEffect, useState } from "react";
import { Cn } from '@/lib/utils.js';
import { X, Menu } from "lucide-react";
const navitem = [
  { name: "home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "skill", href: "#skill" },
  { name: "project", href: "#project" },
  { name: "contact", href: "#contact" },
]
function Navbar() {
  const [isScrolled, setIsScroll] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.screenY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);

  }, [])
  return (
    <nav className={Cn("fixed w-full z-40 transition-all duration-300",
      isScrolled ? "py-5" : "py-3 bg-background/80 backdrop-blur-md shadow-xs")}>
      <div className="container flex item-center justify-between">
        <a className="text-xl font-bold text-primary flex items-center" href="#hero">
          <span className="relative z-10">
            <span className="text-glow text-foreground">Dhruvan</span>Portfolio
          </span>
        </a>

        {/* desktop nav */}
        <div className="hidden md:flex space-x-8">
          {navitem.map((item, key) => (
            <a key={key} href={item.href} className="text-foreground /80 hover:text-primary transition-colors duration-300">{item.name}</a>
          ))}
        </div>
        {/* mobile nav */}

        <button onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 max-sm:pr-14 text-foreground z-50"
          aria-label={isMenuOpen ? "close menu" : "open menu"}
        >{isMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>

        <div className={Cn("fixed inset-0 z-40 bg-background/60 h-[269px] flex flex-col ",
          "transition-all duration-300 md:hidden",
          isMenuOpen ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}>
          <div className="flex flex-col   space-y-8 text-xl">
            {navitem.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >{item.name}</a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;