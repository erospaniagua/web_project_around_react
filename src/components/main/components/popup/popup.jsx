export default function Popup(props) {
    const { onClose, title, children } = props;
    
    let extraClass = '';
    if (title === "Editar Foto de Perfil") {
      extraClass = 'popup_avatar';
    } else if (title === "OpenImg") {
      extraClass = 'popup_img';
    } else if (title === "Editar Perfil") {
      extraClass = 'popup__container_type_profile';
    } else if (title === "Nuevo lugar") {
      extraClass = 'popup__container_type_card';
    }
  
    return (
      <div className="popup">
        <div className={`popup__container ${extraClass}`}>
          <div className="popup__fieldset">
          <button
            aria-label="Close modal"
            className="popup__close"
            type="button"
            onClick={onClose}
          >
            <img src="./images/Close Icon.png" alt="Close icon" className="popup__close-icon" />
          </button>
          <h3 className="popup__title">{title}</h3>
          {children}
          </div> 
        </div>
      </div>
    );
  }