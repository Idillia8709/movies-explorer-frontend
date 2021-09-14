import React from 'react';
import './PopupMenu.css';
import { Link } from 'react-router-dom';
import profile from '../../images/icon_avatar.svg';

export default function PopupMenu(props) {
  return (
    <div
      className={`popup ${props.isOpen ? "popup__opened" : ''}`}
      onClick={props.onClose}
    >
      <div className="popup__container">
        <button
          className="popup__button-clouse"
          type="button"
          onClick={props.onClose} />
        <nav className="popup__links">
          <Link to="/" className="popup__link">
            Главная
          </Link>
          <Link to="/movies" className="popup__link">
            Фильмы
          </Link>
          <Link to="/saved-movies" className="popup__link">
            Сохраненные фильмы
          </Link>
        </nav>
        <Link to='/profile' className='popup__profile-button'>
          <img src={profile} alt="Профиль" className="profile__icon" />
          Аккаунт
        </Link>
      </div>
    </div>
  )
}