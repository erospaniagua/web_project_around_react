import { useState } from 'react'

import '../App.css'
import Header from './header/header.jsx'
import Main from './main/main.jsx'
import Footer from './footer/footer.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="page">
        <Header/>
        <Main/> 
        <Footer/>
      </div>
    </>
  )
}

export default App
