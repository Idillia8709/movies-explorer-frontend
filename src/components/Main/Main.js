import React from 'react';
import Footer from '../Footer/Footer';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Techs from '../Techs/Techs';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import './Main.css';
import Header from '../Header/Header';

export default function Main({ onPopupMenu, loggedIn }) {
  return (
    <>
      <Header
        onPopupMenu={onPopupMenu}
        loggedIn={loggedIn}
      />
      <Promo />
      <AboutProject
        title="О проекте"
      />
      <Techs
        title="Технологии"
      />
      <AboutMe
        title="Студент"
      />
      <Portfolio />
      <Footer />
    </>
  )
}