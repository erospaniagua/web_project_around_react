import {useRef, useContext} from 'react'
import {CurrentUserContext} from "../../../../../contexts/CurrentUserContext";
import {useValidation} from "../../../../../hooks/validation";

export default function NewCard() {
    const {errors, handleValidation, inputsRef,formIsValid} = useValidation(["place", "link"]);
    const {handleCardSubmit, setCards, loading} = useContext(CurrentUserContext)


    function handleOnchange(e) {
        console.log(errors)
        handleValidation(e)
    }
    function handleSubmit(e) {
        e.preventDefault();
        handleCardSubmit({name: inputsRef.current.place.value, link: inputsRef.current.link.value});
    }

    return (<>
        <form className="popup__form" name="card-form" id="new-card-form"
            onSubmit={handleSubmit}
            noValidate>
            <label className="popup__field popup__field-title">
                <input className="popup__nombre popup__margin popup__input" id="card-name" maxLength="30" minLength="1" name="place" placeholder="Title" required type="text"
                    ref={
                        (el) => (inputsRef.current.place = el)
                    }
                    onChange={handleOnchange}/>
                <span className="popup__input-error popup__input-error_title" id="card-name-error"> {
                    errors.place ? errors.place : ""
                }</span>
            </label>
            <label className="popup__field popup__field-about">
                <input className="popup__about popup__margin popup__input" id="card-link" name="link" placeholder="Image link" required type="url"
                    ref={
                        (el) => (inputsRef.current.link = el)
                    }
                    onChange={handleOnchange}/>
                <span className="popup__input-error popup__input-error_imgLink" id="card-link-error"> {
                    errors.link ? errors.link : ""
                }</span>
            </label>

            <button className={`button popup__button popup__guardar ${!formIsValid ? 'popup__button_disabled' : ''}`} type="submit" disabled={
                    !formIsValid
            }> {
                `${
                    loading ? 'Cargando' : 'Guardar'
                }`
            } </button>
        </form>
    </>);
}
