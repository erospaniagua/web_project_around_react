import {useRef, useContext} from 'react'
import { CurrentUserContext } from "../../../../../contexts/CurrentUserContext"
export default function NewCard() {
 const {handleCardSubmit,setCards} = useContext(CurrentUserContext)
  const inputsRef = useRef({
    name: null,
    link: null,
  });
   
  function handleSubmit(e){
    e.preventDefault();
  handleCardSubmit({name:inputsRef.current.name.value, link:inputsRef.current.link.value});
  }

    return (
      <>
      <form className="popup__form"
        name="card-form"
        id="new-card-form"
        onSubmit={handleSubmit}
        noValidate>
        <label className="popup__field popup__field-title">
          <input
            className="popup__nombre popup__margin popup__input"
            id="card-name"
            maxLength="30"
            minLength="1"
            name="card-name"
            placeholder="Title"
            required
            type="text"
            ref={(el)=>(inputsRef.current.name = el)}
          />
          <span className="popup__input-error popup__input-error_title" id="card-name-error"></span>
        </label>
        <label className="popup__field popup__field-about">
          <input
            className="popup__about popup__margin popup__input"
            id="card-link"
            name="link"
            placeholder="Image link"
            required
            type="url"
            ref={(el)=>(inputsRef.current.link = el)}
          />
          <span className="popup__input-error popup__input-error_imgLink" id="card-link-error"></span>
        </label>
  
        <button className="button popup__button popup__guardar" type="submit">
          Guardar
        </button>
        </form>         
      </>
    );
  }