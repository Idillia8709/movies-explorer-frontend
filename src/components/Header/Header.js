import React from 'react';
import './Header.css';
import { Route } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

export default function Header(props) {
  const endpoints = ['/movies', '/saved-movies', '/profile'];

  return (
    <Route exact path={endpoints.concat('/')}>
      <header className="header">
        <Logo />
        <Navigation  
        endpoints={endpoints}
        onClick={props.onPopupMenu}
        />
      </header>
    </Route>

  )
}