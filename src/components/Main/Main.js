import React from 'react';
import Footer from '../Footer/Footer';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Techs from '../Techs/Techs';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import './Main.css';

export default function Main() {
  return (
    <>
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