import { useEffect, useRef } from "react";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import gsap from "gsap";
import Hero3D from "./Hero3D";

function HeroSection() {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const visualsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-text-element",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2 }
      )
        .fromTo(
          ".hero-button",
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1 },
          "-=0.5"
        )
        .fromTo(
          visualsRef.current,
          { x: 100, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.5 },
          "-=1"
        )
        .fromTo(
          ".hero-stat",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 },
          "-=1"
        );

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} id="hero" className="relative min-h-screen flex items-center pt-30 px-4 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* Text Content */}
          <div ref={textRef} className="w-full lg:w-1/2 z-10 space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="hero-text-element inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-2">
                🚀 Welcome to my digital universe
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                <span className="hero-text-element block">Hi, I'm</span>
                <span className="hero-text-element block text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500">
                  Dhruvan Vachhani
                </span>
              </h1>
              <p className="hero-text-element text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                I engineer stellar web experiences. Transforming ideas into
                <span className="text-foreground font-semibold"> high-performance </span>
                and
                <span className="text-foreground font-semibold"> interactive </span>
                digital reality.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a href="#project" className="hero-button cosmic-button w-full sm:w-auto text-center">
                Explore Work
              </a>
              <div className="flex items-center gap-4">
                <a href="https://github.com/dhulo111" target="_blank" className="hero-button p-3 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/dhruvan-vachhani-73470625b" className="hero-button p-3 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#contact" className="hero-button p-3 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="pt-8 flex items-center justify-center lg:justify-start gap-8">
              <div className="hero-stat">
                <h3 className="text-3xl font-bold text-primary">1+</h3>
                <p className="text-sm text-muted-foreground">Years Exp.</p>
              </div>
              <div className="hero-stat w-px h-10 bg-border"></div>
              <div className="hero-stat">
                <h3 className="text-3xl font-bold text-primary">20+</h3>
                <p className="text-sm text-muted-foreground">Projects</p>
              </div>
              <div className="hero-stat w-px h-10 bg-border"></div>
              <div className="hero-stat">
                <h3 className="text-3xl font-bold text-primary">100%</h3>
                <p className="text-sm text-muted-foreground">Dedication</p>
              </div>
            </div>
          </div>

          {/* 3D Model / Visuals */}
          <div ref={visualsRef} className="w-full lg:w-1/2 h-[500px] lg:h-[600px] relative z-10">
            <Hero3D />

            {/* Background Glow Effect behind 3D model */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 blur-[100px] -z-10 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce z-10">
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">Scroll</span>
        <ArrowDown className="h-4 w-4 text-primary" />
      </div>
    </section>
  )
}
export default HeroSection;