import { Routes, Route } from 'react-router-dom'
import Home from "./home.jsx"
import Notfound from "./notfound.jsx"
import SmoothScroll from './components/SmoothScroll';

function App() {
  return (
    <div className="relative min-h-screen w-full bg-black">
      <div className="opacity-100 transition-opacity duration-1000 ease-in-out">
        <SmoothScroll />
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
