import React, { useState, useEffect } from 'react';
import './Movies.css';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { filterMoviesDuration, filterSearchQuery, convertedMovies } from '../../utils/utils';
import moviesApi from '../../utils/MoviesApi';
import Header from '../Header/Header';


export default function Movies({ savedMovies, onLikeClick, onDeleteClick, onPopupMenu, loggedIn }) {
  const filtered = localStorage.getItem('shortMovies') === 'on' ? 'on' : 'off';
  // состояние строки поиска
  const [query, setQuery] = useState('');
  // состояние чекбокса
  const [shortMovies, setShortMovies] = useState(filtered);
  // cостояние отфильтрованного фильма
  const [selectedMovies, setSelectedMovies] = useState([]);
  // состояние фсех фильмов с api
  const [allMovies, setAllMovies] = useState([]);
  // состояние найдено что-то или нет
  const [notFoundMovies, setNotFoundMovies] = useState(false);
  // состояние загрузки фильмов
  const [isMoviesLoaging, setIsMoviesLoaging] = useState(false);
  // состояние оибки
  const [isError, setIsError] = useState(false);


  function handleSetSelectedMovies(movies, query, durationStatus) {
    const list = filterSearchQuery(movies, query);
    setSelectedMovies(durationStatus === 'on' ? filterMoviesDuration(list) : list);
    localStorage.setItem('movies', JSON.stringify(list))
  }

  function handleSearchSubmit(value) {
    setIsMoviesLoaging(true);
    setQuery(value);
    localStorage.setItem('query', value);
    localStorage.setItem('shortMovies', shortMovies);
    if (!allMovies.length) {
      moviesApi.getMovies()
        .then((movies) => {
          const list = convertedMovies(movies);
          setAllMovies(list);
          handleSetSelectedMovies(list, value, shortMovies);
        })
        .catch((error) => {
          setIsError(true);
        })
        .finally(() => setIsMoviesLoaging(false))
    } else {
      handleSetSelectedMovies(allMovies, value, shortMovies);
      setIsMoviesLoaging(false);
    }
  }

  function handleCheckbox(event) {
    setShortMovies(event.target.value);
    localStorage.setItem('shortMovies', event.target.value);
  }

  function handleFilteredMovies(array) {
    if (array.length === 0) {
      setNotFoundMovies(true);
    } else {
      setNotFoundMovies(false);
    }

  }

  useEffect(() => {
    const array = JSON.parse(localStorage.getItem('movies'));
    if (array && !query) {
      setShortMovies(localStorage.getItem('shortMovies'));
      console.log(shortMovies);
      setSelectedMovies(shortMovies === 'on' ? filterMoviesDuration(array) : array);
      handleFilteredMovies(array);
    }
  }, [shortMovies])

  useEffect(() => {
    if (query) {
      console.log("query", query);
      const array = filterSearchQuery(allMovies, query);
      setSelectedMovies(array);
      console.log("selectedMovies", selectedMovies);
      console.log("полученные фильмы", allMovies);
      console.log("выбранные фильмы", selectedMovies);
      handleFilteredMovies(array);
    }
  }, [query, shortMovies, allMovies])


  return (
    <section className="movies">
      <div className="movies__content">
        <Header
          onPopupMenu={onPopupMenu}
          loggedIn={loggedIn}
        />
        <SearchForm
          shortMovies={shortMovies}
          onCheckbox={handleCheckbox}
          onSearchClick={handleSearchSubmit}
        />
        <MoviesCardList
          onLike={onLikeClick}
          onDelete={onDeleteClick}
          savedMovies={savedMovies}
          list={selectedMovies}
          isEmptyList={notFoundMovies}
          isLoading={isMoviesLoaging}
          isError={isError}
        />
      </div>
      <Footer />
    </section>
  )

}