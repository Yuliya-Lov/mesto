import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._image =  this._popup.querySelector('.popup__opened-image');
    this._title = this._popup.querySelector('.popup__opened-title');
  }

  open(evt){
    this._image.setAttribute('src',`${evt.target.src}`);
    this._image.setAttribute('alt', evt.target.alt);
    this._title.textContent = evt.target.parentNode.querySelector('h2').textContent;
    super.open();
  }
}
