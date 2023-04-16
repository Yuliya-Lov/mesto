export const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_profile-edit');
 const profileEditForm = document.querySelector('.form_type_profile-edit');
const userNameProfileInput = document.querySelector('.form__input_value_name');
const userDescriptionProfileInput = document.querySelector('.form__input_value_employment');
const popups = document.querySelectorAll('.popup');
export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__self-description');
const cardPopup = document.querySelector('.popup_type_add-card');
export const cardAddButton = document.querySelector('.profile__add-button');
const cardAddForm = document.querySelector('.form_type_add-card');
const sectionPlaces = document.querySelector('.places');


export const propertySet = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
}

export  const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Домбай',
    link: './images/dombai.jpg'
  },
  {
    name: 'Машук',
    link: './images/mashuk.jpg'
  },
  {
    name: 'Мурманск',
    link: './images/murmansk.jpg'
  },
  {
    name: 'Санкт-Петербург',
    link: './images/spb.jpg'
  },
  {
    name: 'Сочи',
    link: './images/sochi.jpg'
  },
  {
    name: 'Гамсутль',
    link: './images/gamsutl.jpg'
  }
];

