import Card from './Card.js';
import * as valid from './FormValidator.js';
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_profile-form');
const profileEditForm = document.querySelector('.form_edit_profile');
const userNameProfileInput = document.querySelector('.form__input_value_name');
const userDescriptionProfileInput = document.querySelector('.form__input_value_employment');
const profileInputList = [userNameProfileInput, userDescriptionProfileInput];
const popups = document.querySelectorAll('.popup');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__self-description');
const buttonSubmitProfileForm = profileEditForm.querySelector('.form__submit-button');
const cardPopup = document.querySelector('.popup_add-card-form');
const cardAddForm = document.querySelector('.form_edit_card');
const cardInputList = Array.from(cardAddForm.querySelectorAll('.form__input'));
const cardAddButton = document.querySelector('.profile__add-button');
export const sectionPlaces = document.querySelector('.places');
const buttonSubmitCardForm = cardAddForm.querySelector('.form__submit-button');


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
  document.removeEventListener('keydown', closePopupEsc)
}

popups.forEach(popup => {
  popup.addEventListener('click', function (evt) {
    if(popup === evt.target || evt.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    }
  })
})

function saveProfileInfo(evt) {
  evt.preventDefault();
  profileName.textContent = userNameProfileInput.value;
  profileDescription.textContent = userDescriptionProfileInput.value;
  closePopup(profilePopup);
}

profileEditButton.addEventListener('click', function () {
  profileEditForm.reset();
  userNameProfileInput.value =  profileName.textContent;
  userDescriptionProfileInput.value =  profileDescription.textContent;
 //setInitialStateForm(profileEditForm, profileInputList, buttonSubmitProfileForm, propertySet)
  openPopup(profilePopup);
  }
)

profileEditForm.addEventListener('submit', saveProfileInfo);

cardAddButton.addEventListener('click', function () {
  cardAddForm.reset();
  //setInitialStateForm(cardAddForm, cardInputList, buttonSubmitCardForm, propertySet);
  openPopup(cardPopup);
  }
)

cardAddForm.addEventListener('submit', function() {
  //evt.preventDefault();
  const additionalData = {
    name: cardTitleInput.value,
    link: cardLinkInput.value
  }

  const additionalCard  = new Card(additionalData, '#cardRender');
  sectionPlaces.prepend(additionalCard);
});


/* function addCard(cardContainer, cardElement) {
  cardContainer.prepend(cardElement);
}

function viewImage(image) {
  const place = image.closest('.place');
  openPopup(popupOpenPlace);
  imagePopupOpenPlace.setAttribute('src', image.src);
  imagePopupOpenPlace.setAttribute('alt', image.alt);
  titlePopupOpenPlace.textContent = place.querySelector('.place__title').textContent;
}

function createCard(card) {
  const newCard = cardInititalRender.cloneNode(true);
  const newCardTitle = newCard.querySelector('.place__title');
  const newCardImage = newCard.querySelector('.place__image');
  newCardTitle.textContent = card.name;
  newCardImage.setAttribute('src', card.link);
  newCardImage.setAttribute('alt', card.name);
  const likeButton = newCard.querySelector('.place__like-button');
  const deleteButton = newCard.querySelector('.place__delete-button');

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('place__like-button_active');
  })

  deleteButton.addEventListener('click', (evt) => {
    const place = evt.target.closest('.place');
    place.remove();
  })

  newCardImage.addEventListener('click', function () {
    viewImage(newCardImage);
  })
  return newCard;
}

const createCardList = initialCards.forEach(card => {
  createCard(card);
  addCard(sectionPlaces,createCard(card));
  }
)

function addNewCard(evt) {
  evt.preventDefault();
  const card = {};
  card.name = cardTitleInput.value;
  card.link = cardLinkInput.value;
  createCard(card);
  addCard(sectionPlaces, createCard(card));
  closePopup(cardPopup);
  cardAddForm.reset();
}

cardAddForm.addEventListener('submit', addNewCard);
 */
