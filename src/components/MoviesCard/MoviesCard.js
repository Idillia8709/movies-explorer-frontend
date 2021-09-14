import React from 'react';
import './MoviesCard.css';

export default function MoviesCard(props) {

  return (
    <>
    <li className="movie-card">
      <img className="movie-card__image" src={props.card.image} alt={props.card.nameRu} />
      <div className="movie-card__container">
        <div className="movie-card__description">
          <h3 className="movie-card__title">{props.card.nameRU}</h3>
          <button
            type="button"
            className={`movie__button
            ${props.savedPage ? 'movie__delete-button' : 'movie__save-button'} 
            ${props.card.owner === 1 && !props.savedPage ? 'movie__save-button_type_active' : null}`}
            >
          </button>
        </div>
        <p className="movie-card__duration">{props.card.duration}</p>
      </div>
    </li>
    </>
  )
}