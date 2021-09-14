import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import More from '../More/More';
import Footer from '../Footer/Footer';

export default function MoviesCardList(props) {
  return (
    <>
    <section className="movies-list">
      <ul className="movie-list__container">
      {props.list.map((item) => (
          <MoviesCard
            key={item.movieId}
            card={item}
            savedPage={props.savedMoviesPage}
          />)
        )}
      </ul>
    </section>
     <More />
     <Footer />
     </>
      )
}
