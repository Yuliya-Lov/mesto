const propertySet = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
}

function showInputError(formElement, inputElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(settings.errorClass);
  inputElement.classList.add(settings. inputErrorClass);
  errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(settings.errorClass);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.textContent = '';
}

function checkInputValidity (formElement, inputElement, settings) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
}

function setEventListeners(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll( settings.inputSelector));
  setButtonState(formElement, inputList, settings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings);
      setButtonState(formElement, inputList, settings);
    });
  });
};

function hasInputsValid (inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
    }
  )
}

function setButtonState(formElement, inputList, settings) {
  const button = formElement.querySelector(settings. submitButtonSelector);
  if (hasInputsValid(inputList) === true)
  {
    button.classList.add(settings.inactiveButtonClass);
    button.setAttribute('disabled', 'disabled');
  } else {
    button.classList.remove(settings.inactiveButtonClass);
    button.removeAttribute('disabled', 'disabled');
  }
}

function enableValidation(settings) {
  const  formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    })
  setEventListeners(formElement, settings);
  })
}

enableValidation(propertySet);
