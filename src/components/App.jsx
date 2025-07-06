import { useState, useEffect } from 'react'

import '../App.css'
import Header from './header/header.jsx'
import Main from './main/main.jsx'
import Footer from './footer/footer.jsx'
import api from '../utils/api.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
function App() {
  //estados
  const [currentUser , setUser] = useState({});
  const [loading,setLoading] = useState(false)
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  //api para usuario
  useEffect(() => {
    api.getUserInfo().then((res) => {
      setUser(res);
    })
  }, []);
//api para las targetas 
  useEffect(() => {
    api.getInitialCards().then((res) => {
      setCards(res);
    })
  }, []);
//user handlers
  const handleUserUpdate = async (user) => {
    startLoading();
    try{const updatedUser = await api.editProfile(user);
      setUser(updatedUser);
    }catch(err){console.log('error al cambiar usuario', err)

    }finally{
      stopLoading();
      handleClosePopup();
    }
   handleClosePopup();
  }

  const handleUpdateAvatar = async (link) =>{
    startLoading();
    try{const updatedAvatar = await api.editProfileImg(link);
        setUser(updatedAvatar);
      }catch(err){console.log(`error al cambiar foto de perfil`, err)

      }finally{
        setLoading()
        handleClosePopup()
      }
  }
//popup handlers
  function handleOpenPopup(popup) {
    setPopup(popup);
  }
  function handleClosePopup() {
    setPopup(null);
  }
  //card handlers
  async function handleCardLike(card) {
    const isLiked = card.isLiked;
  
    const newCard = isLiked
      ? await api.removeLike(card._id)
      : await api.addLike(card._id);
  
    setCards((state) =>
      state.map((currentCard) =>
        currentCard._id === card._id ? newCard : currentCard
      )
    );
  }

  async function handleCardDelete(card) {
    await api.deleteCard(card._id);
    setCards((state) => state.filter((currentCard) => currentCard._id !== card._id));
  }

  async function handleCardSubmit(data) {
    startLoading();
    try {
      const newCard = await api.addCard(data);
      setCards((prev) => [newCard, ...prev]);
    } catch (err) {
      console.error("Error adding card", err);
    } finally {
      stopLoading();
      handleClosePopup();
    }
  }
  //Loading state
  function startLoading() {
    setLoading(true);
  }
  
  function stopLoading() {
    setLoading(false);
  }

  return (
    <>
    <CurrentUserContext.Provider value={{currentUser, setUser, handleUserUpdate, handleUpdateAvatar, handleCardSubmit,setCards,loading}}>
      <div className="page">
        <Header/>
        <Main onClosePopup={handleClosePopup}
              onOpenPopup={handleOpenPopup}
              popup={popup}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}/> 
        <Footer/>
      </div>
      </CurrentUserContext.Provider>
    </>
  )
}

export default App
