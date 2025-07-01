import { useState, useEffect } from 'react'

import '../App.css'
import Header from './header/header.jsx'
import Main from './main/main.jsx'
import Footer from './footer/footer.jsx'
import api from '../utils/api.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
function App() {
  const [user , setUser] = useState({});
  useEffect(() => {
    api.getUserInfo().then((res) => {
      console.log(res);
      setUser(res);
    })
  }, []);
  return (
    <>
    <CurrentUserContext.Provider value={{user}}>
      <div className="page">
        <Header/>
        <Main/> 
        <Footer/>
      </div>
      </CurrentUserContext.Provider>
    </>
  )
}

export default App
