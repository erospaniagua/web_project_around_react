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
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  //api para usuario
  useEffect(() => {
    api.getUserInfo().then((res) => {
      console.log(`user = ${res}`);
      setUser(res);
    })
  }, []);
//api para las targetas 
  useEffect(() => {
    api.getInitialCards().then((res) => {
      console.log(res);
      setCards(res);
    })
  }, []);
//user handlers
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
    const newcard = await api.addCard(data);
    console.log(`new cards after submition ${newcard}`)
    setCards([newcard,...cards]);
    console.log(cards);
    
  }

  return (
    <>
    <CurrentUserContext.Provider value={{currentUser, setUser, handleUserUpdate, handleUpdateAvatar, handleCardSubmit,setCards}}>
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
