import React, { useState, useEffect } from 'react';
import './Register.css';
import DefaultForm from '../DefaultForm/DefaultForm';
import ServerErrorMessage from '../ServerErrorMessage/ServererrorMessage';
import { Link } from 'react-router-dom';

export default function Register({ onRegister, message }) {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formValid, setFormValid] = useState(false);


  function handleNameChange(event) {
    const validName = /^[a-zA-Z\- а-яА-Я]+$/.test(event.target.value);
    if (event.target.value.length < 2) {
      setNameError('минимальная длина имени 2 символа')
    } else if (event.target.value.length > 30) {
      setNameError('максимальная длина имени 30 символов')
    } else if (!validName) {
      setNameError('имя должно содержать только латиницу, кириллицу пробелы, дефис')
    } else {
      setNameError('');
    }
    setName(event.target.value);
  }

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
    if (!name || !email || !password) {
      return
    }
    onRegister(name, email, password);
  }

  useEffect(() => {
    if (
      name &&
      email &&
      password &&
      !nameError &&
      !emailError &&
      !passwordError
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [name, email, password, nameError, emailError, passwordError]);

  return (
    <DefaultForm name="register"
      id="form-register"
      title="Добро пожаловать!"
      onSubmit={handleSubmit}
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
        />
        <span id="input-error-name" className="form__error">{nameError}</span>
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
          name="input-register-password"
          id="input-register-password"
          required
        />
        <span id="input-error-name" className="form__error">{passwordError}</span>
      </label>
      <ServerErrorMessage message={ message } />
      <button type="submit" disabled={!formValid} className={`form__button ${!formValid ? 'form__button_disabled' : ''}`}>Зарегистрироваться
      </button>
    </DefaultForm>
  )
}