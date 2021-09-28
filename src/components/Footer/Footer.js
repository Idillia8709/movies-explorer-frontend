import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__section">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__info">
        <p className="footer__copyright">&copy; {new Date().getFullYear()} </p>
        <nav>
          <ul className="footer__links">
            <li className="footer__link">
              <a className="footer__link"
                href="https://praktikum.yandex.ru/"
                target="blank"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__link">
              <a
                className="footer__link"
                href="https://github.com/Idillia8709"
                target="blank"
              >
                Github
              </a>
            </li>
            <li className="footer__link">
              <a
                className="footer__link"
                href="https://www.facebook.com/svetlana.mikhaylova.129"
                target="blank"
              >
                Facebook
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )


}