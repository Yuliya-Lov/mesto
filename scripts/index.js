import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import {
  initialCards,
  propertySet,
  profileEditButton,
  profileName,
  profileDescription,
  cardAddButton
} from './constants.js';

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

const profilePopupForm = new PopupWithForm(
  '.popup_type_profile-edit',
  (values) => {
    console.log(values['name-input']);
    profileName.textContent = values['name-input'];
    profileDescription.textContent = values['employment-input'];

  }
)

profilePopupForm.setEventListeners();
profileEditButton.addEventListener('click', () => {
  profilePopupForm. setInitialInputValues([profileName.textContent, profileDescription.textContent]);
  arrayFormValidatorObjects.formEditProfile.setInitialFormState();
  profilePopupForm.open();
}
);

const cardPopupForm =  new PopupWithForm(
  '.popup_type_add-card',
  (values) => {
    console.log(Object.values(values));
    const card = new Card({'name': Object.values(values)[0], 'link': Object.values(values)[1]}, '#cardRender', (evt) => {
      const popupWithImg = new PopupWithImage('.popup_type_view-image');
      popupWithImg.setEventListeners();
      popupWithImg.open(evt);
    })
    section.addItem(card.generateCard());
  }
)

cardPopupForm.setEventListeners();

cardAddButton.addEventListener('click', () => {
  cardPopupForm.open();
}
 )

const arrayFormValidatorObjects = {};
Array.from(document.forms).forEach((form) => {
  const validatedForm = new FormValidator(propertySet, form);
  arrayFormValidatorObjects[form.name] = validatedForm;
  validatedForm.enableValidation();
})

/* cardAddButton.addEventListener('click', function () {
  cardAddForm.reset();
  arrayFormValidatorObjects.formAddCard.setInitialFormState();
  openPopup(cardPopup);
  }
)

function getAditionalCard () {
  const additionalData = {
    name: cardAddForm.querySelector('#card-title-input').value,
    link: cardAddForm.querySelector('#card-url-input').value
  }
  addCard (additionalData);
}

cardAddForm.addEventListener('submit', function() {
  getAditionalCard();
  closePopup(cardPopup);
});
 */
