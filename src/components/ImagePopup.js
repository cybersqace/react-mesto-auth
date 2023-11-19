import React from "react";

function ImagePopup (props){
  return (
    <div className={`popup popup_type_image" ${props.card ? "popup_opened": ''}`}>
      <div className="popup__container-image">
      <button className="popup__close" type="button" aria-label="кнопка для закрытия всплывающего окна" onClick={props.onClose}/>
      <figure className="popup__figure">
        <img className="popup__picture" src={props.card?.link}  alt={props.card?.name} />
        <figcaption className="popup__picture-title">{props.card?.name}</figcaption>
      </figure>
      </div>
    </div>
  )
}

export default ImagePopup;