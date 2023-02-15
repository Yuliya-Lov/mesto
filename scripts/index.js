let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let editForm = document.querySelector('.edit-form');
let userName = document.querySelector('.edit-form__input_value_name');
let userDescription = document.querySelector('.edit-form__input_value_description');
let editCloseButton = document.querySelector('.popup__button-close');
let ProfileName = document.querySelector('.profile__name');
let ProfileDescription = document.querySelector('.profile__self-description');

function openPopup() {
  popup.classList.add('popup_opened');
  userName.value =  ProfileName.textContent;
  userDescription.value =  ProfileDescription.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function saveProfileInfo(evt) {
  evt.preventDefault();
  ProfileName.textContent = userName.value;
  ProfileDescription.textContent = userDescription.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);

editCloseButton.addEventListener('click', closePopup);

editForm.addEventListener('submit', saveProfileInfo);



