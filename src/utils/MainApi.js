  import { BASE_URL} from './constant';

class Api {
  constructor(config) {
    this.url = config.url;
    this._headers = config.headers;
  }

  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка со статус-кодом ${res.status}`));
  }

  getCardList() {
    return fetch(`${this.url}/cards`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
    })
      .then(res => this._parseResponse(res))
  }

  createCard(card) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
      .then(res => this._parseResponse(res))
  }

  deleteCard(_id) {
    return fetch(`${this.url}/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
    })
      .then(res => this._parseResponse(res))
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.addCardLike(cardId);
    } else {
      return this.removeLikeCard(cardId);
    }
  }

   addCardLike(id) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        ...this._headers,
        Authorization:`Bearer ${localStorage.getItem('jwt')}`
      },
    })
      .then(res => this._parseResponse(res))
  }

  removeLikeCard(id) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
    })
      .then(res => this._parseResponse(res))
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
    })
      .then(res => this._parseResponse(res))
  }

  sendUserInfo(data) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify(data)
    })
      .then(res => this._parseResponse(res))
  }

  editUserAvatar(avatar) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify(avatar)
    })
      .then(res => this._parseResponse(res))
  }
}

const config = {
  url: {BASE_URL},
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
}
const api = new Api(config);
export default api;