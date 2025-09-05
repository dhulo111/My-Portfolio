import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "SaaS Landing Page",
    description: "A beautiful landing page app using React and Talwind.",
    image: "https://img.freepik.com/free-psd/gradient-design-template_23-2149883863.jpg",
    tags: ["React", "Node.js", "Stripe"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Orbit Analytics Dashboard",
    description: "Interactive analytics dashboard with data visualization and filtering capabilities.",
    image: "https://www.figma.com/community/resource/a68f5ea1-6e0e-4ac6-b22c-1066c463ada7/thumbnail",
    tags: ["React", "Node.js", "Stripe"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "E-commerce Platform",
    description: "Full-featured e-commerce plateform with user authentication and payment processing.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD0jhl6b3Q37jQOw02YnU0Y7XRt9e_JcIXXA&s",
    tags: ["React", "Node.js", "Stripe"],
    demoUrl: "#",
    githubUrl: "#",
  },
]

function ProjectSection() {
  return (
    <section id="project" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary">Projects</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attension to detail, Performance, and user experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover" key={key}>
              <div className="h-48 overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span className="px-2 py-1 text-xs font-medium rounded-full border bg-primary/20 text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">
                {project.description}
              </p>
              <div className="flex justify-between item-center">
                <div className="flex space-x-3">
                  <a href={project.demoUrl} target="_blank" className="py-4 pl-4 text-foreground/80 hover:text-primary transition-colors duration-300">
                    <ExternalLink size={20} />
                  </a>
                  <a href={project.githubUrl} target="_blank" className="py-4 text-foreground/80 hover:text-primary transition-colors duration-300">
                    <Github size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a target="_blank" href="https://github.com/dhulo111" className="cosmic-button w-fit flex item-center mx-auto gap-2">
            Check My Github <ArrowRight size={26} />
          </a>
        </div>
      </div>
    </section>
  )
}

export default ProjectSection;