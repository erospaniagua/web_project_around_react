export default function ImgPopup(props){
    const {name, link }= props.card
    return (
        <>
            <img className="gallery__img__opened" src={link} alt={name}/>
            <p className="gallery__tittle__opened">{name}</p>
        </>
    )
}