//короткометражки
export function filterMoviesDuration(movies) {
  return (
    movies.filter((movie) => (movie.duration < 40))
  )
}
//все фильмы по запросу
export function filterSearchQuery(movies, query) {
  const key = new RegExp(query, "gi");
  const findedMovies = movies.filter(
    (item) => key.test(item.nameRU) || key.test(item.nameEN)
  );
  return findedMovies;
}

export function checkImageLink(movies) {
  movies.forEach(movie => {
    movie.image.formats.thumbnail.url = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`;
    movie.image = `https://api.nomoreparties.co${movie.image.url}`;

  });
}

export function getSavedMovieCard(arr, id) {
  return arr.find((item) => {
    return item.movieId === id;
  });
}


