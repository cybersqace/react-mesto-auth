import { useState } from "react";

function Login({ onLogin }) {
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
    onLogin(email, password);
  }

  return (
    <>
      <section className="auth">
        <h2 className="auth__title">Вход</h2>
        <form className="auth__form" onSubmit={handleSubmit}>
          <input className="auth__input" type="email" placeholder="Email" onChange={handleEmail} required/>
          <input className="auth__input" type="password" placeholder="Пароль" autoComplete="on" onChange={handlePassword} required/>
          <button className="auth__button" type="submit">Войти</button>
        </form>
      </section>
    </>
  );
}

export default Login;