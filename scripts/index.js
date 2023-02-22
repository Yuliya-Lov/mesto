const editProfileButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('#profilePopup');
const editProfileForm = document.querySelector('[name="editProfileForm"]');
const userName = document.querySelector('.edit-form__input_value_name');
const userDescription = document.querySelector('.edit-form__input_value_description');
const closeButtons = document.querySelectorAll('.popup__button-close');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__self-description');

const cardPopup = document.querySelector('#cardPopup');
const cardForm = document.querySelector('[name="cardForm"]');
const cardTitleInput = document.querySelector('[name="cardTitleInput"]');
const cardLinkInput = document.querySelector('[name="cardLinkInput"]');
const addCardButton = document.querySelector('.profile__add-button');
const sectionPlaces = document.querySelector('.places');

const imagePopup = document.querySelector('#imagePopup');



function openPopup(wichPopup) {
  wichPopup.classList.add('popup_opened');
}

function closePopup(wichPopup) {
  wichPopup.classList.remove('popup_opened');
}

function saveProfileInfo(evt) {
  evt.preventDefault();
  profileName.textContent = userName.value;
  profileDescription.textContent = userDescription.value;
  closePopup(profilePopup);
}


editProfileButton.addEventListener('click', function () {
  openPopup(profilePopup);
  userName.value =  profileName.textContent;
  userDescription.value =  profileDescription.textContent;
});

addCardButton.addEventListener('click', function () {
  openPopup(cardPopup);
})

closeButtons.forEach(button => {
  button.addEventListener('click', function (evt) {
    button = evt.target;
    const popup = button.closest('.popup');
    closePopup(popup);
    }
  );
});


editProfileForm.addEventListener('submit', saveProfileInfo);

const initialCards = [
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

function createCard(card) {
  const cardRender = document.querySelector('#cardRender').content.cloneNode(true);
  const cardTitle = cardRender.querySelector('.place__title');
  const cardImage = cardRender.querySelector('.place__image');
  cardTitle.textContent = card.name;
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', card.name);
  const likeButtons = cardRender.querySelectorAll('.place__like-button');
  const deleteButtons = cardRender.querySelectorAll('.place__delete-button');

  sectionPlaces.prepend(cardRender);

  likeButtons.forEach(like => {
    like.addEventListener('click', () => {
      like.classList.toggle('place__like-button_active');
    }
    );
  });

  deleteButtons.forEach(deleteClick => {
    deleteClick.addEventListener('click', (evt) => {
      deleteClick = event.target;
      const place = deleteClick.closest('.place');
      place.remove();
    })
  })

  cardImage.addEventListener('click', viewImage);

}



initialCards.forEach(createCard);

function addCard(evt) {
  evt.preventDefault();
  const newCard = {};
  newCard.name = cardTitleInput.value;
  newCard.link = cardLinkInput.value;
  initialCards.unshift(newCard);
  createCard(newCard);
  closePopup(cardPopup);
  cardTitleInput.value = '';
  cardLinkInput.value = '';
}


cardForm.addEventListener('submit', addCard);


function viewImage(image) {
  image = event.target;
  const place = image.closest('.place');
  openPopup(imagePopup);
  const openedImage = document.querySelector('.popup__opened-image');
  const openedTitle = document.querySelector('.popup__opened-title');
  openedImage.setAttribute('src', image.src);
  openedImage.setAttribute('alt', image.alt);
  openedTitle.textContent = place.querySelector('.place__title').textContent;
}
