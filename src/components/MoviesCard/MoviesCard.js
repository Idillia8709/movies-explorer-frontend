import React from 'react';
import './MoviesCard.css';

export default function MoviesCard({ card, onLike, onDelete, savedPage, liked }) {

  function handleCardLikeClick() {
    onLike(card);
  }

  function handleCardDeleteClick() {
    onDelete(card);
  }

  function getTimeFromMins(mins) {
    const hours = Math.trunc(mins / 60);
    const minutes = mins % 60;
    return `${hours}ч ${minutes}м`;
  };

  return (
    <>
      <li className="movie-card">
        <a className="movie-card__link" href={card.trailer || card.trailerLink} target='_blank' rel='noreferrer'>
          <img className="movie-card__image" src={card.image} alt={card.nameRu} />
        </a>
        <div className="movie-card__container">
          <div className="movie-card__description">
            <h3 className="movie-card__title">{card.nameRU}</h3>
            <button
              type="button"
              className={`movie__button
            ${savedPage ? 'movie__delete-button' : 'movie__save-button'} 
            ${liked && !savedPage ? 'movie__save-button_type_active' : null}`}
            onClick={savedPage || liked ? handleCardDeleteClick : handleCardLikeClick}
            >
            </button>
          </div>
          <p className="movie-card__duration">{getTimeFromMins(card.duration)}</p>
        </div>
      </li>
    </>
  )
}