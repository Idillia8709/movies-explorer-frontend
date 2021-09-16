import React, { useState } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';


export default function Profile(props) {
  const userName = 'Виталий'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  return (
    <section className="profile">
      <form className="profile__container">
        <h2 className="profile__title">{`Привет, ${userName}!`}</h2>
        <div className="profile__box  profile__box_type_top">
          <label className="profile__label">
            Имя
          </label>
          <input
            type="text"
            value={name || ''}
            onChange={handleNameChange}
            className=" profile__input"
            name="input-profile-name"
            id="input-profile-name"
            required
            minLength="2"
            maxLength="40"
            autoComplete="off"
          />
          <span id="input-error-name" className="profile__error">{props.message}</span>
        </div>
        <div className="profile__box">
          <label className="profile__label">
            Email
          </label>
          <input
            type="text"
            value={email || ''}
            onChange={handleEmailChange}
            className=" profile__input"
            name="input-profile-email"
            id="input-profile-email"
            required
            minLength="2"
            maxLength="40"
            autoComplete="off"
          />
          <span id="input-error-name" className="profile__error">{props.message}</span>
        </div>
        <div className="profile__conteiner-button">
          <button className="profile__button" type="submit">
            Редактировать
          </button>
          <Link to="/signin" className="profile__exit">
            Выйти из аккаунта
          </Link>
        </div>
      </form>
    </section>

  )
}