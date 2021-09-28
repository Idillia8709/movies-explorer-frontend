import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
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
  const [isError, setIsError] = useState(false);
  const [isPopupMenu, setIsPopupMenu] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    Promise.all([mainApi.getUserInfo(), mainApi.getUserMovies()])
      .then(([user, movies]) => {
        handleLoggedIn();
        setCurrentUser(user);
        const list = movies.filter(
          (item) => item.owner._id === user._id
        );
        localStorage.setItem('savedMovies', list);
        setSavedMovies(list);
        setIsError(false);
        history.push("/movies");
      })
      .catch((error) => {
        history.push("/");
        setIsError(true);
        console.log(error);
      })
  }, [loggedIn, history])

  function handleLoggedIn() {
    setLoggedIn(true);
  };

  function handleLoggedOut() {
    setLoggedIn(false);
  };

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
      .then(() => {
        setMessage('');
        handleLoggedIn();
        history.push('/movies');
        return loggedIn;

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
        setMessage('Данные пользователя успешно обновлены');
        setCurrentUser(user);
      })
      .catch(error => {
        if (error === 409) {
          setMessage("Пользователь с таким email уже существует");
        } else {
          setMessage("При изменении данных профиля произошла ошибка");
        }
      })

  }

  function deleteCurrentUser(params) {
    setCurrentUser({});
  }

  function handleSignOut() {
    mainApi.signout()
      .then(() => {
        localStorage.clear();
        setMessage('');
        handleLoggedOut();
        deleteCurrentUser();
        setSavedMovies([]);
        history.push('/');
      })
      .catch(error => console.log(error))
  }

  function handleSaveMovie(movie) {
    mainApi.saveMovie(movie)
      .then((newCard) => {
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
          <Switch>
            <ProtectedRoute
              onPopupMenu={handlePopupMenu}
              loggedIn={loggedIn}
              path="/movies"
              component={Movies}
              savedMovies={savedMovies}
              onLikeClick={handleSaveMovie}
              onDeleteClick={handleDeleteMovie}
              message={message}
            />
            <ProtectedRoute
              onPopupMenu={handlePopupMenu}
              loggedIn={loggedIn}
              path="/saved-movies"
              component={SavedMovies}
              list={savedMovies}
              onDeleteClick={handleDeleteMovie}
              message={message}
              isError={isError}
            />
            <ProtectedRoute
              onPopupMenu={handlePopupMenu}
              path="/profile"
              component={Profile}
              loggedIn={loggedIn}
              onSignOut={handleSignOut}
              onUpdate={handleUpdateUser}
              message={message}
            />
            <Route exact path="/">
              <Main
                onPopupMenu={handlePopupMenu}
                loggedIn={loggedIn}
              />
            </Route>

            <Route path="/signin">
              <Login onLogin={handleLogin} message={message} loggedIn={loggedIn} />
            </Route>

            <Route path="/signup">
              <Register onRegister={handleRegister} message={message} />
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