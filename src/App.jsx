import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from "./home.jsx"
import Notfound from "./notfound.jsx"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
      <Route index element={<Home />}/>
      <Route path="*" element={<Notfound />}/>
     </Routes>
    </>
  )
}

export default App;
