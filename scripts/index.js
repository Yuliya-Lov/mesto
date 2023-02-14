let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let editForm = document.querySelector('.edit-form');
let userName = document.querySelector('.edit-form__user-name');
let userDescription = document.querySelector('.edit-form__user-description');
let editSubmitButton = document.querySelector('.edit-form__submit');
let editResetButton = document.querySelector('.edit-form__button-close');
let ProfileName = document.querySelector('.profile__name');
let ProfileDescription = document.querySelector('.profile__self-description');

userName.setAttribute('value', ProfileName.textContent);
userDescription.setAttribute('value', ProfileDescription.textContent);


editButton.addEventListener('click', openPopup => {
  popup.classList.add('popup_opened');
})

editResetButton.addEventListener('click', closePopup => {
  popup.classList.remove('popup_opened');
})

function saveProfileInfo(evt) {
  evt.preventDefault();
  console.log(userName.value);
  ProfileName.textContent = userName.value;
  ProfileDescription.textContent = userDescription.value;
  popup.classList.remove('popup_opened');
}

editSubmitButton.addEventListener('click', saveProfileInfo);



