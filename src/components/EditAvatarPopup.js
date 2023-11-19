import React from "react";
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const ref = React.useRef();

  React.useEffect(() => {
    ref.current.value = '';
  }, [props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: ref.current.value
    });
  }

  return(
    <PopupWithForm 
        isOpen={props.isOpen}
        name={'avatar'}
        title={'Обновить аватар'}
        button={'Сохранить'}
        onClose={props.onClose}
        onSubmit={handleSubmit}
        >
          <input ref={ref} type="url" id="avatar" name="avatar" className="form__input form__input_type_avatar" placeholder="Ссылка" required="" />
          <span id="avatar-error" className="form__input-error" />
    </PopupWithForm>
  )
}

export default EditAvatarPopup;