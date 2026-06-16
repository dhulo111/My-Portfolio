import { Routes, Route } from 'react-router-dom'
import Home from "./home.jsx"
import Notfound from "./notfound.jsx"
import SmoothScroll from './components/SmoothScroll';

function App() {
  return (
    <div className="relative min-h-screen w-full bg-black">
      <SmoothScroll />
      <Routes>
        <Route index element={<Home />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  )
}

export default App;

import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from "./home.jsx"
import Notfound from "./notfound.jsx"
import Loading from "./components/Loading"
import SmoothScroll from './components/SmoothScroll';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleLoadingComplete = () => {
    // Start the fade out transition
    setIsFadingOut(true);
    // Remove the loading component from DOM after fade completes (1s)
    setTimeout(() => {
      setIsLoading(false);
    }, 1100);
  };

  return (
    <div className="relative min-h-screen w-full bg-black">
      {/* 
        Main Application Content 
        Initially hidden (opacity-0) and then fades in as the loading screen fades out.
        We always mount it to ensure it's ready for high-performance transitions.
      */}
      <div className={`transition-opacity duration-1000 ease-in-out ${isFadingOut || !isLoading ? 'opacity-100' : 'opacity-0'}`}>
        <SmoothScroll />
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>

      {/* 
        Immersive Loading Planet System 
        Fixed on top, handles the zoom interaction, and fades away smoothly to reveal content.
      */}
      {isLoading && (
        <div 
          className={`fixed inset-0 z-[100] transition-opacity duration-1000 ease-in-out ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <Loading onComplete={handleLoadingComplete} />
        </div>
      )}
    </div>
  )
}

export default App;
