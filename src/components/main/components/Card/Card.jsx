export default function Card(props){
    const {name, link, isLiked } = props.card;
    const {handleCardClick, onCardLike, onCardDelete} = props
    const imageComponent = {
        name,
        link,
       
    };
    return (
        <li className="gallery__card">
      <img className="gallery__card-image" src={link} alt="" onClick={()=>handleCardClick(imageComponent)} />
      <button
        aria-label="Delete card"
        className="gallery__trash"
        type="button"
        onClick={() => onCardDelete(props.card)}
      />
      <div className="gallery__card-text">
        <h2 className="gallery__card-name">{name}</h2>
        <button
          aria-label="Like card"
          type="button"
          className={`gallery__card-like ${!isLiked ? 'gallery__card-liked' : ''}`}
          onClick={() => onCardLike(props.card)}
        />
      </div>
    </li>
    )
}