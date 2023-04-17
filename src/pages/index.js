import './index.css';
import {
  initialCards,
  propertySet,
  profileEditButton,
  cardAddButton
} from '../components/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#cardRender', (evt) => {
      const popupWithImg = new PopupWithImage('.popup_type_view-image');
      popupWithImg.setEventListeners();
      popupWithImg.open(evt);
    })
    return card.generateCard();
  }},
  '.places');

section.renderItem();

const userInfo = new UserInfo({userNameSelector:'.profile__name', userDescriptionSelector:'.profile__self-description'});

const profilePopupForm = new PopupWithForm(
  '.popup_type_profile-edit',
  (values) => {
    userInfo.setUserInfo({ newNname: Object.values(values)[0], newDescription: Object.values(values)[1] });
  }

)

profilePopupForm.setEventListeners();

const cardPopupForm =  new PopupWithForm(
  '.popup_type_add-card',
  (values) => {
    const card = new Card({'name': Object.values(values)[0], 'link': Object.values(values)[1]}, '#cardRender', (evt) => {
      const popupWithImg = new PopupWithImage('.popup_type_view-image');
      popupWithImg.setEventListeners();
      popupWithImg.open(evt);
    })
    section.addItem(card.generateCard());
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

cardAddButton.addEventListener('click', () => {
  arrayFormValidatorObjects.formAddCard.setInitialFormState();
  cardPopupForm.open();
  }
)
