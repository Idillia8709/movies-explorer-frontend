import React, { useState, useEffect } from 'react';
import './Movies.css';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { filterMoviesDuration, filterSearchQuery, checkImageLink } from '../../utils/utils';
import moviesApi from '../../utils/MoviesApi';


export default function Movies({ savedMovies, onLikeClick, onDeleteClick }) {
  const filtered = localStorage.getItem('shortMovies') === 'on' ? 'on' : 'off';

  const [query, setQuery] = useState('');
  const [shortMovies, setShortMovies] = useState(filtered);

  const [selectedMovies, setSelectedMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);

  const [notFoundMovies, setNotFoundMovies] = useState(false);
  const [isMoviesLoaging, setIsMoviesLoaging] = useState(false);
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
          // checkImageLink(movies);
          setAllMovies(movies);
          setIsError('');
          handleSetSelectedMovies(movies, value, shortMovies);
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

  useEffect(() => {
    const array = JSON.parse(localStorage.getItem('movies'));
    if (array && !query) {
      console.log('allMovies', allMovies);
      setShortMovies(localStorage.getItem('shortMovies'));
      setSelectedMovies(shortMovies === 'on' ? filterMoviesDuration(array) : array);
      if (array.length === 0) {
        setNotFoundMovies(true);
      } else {
        setNotFoundMovies(false);
      }
    }
  }, [shortMovies, query, allMovies])

  useEffect(() => {
    if (query) {
      const array = filterSearchQuery(allMovies, query);
      setSelectedMovies(array);
      if (array.length === 0) {
        setNotFoundMovies(true);
      } else {
        setNotFoundMovies(false);
      }
    }
  }, [query, shortMovies, allMovies])

  useEffect(() => {

  })

  

  return (
    <>
      <section className="movies">
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
      </section>
      <Footer />
    </>
  )

}