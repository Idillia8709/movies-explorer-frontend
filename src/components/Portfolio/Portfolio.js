import React from 'react';
import './Portfolio.css';

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__links">
        <li className="portfolio__paragraph">
          Статичный сайт
          <a className="portfolio__link" href="https://idillia8709.github.io/how-to-learn/" target="blank">
          ↗
          </a>

        </li>
        <li className="portfolio__paragraph">
          Адаптивный сайт
          <a className="portfolio__link" href="https://idillia8709.github.io/russian-travel/" target="blank" >
          ↗
          </a>

        </li>
        <li className="portfolio__paragraph">
          Одностраничное приложение
          <a className="portfolio__link" href="https://idillia8709.github.io/mesto/" target="blank" >
          ↗
          </a>
        </li>
      </ul>
    </section>
  )
}