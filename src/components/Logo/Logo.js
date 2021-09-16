import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

export default function Logo() {
  return (
    <Link to="/" className="logo">
          <img className="logo_img" src={logo} alt="Логотип проекта поиска фильмов" />
        </Link>
  )
}