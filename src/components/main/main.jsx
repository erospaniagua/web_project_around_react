import { useState, useEffect, useContext } from 'react';
import NewCard from './components/popup/Newcard/Newcard.jsx';
import Popup from './components/popup/popup.jsx';
import EditAvatar from './components/popup/NewAvatar/NewAvatar.jsx';
import EditProfile from './components/popup/newprofile/NewProfile.jsx';
import Card from './components/card/Card.jsx';
import ImagePopup from './components/popup/ImgPopup/ImgPopup.jsx';
import api from '../../utils/api.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js'

export default function Main(props) {
  const {loading ,loadingHandler} = useContext(CurrentUserContext)
  const {onOpenPopup,onClosePopup,popup,cards,onCardLike,onCardDelete} = props
  const newCardPopup = { title: "Nuevo lugar", children: <NewCard loading={loading} loadingHandler={loadingHandler}/> };
  const newAvatar = {title: "Editar Foto de Perfil" , children:<EditAvatar loading={loading} loadingHandler={loadingHandler}/>}
  const newProfile = {title:"Editar Perfil" ,  children:<EditProfile loading={loading} loadingHandler={loadingHandler}/>}
  
  const {currentUser} = useContext(CurrentUserContext);

  function handleCardClick(card){
    onOpenPopup({title:"OpenImg" ,children:<ImagePopup card={card}/>})

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
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
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
