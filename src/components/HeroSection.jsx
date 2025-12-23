import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import Hero3D from "./Hero3D";

function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 px-4 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* Text Content */}
          <div className="w-full lg:w-1/2 z-10 space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-2 opacity-0 animate-fade-in">
                🚀 Welcome to my digital universe
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                <span className="block opacity-0 animate-fade-in">Hi, I'm</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500 opacity-0 animate-fade-in-delay-1">
                  Dhruvan Vachhani
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 opacity-0 animate-fade-in-delay-2 leading-relaxed">
                I engineer stellar web experiences. Transforming ideas into
                <span className="text-foreground font-semibold"> high-performance </span>
                and
                <span className="text-foreground font-semibold"> interactive </span>
                digital reality.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start opacity-0 animate-fade-in-delay-3">
              <a href="#project" className="cosmic-button w-full sm:w-auto text-center">
                Explore Work
              </a>
              <div className="flex items-center gap-4">
                <a href="https://github.com/dhulo111" target="_blank" className="p-3 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="p-3 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#contact" className="p-3 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Stats or Tech Stack preview could go here */}
            <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 opacity-0 animate-fade-in-delay-4">
              <div>
                <h3 className="text-3xl font-bold text-primary">1+</h3>
                <p className="text-sm text-muted-foreground">Years Exp.</p>
              </div>
              <div className="w-px h-10 bg-border"></div>
              <div>
                <h3 className="text-3xl font-bold text-primary">20+</h3>
                <p className="text-sm text-muted-foreground">Projects</p>
              </div>
              <div className="w-px h-10 bg-border"></div>
              <div>
                <h3 className="text-3xl font-bold text-primary">100%</h3>
                <p className="text-sm text-muted-foreground">Dedication</p>
              </div>
            </div>
          </div>

          {/* 3D Model / Visuals */}
          <div className="w-full lg:w-1/2 h-[500px] lg:h-[600px] relative z-10 opacity-0 animate-fade-in-delay-2">
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