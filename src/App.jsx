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
