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

export function convertedMovies(movies) {
  return movies.map((movie) => {
    return {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      trailer: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      id: movie.id,
      image: `https://api.nomoreparties.co${movie.image.url}`,
    };
  
  });
}

export function getSavedMovieCard(arr, id) {
  return arr.find((item) => {
    return item.movieId === id;
  });
}


