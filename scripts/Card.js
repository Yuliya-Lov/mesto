import {openPopup} from './index.js';

export default class Card {
  constructor(data, templateSelector) {
    this._title = data.name;
    this._image = data.link;
    this._template = templateSelector;
  }

  _getTemplate() {
    const newCard = document
    .querySelector(this._template)
    .content
    .querySelector('.place')
    .cloneNode(true);
    return newCard;
  }

  _getLike(evt) {
    evt.target.classList.toggle('place__like-button_active');
  }

  _removeCard() {
    this._genetatedCard.remove();
  }

  _viewImage() {
    const popupOpenPlace = document.querySelector('.popup_view-image');
    const imagePopupOpenPlace = document.querySelector('.popup__opened-image');
    const titlePopupOpenPlace = document.querySelector('.popup__opened-title');
    openPopup(popupOpenPlace);
    imagePopupOpenPlace.setAttribute('src', this._image);
    imagePopupOpenPlace.setAttribute('alt', this._title);
    titlePopupOpenPlace.textContent = this._title;
  }

  _setEventListeners() {
    const likeButton =  this._genetatedCard.querySelector('.place__like-button');
    likeButton.addEventListener('click',(evt) => {this._getLike(evt)});

    const deleteButton = this._genetatedCard.querySelector('.place__delete-button');
    deleteButton.addEventListener('click', () => {this._removeCard()});

    const cardImage = this._genetatedCard.querySelector('.place__image');
    cardImage.addEventListener('click', () => {this._viewImage()});
  }

  generateCard() {
    this._genetatedCard = this._getTemplate();
    this._genetatedCard.querySelector('.place__title').textContent = this._title;
    this._genetatedCard.querySelector('.place__image').setAttribute('src', this._image);
    this._genetatedCard.querySelector('.place__image').setAttribute('alt', this._title);
    this._setEventListeners();
    return this._genetatedCard;

  }
}
