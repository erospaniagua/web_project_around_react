 import { CurrentUserContext } from "../../../../../contexts/CurrentUserContext"
 import {useContext, useState} from "react"
 export default function EditProfile (){
   const {currentUser, handleUserUpdate, loading}= useContext(CurrentUserContext);
   
   const [name, setName] = useState(currentUser.name);
   const [about, setAbout] = useState(currentUser.about);
   
   function handleNameChange(e){
    setName(e.target.value);
    
   }
   function handleAboutChange(e){
    setAbout(e.target.value);
   }

   function handleSubmit(e){
     e.preventDefault()
     handleUserUpdate({name, about})
   }

   return (
     <>
     <form className="popup__form"
        name="card-form"
        id="new-card-form"
        noValidate
        onSubmit={handleSubmit}
        >
        
          <label className="popup__field-title">
          <input type="text" 
                 name="name" 
                 placeholder="Nombre" 
                 id="name" 
                 className="popup__nombre popup__margin popup__input" 
                 minLength="2" maxLength="40"
                 value={name}
                 onChange={handleNameChange}
                 required />
          <span className="popup__input-error popup__input-error_name"></span>
         </label>
         <label className="popup__field-about">
          <input type="text" 
                 name="about" 
                 placeholder="Acerca de mí" 
                 id="about" 
                 className="popup__about popup__margin popup__input profile" 
                 minLength="2" maxLength="200" 
                 required 
                 value={about} 
                 onChange={handleAboutChange}/>
          <span className="popup__input-error popup__input-error_about"></span>
         </label>       
         <button type="submit" id="newProfile" className="popup__guardar">{`${loading? 'Cargando' : 'Guardar'}`}</button>        
        </form>      
     </>
  )
}