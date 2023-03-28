import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards, propertySet} from './constants.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_profile-form');
const profileEditForm = document.querySelector('.form_edit_profile');
const userNameProfileInput = document.querySelector('.form__input_value_name');
const userDescriptionProfileInput = document.querySelector('.form__input_value_employment');
const popups = document.querySelectorAll('.popup');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__self-description');
const cardPopup = document.querySelector('.popup_add-card-form');
const cardAddButton = document.querySelector('.profile__add-button');
const cardAddForm = document.querySelector('.form_edit_card');
const sectionPlaces = document.querySelector('.places');

initialCards.forEach((current) => {
  const newCard = new Card(current, '#cardRender');
  document.querySelector('.places').prepend(newCard.generateCard());
})

function closePopupEsc(evt) {
  if(evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

export function openPopup(selectedPopup) {
  const validatedForm = new FormValidator(propertySet, selectedPopup.querySelector('form'));
  validatedForm.enableValidation();
  selectedPopup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(selectedPopup) {
  selectedPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc)
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
  userDescriptionProfileInput.value =  profileDescription.textContent;
  openPopup(profilePopup);
  }
)

profileEditForm.addEventListener('submit', saveProfileInfo);

cardAddButton.addEventListener('click', function () {
  cardAddForm.reset();
  openPopup(cardPopup);
  }
)

function getAditionalCard () {
  const additionalData = {
    name: cardAddForm.querySelector('#card-title-input').value,
    link: cardAddForm.querySelector('#card-url-input').value
  }
  const additionalCard  = new Card(additionalData, '#cardRender');
  sectionPlaces.prepend(additionalCard.generateCard());
}

cardAddForm.addEventListener('submit', function() {
  getAditionalCard();
  closePopup(cardPopup);
});
