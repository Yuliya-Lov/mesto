export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(itemRender){
    this._container.prepend(itemRender);
  }

  deleteItem(id){
    console.log(id);
    const card = this._items.find(item => console.log(item._id == id));
    //console.log(card);
  }

  renderItem(){
    this._items.forEach(item => {
      this.addItem(this._renderer(item));
    });
  }

  clearAll(){
    this._container.innerHTML ='';
  }
}
