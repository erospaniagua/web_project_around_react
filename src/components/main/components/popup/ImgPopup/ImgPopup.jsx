

export default function ImagePopup(props){
    const {name, link }= props.card
    return (
        <div className="gallery__Opened__card__container">
            <img className="gallery__img__opened" src={link} alt={name}/>
            <p className="gallery__tittle__opened">{name}</p>
        </div>
    )
}