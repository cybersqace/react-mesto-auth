import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({
      username: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name={"profile"}
      title={"Редактировать профиль"}
      button={"Сохранить"}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        minLength={2}
        maxLength={40}
        id="user-name"
        name="username"
        className="form__input form__input_type_username"
        value={name}
        onChange={handleNameChange}
        placeholder="Имя"
        required=""
      />
      <span id="user-name-error" className="form__input-error" />
      <input
        type="text"
        minLength={2}
        maxLength={200}
        id="about"
        name="about"
        className="form__input form__input_type_about"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="О себе"
        required=""
      />
      <span id="about-error" className="form__input-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;