import { useEffect, useState } from "react";
import {Sun,Moon} from 'lucide-react';
function ThemeToggle(){
  const [isDarkmode,setIsDarkMode]=useState(false);
  useEffect(()=>{
    const storedTheme=localStorage.getItem("theme");
    if(storedTheme==="dark"){
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
    else{
      localStorage.setItem("theme","light");
      setIsDarkMode(false);
    }
  },[])
  function toggle(){
    if(isDarkmode){
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme","light");
      setIsDarkMode(false);
    }
    else{
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme","dark");
      setIsDarkMode(true);
    }
  }
  return <button onClick={toggle} className="fixed max-sm:hidden top-5 right-5 z-50 p-2 rounded-full transition-colors duration-300 focus:outlin-hidden">
    {" "}
    {isDarkmode ?
     <Sun className="h-6 w-6 text-yellow-300"/> : 
     <Moon className="h-6 w-6 text-blue-900"/>}
     </button>
}

export default ThemeToggle;