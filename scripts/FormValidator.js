const propertySet = {
  //formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
}

export class FormValidator {
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
   // console.log(this._form.querySelector(this._inputSelector));
    if(!evt.target.validity.valid) {
      this._showInputError(evt);
      console.log('импут валиден? checkInputValidity' + evt.target.validity.valid);
    } else {
      this._hideInputError(evt);
      console.log('импут валиден? checkInputValidity' + evt.target.validity.valid);
    }
  }

  _hasInputsValid () {
    return this._inputList.some((input) => {
      //console.log('импут валиден? hasInputsValid' + !input.validity.valid);
      return !input.validity.valid;
    })
  }

  _setButtonState() {
    if (this._hasInputsValid() === true)
    {
      //console.log(this._hasInputsValid() === true);
      this._submitButton.classList.add( this._inactiveButtonClass);
      this._submitButton.setAttribute('disabled', 'disabled');
    } else {
      //console.log(this._hasInputsValid() === true);
      this._submitButton.classList.remove( this._inactiveButtonClass);
      this._submitButton.removeAttribute('disabled', 'disabled');
    }
  }

  _setEventListeners() {
    this._setButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', (evt)  => {
       // console.log(inputElement);
        this._checkInputValidity(evt);
        this._setButtonState();
      })
    })
  }

  getInputData() {
    let inputData = {
      one,
      two
    }

    this._inputList.forEach((inputElement) => {
      inputData[inputElement.value];
      });
      console.log(inputData);
  }

  enableValidation() {
    this._form.addEventListener('submit', function (evt) {
        evt.preventDefault();
      })
      this._setEventListeners();
  }
}

/* function showInputError(formElement, inputElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(settings.errorClass);
  inputElement.classList.add(settings. inputErrorClass);
  errorElement.textContent = errorMessage;
} */

/* function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(settings.errorClass);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.textContent = '';
} */

/* function checkInputValidity (formElement, inputElement, settings) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
} */

/* function hasInputsValid (inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  })
} */

/* function setButtonState(inputList, button, settings) {
  if (hasInputsValid(inputList) === true)
  {
    button.classList.add(settings.inactiveButtonClass);
    button.setAttribute('disabled', 'disabled');
  } else {
    button.classList.remove(settings.inactiveButtonClass);
    button.removeAttribute('disabled', 'disabled');
  }
} */

/* function setInitialStateForm(formElement, inputList, button, settings) {
  inputList.forEach((input) => {
    hideInputError(formElement, input, settings);
  })
  setButtonState(inputList, button, settings);
}
 */
/* function setEventListeners(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll( settings.inputSelector));
  const button = formElement.querySelector(settings.submitButtonSelector);
  setButtonState(inputList, button, settings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings);
      setButtonState(inputList, button, settings);
    })
  })
} */

/* function enableValidation(settings) {
  const  formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    })
  setEventListeners(formElement, settings);
  })
}
 */

Array.from(document.forms).forEach((form) => {
  const validatedForm = new FormValidator(propertySet, form);
  validatedForm.enableValidation();
  console.log(validatedForm.getInputData());
})
