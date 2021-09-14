import React from "react";
import "./Techs.css";
import SectionTitle from '../SectionTitle/SectionTitle';

export default function Techs({ title }) {
  return (
    <section className="techs" id="techs">
      <SectionTitle
        title={title}
      />
      <div className="techs__container">
      <h3 className="techs__section">7 технологий</h3>
      <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__icons">
        <li className="techs__icon">HTML</li>
        <li className="techs__icon">CSS</li>
        <li className="techs__icon">JS</li>
        <li className="techs__icon">React</li>
        <li className="techs__icon">Git</li>
        <li className="techs__icon">Express.js</li>
        <li className="techs__icon">mongoDB</li>
      </ul>
      </div>
    </section>
  )
}