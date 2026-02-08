import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from "./home.jsx"
import Notfound from "./notfound.jsx"
import Loading from "./components/Loading"
import SmoothScroll from './components/SmoothScroll';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <SmoothScroll />
          <Routes>
            <Route index element={<Home />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </>
      )}
    </>
  )
}

export default App;
