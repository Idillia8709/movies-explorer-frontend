import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavesMovies(props) {
  const savedList = props.list.filter((item) => !item.owner);
  return (
    <>
    <section className="saved-movies">
      <SearchForm />
      <MoviesCardList list={savedList} savedMoviesPage={true} />
    </section>
    </>
  )

}