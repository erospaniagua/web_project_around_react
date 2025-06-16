

export default function NewAvatar() {
    return (
        <>
         <form className="popup__form"
         name="card-form"
         id="new-card-form"
         noValidate>
         <label className="popup__field-avatar">
           <input type="url" name="link" placeholder="Link:" id="profileLink" className="popup__nombre popup__margin popup__input" required/>
           <span className="popup__input-error popup__input-error_profileLink"></span>
         </label>       
           <button type="submit" id="newImgProfile" className="popup__guardar popup__guardar-avatar">Guardar</button>       
          </form>          
         </> 
    )

}