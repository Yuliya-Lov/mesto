function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add('form__input-error_active');
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove('form__input-error_active');
  inputElement.classList.remove('form__input_type_error');
  errorElement.textContent = '';
}

function checkInputValidity (formElement, inputElement) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  setButtonState(formElement, inputList);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      setButtonState(formElement, inputList);
    });
  });
};

function hasInputsValid (inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
    }
  )
}

function setButtonState(formElement, inputList) {
  const button = formElement.querySelector('.form__submit-button');
  if (hasInputsValid(inputList) === true)
  {
    button.classList.add('form__submit-button_disabled');
    button.setAttribute('disabled', 'disabled');
  } else {
    button.classList.remove('form__submit-button_disabled');
    button.removeAttribute('disabled', 'disabled');
  }
}

function enableValidation() {
  const  formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    })
  setEventListeners(formElement);
  })
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
});
