import React from 'react';
import { Link, NavLink, Route } from "react-router-dom";
import './Navigation.css';
import profile from '../../images/icon_avatar.svg';



export default function Navigation(props) {
  return (
    <nav className='menu'>
      <Route exact path='/'>
        <div className="menu__location">
        <Link to='/signup' className='menu__link'>Регистрация</Link>
        <Link to='/signin' className='menu__link menu__link_type_signin '>Войти</Link>
        </div>
      </Route>
      <Route exact path={props.endpoints}>
        <button
          className='menu__burger menu__button_type_burger'
          onClick={props.onClick}>
        </button>
        <div className='menu__container'>
          <div className="menu__box-movies">
            <NavLink to='/movies'
              className='menu__film-link'
              activeClassName='menu__film-link_type_active'>
              Фильмы
            </NavLink>
            <NavLink to='/saved-movies'
              className='menu__film-link menu__film-link_type_saved'
              activeClassName='menu__film-link_type_active'>
              Сохраненные фильмы
            </NavLink>
          </div>
          <Link to='/profile' className='menu__link-profile' >
            <img src={profile}  className="menu__icon"  alt="Иконка кнопки профиль аватара"/>
            Аккаунт
          </Link>
        </div>
      </Route>
    </nav>
  )
}