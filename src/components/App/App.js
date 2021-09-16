import React, { useState } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Header from '../Header/Header';
import PopupMenu from '../PopupMenu/PopupMenu';
import { filmList } from '../../utils/testMovies';

export default function App() {
  const [isPopupMenu, setIsPopupOpen] = useState(false);

  function handlePopupMenu() {
    setIsPopupOpen(!isPopupMenu);
  }

  function closePopup() {
    setIsPopupOpen(false);
  }

  return (
    <>
      <Header
        onPopupMenu={handlePopupMenu}
      />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/movies">
          <Movies list={filmList} />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies list={filmList} />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
      <PopupMenu
        isOpen={isPopupMenu}
        onClose={closePopup}
      />

    </>
  );
}