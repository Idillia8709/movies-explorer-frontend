import React, { useState, useEffect } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { filterSearchQuery, filterMoviesDuration } from '../../utils/utils';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function SavesMovies({ list, onDeleteClick, isError, onPopupMenu, loggedIn }) {
  const [notFoundMovies, setNotFoundMovies] = useState(false);
  const [query, setQuery] = useState('');
  const [shortMovies, setShortMovies] = useState('off');
  const [filteredMovies, setFilteredMovies] = useState(list);

  function handleSearchSubmit(value) {
    setQuery(value);
    const array = filterSearchQuery(list, query);
    setFilteredMovies(array);
  }

  function handleCheckbox(event) {
    setShortMovies(event.target.value);
  }

  useEffect(() => {
    const movies = filterSearchQuery(list, query);
    setFilteredMovies(shortMovies === 'on' ? filterMoviesDuration(movies) : movies);
    if (query) { movies.lenght === 0 ? setNotFoundMovies(true) : setNotFoundMovies(false) };
  }, [query, shortMovies, list]);

  return (
    <section className="saved-movies">
      <div className="saved-movies__content">
        <Header
          onPopupMenu={onPopupMenu}
          loggedIn={loggedIn}
        />
        <SearchForm
          shortMovies={shortMovies}
          onCheckbox={handleCheckbox}
          onSearchClick={handleSearchSubmit}
          savedMoviesPage={true}
        />
        <MoviesCardList
          list={filteredMovies}
          savedMoviesPage={true}
          onDelete={onDeleteClick}
          isEmptyList={notFoundMovies}
          isError={isError}
        />
      </div>
      <Footer />
    </section>
  )

}