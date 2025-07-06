 import { CurrentUserContext } from "../../../../../contexts/CurrentUserContext"
 import {useContext, useState, useRef} from "react"
 import {useValidation} from "../../../../../hooks/validation"
 export default function EditProfile (){
   const {currentUser, handleUserUpdate, loading}= useContext(CurrentUserContext);
   const { errors, handleValidation, inputsRef,formIsValid } = useValidation(["name", "about"]);
   const [name, setName] = useState(currentUser.name);
   const [about, setAbout] = useState(currentUser.about);

   
   
   function handleNameChange(e){
    setName(e.target.value);
    handleValidation(e);
   }
   function handleAboutChange(e){
    setAbout(e.target.value);
    handleValidation(e);
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
                 ref={(el) => (inputsRef.current.name = el)}
                 required />
          <span className="popup__input-error popup__input-error_name">
                 {errors.name ? errors.name : ""}
          </span>
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
                 onChange={handleAboutChange}
                 ref={(el) => (inputsRef.current.about = el)}/>
          <span className="popup__input-error popup__input-error_about">
          {errors.about ? errors.about: ""}
          </span>
         </label>       
         <button type="submit" id="newProfile" className={`popup__guardar ${!formIsValid ? 'popup__button_disabled' : ''} `} disabled={!formIsValid}>{`${loading? 'Cargando' : 'Guardar'}`}</button>        
        </form>      
     </>
  )
}