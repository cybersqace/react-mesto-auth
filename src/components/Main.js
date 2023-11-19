import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__content">
            <img
              src={currentUser.avatar}
              className="profile__avatar"
              alt="аватар"
            />
            <button
              type="button"
              className="profile__avatar-button"
              onClick={props.onEditAvatar}
              aria-label="кнопка обновления аватара"
              title="обновить"
            />
            <div className="profile__info">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__edit-button"
                onClick={props.onEditProfile}
                aria-label="кнопка редактирования"
                title="редактировать"
              />
              <p className="profile__description">{currentUser.about}</p>
            </div>
          </div>
          <button
            type="button"
            className="profile__add-button"
            onClick={props.onAddPlace}
            aria-label="кнопка добавления"
            title="добавить"
          />
        </section>
        <section className="cards" aria-label="карточки">
          <ul className="elements">
            {props.cards.map((card) => (
              <Card
                card={card}
                key={card._id}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
export default Main;
