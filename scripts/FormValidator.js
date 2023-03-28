export default class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._inputSelector = settings.inputSelector;
    this._submitButton = form.querySelector(settings.submitButtonSelector);
    this._inputList = Array.from(form.querySelectorAll(settings.inputSelector));
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }

  _showInputError(evt) {
    const errorElement = this._form.querySelector(`.${evt.target.id}-error`);
    errorElement.classList.add(this._errorClass);
    evt.target.classList.add(this._inputErrorClass);
    errorElement.textContent = evt.target.validationMessage;
  }

  _hideInputError(evt) {
    const errorElement = this._form.querySelector(`.${evt.target.id}-error`);
      errorElement.classList.remove(this._errorClass);
      evt.target.classList.remove(this._inputErrorClass);
      errorElement.textContent = '';
  }

  _checkInputValidity(evt) {
    if(!evt.target.validity.valid) {
      this._showInputError(evt);
    } else {
      this._hideInputError(evt);
    }
  }

  _hasInputsValid () {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    })
  }

  _setButtonState() {
    if (this._hasInputsValid() === true)
    {
      this._submitButton.classList.add( this._inactiveButtonClass);
      this._submitButton.setAttribute('disabled', 'disabled');
    } else {
      this._submitButton.classList.remove( this._inactiveButtonClass);
      this._submitButton.removeAttribute('disabled', 'disabled');
    }
  }

  _setEventListeners() {
    this._setButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', (evt)  => {
        this._checkInputValidity(evt);
        this._setButtonState();
      })
    })
  }

  enableValidation() {
    this._form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      })

    this._setEventListeners();
  }
}