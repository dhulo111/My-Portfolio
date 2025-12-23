import { useEffect, useState } from "react";
import { Sun, Moon } from 'lucide-react';
import { Cn } from '@/lib/utils.js';

function ThemeToggle() {
  const [isDarkmode, setIsDarkMode] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    }
  }, []);

  function toggle() {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500); // Reset animation state

    if (isDarkmode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  }

  return (
    <button
      onClick={toggle}
      className={Cn(
        "relative p-1 rounded-full transition-all duration-500 cursor-pointer shadow-lg",
        "border border-white/20 backdrop-blur-3xl overflow-hidden group",
        isDarkmode
          ? "bg-slate-900/80 hover:bg-slate-800"
          : "bg-amber-100/80 hover:bg-amber-100"
      )}
      style={{
        width: "60px",
        height: "32px",
      }}
      aria-label="Toggle Theme"
    >
      {/* The Sliding Circle/Knob */}
      <div
        className={Cn(
          "absolute top-1 bottom-1 w-[24px] h-[24px] rounded-full shadow-md transform transition-all duration-500 flex items-center justify-center",
          isDarkmode
            ? "translate-x-7 bg-slate-800 text-slate-100"
            : "translate-x-0 bg-white text-orange-500"
        )}
      >
        {/* Icon Inside the Knob */}
        {isDarkmode ? (
          <Moon size={14} className={Cn("transition-transform duration-500", isAnimating && "rotate-[360deg]")} fill="currentColor" />
        ) : (
          <Sun size={14} className={Cn("transition-transform duration-500", isAnimating && "rotate-[360deg]")} fill="currentColor" />
        )}
      </div>

      {/* Decorative Labels */}
      <div className={Cn("absolute inset-0 flex justify-between items-center px-2 pointer-events-none transition-opacity duration-300", isDarkmode ? "opacity-100" : "opacity-0")}>
        <span className="text-[10px] text-slate-400 font-bold">ON</span>
      </div>
      <div className={Cn("absolute inset-0 flex justify-between items-center px-2 pointer-events-none transition-opacity duration-300", !isDarkmode ? "opacity-100" : "opacity-0")}>
        <span className="flex-1"></span>
        <span className="text-[10px] text-amber-500 font-bold">OFF</span>
      </div>

      {/* Glow Effect */}
      <div
        className={Cn(
          "absolute inset-0 -z-10 blur-lg transition-colors duration-500",
          isDarkmode ? "bg-blue-500/20" : "bg-orange-500/20"
        )}
      />
    </button>
  );
}

export default ThemeToggle;