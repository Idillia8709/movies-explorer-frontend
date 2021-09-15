import React from 'react';
import './AboutMe.css';
import avatar from '../../images/avatar.jpg';
import SectionTitle from '../SectionTitle/SectionTitle';

export default function AboutMe({ title }) {
  return (
    <section className="about-me" id="aboutMe">
      <SectionTitle
        title={title}
      />
      <div className="about-me__info">
        <div className="about-me__paragraph">
          <h3 className="about-me__name">Светлана</h3>
          <h4 className="about-me__profession">Начинающий фронтенд-разработчик, 34 года</h4>
          <p className="about-me__text">
            Я родилась и училась в Забайкальском крае, некоторое время назад переехала в Краснодар, где и продолжаю жить.
            Я люблю походы в горы, езду на велосипеде. Год назад заинтересовалась веб-разработкой. Заканчиваю курсы ЯндексПрактикум.
            Надеюсь стать хорошим разработчиком.
          </p>
          <div className="about-me__links">
            <a
              className="about-me__link"
              href="https://www.facebook.com/svetlana.mikhaylova.129"
            >
              Facebook
            </a>
            <a
              className="about-me__link"
              href="https://github.com/Idillia8709"
            >
              Github
            </a>
          </div>
        </div>
        <img className="about-me__avatar" src={avatar} alt="Фотография студента" />
      </div>
    </section>
  )
}