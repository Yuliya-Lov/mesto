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
    return  fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatar,
        }
      )
    })
    .then(res =>  {
      if(res.ok){
         return res.json();
      } else {
        return Promise.reject(res.status);
      }
      })
    .catch(err => console.error('Ошибка привыполнении запроса:', err));
  }


  getInitialCards() {
  return  fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(res =>  {
      if(res.ok){
         return res.json();
      } else {
        return Promise.reject(res.status);
      }
      })
    .catch(err => console.error('Ошибка привыполнении запроса:', err));
  }

  addCard(cardObj){
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(cardObj)
    })
    .then(res =>  {
      if(res.ok){
         return res.json();
      } else {
        return Promise.reject(res.status);
      }
      })
    .catch(err => console.error('Ошибка привыполнении запроса:', err));
  }

  removeCard(cardId){
    console.log(`${this._baseUrl}/cards/${cardId}`);
    return fetch(`${this._baseUrl}/cards/${cardId}`,{
      method:'DELETE',
      headers: this._headers
    })
    .then(res =>  {
      if(res.ok){
         return true;
      } else {
        return Promise.reject(res.status);
      }
      })
    .catch(err => console.error('Ошибка привыполнении запроса:', err));
  }
}


