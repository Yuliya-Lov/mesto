const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_profile-form');
const profileEditForm = document.querySelector('.form_edit_profile');
const userNameProfileInput = document.querySelector('.form__input_value_name');
const userDescriptionProfileInput = document.querySelector('.form__input_value_employment');
const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__button-close');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__self-description');

const cardInititalRender = document.querySelector('#cardRender').content;
const cardPopup = document.querySelector('.popup_add-card-form');
const cardAddForm = document.querySelector('.form_edit_card');
const cardTitleInput = document.querySelector('.form__input_value_title-card');
const cardLinkInput = document.querySelector('.form__input_value_picture-url');
const cardAddButton = document.querySelector('.profile__add-button');
const sectionPlaces = document.querySelector('.places');

const popupOpenPlace = document.querySelector('.popup_view-image');
const imagePopupOpenPlace = document.querySelector('.popup__opened-image');
const titlePopupOpenPlace = document.querySelector('.popup__opened-title');

function closePopupEsc(evt, selectedPopup) {
  if(evt.key === 'Escape') {
    closePopup(selectedPopup);
    document.removeEventListener('keydown', closePopupEsc(selectedPopup, evt));
  }
}

function openPopup(selectedPopup) {
  selectedPopup.classList.add('popup_opened');
  document.addEventListener('keydown', function (evt) {
    closePopupEsc(evt, selectedPopup);
  } );
}

function closePopup(selectedPopup) {
  selectedPopup.classList.remove('popup_opened');
}

popups.forEach(el => {
  el.addEventListener('click', function (evt) {
    if(el === evt.target) {
      closePopup(el);
    }
    }
  )
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
  const profileInputList = [userNameProfileInput, userDescriptionProfileInput];
  profileInputList.forEach((input) => {
    checkInputValidity (profileEditForm, input);
  })
  setButtonState(profileEditForm, profileInputList);
  openPopup(profilePopup);
  }
)

cardAddButton.addEventListener('click', function () {
  cardAddForm.reset();
  const cardInputList = Array.from(cardAddForm.querySelectorAll('.form__input'));
  cardInputList.forEach((input) => {
    hideInputError(cardAddForm, input);
  })
  openPopup(cardPopup);
  }
)

closeButtons.forEach(button => {
  button.addEventListener('click', function (evt) {
    button = evt.target;
    const closestPopup = button.closest('.popup');
    closePopup(closestPopup);
    }
  );
});

profileEditForm.addEventListener('submit', saveProfileInfo);

function addCard(el) {
  sectionPlaces.prepend(el);
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
    deleteClick = event.target;
    const place = deleteClick.closest('.place');
    place.remove();
  })

  newCardImage.addEventListener('click', function () {
    viewImage(newCardImage);
  });

  return newCard;
}

const createCardList = initialCards.forEach(card => {
  createCard(card);
  addCard(createCard(card));
  }
)

function addNewCard(evt) {
  evt.preventDefault();
  const card = {};
  card.name = cardTitleInput.value;
  card.link = cardLinkInput.value;
  createCard(card);
  addCard(createCard(card));
  closePopup(cardPopup);
  cardAddForm.reset();
}

cardAddForm.addEventListener('submit', addNewCard);


