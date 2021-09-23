import React from 'react';
import { useHistory } from 'react-router-dom';
import './NotFoundPage.css';

export default function NotFoundPage() {
  const history = useHistory();

  function handleClick() {
    history.goBack();
  }
  return (
    <section className="not-found-page">
      <h1 className="not-found-page__status">404</h1>
      <p className="not-found-page__message">Страница не найдена</p>
      <button onClick={handleClick} className="not-found-page__back">
        Назад
      </button>
    </section>
  );
}