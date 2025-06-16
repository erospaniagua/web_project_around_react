export default function NewCard() {
    return (
      <>
      <form className="popup__form"
        name="card-form"
        id="new-card-form"
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