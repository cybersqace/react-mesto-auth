import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={props.onClose} aria-label="кнопка для закрытия всплывающего окна" />
        <h2 className="popup__title">{props.title}</h2>
        <form className="form form-personal" name={props.name} onSubmit={props.onSubmit} noValidate="">
          <fieldset className="form__set">
            {props.children}
            <button type="submit" className="form__submit" disabled="">{props.button}</button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;