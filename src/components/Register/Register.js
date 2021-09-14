import React, { useState } from 'react';
import './Register.css';
import DefaultForm from '../DefaultForm/DefaultForm';
import { Link } from 'react-router-dom';

export default function Register(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!name || !email || !password) {
      return
    }
    props.onRegister(name, email, password);
  }

  return (
    <DefaultForm name="register"
      id="form-register"
      title="Добро пожаловать!"
      onSubmit={handleSubmit}
      btnName={props.btnName ? "Регистрация..." : "Зарегистрироваться"}
      Link={
        <Link to="/signin" className="form__link">
          Уже зарегистрированны?<span className="form__link-span"> Войти</span>
        </Link>
      }>
      <label className="form__label">
        Имя
        <input
          type="text"
          value={name || ''}
          onChange={handleNameChange}
          className=" form__input form__input_type_name"
          name="input-register-name"
          id="input-register-name"
          required
          minLength="2"
          maxLength="40"
          autoComplete="off"
        />
        <span id="input-error-name" className="form__error">{props.message}</span>
      </label>
      <label className="form__label">
        Email
        <input
          type="text"
          value={email || ''}
          onChange={handleEmailChange}
          className=" form__input form__input_type_email"
          name="input-register-email"
          id="input-register-email"
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
          name="input-register-password"
          id="input-register-password"
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