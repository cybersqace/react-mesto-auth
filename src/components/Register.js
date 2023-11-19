import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmail(evt) {
    setEmail(evt.target.value);
  }

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(email, password);
  }

  return (
    <>
      <section className="auth">
        <h2 className="auth__title">Регистрация</h2>
        <form className="auth__form" onSubmit={handleSubmit}>
          <input className="auth__input" type="email" placeholder="Email" onChange={handleEmail}></input>
          <input className="auth__input" type="password" placeholder="Пароль" onChange={handlePassword}></input>
          <button className="auth__button" type="submit">Зарегистрироваться</button>
        </form>
        <Link to="/sign-in" className="auth__login-link">Уже зарегистрированы? Войти</Link>
      </section>
    </>
  );
}

export default Register;