import Popup from './Popup.js';

export default class PopupWithConfirm  extends Popup{
  constructor(popupSelector, handleSubmitClick){
    super(popupSelector);
    this.popupSubmitButton = this._popup.querySelector('.form__submit-button');
    this._handleSubmitClick = handleSubmitClick;
    this._popupSubmitButtonDefaultText = this.popupSubmitButton.textContent;

  }

  _loadingView(isLoading){
    if (isLoading){
      this.popupSubmitButton.textContent = "Сохранение...";
    } else {
      this.popupSubmitButton.textContent = this._popupSubmitButtonDefaultText;
    }
  }

  setObjId(id){
    this.objId = id;
    return  this.objId;
  }


  setEventListeners(){
    super.setEventListeners();
    this.popupSubmitButton.addEventListener('click', () => {
      this._loadingView(true);
      this._handleSubmitClick(this.objId);
      setTimeout(() => {
        this.close();
        this._loadingView(false);
      }
      , 500)
    })
  }
}
