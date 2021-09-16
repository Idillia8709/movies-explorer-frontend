import React, { useState } from 'react';
import './SearchForm.css';

export default function SearchForm() {
  const [filterFilm, setFilterFilm] = useState('on');

  function changeHandler(event) {
    setFilterFilm(event.target.value);
  }

  return (
    <section className="search-form">
      <form className="search-form__form" noValidate>
        <div className="search-form__search">
        <input
          className="search-form__input"
          type="text"
          placeholder="Фильм"
          minLength="2"
          maxLength="40"
          required
        />
        <button className="search-form__submit" type="submit">Найти</button>
        </div>
        <div className="seach-form__filter-container">
          <label className={`search-form__filter
          ${filterFilm === 'on' ? 'search-form__filter_type_active' : null}`
          }>
            <input className="search-form__radio-button search-form__radio-button_type_off"
              type="radio"
              name="filterFilms"
              value="off"
              checked={filterFilm === "off" ? true : false}
              onChange={changeHandler}
            />
            <input className="search-form__radio-button search-form__radio-button_type_on"
              type="radio"
              name="filterFilms"
              value="on"
              checked={filterFilm === "on" ? true : false}
              onChange={changeHandler}
            />
            <span className='search-form__switch'></span>
          </label>
          <p className="search-form__name">Короткометражки</p>
        </div>
      </form>
    </section>
  )
}