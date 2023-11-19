import headerLogo from '../images/logo.svg';
import { Link, useLocation } from "react-router-dom";

function Header({ loggedIn, userEmail, onSignOut }) {
  const location = useLocation();
  return (
    <header className="header">
      <img src={headerLogo} className="header__logo" alt="лого" />
      {location.pathname === '/sign-in' && (
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      )}
      {location.pathname === '/sign-up' && (
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      )}
      {loggedIn && (
        <nav className="header__menu">
          <p className="header__email">{userEmail}</p>
          <button className="header__exit-link" onClick={() => onSignOut()}>
            Выйти
          </button>
        </nav>
      )}
    </header>
  )
}

export default Header;