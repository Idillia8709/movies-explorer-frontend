import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies(props) {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList list={props.list} />
    </section>
  )

}