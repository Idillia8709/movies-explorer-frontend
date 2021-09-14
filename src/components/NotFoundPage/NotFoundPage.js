import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

export default function NotFoundPage() {
  return (
    <section className="not-found-page">
      <h1 className="not-found-page__status">404</h1>
      <p className="not-found-page__message">Страница не найдена</p>
      <Link to="/" className="not-found-page__back">
        Назад
      </Link>
    </section>
  );
}