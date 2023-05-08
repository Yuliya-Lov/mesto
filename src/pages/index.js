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
import PopupWithConfirm from '../components/PopupWithConfirm.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '46497fa4-40de-48f4-8825-4510fbe41c2a',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({userNameSelector:'.profile__name', userDescriptionSelector:'.profile__self-description', userPhotoSelector: '.profile__avatar'});

let ownerId;
let section;

const userPromise = api.getUserInfo();
const renderPromise = api.getInitialCards();

Promise.all([userPromise, renderPromise])
.then(([userData, renderData]) => {
  userInfo.setUserInfo(userData);
  ownerId = userData._id;

  section = new Section({
    items: renderData.reverse(),
    renderer: (item) => {
    return createCard(item);
    }
  },
  '.places');
  section.renderItems();
  })
.catch(err => console.error('Ошибка привыполнении запроса:', err));

const popupWithImg =  new PopupWithImage('.popup_type_view-image');
popupWithImg.setEventListeners();

function createCard(data) {
  const card = new Card(
    data,
    '#cardRender',
    (evt) => {
    popupWithImg.open(evt)
    },
    (cardId) => {
    confirmPopupForm.open();
    confirmPopupForm.setObjId(cardId);
    },
    (isLiked) => {
    const resolve =
      isLiked == false
      ? api.pushLike(card.id)
      : api.removeLike(card.id);

      resolve
      .then(res =>{
        card._setLikes(res.likes);
      })
      .catch(err => console.error('Ошибка привыполнении запроса:', err));
    });
  return card.generateCard(ownerId);
}

const confirmPopupForm =  new PopupWithConfirm (
  '.popup_type_confirm-action',
  (id) => {
    api.removeCard(id)
    .then(res => {
      if(res) document.getElementById(id).remove();
      confirmPopupForm.close();
    })
    .catch(err => console.error('Ошибка привыполнении запроса:', err));
  }
 )

confirmPopupForm.setEventListeners();

const avatarPopupForm = new PopupWithForm(
  '.popup_type_avatar-edit',
  (values) => {
     api.editUserPhoto(values[0])
    .then(data => {
      userInfo.setAvatar(data)
      avatarPopupForm.close();
    })
    .catch(err => console.error('Ошибка привыполнении запроса:', err));
  }
)

avatarPopupForm.setEventListeners();

const profilePopupForm = new PopupWithForm(
  '.popup_type_profile-edit',
  (values) => {
    api.editUserInfo(values)
    .then(data => {
      userInfo.setUserInfo(data);
      profilePopupForm.close();
    })
    .catch(err => console.error('Ошибка привыполнении запроса:', err));
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
      cardPopupForm.close();
    })
    .catch(err => console.error('Ошибка привыполнении запроса:', err));
  }
)

cardPopupForm.setEventListeners();

const validators = {};
Array.from(document.forms).forEach((form) => {
  const validatedForm = new FormValidator(propertySet, form);
  validators[form.name] = validatedForm;
  validatedForm.enableValidation();
})

profileEditButton.addEventListener('click', () => {
  validators.formEditProfile.setInitialFormState();
  profilePopupForm.setInitialInputValues(userInfo.getUserInfo());
  profilePopupForm.open();
});

avatarEditButton.addEventListener('click', () => {
  validators.formEditAvatar.setInitialFormState();
  avatarPopupForm.open();
});

cardAddButton.addEventListener('click', () => {
  validators.formAddCard.setInitialFormState();
  cardPopupForm.open();
})
