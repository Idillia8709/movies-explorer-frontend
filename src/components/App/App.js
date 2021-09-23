import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Header from '../Header/Header';
import PopupMenu from '../PopupMenu/PopupMenu';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';
import mainApi from '../../utils/MainApi';

export default function App() {

  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isPopupMenu, setIsPopupMenu] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    mainApi.getUserInfo()
      .then((user) => {
        console.log(currentUser);
        setCurrentUser(user);
        setLoggedIn(true);
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false))
  }, [currentUser, loggedIn])

  useEffect(() => {
    if (loggedIn) {
      mainApi.getUserMovies()
        .then((movies) => {
          console.log("usermovies", movies);
          setSavedMovies(movies);
        })
        .catch(error => console.log(error))
    }
  }, [loggedIn])

  function handleRegister(name, email, password) {
    mainApi
      .register(name, email, password)
      .then((user) => {
        if (user) {
          setMessage('');
          handleLogin(user.email, password);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error === 409) {
          setMessage('Пользователь с таким email уже существует')
        } else {
          setMessage('При регитсрации пользователя произошла ошибка')
        }
      })
      .finally(() => setIsLoading(false))
  }

  function handleLogin(email, password) {
    setIsLoading(true);
    mainApi
      .login(email, password)
      .then((data) => {
        setMessage('');
        setLoggedIn(true);
        history.push('/movies')
      })
      .catch(error => {
        setMessage("При авторизации произошла ошибка");
        if (error === 401) {
          setMessage("Пользователь с таким email не найден");
        }
        if (error === 400) {
          setMessage("Неверный email или пароль")
        }
      })
      .finally(() => setIsLoading(false))
  }

  function handleUpdateUser(name, email) {
    mainApi.sendUserInfo(name, email)
      .then((user) => {
        setMessage('');
        setCurrentUser(user);
        console.log("currentUserUpdate", currentUser)
      })
      .catch(error => {
        if (error === 409) {
          setMessage("Пользователь с таким email уже существует");
        } else {
          setMessage("При изменении данных профиля произошла ошибка");
        }
      })

  }

  function handleSignOut() {
    mainApi.signout()
      .then(() => {
        localStorage.clear();
        setMessage('');
        setLoggedIn(false);
        setCurrentUser({});
        console.log("currentUserExit", currentUser);
        history.push('/');
      })
      .catch(error => console.log(error))
  }

  function handleSaveMovie(movie) {
    console.log("movie", movie);
    mainApi.saveMovie(movie)
      .then((newCard) => {
        console.log(newCard);
        setSavedMovies([newCard, ...savedMovies]);
      })
      .catch(error => console.log(error))
  }

  function handleDeleteMovie(movie) {
    mainApi.deleteMovie(movie._id)
      .then(() => {
        const newMoviesList = savedMovies.filter((m) => m._id === movie._id ? false : true);
        setSavedMovies(newMoviesList);
      })
      .catch(error => console.log(error))
  }

  function handlePopupMenu() {
    setIsPopupMenu(!isPopupMenu);
  }

  function closePopup() {
    setIsPopupMenu(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {isLoading ? <Preloader /> : (
        <>
          <Header
            onPopupMenu={handlePopupMenu}
            loggedIn={loggedIn}
          />

          <Switch>

            <ProtectedRoute
              path="/movies"
              component={Movies}
              loggedIn={loggedIn}
              savedMovies={savedMovies}
              onLikeClick={handleSaveMovie}
              onDeleteClick={handleDeleteMovie}
              message={message}
            />
            <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              loggedIn={loggedIn}
              list={savedMovies}
              onDeleteClick={handleDeleteMovie}
              message={message}
            />

            <ProtectedRoute
              path="/profile"
              component={Profile}
              loggedIn={loggedIn}
              onSignOut={handleSignOut}
              onUpdate={handleUpdateUser}
              message={message}
            />

            <Route exact path="/">
              <Main />
            </Route>

            <Route path="/signin">
              {loggedIn ? <Redirect to='/movies' /> : <Login onLogin={handleLogin} message={message} loggedIn={loggedIn} />}
            </Route>

            <Route path="/signup">
              {loggedIn ? <Redirect to='/movies' /> : <Register onRegister={handleRegister} message={message} />}
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
      )}

    </CurrentUserContext.Provider >
  );
}