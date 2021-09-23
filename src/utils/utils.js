//короткометражки
export function filterMoviesDuration(movies) {
  return (
    movies.filter((movie) => (movie.duration < 40))
  )
}
//все фильмы по запросу
export function filterSearchQuery(movies, query) {
  const moviesByRequest = movies.filter((movie) => {
    const strRU = String(movie.nameRU).toLowerCase();
    const strEN = String(movie.nameEN).toLowerCase();
    const queryLC = query.trim().toLowerCase();
    return (strRU.indexOf(queryLC) !== -1 || strEN.indexOf(queryLC) !== -1);
  });
  return moviesByRequest;
}

export function checkImageLink(movies) {
  console.log('movies', movies);
  movies.forEach(movie => {
      movie.image = `https://api.nomoreparties.co${movie.image.url}`;
      movie.image.formats.thumbnail.url = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`;
  });
}

export function getSavedMovieCard(arr, id) {
  return arr.find((item) => {
    return item.movieId === id;
  });
}


