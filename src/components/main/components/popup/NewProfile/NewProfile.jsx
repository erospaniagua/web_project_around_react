 export default function NewProfile (){
   return (
     <>
     <form className="popup__form"
        name="card-form"
        id="new-card-form"
        noValidate>
          <label className="popup__field-title">
          <input type="text" name="name" placeholder="Nombre" id="name" className="popup__nombre popup__margin popup__input" minLength="2" maxLength="40" required />
          <span className="popup__input-error popup__input-error_name"></span>
         </label>
         <label className="popup__field-about">
          <input type="text" name="about" placeholder="Acerca de mí" id="about" className="popup__about popup__margin popup__input profile" minLength="2" maxLength="200" required />
          <span className="popup__input-error popup__input-error_about"></span>
         </label>       
         <button type="submit" id="newProfile" className="popup__guardar">Guardar</button>        
        </form>      
     </>
  )
}