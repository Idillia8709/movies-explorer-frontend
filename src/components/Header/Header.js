import React from 'react';
import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

export default function Header({ onPopupMenu, loggedIn }) {
  return (
      <header className="header">
        <Logo />
        <Navigation
          loggedIn={loggedIn}
          onClick={onPopupMenu}
        />
      </header>
  )
}