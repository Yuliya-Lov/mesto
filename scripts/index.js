import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards, propertySet} from './constants.js';
export const popupOpenPlace = document.querySelector('.popup_type_view-image');
export const imagePopupOpenPlace = document.querySelector('.popup__opened-image');
export const titlePopupOpenPlace = document.querySelector('.popup__opened-title');

const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_profile-edit');
const profileEditForm = document.querySelector('.form_type_profile-edit');
const userNameProfileInput = document.querySelector('.form__input_value_name');
const userDescriptionProfileInput = document.querySelector('.form__input_value_employment');
const popups = document.querySelectorAll('.popup');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__self-description');
const cardPopup = document.querySelector('.popup_type_add-card');
const cardAddButton = document.querySelector('.profile__add-button');
const cardAddForm = document.querySelector('.form_type_add-card');
const sectionPlaces = document.querySelector('.places');

function addCard (data) {
  const newCard = new Card(data, '#cardRender');
  sectionPlaces.prepend(newCard.generateCard());
}

initialCards.forEach((current) => {addCard(current)});

let arrayFormValidatorObjects = [];
Array.from(document.forms).forEach((form) => {
  const validatedForm = new FormValidator(propertySet, form);
  arrayFormValidatorObjects.push(validatedForm);
  validatedForm.enableValidation();
})

function closePopupEsc(evt) {
  if(evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

export function openPopup(selectedPopup) {
  selectedPopup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(selectedPopup) {
  selectedPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

popups.forEach(popup => {
  popup.addEventListener('click', function (evt) {
    if(popup === evt.target || evt.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    }
  })
})

function saveProfileInfo() {
  profileName.textContent = userNameProfileInput.value;
  profileDescription.textContent = userDescriptionProfileInput.value;
  closePopup(profilePopup);
}

profileEditButton.addEventListener('click', function () {
  profileEditForm.reset();
  userNameProfileInput.value =  profileName.textContent;
  userDescriptionProfileInput.value = profileDescription.textContent;
  arrayFormValidatorObjects[0].setInitialFormState();
  openPopup(profilePopup);
  }
)

profileEditForm.addEventListener('submit', saveProfileInfo);

cardAddButton.addEventListener('click', function () {
  cardAddForm.reset();
  arrayFormValidatorObjects[1].setInitialFormState();
  openPopup(cardPopup);
  }
)

function getAditionalCard () {
  const additionalData = {
    name: cardAddForm.querySelector('#card-title-input').value,
    link: cardAddForm.querySelector('#card-url-input').value
  }
  addCard (additionalData);
}

cardAddForm.addEventListener('submit', function() {
  getAditionalCard();
  closePopup(cardPopup);
});
