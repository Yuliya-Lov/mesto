import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitAction){
    super(popupSelector);
    this._submitAction = submitAction;
    this._popupForm = this._popup.querySelector('.form');
    this._popupInputList = this._popup.querySelectorAll('.form__input');
    this._popupSubmitButton = this._popup.querySelector('.form__submit-button');
  }

  _getInputValues(){
    const inputValues = {};
    Array.from(this._popupInputList).forEach((input) => {
      inputValues[input.id] = input.value;
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
      this._submitAction(this._getInputValues());
      this.close();
    } );
  }

  close(){
    super.close();
    window.setTimeout(() => {this._popupForm.reset()}, 800);
  }
}
