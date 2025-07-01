import { useState, useEffect, useContext } from 'react';
import NewCard from './components/popup/Newcard/Newcard.jsx';
import Popup from './components/popup/popup.jsx';
import NewAvatar from './components/popup/NewAvatar/NewAvatar.jsx';
import NewProfile from './components/popup/newprofile/NewProfile.jsx';
import Card from './components/card/Card.jsx';
import ImgPopup from './components/popup/ImgPopup/ImgPopup.jsx';
import api from '../../utils/api.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js'

export default function Main() {

  const [popup, setPopup] = useState(null);
  const newCardPopup = { title: "Nuevo lugar", children: <NewCard /> };
  const newAvatar = {title: "Editar Foto de Perfil" , children:<NewAvatar/>}
  const newProfile = {title:"Editar Perfil" ,  children:<NewProfile/>}
  const [cards, setCards] = useState([]);
  const {user} = useContext(CurrentUserContext);
  useEffect(() => {
    api.getInitialCards().then((res) => {
      setCards(res);
    })
  }, []);

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


  function handleOpenPopup(popup) {
    setPopup(popup);
  }
  function handleClosePopup() {
    setPopup(null);
  }
  function handleCardClick(card){
    handleOpenPopup({title:"OpenImg" ,children:<ImgPopup card={card}/>})

  }
   return(
    <main className="main">
          <div className="main__profile">
            <div className="main__content-image">
              <button className="main__profileimg-button" onClick={() => handleOpenPopup(newAvatar)}>
                <img src={user.avatar} alt="profile picture" className="main__profile-image" />
                <img src="../images/pencil-svgrepo-com.svg" alt="Edit icon" className="main__pencil-icon" />
              </button>
            </div>
            <div className="main__content-paragraph">
              <h2 className="main__paragraph main__paragraph_name">{user.name}</h2>
              <p className="main__paragraph main__paragraph_job">{user.about}</p>
              <button className="main__button main__button_edit" onClick={() => handleOpenPopup(newProfile)}>&#x1F58C;</button>
            </div>
            <button type="button" className="main__button main__button_add" onClick={() => handleOpenPopup(newCardPopup)}>
              &#x1F7A3;
            </button>
          </div>
          <section >
            <ul className="gallery">
              {cards.map((card)=>(<Card 
              key={card._id} 
              card={card} 
              isLiked={card.isLiked}
              handleCardClick={handleCardClick}
              onCardLike={handleCardLike}
              />
              ))}
            </ul>

          </section>
        {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
        )}
        </main>
   ) 
}
