import { useState, useEffect, useRef } from "react";
import { Cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  // frontend
  { name: "HTML/CSS", level: 95, category: "frontend" },
  { name: "JavaScript", level: 90, category: "frontend" },
  { name: "React", level: 90, category: "frontend" },
  { name: "TypeScript", level: 80, category: "frontend" },
  { name: "Tailwind CSS", level: 95, category: "frontend" },
  { name: "Next.js", level: 85, category: "frontend" },

  // backend
  { name: "Node.js", level: 90, category: "backend" },
  { name: "Express", level: 75, category: "backend" },
  { name: "MongoDB", level: 85, category: "backend" },
  { name: "PostgreSQL", level: 65, category: "backend" },
  { name: "GraphQL", level: 65, category: "backend" },

  // Tools
  { name: "Git/GitHub", level: 90, category: "tools" },
  { name: "Docker", level: 70, category: "tools" },
  { name: "Figma", level: 80, category: "tools" },
  { name: "VS Code", level: 90, category: "tools" },
];
const categories = ["all", "frontend", "backend", "tools"];

function SkillSection() {
  const [activecategory, setActivecategory] = useState("all");
  const filteredSkills = skills.filter((skill) => activecategory === "all" || skill.category === activecategory);
  const containerRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    // Initial scroll animation
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Animate cards when category changes (or on initial load)
    const ctx = gsap.context(() => {
      gsap.fromTo(".skill-card",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out", clearProps: "all" }
      );

      gsap.fromTo(".skill-progress",
        { width: 0 },
        {
          duration: 1, ease: "power2.out", stagger: 0.05,
          width: (i, target) => target.getAttribute("data-width"),
          delay: 0.2
        }
      );

    }, containerRef);
    return () => ctx.revert();
  }, [filteredSkills]);

  return (
    <section ref={containerRef} className="py-24 px-4 relative bg-secondary/30" id="skill">
      <div className="container mx-auto max-w-5xl">
        <h2 ref={headingRef} className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My<span className="text-primary">Skills</span>
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button key={key} onClick={() => setActivecategory(category)}
              className={Cn("px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activecategory === category ? "bg-primary text-primary-foreground" : "bg-secondary/70 text-foreground hover:bd-secondary")}>
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => (
            <div key={key} className="skill-card bg-card p-6 rounded-lg shadow-xs card-hover">
              <div className="text-left mb-4">
                <h3 className="font-semibold text-lg">{skill.name}</h3>
              </div>
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                <div
                  className="skill-progress bg-primary h-2 rounded-full origin-left"
                  style={{ width: skill.level + "%" }}
                  data-width={skill.level + "%"}
                >
                </div>
              </div>
              <div className="text-right mt-1">
                <span className="text-sm text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default SkillSection;