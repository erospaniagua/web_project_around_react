import { useState, useEffect } from 'react'

import '../App.css'
import Header from './header/header.jsx'
import Main from './main/main.jsx'
import Footer from './footer/footer.jsx'
import api from '../utils/api.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
function App() {
  const [currentUser , setUser] = useState({});
  const [popup, setPopup] = useState(null);
  useEffect(() => {
    api.getUserInfo().then((res) => {
      console.log(`user = ${res}`);
      setUser(res);
    })
  }, []);

  const handleUserUpdate = async (user) => {
   const updatedUser = await api.editProfile(user);
   setUser(updatedUser);
   console.log(`user cambiado a ${updatedUser}`);
   handleClosePopup();
  }

  const handleUpdateAvatar = async (link) =>{
    const updatedAvatar = await api.editProfileImg(link);
    setUser(updatedAvatar);
    console.log(`avatar cambiaado a ${updatedAvatar}`);
    handleClosePopup();

  }

  function handleOpenPopup(popup) {
    setPopup(popup);
  }
  function handleClosePopup() {
    setPopup(null);
  }
  return (
    <>
    <CurrentUserContext.Provider value={{currentUser, setUser, handleUserUpdate, handleUpdateAvatar}}>
      <div className="page">
        <Header/>
        <Main onClosePopup={handleClosePopup}
              onOpenPopup={handleOpenPopup}
              popup={popup}/> 
        <Footer/>
      </div>
      </CurrentUserContext.Provider>
    </>
  )
}

export default App
