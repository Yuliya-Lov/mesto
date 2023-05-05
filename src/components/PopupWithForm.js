import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitAction){
    super(popupSelector);
    this._submitAction = submitAction;
    this._popupForm = this._popup.querySelector('.form');
    this._popupInputList = this._popup.querySelectorAll('.form__input');
    this.popupSubmitButton = this._popup.querySelector('.form__submit-button');
    this._popupSubmitButtonDefaultText = this.popupSubmitButton.textContent;
  }

  _loadingView(isLoading){
    if (isLoading){
      this.popupSubmitButton.textContent = "Сохранение...";
    } else {
      this.popupSubmitButton.textContent = this._popupSubmitButtonDefaultText;
    }
   }

  getInputValues(){
    const inputValues = {};
    Array.from(this._popupInputList).forEach((input, index) => {
      inputValues[index] = input.value;
    })
    return inputValues;
  }

  setInitialInputValues(valuesObj){
    Array.from(this._popupInputList).forEach((input,index) => {
      input.value = Object.values(valuesObj)[index];
    })
  }

  setEventListeners(){
    super.setEventListeners();
    this._popupForm.addEventListener('submit', () => {
      this._loadingView(true);
      this._submitAction(this.getInputValues());
      setTimeout(() => {
        this._loadingView(false);
      }
      , 700)
    } );
  }

  close(){
    super.close();
    window.setTimeout(() => {this._popupForm.reset()}, 800);
  }
}
