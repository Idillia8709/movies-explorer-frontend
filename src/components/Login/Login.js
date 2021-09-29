import React, { useState, useEffect } from 'react';
import './Login.css';
import DefaultForm from '../DefaultForm/DefaultForm';
import ServerErrorMessage from '../ServerErrorMessage/ServerErrorMessage';
import { Link } from 'react-router-dom';

export default function Login({ onLogin, message, loggedIn }) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formValid, setFormValid] = useState(false);

  function handleEmailChange(event) {
    const validEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(event.target.value);
    if (!validEmail) {
      setEmailError('неверный формат почты')
    } else {
      setEmailError('');
    }
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    if (event.target.value.length < 8) {
      setPasswordError('пароль должен быть не менее 8 символов')
    } else {
      setPasswordError('');
    }
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!email || !password) {
      return;
    }
    onLogin(email, password);
  }

  useEffect(() => {
    if (loggedIn) {
      setEmail('');
      setPassword('');
    }
  }, [loggedIn]);

  useEffect(() => {
    if (
      email &&
      password &&
      !emailError &&
      !passwordError
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [email, password, emailError, passwordError]);

  return (
    <DefaultForm name="login"
      id="form-login"
      title="Рады видеть!"
      onSubmit={handleSubmit}
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
        <span id="input-error-name" className="form__error">{emailError}</span>
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
        <span id="input-error-name" className="form__error">{passwordError}</span>
      </label>
      <ServerErrorMessage message={message} />
      <button type="submit" disabled={!formValid} className={`form__button ${!formValid ? 'form__button_disabled' : ''}`}>Войти
      </button>
    </DefaultForm>

  )
}