import {useRef, useContext} from 'react'
import { CurrentUserContext } from "../../../../../contexts/CurrentUserContext"

export default function NewAvatar() {
const inputRef = useRef(null)
const {handleUpdateAvatar,setUser,loading} = useContext(CurrentUserContext)

function handleSubmit(e) {
  e.preventDefault();
  handleUpdateAvatar({
    avatar: inputRef.current.value
  });
  setUser((prevUser) => ({
    ...prevUser,
    avatar: inputRef.current.value,
  }))
}
  

    return (
        <>
         <form className="popup__form"
         name="card-form"
         id="new-card-form"
         noValidate
         onSubmit={handleSubmit}>
         <label className="popup__field-avatar">
           <input ref={inputRef} type="url" name="link" placeholder="Link:" id="profileLink" className="popup__nombre popup__margin popup__input" required/>
           <span className="popup__input-error popup__input-error_profileLink"></span>
         </label>       
           <button type="submit" id="newImgProfile" className="popup__guardar popup__guardar-avatar">{`${loading? 'Cargando' : 'Guardar'}`}</button>       
          </form>          
         </> 
    )

}