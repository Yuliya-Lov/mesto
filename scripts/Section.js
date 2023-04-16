export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(itemRender){
    this._container.prepend(itemRender);
  }

  renderItem(){
    this._itemElements = [];
    this._items.forEach(item => {
      this._renderer(item);
      this.addItem(this._renderer(item));
    });
  }
}
