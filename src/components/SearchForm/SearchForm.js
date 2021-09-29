import React, { useState, useEffect } from 'react';
import './SearchForm.css';

export default function SearchForm({ onSearchClick, onCheckbox, shortMovies, savedMoviesPage }) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [formValid, setFormValid] = React.useState(false);

  function handleChange(event) {
    const str = event.target.value;
    if (str.lenght === 0) {
      setError('Нужно ввести ключевое слово');
    } else {
      setError('');
      setQuery(str);
    }
  }
  function handleSubmit(event) {
    event.preventDefault();
    setError('');
    onSearchClick(query);
    setQuery('');
  }

  useEffect(() => {
    if (query && !error) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [query, error]);

  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit}>
        <div className="search-form__container">
          <div className="search-form__search">
            <input
              className="search-form__input"
              type="text"
              name='query'
              placeholder="Фильм"
              required
              onChange={handleChange}
            />
            <button className={`search-form__submit ${!formValid ? 'search-form__submit_disabled' : ''}`} type="submit" disabled={!formValid}>Найти</button>
          </div>
          <span id='email-error' className='search-form__error'>{error}</span>
        </div>
        <div className="seach-form__filter-container">
          <label className={`search-form__filter
          ${shortMovies === 'on' ? 'search-form__filter_type_active' : null}`
          }>
            <input className="search-form__radio-button search-form__radio-button_type_off"
              type="radio"
              name="filterFilms"
              value="off"
              checked={shortMovies === "off" ? true : false}
              onChange={onCheckbox}
            />
            <input className="search-form__radio-button search-form__radio-button_type_on"
              type="radio"
              name="filterFilms"
              value="on"
              checked={shortMovies === "on" ? true : false}
              onChange={onCheckbox}
            />
            <span className='search-form__switch'></span>
          </label>
          <p className="search-form__name">Короткометражки</p>
        </div>
      </form>
    </section>
  )
}