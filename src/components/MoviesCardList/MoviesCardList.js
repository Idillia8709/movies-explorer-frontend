import React, { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { useWindowWidth } from '../../utils/useWindowsWidth';
import { getSavedMovieCard } from '../../utils/utils';


export default function MoviesCardList({
  list,
  onLike,
  onDelete,
  savedMovies,
  savedMoviesPage,
  isLoading,
  isEmptyList,
  isError
}) {

  const width = useWindowWidth();
  const [displayList, setDisplayList] = useState([]);
  const [paramsDisplay, setParamsDisplay] = useState({ sum: 0, more: 0 });
  const [isMount, setIsMount] = React.useState(true);

  useEffect(() => {
    if (width >= 1280) {
      setParamsDisplay({ sum: 12, more: 4 });
    } else if (width < 1280 && width > 768) {
      setParamsDisplay({ sum: 12, more: 3 });
    } else if (width <= 768 && width > 620) {
      setParamsDisplay({ sum: 8, more: 2 });
    } else if (width <= 619) {
      setParamsDisplay({ sum: 5, more: 2 });
    }
    return () => setIsMount(false);
  }, [width, isMount]);

  useEffect(() => {
    if (list.length && !savedMoviesPage) {
      const res = list.filter((item, index) => index < paramsDisplay.sum);
      setDisplayList(res);
    }
  }, [list, savedMoviesPage, paramsDisplay.sum]);

  function handleClickMore() {
    const start = displayList.length;
    const end = start + paramsDisplay.more;
    const range = list.length - start;
    if (range > 0) {
      const newMovies = list.slice(start, end);
      setDisplayList([...displayList, ...newMovies]);
    }
  }

  function getSavedMoviesList() {
    console.log('list', list);
    return list.map((item) => (
      <MoviesCard
        key={item._id} {...item}
        card={item}
        savedPage={savedMoviesPage}
        onDelete={onDelete}
      />
    
    ))
  }

  function getMoviesList() {
    console.log(displayList);
    return displayList.map((item) => {
      // console.log('item', item);
      const likedMovieCard = getSavedMovieCard(savedMovies, item.id);
      const likedMovieId = likedMovieCard ? likedMovieCard._id : null;
      return (
        <MoviesCard
          key={item._id} {...item}
          card={{ ...item, _id: likedMovieId }}
          onDelete={onDelete}
          onLike={onLike}
          liked={likedMovieCard ? true : false}
        />)
    })
  }

  return (
    <section className="movies-list">
      {isLoading ?
        (<Preloader />) :
        (isEmptyList || isError ? (
          <p className={`movies-list__message movies-list__message_type_err`}>
            {isError ? `Во время запроса произошла ошибка. 
              Возможно, проблема с соединением или сервер недоступен.
              Подождите немного и попробуйте ещё раз.` : 'Ничего не найдено'}
          </p>) : (
          <>
            <ul className="movie-list__container">
              {savedMoviesPage ? getSavedMoviesList() : getMoviesList()}
            </ul>
            <div className="movie-list__more">
              <button className={`movie-list__more-button ${(savedMoviesPage || isEmptyList || displayList.length === list.length)
                && `movie-list__more-button_hidden`}`} type="button" onClick={handleClickMore}>
                Ещё
              </button>
            </div>
          </>
        )
        )}

    </section>
  )
}



