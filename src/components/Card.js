export default class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteClick, handleLikeclick) {
    this._title = data.name;
    this._image = data.link;
    this.id = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._template = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeclick =handleLikeclick;
    this._likes = data.likes;
  }

  _getTemplate() {
    return document
    .querySelector(this._template)
    .content
    .querySelector('.place')
    .cloneNode(true);
  }

  _createCard() {
    this._card = this._getTemplate();
    this._card.setAttribute('id', this.id);
    this._cardImage = this._card.querySelector('.place__image');
    this._cardTitle = this._card.querySelector('.place__title');
    this._deleteButton = this._card.querySelector('.place__delete-button');
    if (this._ownerId != this._currentUserId) this._deleteButton.classList.add('place__delete-button_hidden');

    this._likeButton =  this._card.querySelector('.place__like-button');
    this._cardTitle.textContent = this._title;
    this._cardImage.setAttribute('src', this._image);
    this._cardImage.setAttribute('alt', this._title);
    return this._card;
  }

  _setLikes(arrLikes) {
    this._isLiked = arrLikes.some(like => like._id === this._currentUserId);
    this._isLiked
      ? this._likeButton.classList.add('place__like-button_active')
      : this._likeButton.classList.remove('place__like-button_active');
    this._likeButton.textContent =  arrLikes.length;
  }

  _getLikes() {
  this._handleLikeclick(this._isLiked);
  }

  _removeCard() {
  this._handleDeleteClick(this.id);
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click',() => {this._getLikes()});
    this._deleteButton.addEventListener('click', () => {this._removeCard()});
    this._cardImage.addEventListener('click', (evt) => {this._handleCardClick(evt)});
  }

  generateCard(currentUserId) {
    this._currentUserId = currentUserId;
    this._createCard();
    this._setLikes(this._likes);
    this._setEventListeners();
    return this._card;
  }
}
