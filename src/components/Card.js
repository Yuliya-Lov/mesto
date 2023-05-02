
export default class Card {
  constructor(data, templateSelector, handleCardClick, isConfirmDel) {
    this._title = data.name;
    this._image = data.link;
    this.id = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._template = templateSelector;
    this._handleCardClick = handleCardClick;
    this._isConfirmDel = isConfirmDel;
  }

  _getTemplate() {
    return document
    .querySelector(this._template)
    .content
    .querySelector('.place')
    .cloneNode(true);
  }

  _createCard(currentId) {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector('.place__image');
    this._cardTitle = this._card.querySelector('.place__title');
    this._deleteButton = this._card.querySelector('.place__delete-button');
    if(this._ownerId != currentId) this._deleteButton.classList.add('place__delete-button_hidden');

    this._likeButton =  this._card.querySelector('.place__like-button');
    this._cardTitle.textContent = this._title;
    this._cardImage.setAttribute('src', this._image);
    this._cardImage.setAttribute('alt', this._title);
    return this._card;
  }

  _getLike(evt) {
    evt.target.classList.toggle('place__like-button_active');
  }

  _removeCard() {
    this._isConfirmDel(this.id);
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click',(evt) => {this._getLike(evt)});
    this._deleteButton.addEventListener('click', () => {this._removeCard()});
    this._cardImage.addEventListener('click', (evt) => {this._handleCardClick(evt)});
  }

  generateCard(ownerId) {
    this._createCard(ownerId);
    this._setEventListeners();
    return this._card;
  }
}
