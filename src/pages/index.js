import './index.css';
import {
  propertySet,
  profileEditButton,
  cardAddButton,
  avatarEditButton
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '46497fa4-40de-48f4-8825-4510fbe41c2a',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({userNameSelector:'.profile__name', userDescriptionSelector:'.profile__self-description', userPhotoSelector: '.profile__avatar'});

api.getUserInfo()
.then(data => {
  userInfo.setUserInfo(data);
})


const popupWithImg =  new PopupWithImage('.popup_type_view-image');
popupWithImg.setEventListeners();

let section;

api.getInitialCards()
.then(data => {
  section = new Section({
    items: data,
    renderer: (item) => {
      return createCard(item);
      }
    },
    '.places');
  section.renderItem();
})

const confirmPopupForm =  new PopupWithForm(
  '.popup_type_confirm-action',
  (value) => {
    return true;
  })

  confirmPopupForm.setEventListeners();


function createCard(data) {
  const card = new Card(
    data,
    '#cardRender',
    (evt) => {
    popupWithImg.open(evt)},
    () => {
    confirmPopupForm.open();
  })
  return card.generateCard();
}


const avatarPopupForm = new PopupWithForm(
  '.popup_type_avatar-edit',
  (avatar) => {
    api.editUserPhoto(avatar[0])
    .then(data => {
      userInfo.setAvatar(data)
    })
  }
)

avatarPopupForm.setEventListeners();


const profilePopupForm = new PopupWithForm(
  '.popup_type_profile-edit',
  (values) => {
    api.editUserInfo(values)
    .then(data => userInfo.setUserInfo(data))
  }
)

profilePopupForm.setEventListeners();


const cardPopupForm =  new PopupWithForm(
  '.popup_type_add-card',
  (value) => {
    api.addCard({'name': Object.values(value)[0], 'link': Object.values(value)[1]})
    .then(card => {
      const cardRender = createCard(card);
      section.addItem(cardRender);
    }
    )
  }
)

cardPopupForm.setEventListeners();



const arrayFormValidatorObjects = {};
Array.from(document.forms).forEach((form) => {
  const validatedForm = new FormValidator(propertySet, form);
  arrayFormValidatorObjects[form.name] = validatedForm;
  validatedForm.enableValidation();
})

profileEditButton.addEventListener('click', () => {
   arrayFormValidatorObjects.formEditProfile.setInitialFormState();
  profilePopupForm.setInitialInputValues(userInfo.getUserInfo());
  profilePopupForm.open();
}
);

avatarEditButton.addEventListener('click', () => {
  arrayFormValidatorObjects.formEditAvatar.setInitialFormState();
  avatarPopupForm.open();
}
);

cardAddButton.addEventListener('click', () => {
  arrayFormValidatorObjects.formAddCard.setInitialFormState();
  cardPopupForm.open();
  }
)


