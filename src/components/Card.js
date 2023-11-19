import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card ({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  
  const cardLikeButtonClassName = ( 
    `element__like-button ${isLiked ? 'element__like-button_active' : ''}`
  );
  
  function handleClick () {
    onCardClick(card)
  };

  function handleLikeClick () {
    onCardLike(card)
  };

  function handleDeleteClick () {
    onCardDelete(card._id);
  };


  return (
    <li className="element">
      <img className="element__pic" src={card.link} onClick={handleClick} alt={card.name} />
      <div className="element__caption">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__group">
          <button className={cardLikeButtonClassName} type="button" aria-label="кнопка лайка" onClick={handleLikeClick}></button>
          <span className="element__likes">{card.likes.length}</span>
        </div>
        {isOwn && (<button className="element__delete-button" type="button" aria-label="кнопка удаления" onClick={handleDeleteClick}></button> )}
      </div>
    </li>
  );
};

export default Card;