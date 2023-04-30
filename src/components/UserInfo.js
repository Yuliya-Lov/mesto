export default class UserInfo {
  constructor({userNameSelector, userDescriptionSelector, userPhotoSelector}){
    this._name = document.querySelector(userNameSelector);
    this._description = document.querySelector(userDescriptionSelector);
    this._photo = document.querySelector(userPhotoSelector);
  }

  getUserInfo(){
    this._userData = {
      'name': this._name.textContent,
      'description': this._description.textContent
    }
    return this._userData;
  }

  setUserInfo(data){
    this._name.textContent = data.name;
    this._description.textContent = data.about;
  }

  setAvatar(data){
    this._photo.setAttribute('src', data.avatar);
  }
}
