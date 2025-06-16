import { useState } from 'react';
import NewCard from './components/popup/Newcard/Newcard.jsx';
import Popup from './components/popup/popup.jsx';
import NewAvatar from './components/popup/NewAvatar/NewAvatar.jsx';
import NewProfile from './components/popup/newprofile/NewProfile.jsx';
import Card from './components/card/Card.jsx';
import ImgPopup from './components/popup/ImgPopup/ImgPopup.jsx';

const cards = [
  {
    isLiked: false,
    _id: '5d1f0611d321eb4bdcd707dd',
    name: 'Yosemite Valley',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:10:57.741Z',
  },
  {
    isLiked: false,
    _id: '5d1f064ed321eb4bdcd707de',
    name: 'Lake Louise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:11:58.324Z',
  },
  {
    isLiked: true,
    _id: '5d1f0658d321eb4bdcd707df',
    name: 'Bald Mountains',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:12:24.312Z',
  },
  {
    isLiked: false,
    _id: '5d1f0664d321eb4bdcd707e0',
    name: 'Latemar',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:13:01.456Z',
  },
  {
    isLiked: true,
    _id: '5d1f0671d321eb4bdcd707e1',
    name: 'Vanoise National Park',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:14:00.001Z',
  }
];



export default function Main() {

  const [popup, setPopup] = useState(null);
  const newCardPopup = { title: "Nuevo lugar", children: <NewCard /> };
  const newAvatar = {title: "Editar Foto de Perfil" , children:<NewAvatar/>}
  const newProfile = {title:"Editar Perfil" ,  children:<NewProfile/>}
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
                <img src="../images/image.jpg" alt="profile picture" className="main__profile-image" />
                <img src="../images/pencil-svgrepo-com.svg" alt="Edit icon" className="main__pencil-icon" />
              </button>
            </div>
            <div className="main__content-paragraph">
              <h2 className="main__paragraph main__paragraph_name">eros</h2>
              <p className="main__paragraph main__paragraph_job">developer</p>
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
              handleCardClick={handleCardClick}
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
