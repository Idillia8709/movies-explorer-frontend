import { BASE_URL } from './constant';

class MainApi {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
    this._profileUrl = `${this._url}/users/me`;
    this._moviesUrl = `${this._url}/movies`;
    this._token = this._headers['authorization'];
  }

  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  getUserInfo() {
    return fetch(this._profileUrl, {
      method: 'GET',
      credentials: 'include',
      headers: {
        ...this._headers,
        authorization: this._token,
      }
    })
      .then((res) => this._parseResponse(res))
  }

  sendUserInfo(name, email) {
    return fetch(this._profileUrl, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        ...this._headers,
        authorization: this._token,
      },
      body: JSON.stringify({
        name,
        email
      })
    })
      .then((res) => this._parseResponse(res))
  }

  register(name, email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        ...this._headers,
      },
      body: JSON.stringify({
        name,
        email,
        password,
      })
    })
      .then((res) => this._parseResponse(res))
  }

  login(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        ...this._headers,
      },
      body: JSON.stringify({
        email,
        password,
      })
    })
      .then((res) => this._parseResponse(res))
  }

  signout() {
    return fetch(`${this._url}/signout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        ...this._headers,
        authorization: this._token,
      }
    })
    // .then((res) => this._parseResponse(res))
  }

  getUserMovies() {
    return fetch(this._moviesUrl, {
      method: 'GET',
      credentials: 'include',
      headers: {
        ...this._headers,
        authorization: this._token,
      }
    })
      .then((res) => this._parseResponse(res))
  }

  saveMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    id,
    thumbnail
  }) {
    return fetch(this._moviesUrl, {
      method: 'POST',
      credentials: 'include',
      headers: {
        ...this._headers,
        authorization: this._token,
      },
      body: JSON.stringify({
        country: country || 'no country',
        director,
        duration,
        year,
        description,
        image,
        trailer,
        nameRU: nameRU || 'no name',
        nameEN: nameEN || 'no name',
        thumbnail,
        movieId: id,
      })
    })
      .then((res) => this._parseResponse(res))
  }

  deleteMovie(movieId) {
    return fetch(`${this._moviesUrl}/${movieId}`, {
      method: 'DElETE',
      credentials: 'include',
      headers: {
        ...this._headers,
        authorization: this._token,
      }
    })
      .then((res) => this._parseResponse(res))
  }

}

const config = {
  url: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
}
const mainApi = new MainApi(config);
export default mainApi;