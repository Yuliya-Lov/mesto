const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('#profilePopup');
const profileEditForm = document.querySelector('[name="editProfileForm"]');
const userNameProfileInput = document.querySelector('.edit-form__input_value_name');
const userDescriptionProfileInput = document.querySelector('.edit-form__input_value_description');
const closeButtons = document.querySelectorAll('.popup__button-close');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__self-description');

const cardInititalRender = document.querySelector('#cardRender').content;
const cardPopup = document.querySelector('#cardPopup');
const cardAddForm = document.querySelector('[name="cardForm"]');
const cardTitleInput = document.querySelector('[name="cardTitleInput"]');
const cardLinkInput = document.querySelector('[name="cardLinkInput"]');
const cardAddButton = document.querySelector('.profile__add-button');
const sectionPlaces = document.querySelector('.places');

const popupOpenPlace = document.querySelector('#imagePopup');
const imagePopupOpenPlace = document.querySelector('.popup__opened-image');
const titlePopupOpenPlace = document.querySelector('.popup__opened-title');

function openPopup(selectedPopup) {
  selectedPopup.classList.add('popup_opened');
}

function closePopup(selectedPopup) {
  selectedPopup.classList.remove('popup_opened');
}

function saveProfileInfo(evt) {
  evt.preventDefault();
  profileName.textContent = userNameProfileInput.value;
  profileDescription.textContent = userDescriptionProfileInput.value;
  closePopup(profilePopup);
}

profileEditButton.addEventListener('click', function () {
  openPopup(profilePopup);
  userNameProfileInput.value =  profileName.textContent;
  userDescriptionProfileInput.value =  profileDescription.textContent;
  }
)

cardAddButton.addEventListener('click', function () {
  openPopup(cardPopup);
  }
)

closeButtons.forEach(button => {
  button.addEventListener('click', function (evt) {
    button = evt.target;
    const closestPopup = button.closest('.popup');
    const closestForm = closestPopup.querySelector('form');
    closePopup(closestPopup);
    closestForm.reset();
    }
  );
});

profileEditForm.addEventListener('submit', saveProfileInfo);

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

  newCardImage.addEventListener('click', viewImage);

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

function addCard(el) {
  sectionPlaces.prepend(el);
}

cardAddForm.addEventListener('submit', addNewCard);

function viewImage(image) {
  image = event.target;
  const place = image.closest('.place');
  openPopup(popupOpenPlace);
  imagePopupOpenPlace.setAttribute('src', image.src);
  imagePopupOpenPlace.setAttribute('alt', image.alt);
  titlePopupOpenPlace.textContent = place.querySelector('.place__title').textContent;
}
