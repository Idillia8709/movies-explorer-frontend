import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import ServerErrorMessage from '../ServerErrorMessage/ServerErrorMessage';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';


export default function Profile({ onSignOut, onUpdate, message, onPopupMenu, loggedIn }) {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const currentUser = useContext(CurrentUserContext);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      console.log(currentUser);
    }
  }, [currentUser])



  useEffect(() => {
    if (name && email && !nameError && !emailError) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [name, email, nameError, emailError]);


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

  function handleSubmit(event) {
    event.preventDefault();
    onUpdate(name, email);
  }

  return (
    <>
      <Header
        onPopupMenu={onPopupMenu}
        loggedIn={loggedIn}
      />
      <section className="profile">
        <form className="profile__container" onSubmit={handleSubmit}>
          <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
          <div className="profile__column">
            <div className="profile__box  profile__box_type_top">
              <label className="profile__label">
                Имя
              </label>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                className=" profile__input"
                name="input-profile-name"
                id="input-profile-name"
                required
              />
            </div>
            <span id="input-error-name" className="profile__error">{nameError}</span>
          </div>
          <div className="profile__column">
            <div className="profile__box">
              <label className="profile__label">
                Email
              </label>
              <input
                type="text"
                value={email}
                onChange={handleEmailChange}
                className=" profile__input"
                name="input-profile-email"
                id="input-profile-email"
                required
              />
            </div>
            <span id="input-error-name" className="profile__error">{emailError}</span>
          </div>
          <div className="profile__conteiner-button">
            <ServerErrorMessage message={message} />
            <button className={`profile__button ${!formValid ? 'profile__button_disabled' : ''}`} type="submit">
              Редактировать
            </button>
            <Link to="/" type="button" className="profile__exit" onClick={onSignOut}>
              Выйти из аккаунта
            </Link>
          </div>
        </form>
      </section>
    </>

  )
}