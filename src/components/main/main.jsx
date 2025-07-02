import { useState, useEffect, useContext } from 'react';
import NewCard from './components/popup/Newcard/Newcard.jsx';
import Popup from './components/popup/popup.jsx';
import NewAvatar from './components/popup/NewAvatar/NewAvatar.jsx';
import NewProfile from './components/popup/newprofile/NewProfile.jsx';
import Card from './components/card/Card.jsx';
import ImgPopup from './components/popup/ImgPopup/ImgPopup.jsx';
import api from '../../utils/api.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js'

export default function Main(props) {

  const {onOpenPopup,onClosePopup,popup} = props
  const newCardPopup = { title: "Nuevo lugar", children: <NewCard /> };
  const newAvatar = {title: "Editar Foto de Perfil" , children:<NewAvatar/>}
  const newProfile = {title:"Editar Perfil" ,  children:<NewProfile/>}
  const [cards, setCards] = useState([]);
  const {currentUser} = useContext(CurrentUserContext);

  useEffect(() => {
    api.getInitialCards().then((res) => {
      console.log(res);
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


  async function handleCardDelete(card) {
    await api.deleteCard(card._id);
    setCards((state) => state.filter((currentCard) => currentCard._id !== card._id));
  }

  
  
  function handleCardClick(card){
    onOpenPopup({title:"OpenImg" ,children:<ImgPopup card={card}/>})

  }
   return(
    <main className="main">
          <div className="main__profile">
            <div className="main__content-image">
              <button className="main__profileimg-button" onClick={() => onOpenPopup(newAvatar)}>
                <img src={currentUser.avatar} alt="profile picture" className="main__profile-image" />
                <img src="../images/pencil-svgrepo-com.svg" alt="Edit icon" className="main__pencil-icon" />
              </button>
            </div>
            <div className="main__content-paragraph">
              <h2 className="main__paragraph main__paragraph_name">{currentUser.name}</h2>
              <p className="main__paragraph main__paragraph_job">{currentUser.about}</p>
              <button className="main__button main__button_edit" onClick={() => onOpenPopup(newProfile)}>&#x1F58C;</button>
            </div>
            <button type="button" className="main__button main__button_add" onClick={() => onOpenPopup(newCardPopup)}>
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
              onCardDelete={handleCardDelete}
              />
              ))}
            </ul>

          </section>
        {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
        )}
        </main>
   ) 
}
