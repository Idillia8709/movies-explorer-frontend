import React from "react";
import "./AboutProject.css";
import SectionTitle from '../SectionTitle/SectionTitle';

export default function AboutProject({ title }) {
  return (
    <section className="about-project" id="aboutProject">
      <SectionTitle
        title={title}
      />
      <ul className="about-project__table">
        <li className="about-project__paragraph">
          <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.</p>
        </li>
        <li className="about-project__paragraph">
          <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__text"> У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <ul className="about-project__progress">
        <li className="about-project__weeks about-project__weeks-green">1 неделя</li>
        <li className="about-project__weeks">4 недели</li>
        <li className="about-project__dev">Back-end</li>
        <li className="about-project__dev">Front-end</li>
      </ul>


    </section>
  )
}