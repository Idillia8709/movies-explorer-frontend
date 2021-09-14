import React from 'react';
import './NavTab.css';

export default function NavTab() {
  return (
    <nav className="nav">
      <ul className="nav__links">
        <li className="nav__paragraph">
          <a className="nav__link" href="aboutProject">
            О проекте
          </a>
        </li>
        <li className="nav__paragraph">
          <a className="nav__link" href="techs">
            Технологии
          </a>
        </li>
        <li className="nav__paragraph">
          <a className="nav__link" href="aboutMe">
            Студент
          </a>
        </li>
      </ul>
    </nav>
  )
}
