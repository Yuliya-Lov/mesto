import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitAction){
    super(popupSelector);
    this._submitAction = submitAction;
    this._popupForm = this._popup.querySelector('form');
    this._popupInputList = this._popup.querySelectorAll('input');
    this._popupSubmitButton = this._popup.querySelector('button');
  }

  _getInputValues(){
    const inputValues = {};
    Array.from(this._popupInputList).forEach((input) => {
      inputValues[input.id] = input.value;
    })

    return inputValues;
  }

  setInitialInputValues(valuesArray){
    console.log(this._popupInputList);
    Array.from(this._popupInputList).forEach((input,index) => {
      console.log(input, index);
      input.value = valuesArray[index];
    })
  }

  setEventListeners(){
    console.log('setEventListeners');
    super.setEventListeners();
    this._popupForm.addEventListener('submit', () => {
      console.log("недописано");
      this._getInputValues();
      this._submitAction(this._getInputValues());
      this.close();
    } );
  }

  close(){
    super.close();
    window.setTimeout(() => {this._popupForm.reset()}, 800);
  }
}
