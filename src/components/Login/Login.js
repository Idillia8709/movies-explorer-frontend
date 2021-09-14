import React, { useState, useEffect } from 'react';
import './Login.css';
import DefaultForm from '../DefaultForm/DefaultForm';
import { Link } from 'react-router-dom';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!email || !password) {
      return;
    }
    props.onLogin(email, password);
  }

  useEffect(() => {
    if (props.loggedIn) {
      setEmail('');
      setPassword('');
    }
  }, [props.loggedIn]);

  return (
    <DefaultForm name="login"
      id="form-login"
      title="Рады видеть!"
      onSubmit={handleSubmit}
      btnName={props.btnName ? "Вход..." : "Войти"}
      Link={
        <Link to="/signup" className="form__link">
          Еще не зарегистрированы?<span className="form__link-span"> Регистрация</span>
        </Link>
      }>
      <label className="form__label">
        Email
        <input
          type="text"
          value={email || ''}
          onChange={handleEmailChange}
          className=" form__input form__input_type_email"
          name="input-login-email"
          id="input-login-email"
          required
          minLength="2"
          maxLength="40"
          autoComplete="off"
        />
        <span id="input-error-name" className="form__error">{props.message}</span>
      </label>
      <label className="form__label">
        Пароль
        <input
          type="password"
          value={password || ''}
          onChange={handlePasswordChange}
          className=" form__input form__input_type_password"
          name="input-login-password"
          id="input-login-password"
          required
          minLength="8"
          maxLength="200"
          autoComplete="off"
        />
        <span id="input-error-name" className="form__error">{props.message}</span>
      </label>
    </DefaultForm>

  )
}