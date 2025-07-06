import {useRef, useContext} from 'react';
import {CurrentUserContext} from "../../../../../contexts/CurrentUserContext";
import {useValidation} from "../../../../../hooks/validation";

export default function EditAvatar() {
    const {errors, handleValidation, inputsRef,formIsValid} = useValidation(["avatar"]);
    const inputRef = useRef(null)
    const {handleUpdateAvatar, setUser, loading} = useContext(CurrentUserContext);

    function assignRefs(...refs) {
        return(el) => {
            refs.forEach(ref => {
                if (typeof ref === 'function') {
                    ref(el);
                } else if (ref != null) {
                    ref.current = el;
                }
            });
        };
    }
    function handleOnchange(e) {
        console.log(errors)
        handleValidation(e)
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleUpdateAvatar({avatar: inputRef.current.value});
        setUser((prevUser) => ({
            ...prevUser,
            avatar: inputRef.current.value
        }))
    }


    return (<>
        <form className="popup__form" name="card-form" id="new-card-form" noValidate
            onSubmit={handleSubmit}>
            <label className="popup__field-avatar">
                <input ref={
                        assignRefs(inputRef, (el) => inputsRef.current.avatar = el)
                    }
                    onChange={handleOnchange}
                    type="url"
                    name="avatar"
                    placeholder="Link:"
                    id="profileLink"
                    className="popup__nombre popup__margin popup__input"
                    required/>
                <span className="popup__input-error popup__input-error_profileLink"> {
                    errors.avatar ? errors.avatar : ""
                }</span>
            </label>
            <button type="submit" id="newImgProfile" className={`popup__guardar popup__guardar-avatar" ${!formIsValid ? 'popup__button_disabled' : ''}`} disabled={!formIsValid}> {
                `${
                    loading ? 'Cargando' : 'Guardar'
                }`
            }</button>
        </form>
    </>)

}
