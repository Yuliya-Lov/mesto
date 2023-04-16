export default class UserInfo {
  constructor({ name, description}){
    this._name = name;
    this._description = description;
  }

  getUserInfo(){
    this._userData = {
      userName: this._name,
      userDescrription: this._description
    }
    return this._userData;
  }

  setUserInfo(){
    this.getUserInfo();
    profileName.textContent = this._userData.userName;
    profileDescription.textContent = this._userData.userDescrription;
  }


}
