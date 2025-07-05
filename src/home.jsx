import StarBackground from "./components/StarBackground";
import ThemeToggle from "./components/ThemeToggle";
import Navbar from "./components/navbar";
import HeroSection from "./components/HeroSection";
import AboutMe from "./components/AbouteMe";
import SkillSection from "./components/SkillSection";
import ProjectSection from "./components/ProjectSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
function Home(){
  return(
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* theme toggle */}
      <ThemeToggle />
      {/* background effect */}
      <StarBackground />
      {/* navbar */}
      <Navbar />
      {/* main content */}
      <main>
        <HeroSection />
        <AboutMe />
        <SkillSection />
        <ProjectSection />
        <ContactSection />
      </main>
      {/* footer */}
      <Footer />
    </div>
  )
}

export default Home;