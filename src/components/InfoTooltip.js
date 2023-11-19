function InfoTooltip({ isOpen, image, title, onClose }) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <img className="popup__icon" src={image} alt={title}/>
        <h2 className="popup__subtitle">{title}</h2>
        <button className="popup__close" type="button" onClick={onClose} aria-label="кнопка для закрытия всплывающего окна" />
      </div>
    </div>
  )
}
export default InfoTooltip;