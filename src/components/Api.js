export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _isResponseOk(res){
     return res.ok
    ? res.json()
    : Promise.reject(res.status);
  }

  getUserInfo(){
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(res => this._isResponseOk(res))
  }

  editUserInfo(bodyInfo){
    return  fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: bodyInfo[0],
        about: bodyInfo[1]
      })
    })
    .then(res => this._isResponseOk(res))
  }

  editUserPhoto(newAvatar){
    return  fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatar,
      })
    })
    .then(res => this._isResponseOk(res))
  }

  getInitialCards() {
    return  fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(res => this._isResponseOk(res))
  }

  addCard(cardObj){
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(cardObj)
    })
    .then(res => this._isResponseOk(res))
  }

  removeCard(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}`,{
      method:'DELETE',
      headers: this._headers
    })
    .then(res => this._isResponseOk(res))
  }

  pushLike(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`,{
      method:'PUT',
      headers: this._headers
    })
    .then(res => this._isResponseOk(res))
  }

  removeLike(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`,{
      method:'DELETE',
      headers: this._headers
    })
    .then(res => this._isResponseOk(res))
  }
}
