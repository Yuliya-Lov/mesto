export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo(){
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(res => res.json())
  }

  editUserInfo(bodyInfo){
    return  fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: bodyInfo[0],
        about: bodyInfo[1]
        }
      )
    })
    .then(res => res.json())
  }

  editUserPhoto(newAvatar){
    return  fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatar,
        }
      )
    })
    .then(res => res.json())
  }

  getInitialCards() {
    console.log( this._baseUrl, this._headers )
    fetch(this._baseUrl, {
      headers: this._headers
    })
    .then(res => res.json())
    .then(data => console.log(data))

        // если ошибка, отклоняем промис

  }

  // другие методы работы с API
}


