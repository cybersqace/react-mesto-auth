import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate} from "react-router-dom";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import * as auth from "../utils/auth";
import ProtectedRoute from './ProtectedRoute';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup.js';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import affirm from "../images/affirmicon.svg";
import fail from "../images/failicon.svg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailName, setEmailName] = useState(null);
  const [popupImage, setPopupImage] = useState("");
  const [popupTitle, setPopupTitle] = useState("");
  const [infoTooltip, setInfoTooltip] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) { 
    Promise.all([api.getUserInfo(),api.getCardList()])
    .then(([ userInfo, cardList ]) => {
      setCurrentUser(userInfo);
      setCards(cardList);
    })
    .catch((err) => {
      console.error(err);
    });
    }
  }, [isLoggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCardDelete(cardId) {
    api.deleteCard(cardId).then(() => {
        setCards((cards) => cards.filter((card) => card._id !== cardId));
      }).catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
    }).catch((err) => {
        console.error(err);
    });
  }

  function handleUpdateAvatar(newData) {
    api.setUserAvatar(newData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  function handleAddPlaceSubmit(newData) {
    api.addCard(newData)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.error(err);
    });
  };

  function handleRegistration(email, password) {
    auth.register(email, password)
    .then(() => {
      setPopupImage(affirm);
      setPopupTitle("Вы успешно зарегистрировались!");
      navigate("/sign-in");
    }).catch(() => {
      setPopupImage(fail);
      setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
    }).finally(handleInfoTooltip);
  }

  function handleAuthorization(email, password) {
    auth.login(email, password)
    .then((res) => {
      localStorage.setItem("jwt", res.token);
      setIsLoggedIn(true);
      setEmailName(email);
      navigate("/");
    }).catch(() => {
      setPopupImage(fail);
      setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
      handleInfoTooltip();
    });
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.getToken(jwt)
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setEmailName(res.data.email);
        }
      }).catch((err) => {
        console.error(err);
      });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setInfoTooltip(false);
  }
  
  function handleSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setEmailName(null);
    navigate("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
      <Header loggedIn={isLoggedIn} userEmail={emailName} onSignOut={handleSignOut} />
        <Routes>
          <Route path="/sign-in" element={
            <>
              <Login onLogin={handleAuthorization} />
            </>
          }/>
          <Route path="/sign-up" element={
            <>
              <Register onRegister={handleRegistration} />
            </>
          }/>
          <Route exact path="/" element={
            <>
              <ProtectedRoute
                component={Main}
                isLogged={isLoggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
              <Footer />
            </>
          }/>
          <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/sign-in"}/>} />
        </Routes>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} /> 
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onSubmit={handleAddPlaceSubmit} />
        <InfoTooltip isOpen={infoTooltip} onClose={closeAllPopups} image={popupImage} title={popupTitle} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
