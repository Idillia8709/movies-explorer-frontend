import { MOVIES_URL } from './constant';

class MoviesApi {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  getMovies() {
    return fetch(`${this._url}`, {
      method: 'GET',
      headers: this._headers,
    })
    .then((res) => this._parseResponse(res))
  }
}

const config = {
  url: MOVIES_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
}
const moviesApi = new MoviesApi(config);
export default moviesApi;